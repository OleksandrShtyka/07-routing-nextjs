import SidebarNotes from '@/components/SidebarNotes/SidebarNotes';

interface SidebarPageProps {
  params: Promise<{ tag: string[] }>;
}

export default async function SidebarPage({ params }: SidebarPageProps) {
  const { tag } = await params;
  const currentTag = tag?.[0];

  return <SidebarNotes currentTag={currentTag} />;
}
