"use client";

import { useState } from "react";

export default function Home() {
  const [content, setContent] = useState("");
  const [link, setLink] = useState("");

  async function createPaste() {
    const res = await fetch("/api/pastes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    
    if (!res.ok) {
      throw new Error("Paste creation failed");
    }
    
    const text = await res.text();
    const data = text ? JSON.parse(text) : null;
    if (data?.url) {
      setLink(data.url);
    }
  }

  return (
  <main className="container">
    <h1 className="title">Pastebin Lite</h1>

    <div className="card">
      <textarea
        className="textarea"
        placeholder="Paste your text here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={10}
      />

      <button className="btn" onClick={createPaste}>
        Create Paste
      </button>

      {link && (
        <div className="share-box">
          <strong>Share link:</strong>
          <a href={link} target="_blank">{link}</a>
        </div>
      )}
    </div>
  </main>
);
}