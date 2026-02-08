import ChatPage from "./client";

export function generateStaticParams() {
  return ["conv_nadia","conv_sam","conv_jamie","conv_tom","conv_chloe","conv_squad","conv_design","conv_lisbon"].map(id => ({ id }));
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return <ChatPage params={params} />;
}
