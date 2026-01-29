import { notFound } from "next/navigation";
import { getPaste, incrementViews } from "@/lib/store";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function PastePage({ params }: PageProps) {
  const { id } = await params;

 const paste = getPaste(params.id);

if (!paste) {
  return NextResponse.json(
    { error: "not found" },
    { status: 404 }
  );
}

  const now = Date.now();

  if (paste.expires_at && now > paste.expires_at) notFound();

  if (
    paste.max_views !== null &&
    paste.views_used >= paste.max_views
  ) notFound();

  incrementViews(id);

  return (
    <main>
      <pre>{paste.content}</pre>
    </main>
  );
}
