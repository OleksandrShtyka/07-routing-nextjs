import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api/notes';
import NotesClient from './NotesClient';

interface NotesPageProps {
  params: Promise<{ tag: string[] }>;
}

export default async function NotesPage({ params }: NotesPageProps) {
  const { tag } = await params;
  const currentTag = tag?.[0];
  const activeTag = currentTag === 'all' ? undefined : currentTag;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', activeTag],
    queryFn: () => fetchNotes({ page: 1, perPage: 12, search: '', tag: activeTag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
