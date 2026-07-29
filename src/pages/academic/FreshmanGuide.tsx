/* ============================================
   FreshmanGuide Page — Academic Info Center
   DIU Student Welfare System
   ============================================ */

import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeftIcon,
  ExclamationCircleIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';
import { mockFreshmanGuides } from '../../data/mockGuides';
import styles from './FreshmanGuide.module.css';

export default function FreshmanGuide() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      {/* Header & Navigation */}
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
        <h1 className={styles.title}>Freshman Onboarding Guides</h1>
        <p className={styles.subtitle}>
          Step-by-step walkthroughs to help newly admitted Software Engineering students quickly set up BLC, Portal accounts, course registration, and exam clearance.
        </p>
      </div>

      {/* Guide Cards */}
      <div className={styles.guideList}>
        {mockFreshmanGuides.map((guide) => (
          <article key={guide.id} id={guide.id} className={styles.guideCard}>
            <div className={styles.guideHeader}>
              <div className={styles.guideIconWrapper}>
                <span>{guide.icon}</span>
              </div>
              <div className={styles.guideTitleGroup}>
                <h2 className={styles.guideTitle}>{guide.title}</h2>
                <span className={styles.categoryBadge}>{guide.category}</span>
              </div>
            </div>

            <p className={styles.guideSummary}>{guide.summary}</p>

            <div className={styles.stepsSection}>
              <h3 className={styles.stepsTitle}>Step-by-step Setup:</h3>
              <ol className={styles.stepsList}>
                {guide.stepsOrRules.map((step: string, idx: number) => (
                  <li key={idx} className={styles.stepItem}>
                    <span className={styles.stepNumber}>{idx + 1}</span>
                    <span className={styles.stepText}>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {guide.importantNotes && (
              <div className={styles.notesBox}>
                <div className={styles.notesTitle}>
                  <ExclamationCircleIcon style={{ width: 16, height: 16 }} /> Important Notes & Common Pitfalls
                </div>
                <p className={styles.notesList}>{guide.importantNotes}</p>
              </div>
            )}
          </article>
        ))}
      </div>

      {/* Still need help banner */}
      <div className={styles.supportBanner}>
        <div className={styles.bannerContent}>
          <h3 className={styles.bannerTitle}>Need personalized onboarding support?</h3>
          <p className={styles.bannerDesc}>
            Our Student Welfare Representatives are available to guide you through login issues, account locks, or course registration.
          </p>
        </div>
        <Link to="/helpdesk/submit" className={styles.submitTicketBtn}>
          <QuestionMarkCircleIcon style={{ width: 18, height: 18 }} /> Submit Ticket
        </Link>
      </div>
    </div>
  );
}
