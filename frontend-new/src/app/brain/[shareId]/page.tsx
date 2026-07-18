"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { brainApi, ContentItem } from "@/lib/api";

function Skeleton() { return <div className="public-grid" aria-label="Loading shared content">{Array.from({ length: 6 }, (_, index) => <div className="public-card skeleton" key={index} />)}</div>; }

export default function PublicBrainPage() {
  const { shareId } = useParams<{ shareId: string }>();
  const [items, setItems] = useState<ContentItem[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => { brainApi.publicBrain(shareId).then(setItems).catch((reason) => setError(reason instanceof Error ? reason.message : "This shared Brain Dock is unavailable.")).finally(() => setLoading(false)); }, [shareId]);
  const owner = items[0]?.userId?.username || items[0]?.userId?.email || "A Brain Dock member";
  const updatedAt = useMemo(() => items.reduce<string | undefined>((latest, item) => !latest || new Date(item.updatedAt || item.createdAt || 0) > new Date(latest) ? item.updatedAt || item.createdAt : latest, undefined), [items]);
  const collections = [...new Set(items.map((item) => typeof item.category === "string" ? "Uncategorized" : item.category?.name || "Uncategorized"))];
  if (loading) return <main className="public-brain"><header className="public-header"><Link className="brand" href="/"><i>✦</i> Brain Dock</Link></header><div className="public-intro"><span className="skeleton-line wide" /><span className="skeleton-line" /></div><Skeleton /></main>;
  if (error) return <main className="public-brain public-error"><Link className="brand" href="/"><i>✦</i> Brain Dock</Link><p className="section-label">SHARED BRAIN</p><h1>This share link is <em>not available.</em></h1><p>{error}</p><Link className="button" href="/">Visit Brain Dock <span>→</span></Link></main>;
  if (!items.length) return <main className="public-brain public-error"><Link className="brand" href="/"><i>✦</i> Brain Dock</Link><p className="section-label">SHARED BRAIN</p><h1>Nothing has been <em>shared yet.</em></h1><p>This Brain Dock does not have any shared content.</p></main>;
  return <main className="public-brain"><header className="public-header"><Link className="brand" href="/"><i>✦</i> Brain Dock</Link><span>Shared workspace</span></header><section className="public-intro"><p className="section-label">{owner.toUpperCase()}’S BRAIN DOCK</p><h1>A collection of <em>useful thoughts.</em></h1><p>Shared by {owner}{updatedAt ? ` · Updated ${new Date(updatedAt).toLocaleDateString()}` : ""}</p><div className="public-collections">{collections.map((name) => <span key={name}>{name}</span>)}</div></section><section className="public-content"><div className="content-head"><h2>Shared content</h2><span>{items.length} item{items.length === 1 ? "" : "s"}</span></div><div className="public-grid">{items.map((item) => <article className={`public-card ${item.content && item.content.length > 180 ? "public-card-tall" : ""}`} key={item._id}><Link href={`/brain/${shareId}/item/${item._id}`}><small>{item.link ? "↗ LINK" : "✎ NOTE"}</small><h3>{item.title}</h3>{item.content && <p>{item.content}</p>}<div>{item.tags?.map((tag) => <mark key={tag._id}>{tag.name || tag.title}</mark>)}</div></Link></article>)}</div></section></main>;
}
