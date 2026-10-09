import { RequestDetailContent } from "@/components/organisms/RequestDetailContent";

export const instant = false;

export default async function RequestDetailPage({ params }: PageProps<"/request/[id]">) {
  const { id } = await params;
  return <RequestDetailContent id={id} />;
}
