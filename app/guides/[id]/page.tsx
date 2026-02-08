import GuideDetailPage from "./client";

export function generateStaticParams() {
  return ["guide_1","guide_2"].map(id => ({ id }));
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return <GuideDetailPage params={params} />;
}
