import { redirect } from "next/navigation";

/** A bare run URL lands on step 1. */
export default async function RunIndexPage({
  params,
}: {
  params: Promise<{ runId: string }>;
}) {
  const { runId } = await params;
  redirect(`/runs/${runId}/connect`);
}
