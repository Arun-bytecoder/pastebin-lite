import { NextResponse } from "next/server";
import crypto from "crypto";
import { createPaste } from "@/lib/store";
import { now } from "@/lib/time";

export async function POST(req: Request) {
  const body = await req.json();
  const { content, ttl_seconds, max_views } = body;

  if (!content || typeof content !== "string") {
    return NextResponse.json(
      { error: "content required" },
      { status: 400 }
    );
  }

  const currentTime = now(req);

  const expiresAt =
    typeof ttl_seconds === "number"
      ? currentTime + ttl_seconds * 1000
      : null;

  const maxViews =
    typeof max_views === "number" ? max_views : null;

  const id = crypto.randomBytes(4).toString("hex");

  createPaste({
    id,
    content,
    createdAt: currentTime,
    expiresAt,
    maxViews,
  });

  return NextResponse.json({
    id,
    url: `/p/${id}`,
  });
}
