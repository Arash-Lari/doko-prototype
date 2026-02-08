import ContactDetailPage from "./client";

export function generateStaticParams() {
  return ["contact_sarah","contact_james","contact_chloe","contact_nadia","contact_sam","contact_jamie","contact_priya","contact_tom","contact_lena","contact_marco","contact_yuki","contact_ravi","contact_aisha","contact_ben"].map(id => ({ id }));
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return <ContactDetailPage params={params} />;
}
