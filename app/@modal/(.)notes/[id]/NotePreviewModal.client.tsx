'use client';

import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal/Modal';
import NotePreview from '@/components/NotePreview/NotePreview';
import { Note } from '@/types/note';

interface NotePreviewModalProps {
  note: Note;
}

export default function NotePreviewModal({ note }: NotePreviewModalProps) {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return (
    <Modal onClose={handleClose}>
      <NotePreview note={note} onClose={handleClose} />
    </Modal>
  );
}
