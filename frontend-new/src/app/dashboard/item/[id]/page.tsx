"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { brainApi, Category, ContentItem } from "@/lib/api";

export default function ItemPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [item, setItem] = useState<ContentItem>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    Promise.all([brainApi.contentDetail(id), brainApi.categories()])
      .then(([content, savedCategories]) => { setItem(content); setCategories(savedCategories); })
      .catch((error) => setMessage(error instanceof Error ? error.message : "Could not load this item."));
  }, [id]);
  async function copyLink() {
    try { await navigator.clipboard.writeText(window.location.href); setMessage("Link copied to clipboard."); }
    catch { setMessage("Copy the URL from your browser to share this item."); }
  }
  async function remove() {
    if (!window.confirm("Delete this saved item?")) return;
    try { await brainApi.deleteContent(id); router.push("/dashboard"); }
    catch (error) { setMessage(error instanceof Error ? error.message : "Could not delete this item."); }
  }
  if (!item && !message) return <main className="detail-page"><p>Loading item…</p></main>;
  if (!item) return <main className="detail-page"><Link className="back-link" href="/dashboard">← Back to dashboard</Link><h1>Item unavailable</h1><p>{message}</p></main>;
  const tags = item.tags?.map((tag) => tag.name || tag.title).filter(Boolean).join(", ") || "None";
  const itemCategoryId = typeof item.category === "string" ? item.category : item.category?._id;
  const categoryName = (typeof item.category === "object" ? item.category?.name : undefined) || categories.find((category) => category._id === itemCategoryId)?.name;
  return <main className="detail-page">
    <Link className="back-link" href="/dashboard">← Back to dashboard</Link>
    <div className="detail-actions"><button onClick={copyLink}>Copy link</button><button onClick={copyLink}>Share</button><button className="danger" onClick={remove}>Delete</button></div>
    {message && <div className="notice" role="status">{message}<button onClick={() => setMessage("")} aria-label="Dismiss message">×</button></div>}
    <p className="section-label">{item.link ? "LINK" : "NOTE"}{categoryName ? ` / ${categoryName}` : ""}</p>
    <h1>{item.title}</h1>
    {item.content && <p className="detail-copy">{item.content}</p>}
    {item.link && <a className="detail-external" href={item.link} target="_blank" rel="noreferrer">Open original link ↗</a>}
    <section className="detail-meta" aria-label="Item metadata"><div><small>CREATED</small><p>{item.createdAt ? new Date(item.createdAt).toLocaleString() : "Not available"}</p></div><div><small>LAST UPDATED</small><p>{item.updatedAt ? new Date(item.updatedAt).toLocaleString() : "Not available"}</p></div>{categoryName && <div><small>COLLECTION</small><p>{categoryName}</p></div>}<div><small>TAGS</small><p>{tags}</p></div>{item.userId?.username && <div><small>SAVED BY</small><p>{item.userId.username}</p></div>}{item.summary && <div><small>SUMMARY</small><p>{item.summary}</p></div>}</section>
  </main>;
}
