import { fetchNoteById } from '@/lib/api';
import NotePreviewModal from './NotePreview.client';

interface NotePreviewPageProps {
  params: Promise<{ id: string }>;
}

export default async function NotePreviewPage({
  params,
}: NotePreviewPageProps) {
  const { id } = await params;
  const note = await fetchNoteById(id);

  return <NotePreviewModal note={note} />;
}
