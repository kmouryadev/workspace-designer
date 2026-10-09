import { RequestDetailContent } from "@/components/organisms/RequestDetailContent";

export default async function RequestDetailPage({ params }: PageProps<"/request/[id]">) {
  const { id } = await params;
  return <RequestDetailContent id={id} />;
}
