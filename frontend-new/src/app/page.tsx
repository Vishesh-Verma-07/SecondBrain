import Link from "next/link";

const features = [
  [
    "Capture anything",
    "Save a link, a note, or a YouTube video in one calm, focused flow.",
  ],
  [
    "Find it naturally",
    "Ask a question and get an AI-grounded answer from the knowledge you saved.",
  ],
  [
    "Keep it organised",
    "Use categories and tags to create a library that makes sense to you.",
  ],
];

export default function Home() {
  return (
    <main>
      <nav className="nav wrap">
        <Link className="brand" href="/">
          <i>✦</i> Brain Dock
        </Link>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#how">How it works</a>
          <a href="#faq">FAQ</a>
        </div>
        <div className="nav-actions">
          <Link href="/login" className="text-link">
            Sign in
          </Link>
          <Link href="/signup" className="button small">
            Start for free <span>→</span>
          </Link>
        </div>
      </nav>
      <section className="hero wrap">
        <div className="eyebrow">
          <span /> YOUR KNOWLEDGE, FINALLY USEFUL
        </div>
        <h1>
          Everything you want to remember.
          <br />
          <em>Exactly when you need it.</em>
        </h1>
        <p className="hero-copy">
          Brain Dock is your quiet place for links, notes, and ideas—organised
          automatically and ready to answer your questions.
        </p>
        <div className="hero-actions">
          <Link href="/signup" className="button">
            Build your Brain Dock <span>→</span>
          </Link>
          <a href="#how" className="play">
            <b>▶</b> See how it works
          </a>
        </div>
        <div className="app-preview">
          <aside>
            <div className="preview-logo">✦</div>
            <div className="preview-title">Brain Dock</div>
            <div className="preview-new">＋ New item</div>
            <small>WORKSPACE</small>
            <div className="preview-nav active">
              ▦ <span>All saved</span>
              <b>24</b>
            </div>
            <div className="preview-nav">
              ◈ <span>Favorites</span>
            </div>
            <div className="preview-nav">
              ▣ <span>Shared with me</span>
            </div>
            <small>COLLECTIONS</small>
            <div className="preview-nav">
              ◉ <span>Design inspiration</span>
            </div>
            <div className="preview-nav">
              ◇ <span>Reading list</span>
            </div>
          </aside>
          <section className="preview-content">
            <header>
              <div className="search">⌕&nbsp;&nbsp; Search your brain...</div>
              <div className="avatar">A</div>
            </header>
            <div className="preview-inner">
              <div className="crumb">WORKSPACE / ALL SAVED</div>
              <h2>
                Good morning, Alex <span>✦</span>
              </h2>
              <p>Here&apos;s everything you&apos;ve saved, in one place.</p>
              <div className="stat-row">
                <div>
                  <strong>24</strong>
                  <small>items saved</small>
                </div>
                <div>
                  <strong>6</strong>
                  <small>collections</small>
                </div>
                <div>
                  <strong>12</strong>
                  <small>tags</small>
                </div>
              </div>
              <div className="section-head">
                <h3>Recently added</h3>
                <a>View all →</a>
              </div>
              <div className="preview-cards">
                <article>
                  <div className="card-icon lavender">◫</div>
                  <div className="card-type">
                    ARTICLE <time>2h ago</time>
                  </div>
                  <h4>Designing better interfaces with less</h4>
                  <p>
                    Thoughtful principles for more intentional digital
                    experiences.
                  </p>
                  <div>
                    <mark>design</mark>
                    <mark>inspiration</mark>
                  </div>
                </article>
                <article>
                  <div className="card-icon yellow">▷</div>
                  <div className="card-type">
                    VIDEO <time>Yesterday</time>
                  </div>
                  <h4>The future of creative tools</h4>
                  <p>A conversation on how AI is changing the way we create.</p>
                  <div>
                    <mark>ai</mark>
                    <mark>creativity</mark>
                  </div>
                </article>
                <article>
                  <div className="card-icon mint">✎</div>
                  <div className="card-type">
                    NOTE <time>Jun 12</time>
                  </div>
                  <h4>Ideas worth exploring</h4>
                  <p>Notes from a long walk on a sunny afternoon.</p>
                  <div>
                    <mark>ideas</mark>
                  </div>
                </article>
              </div>
            </div>
          </section>
        </div>
      </section>
      <section id="features" className="feature-section wrap">
        <div className="section-label">BUILT FOR CLEAR THINKING</div>
        <h2>
          A home for your <em>curiosity.</em>
        </h2>
        <p>Less time searching. More time connecting the dots.</p>
        <div className="feature-grid">
          {features.map(([title, copy], i) => (
            <article key={title} className="feature-card">
              <div className={`feature-icon icon-${i}`}>
                {["↙", "✦", "⌘"][i]}
              </div>
              <h3>{title}</h3>
              <p>{copy}</p>
              <a href="#how">
                Learn more <span>→</span>
              </a>
            </article>
          ))}
        </div>
      </section>
      <section id="how" className="how">
        <div className="wrap how-grid">
          <div>
            <div className="section-label">SIMPLE BY DESIGN</div>
            <h2>
              From saved to <em>useful</em>
              <br />
              in seconds.
            </h2>
            <p>
              Brain Dock does the heavy lifting so you can focus on what
              matters: thinking, creating, and growing.
            </p>
            <Link href="/signup" className="button light">
              Start building your brain <span>→</span>
            </Link>
          </div>
          <div className="steps">
            <div>
              <b>01</b>
              <article>
                <h3>Save what inspires you</h3>
                <p>Links, notes, videos—anything worth keeping.</p>
              </article>
            </div>
            <div>
              <b>02</b>
              <article>
                <h3>Make it yours</h3>
                <p>Add tags and categories that fit how you think.</p>
              </article>
            </div>
            <div>
              <b>03</b>
              <article>
                <h3>Ask, discover, connect</h3>
                <p>Search naturally and let AI surface the right ideas.</p>
              </article>
            </div>
          </div>
        </div>
      </section>
      <section id="faq" className="faq wrap">
        <div>
          <div className="section-label">QUESTIONS, ANSWERED</div>
          <h2>
            Made for minds
            <br />
            that <em>wander.</em>
          </h2>
        </div>
        <div className="faq-list">
          <details open>
            <summary>
              What can I save in Brain Dock?<span>−</span>
            </summary>
            <p>
              You can save text notes and web links. Supported YouTube links are
              automatically converted into easy-to-watch embeds.
            </p>
          </details>
          <details>
            <summary>
              How does AI search work?<span>＋</span>
            </summary>
            <p>
              Ask in your own words. Your saved content is searched
              semantically, then an answer is grounded in the most relevant
              items.
            </p>
          </details>
          <details>
            <summary>
              Can I share my knowledge?<span>＋</span>
            </summary>
            <p>
              Yes. Generate a shareable brain link whenever you want to give
              others access to your saved collection.
            </p>
          </details>
          <details>
            <summary>
              Is my content private?<span>＋</span>
            </summary>
            <p>
              Your brain is connected to your account. Only content you
              explicitly share is available through a public link.
            </p>
          </details>
        </div>
      </section>
      <section className="cta wrap">
        <div>
          <div className="section-label">YOUR NEXT IDEA STARTS HERE</div>
          <h2>
            Give your thoughts
            <br />a place to <em>grow.</em>
          </h2>
          <p>Start building a calmer, smarter way to remember.</p>
          <Link href="/signup" className="button light">
            Create your free account <span>→</span>
          </Link>
        </div>
        <div className="cta-art">
          <span>✦</span>
          <span>✦</span>
          <span>✦</span>
        </div>
      </section>
      <footer className="footer wrap">
        <Link className="brand" href="/">
          <i>✦</i> Brain Dock
        </Link>
        <p>© 2026 Brain Dock. Made for curious minds.</p>
        <div>
          <a href="#features">Features</a>
          <a href="#faq">FAQ</a>
          <Link href="/login">Sign in</Link>
        </div>
      </footer>
    </main>
  );
}
