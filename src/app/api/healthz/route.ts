import { NextResponse } from "next/server";
import { getPaste } from "@/lib/store";

export async function GET() {
  try {
    getPaste("__healthcheck__");
    return NextResponse.json({ status: "ok" });
  } catch {
    return NextResponse.json(
      { status: "error" },
      { status: 500 }
    );
  }
}
