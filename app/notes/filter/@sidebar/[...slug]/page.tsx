import SidebarNotes from '@/components/SidebarNotes/SidebarNotes';

interface SidebarPageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function SidebarPage({ params }: SidebarPageProps) {
  const { slug } = await params;
  const currentTag = slug?.[0];

  return <SidebarNotes currentTag={currentTag} />;
}
