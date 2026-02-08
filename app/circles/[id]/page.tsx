import CircleDetailPage from "./client";

export function generateStaticParams() {
  return ["family","close_friends","work_friends","new_contacts","acquaintances"].map(id => ({ id }));
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return <CircleDetailPage params={params} />;
}
