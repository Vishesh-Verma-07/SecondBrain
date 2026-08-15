---
name: deploy
description: Generic guide for setting up and running a deployment pipeline for any full-stack application with a web frontend, an API backend, and supporting services (databases like Postgres/MySQL/MongoDB, caches like Redis, websocket backends, workers). Use when asked to deploy, redeploy, release, roll out, set up deployment, write or review Dockerfiles, docker-compose, Kubernetes manifests, ingress rules, or CI/CD workflows (GitHub Actions, etc.).
---

# Generic Deployment Guide

This is a repeatable playbook for deploying a modern full-stack app: web frontend, API backend, plus supporting services (Postgres/MySQL/MongoDB, Redis, websocket server, workers). It walks through four layers: local dev, Docker Compose, image building, and Kubernetes, with CI/CD on top.

## Layer 0 — Map the stack first

Before writing anything, enumerate the pieces and how they talk to each other:

| Role | Examples | Default port | Exposed to internet? |
|---|---|---|---|
| Web frontend | Next.js, React SPA, Vite | 3000 | Yes (ingress `/`) |
| API backend | Express, FastAPI, NestJS | 8000/8080 | Yes (ingress `/api`) |
| WebSocket server | Socket.IO, ws, GraphQL subscriptions | 8081 | Yes, with upgrades |
| Database | Postgres, MySQL, MongoDB | 5432/3306/27017 | No (internal only) |
| Cache / queue | Redis, RabbitMQ | 6379/5672 | No |
| Worker/jobs | Bull queues, celery | — | No |

Rules of thumb:

- Frontends are the only thing that talks directly to the browser; everything else should be cluster-internal unless the frontend is a static SPA calling a public API.
- WebSocket connections must go through the same ingress as the HTTP API (or a dedicated host), and the ingress must permit protocol upgrades.
- Databases and caches need persistent volumes or managed external services (don't run a DB in a container without a volume).

## Layer 1 — Local development

Run everything from source with hot reload, one terminal per service. Standardize env loading with `.env` files (never committed) and document required variables in the README:

```bash
cd backend && npm run dev        # API on :8080
cd frontend && npm run dev       # UI on :3000
docker run -p 5432:5432 postgres # or use a managed/local DB
```

## Layer 2 — Docker Compose (full local stack)

`docker-compose.yml` conventions:

```yaml
services:
  frontend:
    build:
      context: ./frontend
      args:
        NEXT_PUBLIC_API_URL: http://localhost:8080/api/v1   # build-time client env
    ports: ["3000:3000"]
    depends_on: [backend]

  backend:
    build: { context: ./backend }
    ports: ["8080:8080"]
    env_file: [./backend/.env]
    environment:
      NODE_ENV: development
      DATABASE_URL: postgres://app:app@db:5432/app
      REDIS_URL: redis://redis:6379
    depends_on:
      db: { condition: service_healthy }    # wait for readiness, not just startup
      redis: { condition: service_healthy }

  websocket:
    build: { context: ./websocket }
    ports: ["8081:8081"]
    depends_on: [backend, redis]

  db:
    image: postgres:16
    environment:
      POSTGRES_USER: app
      POSTGRES_PASSWORD: app
      POSTGRES_DB: app
    volumes: [db_data:/var/lib/postgresql/data]
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U app"]
      interval: 5s
      retries: 5

  redis:
    image: redis:7
    volumes: [redis_data:/data]
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      retries: 5

volumes:
  db_data:
  redis_data:
```

Conventions:

- Use `depends_on` with `condition: service_healthy` and healthchecks for DBs/caches so the backend doesn't crash-loop on startup.
- Connection strings inside compose use **service names** as hostnames (`db`, `redis`), not localhost.
- Anything with state gets a named volume.
- `NEXT_PUBLIC_*` style build-time env must be passed as build `args`, never read at runtime in a static SPA.

## Layer 3 — Docker images

### Multi-stage Dockerfile template (Node example)

```dockerfile
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/dist ./dist
EXPOSE 8080
CMD ["node", "dist/index.js"]
```

Notes:

- One stage per concern (deps → build → run) so the final image is small and layer caching works.
- Build-time client env (`NEXT_PUBLIC_*`, Vite `VITE_*`) must be `ARG`/`ENV` **before** the build step.
- Never bake runtime secrets (DB passwords, API keys) into images — those come from env at deploy time.
- For Next.js-style frameworks with standalone output, copy `.next/standalone` + `.next/static` + `public` and run `server.js`.
- For a separate websocket/worker service, use the same pattern with its own port.

### Tagging and registry

```bash
docker build --build-arg NEXT_PUBLIC_API_URL=https://api.example.com -t registry/user/app:1.4.0 ./backend
docker push registry/user/app:1.4.0
```

Tag strategy: either a unique tag per release (SHA or semver — enables rollbacks) or `latest`. Use unique tags for anything deployed to Kubernetes.

## Layer 4 — Kubernetes (production)

### File layout

```
kubernetes/
├── namespace.yml            # isolates everything for this app
├── ingress.yml              # public entry point + routing
├── frontend/
│   ├── deployment.yml       # replicas, image, probes, resources
│   └── service.yml          # ClusterIP
├── backend/
│   ├── deployment.yml
│   ├── service.yml
│   ├── config.yml           # non-secret env (ConfigMap)
│   └── secret.yml           # or kubectl create secret (never commit raw secrets)
├── websocket/               # if you have one — same trio as backend
└── infra/
    ├── postgres-statefulset.yml   # DB with PVC, or use managed DB
    └── redis-deployment.yml       # cache with PVC + service
```

### Apply order

```bash
kubectl apply -f kubernetes/namespace.yml
kubectl apply -f kubernetes/backend/config.yml
kubectl apply -f kubernetes/backend/secret.yml
kubectl apply -f kubernetes/infra/           # DB, Redis
kubectl apply -f kubernetes/backend/         # configmap/secret first, then services, then deployments
kubectl apply -f kubernetes/frontend/
kubectl apply -f kubernetes/websocket/       # if present
kubectl apply -f kubernetes/ingress.yml
```

### Deployment template

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend
  namespace: myapp
spec:
  replicas: 2
  selector: { matchLabels: { app: backend } }
  template:
    metadata: { labels: { app: backend } }
    spec:
      containers:
        - name: backend
          image: registry/user/backend:IMAGE_TAG   # placeholder — always substitute
          ports: [{ containerPort: 8080 }]
          envFrom:
            - configMapRef: { name: app-config }
            - secretRef: { name: app-secrets }
          readinessProbe:
            httpGet: { path: /health, port: 8080 }
            initialDelaySeconds: 5
          livenessProbe:
            httpGet: { path: /health, port: 8080 }
          resources:
            requests: { cpu: 100m, memory: 256Mi }
            limits: { cpu: 500m, memory: 512Mi }
```

### ConfigMap vs Secret

- ConfigMap: non-secret config (NODE_ENV, PORT, feature flags).
- Secret: credentials (DB URL, API keys, JWT secret). Create via `kubectl create secret generic app-secrets --from-env-file=.env --dry-run=client -o yaml | kubectl apply -f -` and keep the raw file out of git.

### Services and ingress

- Services are ClusterIP (internal); only the ingress is public.
- Every service must match its Deployment's `selector` labels exactly and point `targetPort` at the container port. A typo here silently breaks routing.
- Ingress routes by path — `/api` → backend, `/` → frontend, and for the websocket server either a dedicated path or host:

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: myapp-ingress
  namespace: myapp
  annotations:
    nginx.ingress.kubernetes.io/proxy-read-timeout: "3600"      # websocket idle timeout
    nginx.ingress.kubernetes.io/proxy-send-timeout: "3600"
    nginx.ingress.kubernetes.io/websocket-services: "websocket" # if using a dedicated service
spec:
  rules:
    - host: app.example.com
      http:
        paths:
          - path: /api
            pathType: Prefix
            backend: { service: { name: backend, port: { number: 8080 } } }
          - path: /ws
            pathType: Prefix
            backend: { service: { name: websocket, port: { number: 8081 } } }
          - path: /
            pathType: Prefix
            backend: { service: { name: frontend, port: { number: 3000 } } }
```

WebSocket-specific notes:

- The ingress controller must support protocol upgrades (nginx-ingress and traefik do; the `websocket-services` annotation is controller-specific — check your controller's docs).
- Bump proxy read/send timeouts so long-lived sockets don't get cut off.
- If websocket clients need sticky sessions, enable session affinity (`nginx.ingress.kubernetes.io/affinity: cookie` or service `sessionAffinity: ClientIP`).

### Deploying a new release to Kubernetes

```bash
kubectl -n myapp set image deployment/backend backend=registry/user/backend:1.4.0
kubectl -n myapp set image deployment/frontend frontend=registry/user/frontend:1.4.0
kubectl -n myapp rollout status deployment/backend
kubectl -n myapp rollout status deployment/frontend
kubectl -n myapp rollout undo deployment/backend   # rollback
```

Prefer templating tools (Kustomize, Helm) once manifests grow; they solve the "remember to substitute IMAGE_TAG and keep env in sync" problem.

## Layer 5 — CI/CD

### CI (must-have): lint, test, build

```yaml
on:
  push: { branches: [main] }
  pull_request: { branches: [main] }
jobs:
  backend:
    runs-on: ubuntu-latest
    defaults: { run: { working-directory: backend } }
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm, cache-dependency-path: backend/package-lock.json }
      - run: npm ci
      - run: npm run lint
      - run: npm run test        # if tests exist
      - run: npm run build
  frontend:
    runs-on: ubuntu-latest
    defaults: { run: { working-directory: frontend } }
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm }
      - run: npm ci
      - run: npm run lint
      - run: npm run build
```

### CD (optional but recommended): build images, then push to the cluster

```yaml
jobs:
  build-and-deploy:
    needs: [backend, frontend]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: docker/setup-buildx-action@v3
      - uses: docker/login-action@v3
        with: { username: ${{ secrets.REGISTRY_USER }}, password: ${{ secrets.REGISTRY_PASSWORD }} }
      - name: Build and push backend
        uses: docker/build-push-action@v6
        with:
          context: ./backend
          push: true
          tags: registry/user/backend:${{ github.sha }}
      - name: Deploy to cluster
        uses: azure/k8s-set-context@v4      # or kubelogin/kubeconfig secret
        with: { kubeconfig: ${{ secrets.KUBECONFIG }} }
      - name: Set image
        run: kubectl -n myapp set image deployment/backend backend=registry/user/backend:${{ github.sha }}
```

CD options, cheapest to most robust:

1. Workflow runs `kubectl set image` with a committed kubeconfig (fine for a single cluster).
2. Kustomize/Helm with a repo holding the target manifest values.
3. GitOps (Argo CD / Flux): the cluster watches the repo and deploys whatever is in it — best for rollbacks and audit trails.

## Verification checklist (run after every deploy)

1. Rollout: `kubectl -n myapp rollout status deployment/backend` — all replicas ready.
2. Health: `curl https://app.example.com/api/health` returns 200.
3. UI: load the public URL, confirm static assets resolve.
4. WebSocket: connect a client and confirm upgrades succeed and messages flow (not HTTP 400/502).
5. Backing services: check backend logs for successful DB/Redis connections; confirm PVCs are bound (`kubectl get pvc`).
6. Secrets: `kubectl -n myapp get secrets` exists and backend isn't in CrashLoopBackOff with permission errors.

## Universal gotchas

1. **Image tag placeholders** — search manifests for `IMAGE_TAG`/`latest` before applying; a stale image is the #1 "deployed but nothing changed" cause.
2. **YAML typos are silent killers** — `container:` vs `containers:`, `targetPort` misspelled, selector label mismatch, wrong namespace in metadata. Validate with `kubectl apply --dry-run=client -o yaml` and `kubectl get endpoints -n myapp` to confirm services have backing pods.
3. **Secrets must exist before Deployments that reference them**, or pods CrashLoop.
4. **Build-time vs runtime env** — client env baked at build (rebuild to change); server env read at runtime (no rebuild needed).
5. **CORS** — the API must allow the real browser origin; keep the origin list in config, not hardcoded.
6. **State** — DB/cache containers without persistent volumes lose data on reschedule; use PVCs or managed services.
7. **WebSocket timeouts** — default ingress timeouts kill idle sockets; set proxy timeouts and prefer long-lived health checks.
8. **Health endpoints** — every service should expose one, used for probes, ingress, and smoke tests.
