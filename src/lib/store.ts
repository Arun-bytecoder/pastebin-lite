import Database from "better-sqlite3";
import path from "path";

const db = new Database(
  path.join(process.cwd(), "data", "pastes.db")
);

db.prepare(`
  CREATE TABLE IF NOT EXISTS pastes (
    id TEXT PRIMARY KEY,
    content TEXT NOT NULL,
    created_at INTEGER NOT NULL,
    expires_at INTEGER,
    max_views INTEGER,
    views_used INTEGER NOT NULL DEFAULT 0
  )
`).run();

export function createPaste({
  id,
  content,
  createdAt,
  expiresAt,
  maxViews,
}: {
  id: string;
  content: string;
  createdAt: number;
  expiresAt: number | null;
  maxViews: number | null;
}) {
  db.prepare(`
    INSERT INTO pastes 
    (id, content, created_at, expires_at, max_views, views_used)
    VALUES (?, ?, ?, ?, ?, 0)
  `).run(id, content, createdAt, expiresAt, maxViews);
}

export function getPaste(id: string) {
  return db.prepare(
    `SELECT * FROM pastes WHERE id = ?`
  ).get(id);
}

export function incrementViews(id: string) {
  db.prepare(
    `UPDATE pastes SET views_used = views_used + 1 WHERE id = ?`
  ).run(id);
}
