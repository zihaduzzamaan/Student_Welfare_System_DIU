/* ============================================
   CreateAnnouncement Page (Rep/Admin)
   DIU Student Welfare System
   ============================================ */

import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeftIcon,
  PaperAirplaneIcon,
  ExclamationCircleIcon,
  BookmarkIcon,
  DocumentTextIcon,
  WrenchScrewdriverIcon,
  UserGroupIcon,
  TrophyIcon,
  AcademicCapIcon,
  BriefcaseIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../../hooks/useAuth';
import { useAnnouncements } from '../../hooks/useAnnouncements';
import { ANNOUNCEMENT_CATEGORIES } from '../../utils/constants';
import type { AnnouncementCategory } from '../../types';
import styles from './CreateAnnouncement.module.css';

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'exam-notice': <DocumentTextIcon style={{ width: 16, height: 16 }} />,
  'workshop': <WrenchScrewdriverIcon style={{ width: 16, height: 16 }} />,
  'seminar': <UserGroupIcon style={{ width: 16, height: 16 }} />,
  'competition': <TrophyIcon style={{ width: 16, height: 16 }} />,
  'scholarship': <AcademicCapIcon style={{ width: 16, height: 16 }} />,
  'internship': <BriefcaseIcon style={{ width: 16, height: 16 }} />,
};

export default function CreateAnnouncement() {
  const { user } = useAuth();
  const { createAnnouncement } = useAnnouncements();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<AnnouncementCategory>('exam-notice');
  const [content, setContent] = useState('');
  const [isPinned, setIsPinned] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Please enter a notice title.');
      return;
    }
    if (!content.trim()) {
      setError('Please write the announcement content.');
      return;
    }

    setIsSubmitting(true);

    if (user) {
      createAnnouncement(
        {
          title: title.trim(),
          category,
          content: content.trim(),
          isPinned,
        },
        user
      );
    }

    setIsSubmitting(false);
    navigate('/announcements');
  }

  return (
    <div className={styles.container}>
      {/* Navigation */}
      <div className={styles.headerNav}>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className={styles.backBtn}
        >
          <ArrowLeftIcon style={{ width: 16, height: 16 }} /> Back
        </button>
      </div>

      <div className={styles.titleGroup}>
        <h1 className={styles.title}>Post New Announcement</h1>
        <p className={styles.subtitle}>
          Publish official notices, competition calls, exam alerts, or workshop details for Software Engineering students.
        </p>
      </div>

      <div className={styles.formCard}>
        {error && (
          <div className={styles.errorMsg}>
            <ExclamationCircleIcon style={{ width: 16, height: 16 }} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Title */}
          <div className={styles.field}>
            <label htmlFor="ann-title" className={styles.label}>
              Announcement Title <span className={styles.required}>*</span>
            </label>
            <input
              id="ann-title"
              type="text"
              placeholder="e.g. Midterm Examination Schedule for Spring 2026"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={styles.input}
              maxLength={120}
              autoFocus
            />
          </div>

          {/* Category Picker */}
          <div className={styles.field}>
            <label className={styles.label}>Category</label>
            <div className={styles.categoryGrid}>
              {ANNOUNCEMENT_CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  className={`${styles.catCard} ${category === cat.value ? styles.activeCatCard : ''}`}
                  onClick={() => setCategory(cat.value as AnnouncementCategory)}
                >
                  <span className={styles.catIcon}>{CATEGORY_ICONS[cat.value]}</span>
                  <span className={styles.catLabel}>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className={styles.field}>
            <label htmlFor="ann-content" className={styles.label}>
              Content / Details <span className={styles.required}>*</span>
            </label>
            <textarea
              id="ann-content"
              rows={6}
              placeholder="Write the details of the notice, guidelines, venue, deadline, or registration links..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className={styles.textarea}
            />
          </div>

          {/* Pin Checkbox */}
          <div className={styles.checkboxField}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={isPinned}
                onChange={(e) => setIsPinned(e.target.checked)}
                className={styles.checkbox}
              />
              <span className={styles.checkboxText}>
                <BookmarkIcon style={{ width: 16, height: 16, display: 'inline', verticalAlign: 'middle' }} /> Pin this announcement to the top of the feed
              </span>
            </label>
          </div>

          {/* Footer Actions */}
          <div className={styles.formFooter}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={() => navigate('/announcements')}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className={styles.spinner} />
              ) : (
                <PaperAirplaneIcon style={{ width: 18, height: 18 }} />
              )}
              {isSubmitting ? 'Publishing...' : 'Publish Announcement'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
