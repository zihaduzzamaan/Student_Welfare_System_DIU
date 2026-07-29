/* ============================================
   Announcements Page — Departmental Notices Feed
   DIU Student Welfare System
   ============================================ */

import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  MegaphoneIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../../hooks/useAuth';
import { useAnnouncements } from '../../hooks/useAnnouncements';
import { AnnouncementCard } from '../../components/shared/AnnouncementCard';
import { ANNOUNCEMENT_CATEGORIES } from '../../utils/constants';
import styles from './Announcements.module.css';

export default function Announcements() {
  const { user } = useAuth();
  const { announcements, togglePin, deleteAnnouncement } = useAnnouncements();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const isStaff = user?.role === 'representative' || user?.role === 'admin';

  // Filter & sort (pinned first)
  const filteredAnnouncements = useMemo(() => {
    return announcements
      .filter((item) => {
        const matchesCat =
          selectedCategory === 'all' || item.category === selectedCategory;

        const q = searchQuery.toLowerCase().trim();
        const matchesQ =
          !q ||
          item.title.toLowerCase().includes(q) ||
          item.content.toLowerCase().includes(q);

        return matchesCat && matchesQ;
      })
      .sort((a, b) => {
        // Pinned notices first
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [announcements, selectedCategory, searchQuery]);

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Announcements & Notices</h1>
          <p className={styles.subtitle}>
            Official departmental updates, exam schedules, workshops, competitions, and scholarship opportunities.
          </p>
        </div>

        {isStaff && (
          <Link to="/announcements/create" className={styles.postBtn}>
            <PlusIcon style={{ width: 18, height: 18 }} /> Post Announcement
          </Link>
        )}
      </div>

      {/* Filter & Search Bar */}
      <div className={styles.filterSection}>
        <div className={styles.categoryPills}>
          <button
            type="button"
            className={`${styles.pill} ${selectedCategory === 'all' ? styles.activePill : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            All Notices ({announcements.length})
          </button>
          {ANNOUNCEMENT_CATEGORIES.map((cat) => {
            const count = announcements.filter((a) => a.category === cat.value).length;
            return (
              <button
                key={cat.value}
                type="button"
                className={`${styles.pill} ${selectedCategory === cat.value ? styles.activePill : ''}`}
                onClick={() => setSelectedCategory(cat.value)}
              >
                {cat.emoji} {cat.label} ({count})
              </button>
            );
          })}
        </div>

        <div className={styles.searchBox}>
          <MagnifyingGlassIcon style={{ width: 16, height: 16 }} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search notices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          {searchQuery && (
            <button
              type="button"
              className={styles.clearBtn}
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
            >
              <XMarkIcon style={{ width: 14, height: 14 }} />
            </button>
          )}
        </div>
      </div>

      {/* Feed List */}
      <div className={styles.feedList}>
        {filteredAnnouncements.length > 0 ? (
          filteredAnnouncements.map((item) => (
            <AnnouncementCard
              key={item.id}
              announcement={item}
              userRole={user?.role ?? 'student'}
              onTogglePin={togglePin}
              onDelete={deleteAnnouncement}
            />
          ))
        ) : (
          <div className={styles.emptyState}>
            <MegaphoneIcon style={{ width: 48, height: 48 }} className={styles.emptyIcon} />
            <h3 className={styles.emptyTitle}>No notices found</h3>
            <p className={styles.emptyText}>
              There are currently no announcements matching your selected category or search term.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
