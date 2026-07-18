"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  ApiError,
  brainApi,
  Category,
  ContentItem,
  CreateContent,
  Tag,
} from "@/lib/api";

const collectionId = (item: ContentItem) =>
  (typeof item.category === "string" ? item.category : item.category?._id) ||
  (typeof item.categoryId === "string"
    ? item.categoryId
    : item.categoryId?._id);

export default function Dashboard() {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [notice, setNotice] = useState("");
  const [collection, setCollection] = useState("all");
  const [sort, setSort] = useState<"newest" | "oldest">("newest");
  const [showCreate, setShowCreate] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadDashboard() {
    const [content, savedTags, savedCategories] = await Promise.all([
      brainApi.content(),
      brainApi.tags(),
      brainApi.categories(),
    ]);
    setItems(content);
    setTags(savedTags);
    setCategories(savedCategories);
  }

  useEffect(() => {
    async function fetchDashboard() {
      try {
        await loadDashboard();
      } catch (error) {
        setNotice(
          error instanceof Error ? error.message : "Could not load your brain.",
        );
      } finally {
        setLoading(false);
      }
    }
    void fetchDashboard();
  }, []);

  const visibleItems = useMemo(() => {
    const term = query.trim().toLowerCase();
    return items
      .filter(
        (item) =>
          !term ||
          [
            item.title,
            item.content,
            item.link,
            ...(item.tags?.map((tag) => tag.name || tag.title || "") || []),
          ]
            .join(" ")
            .toLowerCase()
            .includes(term),
      )
      .filter(
        (item) => collection === "all" || collectionId(item) === collection,
      )
      .sort(
        (a, b) =>
          (sort === "newest" ? -1 : 1) *
          (new Date(a.createdAt || 0).getTime() -
            new Date(b.createdAt || 0).getTime()),
      );
  }, [collection, items, query, sort]);

  async function search(event: FormEvent) {
    event.preventDefault();
    if (!query.trim()) return;
    try {
      const result = await brainApi.search(query);
      setAnswer(result.answer || "I found relevant items in your brain.");
      if (result.content) setItems(result.content);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Search failed.");
    }
  }

  async function create(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const body: CreateContent = {
      title: String(values.get("title")).trim(),
      content: String(values.get("content")).trim(),
      link: String(values.get("link")).trim() || undefined,
      categoryId: String(values.get("categoryId")) || undefined,
      tags: String(values.get("tags"))
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };
    try {
      await brainApi.createContent(body);
      setShowCreate(false);
      setNotice("Saved to your brain.");
      await loadDashboard();
    } catch (error) {
      setNotice(
        error instanceof Error ? error.message : "Could not save this item.",
      );
    }
  }

  async function remove(id: string) {
    if (!window.confirm("Delete this saved item?")) return;
    try {
      await brainApi.deleteContent(id);
      setItems((current) => current.filter((item) => item._id !== id));
      setNotice("Item deleted.");
    } catch (error) {
      setNotice(
        error instanceof Error ? error.message : "Could not delete this item.",
      );
    }
  }

  async function share() {
    try {
      const result = await brainApi.share(true);
      const hash =
        result.shareLink ||
        (result.hash ? `${window.location.origin}/brain/${result.hash}` : "");
      if (!hash) throw new Error("The server did not return a share link.");
      setShareLink(hash);
      setShowShare(true);
    } catch (error) {
      if (
        error instanceof ApiError &&
        error.data &&
        typeof error.data === "object" &&
        "hash" in error.data
      ) {
        setShareLink(
          `${window.location.origin}/brain/${String(error.data.hash)}`,
        );
        setShowShare(true);
        return;
      }
      setNotice(
        error instanceof Error
          ? error.message
          : "Could not create a share link.",
      );
    }
  }

  async function copyShareLink() {
    try {
      await navigator.clipboard.writeText(shareLink);
      setNotice("Share link copied to clipboard.");
    } catch {
      setNotice("Copy the link manually from the field below.");
    }
  }

  const selectedName =
    collection === "all"
      ? "ALL SAVED"
      : categories.find((category) => category._id === collection)?.name ||
        "COLLECTION";

  return (
    <main className="dash">
      <aside className="dash-side" aria-label="Workspace navigation">
        <Link className="brand" href="/">
          <i>✦</i> second brain
        </Link>
        <button className="new-item" onClick={() => setShowCreate(true)}>
          ＋ <span>New item</span>
        </button>
        <p>WORKSPACE</p>
        <button
          className={collection === "all" ? "side-active" : ""}
          onClick={() => setCollection("all")}
        >
          ▦ <span>All saved</span>
          <b>{items.length}</b>
        </button>
        <button
          onClick={() =>
            document.querySelector<HTMLInputElement>(".dash-top input")?.focus()
          }
        >
          ⌕ <span>Search</span>
        </button>
        <button onClick={share}>
          ↗ <span>Share brain</span>
        </button>
        <p>COLLECTIONS</p>
        <div className="collection-list" aria-label="Collections">
          {categories.length ? (
            categories.map((category) => (
              <button
                className={collection === category._id ? "side-active" : ""}
                key={category._id}
                onClick={() => setCollection(category._id)}
                title={category.name}
              >
                ◌ <span>{category.name}</span>
              </button>
            ))
          ) : (
            <small>No collections yet</small>
          )}
        </div>
        <div className="side-bottom">
          <Link href="/">
            ← <span>Back to home</span>
          </Link>
        </div>
      </aside>
      <section className="dash-main">
        <header className="dash-top">
          <form onSubmit={search}>
            <span>⌕</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search your brain..."
              aria-label="Search your brain"
            />
          </form>
          <button className="share-button" onClick={share}>
            ↗ Share
          </button>
          <div className="avatar">A</div>
        </header>
        <div className="dash-content">
          <div className="crumb">WORKSPACE / {selectedName}</div>
          <div className="dash-title">
            <div>
              <h1>
                Your <em>second brain.</em>
              </h1>
              <p>A home for everything you want to remember.</p>
            </div>
            <button className="button" onClick={() => setShowCreate(true)}>
              ＋ Add item
            </button>
          </div>
          {notice && (
            <div className="notice" role="status">
              {notice}
              <button
                onClick={() => setNotice("")}
                aria-label="Dismiss message"
              >
                ×
              </button>
            </div>
          )}
          {answer && (
            <div className="answer">
              <span>✦</span>
              <div>
                <small>AI ANSWER</small>
                <p>{answer}</p>
              </div>
              <button onClick={() => setAnswer("")} aria-label="Dismiss answer">
                ×
              </button>
            </div>
          )}
          <div className="dash-stats">
            <div>
              <strong>{items.length}</strong>
              <span>items saved</span>
            </div>
            <div>
              <strong>{categories.length}</strong>
              <span>collections</span>
            </div>
            <div>
              <strong>{tags.length}</strong>
              <span>tags</span>
            </div>
          </div>
          <div className="content-head">
            <h2>
              {query
                ? "Search results"
                : collection === "all"
                  ? "Recently added"
                  : "Collection items"}
            </h2>
            <span>
              {visibleItems.length} item{visibleItems.length === 1 ? "" : "s"}
            </span>
          </div>
          <div className="content-filters">
            <label>
              Sort
              <select
                value={sort}
                onChange={(event) =>
                  setSort(event.target.value as "newest" | "oldest")
                }
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
            </label>
            <label>
              Collection
              <select
                value={collection}
                onChange={(event) => setCollection(event.target.value)}
              >
                <option value="all">All collections</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          {loading ? (
            <div className="empty">Loading your saved knowledge…</div>
          ) : visibleItems.length ? (
            <div className="content-grid">
              {visibleItems.map((item) => (
                <article
                  className={`content-card ${item.content && item.content.length > 180 ? "content-card-tall" : ""}`}
                  key={item._id}
                >
                  <Link
                    className="card-link"
                    href={`/dashboard/item/${item._id}`}
                    aria-label={`View ${item.title}`}
                  >
                    <div className="content-kind">
                      {item.link ? "↗ LINK" : "✎ NOTE"}
                    </div>
                    <h3>{item.title}</h3>
                    {item.content && <p>{item.content}</p>}
                    {item.link && (
                      <span className="item-link">Open link ↗</span>
                    )}
                  </Link>
                  <footer>
                    <div>
                      {item.tags?.map((tag) => (
                        <mark key={tag._id}>{tag.name || tag.title}</mark>
                      ))}
                    </div>
                    <button
                      onClick={() => remove(item._id)}
                      aria-label={`Delete ${item.title}`}
                    >
                      ×
                    </button>
                  </footer>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty">
              <span>✦</span>
              <h3>
                {query || collection !== "all"
                  ? "Nothing matched these filters"
                  : "Your brain is ready"}
              </h3>
              <p>Try a different phrase, collection, or save something new.</p>
              <button className="button" onClick={() => setShowCreate(true)}>
                ＋ Add your first item
              </button>
            </div>
          )}
        </div>
      </section>
      {showCreate && (
        <div className="modal-backdrop">
          <section
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-title"
          >
            <button
              className="modal-close"
              onClick={() => setShowCreate(false)}
              aria-label="Close"
            >
              ×
            </button>
            <p className="section-label">ADD TO YOUR BRAIN</p>
            <h2 id="create-title">
              Save something <em>worth keeping.</em>
            </h2>
            <form onSubmit={create}>
              <label>
                Title
                <input
                  required
                  name="title"
                  placeholder="What are you saving?"
                />
              </label>
              <label>
                Note
                <textarea
                  required
                  name="content"
                  placeholder="Add a thought or a helpful summary..."
                />
              </label>
              <label>
                Link
                <input name="link" type="url" placeholder="https://..." />
              </label>
              <div className="form-row">
                <label>
                  Collection
                  <select name="categoryId" required>
                    <option value="">Choose a collection</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Tags
                  <input name="tags" placeholder="design, ideas" />
                </label>
              </div>
              <button className="button auth-button">
                Save to brain <span>→</span>
              </button>
            </form>
          </section>
        </div>
      )}
      {showShare && (
        <div className="modal-backdrop">
          <section
            className="modal share-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="share-title"
          >
            <button
              className="modal-close"
              onClick={() => setShowShare(false)}
              aria-label="Close"
            >
              ×
            </button>
            <p className="section-label">SHARE YOUR BRAIN</p>
            <h2 id="share-title">
              Your brain is <em>ready to share.</em>
            </h2>
            <p>Anyone with this link can view the items you have shared.</p>
            <label>
              Shareable link
              <input
                readOnly
                value={shareLink}
                onFocus={(event) => event.currentTarget.select()}
                aria-label="Shareable link"
              />
            </label>
            <button className="button auth-button" onClick={copyShareLink}>
              Copy link <span>→</span>
            </button>
          </section>
        </div>
      )}
    </main>
  );
}
