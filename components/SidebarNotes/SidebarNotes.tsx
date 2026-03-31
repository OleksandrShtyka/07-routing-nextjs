import Link from 'next/link';
import css from './SidebarNotes.module.css';
import { NoteTag } from '@/types/note';

const TAGS: NoteTag[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

interface SidebarNotesProps {
  currentTag?: string;
}

export default function SidebarNotes({ currentTag }: SidebarNotesProps) {
  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <Link
          href="/notes/filter/all"
          className={css.menuLink}
          style={
            currentTag === 'all' || !currentTag
              ? { backgroundColor: '#444', color: '#ddd' }
              : undefined
          }
        >
          All notes
        </Link>
      </li>
      {TAGS.map(tag => (
        <li key={tag} className={css.menuItem}>
          <Link
            href={`/notes/filter/${tag}`}
            className={css.menuLink}
            style={
              currentTag === tag
                ? { backgroundColor: '#444', color: '#ddd' }
                : undefined
            }
          >
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}
