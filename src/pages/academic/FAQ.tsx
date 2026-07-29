/* ============================================
   FAQ Page — Top 50 Questions
   DIU Student Welfare System
   ============================================ */

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import {
  QuestionMarkCircleIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline';
import { mockFAQ } from '../../data/mockFAQ';
import { FAQAccordion } from '../../components/shared/FAQAccordion';
import { TICKET_CATEGORIES } from '../../utils/constants';
import styles from './FAQ.module.css';

export default function FAQ() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialQuery = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Sync state if URL search query changes
  useEffect(() => {
    const q = searchParams.get('q');
    if (q !== null) {
      setSearchQuery(q);
    }
  }, [searchParams]);

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setSearchQuery(val);

    if (val.trim()) {
      setSearchParams({ q: val }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  }

  function handleClearSearch() {
    setSearchQuery('');
    setSearchParams({}, { replace: true });
  }

  // Filter FAQ items
  const filteredFAQ = useMemo(() => {
    return mockFAQ.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q);

      return matchesCategory && matchesQuery;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className={styles.container}>
      {/* Navigation & Header */}
      <div className={styles.headerNav}>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className={styles.backBtn}
        >
          <ArrowLeftIcon style={{ width: 16, height: 16 }} />
          Back
        </button>
      </div>

      <div className={styles.titleGroup}>
        <h1 className={styles.title}>Top 50 Frequently Asked Questions</h1>
        <p className={styles.subtitle}>
          Instant answers to common student inquiries regarding BLC, Student Portal, Exam rules, Registration clearance, Transcripts, and Welfare.
        </p>
      </div>

      {/* Search & Category Filter Section */}
      <div className={styles.filterSection}>
        <div className={styles.searchBox}>
          <MagnifyingGlassIcon style={{ width: 18, height: 18 }} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search 50 FAQs by keyword (e.g. overlap exam, BLC reset, transcript)..."
            value={searchQuery}
            onChange={handleSearchChange}
            className={styles.searchInput}
          />
          {searchQuery && (
            <button
              type="button"
              className={styles.clearBtn}
              onClick={handleClearSearch}
              aria-label="Clear search"
            >
              <XMarkIcon style={{ width: 16, height: 16 }} />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className={styles.categoryPills}>
          <button
            type="button"
            className={`${styles.pill} ${selectedCategory === 'all' ? styles.activePill : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            All Questions ({mockFAQ.length})
          </button>
          {TICKET_CATEGORIES.map((cat) => {
            const count = mockFAQ.filter((f) => f.category === cat.value).length;
            return (
              <button
                key={cat.value}
                type="button"
                className={`${styles.pill} ${selectedCategory === cat.value ? styles.activePill : ''}`}
                onClick={() => setSelectedCategory(cat.value)}
              >
                {cat.label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* FAQ Accordions List */}
      <div className={styles.faqList}>
        {filteredFAQ.length > 0 ? (
          filteredFAQ.map((item) => (
            <FAQAccordion key={item.id} item={item} />
          ))
        ) : (
          <div className={styles.emptyState}>
            <QuestionMarkCircleIcon style={{ width: 48, height: 48 }} className={styles.emptyIcon} />
            <h3 className={styles.emptyTitle}>No matching questions found</h3>
            <p className={styles.emptyText}>
              We couldn't find any FAQ matching "{searchQuery}". Try using different keywords or submit a ticket directly to the Welfare team.
            </p>
            <Link to="/helpdesk/submit" className={styles.submitTicketBtn}>
              <QuestionMarkCircleIcon style={{ width: 18, height: 18 }} /> Submit Support Ticket
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
