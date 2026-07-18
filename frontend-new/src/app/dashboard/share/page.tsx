"use client";

import Link from "next/link";
import { useState } from "react";
import { ApiError, brainApi } from "@/lib/api";

const storageKey = "brain-dock-share-link";

export default function ShareBrainPage() {
  const [link, setLink] = useState(() => typeof window === "undefined" ? "" : window.sessionStorage.getItem(storageKey) || "");
  const [scope, setScope] = useState("entire");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);
  async function setSharing(enabled: boolean) {
    setLoading(true);
    try {
      const result = await brainApi.share(enabled);
      if (!enabled) { window.sessionStorage.removeItem(storageKey); setLink(""); setNotice("Sharing disabled."); return; }
      const nextLink = result.shareLink || (result.hash ? `${window.location.origin}/brain/${result.hash}` : "");
      if (!nextLink) throw new Error("The server did not return a share link.");
      window.sessionStorage.setItem(storageKey, nextLink); setLink(nextLink); setNotice("Your Brain Dock is now public.");
    } catch (error) {
      if (enabled && error instanceof ApiError && error.data && typeof error.data === "object" && "hash" in error.data) { const nextLink = `${window.location.origin}/brain/${String(error.data.hash)}`; window.sessionStorage.setItem(storageKey, nextLink); setLink(nextLink); setNotice("Sharing is already enabled."); }
      else setNotice(error instanceof Error ? error.message : "Could not update sharing.");
    } finally { setLoading(false); }
  }
  async function copy() { try { await navigator.clipboard.writeText(link); setNotice("Share link copied to clipboard."); } catch { setNotice("Copy the link manually from the field below."); } }
  return <main className="share-page"><Link className="back-link" href="/dashboard">← Back to Brain Dock</Link><p className="section-label">SHARE BRAIN DOCK</p><h1>Share your <em>knowledge.</em></h1><p className="share-copy">Choose what people can view, then enable a secure public link. You can revoke it at any time.</p>{notice && <div className="notice toast" role="status">{notice}<button onClick={() => setNotice("")} aria-label="Dismiss message">×</button></div>}<section className="share-scope"><h2>What are you sharing?</h2><label className={scope === "entire" ? "scope-active" : ""}><input type="radio" name="scope" value="entire" checked={scope === "entire"} onChange={() => setScope("entire")} /><span><strong>Share entire Brain Dock</strong><small>All notes, links, collections, and tags are included.</small></span></label><label className="scope-unavailable"><input type="radio" disabled /><span><strong>Share selected collections</strong><small>Collection-level sharing needs backend support before it can be enabled.</small></span></label><label className="scope-unavailable"><input type="radio" disabled /><span><strong>Share individual items</strong><small>Item-level sharing needs backend support before it can be enabled.</small></span></label></section><section className="share-panel"><div><small>STATUS</small><strong>{link ? "Public" : "Private"}</strong><p>{link ? "Anyone with the link can view your entire Brain Dock." : "Your Brain Dock is only visible to you."}</p></div><button className="button" disabled={loading} onClick={() => setSharing(!link)}>{loading ? "Updating…" : link ? "Make private" : "Make public"}</button></section>{link && <section className="share-link-panel"><label>Generated public URL<input readOnly value={link} onFocus={(event) => event.currentTarget.select()} /></label><div><button className="button" onClick={copy}>Copy link <span>→</span></button><a className="open-link" href={link} target="_blank" rel="noreferrer">Open link ↗</a></div></section>}</main>;
}
