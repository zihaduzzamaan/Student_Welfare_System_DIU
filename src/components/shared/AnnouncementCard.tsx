/* ============================================
   AnnouncementCard — Shared Component
   DIU Student Welfare System
   ============================================ */

import { BookmarkIcon, TrashIcon, CalendarIcon, UserIcon } from '@heroicons/react/24/outline';
import { ANNOUNCEMENT_CATEGORIES } from '../../utils/constants';
import { formatDate } from '../../utils/helpers';
import { getCategoryIcon } from '../../utils/categoryIcons';
import type { Announcement, UserRole } from '../../types';
import styles from './AnnouncementCard.module.css';

interface AnnouncementCardProps {
  announcement: Announcement;
  userRole?: UserRole;
  onTogglePin?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function AnnouncementCard({
  announcement,
  userRole = 'student',
  onTogglePin,
  onDelete,
}: AnnouncementCardProps) {
  const catConfig = ANNOUNCEMENT_CATEGORIES.find((c) => c.value === announcement.category) || {
    label: announcement.category,
  };

  const isStaff = userRole === 'representative' || userRole === 'admin';

  return (
    <article className={`${styles.card} ${announcement.isPinned ? styles.pinnedCard : ''}`}>
      <div className={styles.topBar}>
        <span className={styles.categoryBadge}>
          {getCategoryIcon(announcement.category, 14)}
          <span>{catConfig.label}</span>
        </span>

        {announcement.isPinned && (
          <span className={styles.pinnedBadge}>
            <BookmarkIcon style={{ width: 12, height: 12 }} /> Pinned
          </span>
        )}

        {isStaff && (
          <div className={styles.staffControls}>
            <button
              type="button"
              className={`${styles.iconBtn} ${announcement.isPinned ? styles.activePin : ''}`}
              onClick={() => onTogglePin?.(announcement.id)}
              title={announcement.isPinned ? 'Unpin notice' : 'Pin notice to top'}
              aria-label={announcement.isPinned ? 'Unpin notice' : 'Pin notice to top'}
            >
              <BookmarkIcon style={{ width: 14, height: 14 }} />
            </button>
            <button
              type="button"
              className={`${styles.iconBtn} ${styles.deleteBtn}`}
              onClick={() => onDelete?.(announcement.id)}
              title="Delete notice"
              aria-label="Delete notice"
            >
              <TrashIcon style={{ width: 14, height: 14 }} />
            </button>
          </div>
        )}
      </div>

      <h3 className={styles.title}>{announcement.title}</h3>
      <p className={styles.content}>{announcement.content}</p>

      <div className={styles.footerMeta}>
        <span className={styles.author}>
          <UserIcon style={{ width: 14, height: 14 }} />
          {announcement.authorName}
        </span>
        <span className={styles.date}>
          <CalendarIcon style={{ width: 14, height: 14 }} />
          {formatDate(announcement.createdAt)}
        </span>
      </div>
    </article>
  );
}
