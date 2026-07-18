"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { brainApi, ContentItem } from "@/lib/api";

export default function PublicItemPage() {
  const { shareId, id } = useParams<{ shareId: string; id: string }>();
  const [item, setItem] = useState<ContentItem>(); const [error, setError] = useState("");
  useEffect(() => { brainApi.publicBrain(shareId).then((items) => { const found = items.find((entry) => entry._id === id); if (!found) throw new Error("This shared item is unavailable."); setItem(found); }).catch((reason) => setError(reason instanceof Error ? reason.message : "This shared item is unavailable.")); }, [id, shareId]);
  if (!item && !error) return <main className="public-brain public-error"><p>Loading shared item…</p></main>;
  if (!item) return <main className="public-brain public-error"><Link className="brand" href="/">Brain Dock</Link><h1>Item unavailable</h1><p>{error}</p></main>;
  return <main className="public-brain public-item"><Link className="back-link" href={`/brain/${shareId}`}>← Back to shared Brain Dock</Link><p className="section-label">{item.link ? "LINK" : "NOTE"}</p><h1>{item.title}</h1>{item.content && <p className="detail-copy">{item.content}</p>}{item.link && <a className="detail-external" href={item.link} target="_blank" rel="noreferrer">Open original link ↗</a>}<div className="public-collections">{item.tags?.map((tag) => <span key={tag._id}>{tag.name || tag.title}</span>)}</div></main>;
}
