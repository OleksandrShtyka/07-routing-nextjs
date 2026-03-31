'use client';

import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { useParams } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
import { fetchNotes } from '@/lib/api';
import css from './NotesPage.module.css';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import NoteList from '@/components/NoteList/NoteList';

export default function NotesClient() {
  const params = useParams();
  const tagParam = (params.slug as string[])?.[0];
  const activeTag = tagParam === 'all' ? undefined : tagParam;

  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [debouncedSearch] = useDebounce(searchQuery, 500);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['notes', page, debouncedSearch, activeTag],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: 12,
        search: debouncedSearch,
        tag: activeTag,
      }),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const handleSearchChange = (value: string): void => {
    setSearchQuery(value);
    setPage(1);
  };

  const handlePageChange = (newPage: number): void => {
    setPage(newPage);
  };

  const handleNoteCreated = (): void => {
    setIsModalOpen(false);
    setPage(1);
  };

  const notes = data?.notes || [];
  const totalPages = data?.totalPages || 0;

  return (
    <>
      <div className={css.app}>
        <Toaster position="top-center" />

        <header className={css.toolbar}>
          <SearchBox value={searchQuery} onChange={handleSearchChange} />

          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={page}
              onPageChange={handlePageChange}
            />
          )}

          <button
            type="button"
            className={css.button}
            onClick={() => setIsModalOpen(true)}
          >
            Create note +
          </button>
        </header>

        {isLoading && <p>Loading, please wait...</p>}
        {isError && error && (
          <p>Could not fetch the list of notes. {error.message}</p>
        )}

        {!isLoading && !isError && notes.length > 0 && (
          <NoteList notes={notes} />
        )}

        {!isLoading && !isError && notes.length === 0 && (
          <p className={css.emptyMessage}>
            {searchQuery ? 'No notes found for your search' : null}
          </p>
        )}

        {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)}>
            <NoteForm
              onSuccess={handleNoteCreated}
              onCancel={() => setIsModalOpen(false)}
            />
          </Modal>
        )}
      </div>
    </>
  );
}
