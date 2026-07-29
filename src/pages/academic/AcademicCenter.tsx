/* ============================================
   AcademicCenter Page — Academic Info Center
   DIU Student Welfare System
   ============================================ */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AcademicCapIcon,
  DocumentTextIcon,
  MagnifyingGlassIcon,
  ArrowRightIcon,
  QuestionMarkCircleIcon,
  BookOpenIcon,
  CreditCardIcon,
  ShieldCheckIcon,
  CalendarIcon,
  ComputerDesktopIcon,
} from '@heroicons/react/24/outline';
import { mockFreshmanGuides, mockAcademicPolicies } from '../../data/mockGuides';
import { mockFAQ } from '../../data/mockFAQ';
import { FAQAccordion } from '../../components/shared/FAQAccordion';
import styles from './AcademicCenter.module.css';

const GUIDE_ICONS: Record<string, React.ElementType> = {
  Layout: ComputerDesktopIcon,
  BookOpen: BookOpenIcon,
  CreditCard: CreditCardIcon,
  ShieldAlert: ShieldCheckIcon,
  Calendar: CalendarIcon,
};

export default function AcademicCenter() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/academic/faq?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  }

  // Preview top 4 most viewed FAQs
  const topFAQPreview = mockFAQ.slice(0, 4);

  return (
    <div className={styles.container}>
      {/* Hero Banner */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <AcademicCapIcon style={{ width: 14, height: 14 }} /> Academic Knowledge Base
          </div>
          <h1 className={styles.heroTitle}>Academic Information Center</h1>
          <p className={styles.heroSubtitle}>
            Step-by-step guides, university policies, exam procedures, and quick answers for SWE students.
          </p>

          <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
            <div className={styles.searchBox}>
              <MagnifyingGlassIcon style={{ width: 20, height: 20 }} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search academic procedures, exam rules, or BLC guides..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
              <button type="submit" className={styles.searchBtn}>
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Main Grid — Freshman Guide & Academic Policies */}
      <div className={styles.mainGrid}>
        {/* Freshman Guide Section */}
        <section className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <div className={styles.iconCirclePrimary}>
              <AcademicCapIcon style={{ width: 24, height: 24 }} />
            </div>
            <div>
              <h2 className={styles.sectionTitle}>Freshman Onboarding Guides</h2>
              <p className={styles.sectionDesc}>Essential setup procedures for new students</p>
            </div>
          </div>

          <div className={styles.guidesList}>
            {mockFreshmanGuides.map((guide) => {
              const IconComp = GUIDE_ICONS[guide.icon] || BookOpenIcon;
              return (
                <Link
                  key={guide.id}
                  to={`/academic/freshman-guide?id=${guide.id}`}
                  className={styles.guideItem}
                >
                  <div className={styles.guideIconWrapper}>
                    <IconComp style={{ width: 20, height: 20 }} />
                  </div>
                  <div className={styles.guideInfo}>
                    <h3 className={styles.guideTitle}>{guide.title}</h3>
                    <p className={styles.guideDesc}>{guide.summary}</p>
                  </div>
                  <ArrowRightIcon style={{ width: 16, height: 16 }} className={styles.arrowIcon} />
                </Link>
              );
            })}
          </div>

          <div className={styles.sectionFooter}>
            <Link to="/academic/freshman-guide" className={styles.viewAllLink}>
              View All Guides ({mockFreshmanGuides.length}) <ArrowRightIcon style={{ width: 14, height: 14 }} />
            </Link>
          </div>
        </section>

        {/* Academic Policies Section */}
        <section className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <div className={styles.iconCircleAccent}>
              <DocumentTextIcon style={{ width: 24, height: 24 }} />
            </div>
            <div>
              <h2 className={styles.sectionTitle}>Academic Rules & Policies</h2>
              <p className={styles.sectionDesc}>Official regulations for exams, drops, and retakes</p>
            </div>
          </div>

          <div className={styles.guidesList}>
            {mockAcademicPolicies.map((policy) => {
              const IconComp = GUIDE_ICONS[policy.icon] || DocumentTextIcon;
              return (
                <Link
                  key={policy.id}
                  to={`/academic/policies?id=${policy.id}`}
                  className={styles.guideItem}
                >
                  <div className={styles.guideIconWrapper}>
                    <IconComp style={{ width: 20, height: 20 }} />
                  </div>
                  <div className={styles.guideInfo}>
                    <h3 className={styles.guideTitle}>{policy.title}</h3>
                    <p className={styles.guideDesc}>{policy.summary}</p>
                  </div>
                  <ArrowRightIcon style={{ width: 16, height: 16 }} className={styles.arrowIcon} />
                </Link>
              );
            })}
          </div>

          <div className={styles.sectionFooter}>
            <Link to="/academic/policies" className={styles.viewAllLink}>
              Read All Regulations ({mockAcademicPolicies.length}) <ArrowRightIcon style={{ width: 14, height: 14 }} />
            </Link>
          </div>
        </section>
      </div>

      {/* Top FAQs Section */}
      <section className={styles.faqSection}>
        <div className={styles.faqSectionHeader}>
          <div className={styles.faqTitleGroup}>
            <div className={styles.iconCirclePrimary}>
              <QuestionMarkCircleIcon style={{ width: 24, height: 24 }} />
            </div>
            <div>
              <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
              <p className={styles.sectionDesc}>Quick answers to common student inquiries</p>
            </div>
          </div>
          <Link to="/academic/faq" className={styles.primaryBtn}>
            View Top 50 FAQs <ArrowRightIcon style={{ width: 16, height: 16 }} />
          </Link>
        </div>

        <div className={styles.faqPreviewGrid}>
          {topFAQPreview.map((item) => (
            <FAQAccordion key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
