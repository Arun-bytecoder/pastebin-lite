import { NextResponse } from "next/server";
import { getPaste, incrementViews } from "@/lib/store";
import { now } from "@/lib/time";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const paste = getPaste(params.id);
  if (!paste) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  const currentTime = now(req);

  if (paste.expires_at && currentTime > paste.expires_at) {
    return NextResponse.json({ error: "expired" }, { status: 404 });
  }

  if (
    paste.max_views !== null &&
    paste.views_used >= paste.max_views
  ) {
    return NextResponse.json({ error: "views exceeded" }, { status: 404 });
  }

  incrementViews(params.id);

  return NextResponse.json({
    content: paste.content,
    remaining_views:
      paste.max_views !== null
        ? paste.max_views - paste.views_used - 1
        : null,
    expires_at: paste.expires_at,
  });
}
