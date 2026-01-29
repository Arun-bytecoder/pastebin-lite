import { NextResponse } from "next/server";
import { getPaste } from "@/lib/store";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const paste = getPaste(params.id);

  if (!paste) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  return NextResponse.json(paste);
}
