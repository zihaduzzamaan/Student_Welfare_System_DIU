/* ============================================
   FreshmanGuide Page — Academic Info Center
   DIU Student Welfare System
   ============================================ */

import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeftIcon,
  ExclamationCircleIcon,
  QuestionMarkCircleIcon,
  ComputerDesktopIcon,
  BookOpenIcon,
  CreditCardIcon,
  ShieldCheckIcon,
  ClipboardDocumentCheckIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline';
import { mockFreshmanGuides } from '../../data/mockGuides';
import styles from './FreshmanGuide.module.css';

/* ── Heroicon Map for Dynamic Icon Resolver ── */
const GUIDE_ICONS: Record<string, React.ReactNode> = {
  Layout: <ComputerDesktopIcon style={{ width: 22, height: 22 }} />,
  BookOpen: <BookOpenIcon style={{ width: 22, height: 22 }} />,
  CreditCard: <CreditCardIcon style={{ width: 22, height: 22 }} />,
  ShieldAlert: <ShieldCheckIcon style={{ width: 22, height: 22 }} />,
  CheckSquare: <ClipboardDocumentCheckIcon style={{ width: 22, height: 22 }} />,
  Award: <AcademicCapIcon style={{ width: 22, height: 22 }} />,
};

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
        {mockFreshmanGuides.map((guide) => {
          const iconElement = GUIDE_ICONS[guide.icon] ?? (
            <BookOpenIcon style={{ width: 22, height: 22 }} />
          );

          return (
            <article key={guide.id} id={guide.id} className={styles.guideCard}>
              {/* Card Header */}
              <div className={styles.cardHeader}>
                <div className={styles.headerLeft}>
                  <div className={styles.iconWrapper}>{iconElement}</div>
                  <h2 className={styles.guideTitle}>{guide.title}</h2>
                </div>
                <span className={styles.categoryBadge}>{guide.category}</span>
              </div>

              {/* Summary Paragraph */}
              <p className={styles.summaryText}>{guide.summary}</p>

              {/* Step-by-Step Setup */}
              <div className={styles.stepsSection}>
                <h3 className={styles.stepsTitle}>Step-by-step Setup</h3>
                <ol className={styles.stepsList}>
                  {guide.stepsOrRules.map((step: string, idx: number) => (
                    <li key={idx} className={styles.stepItem}>
                      <span className={styles.stepNumber}>{idx + 1}</span>
                      <span className={styles.stepText}>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Important Notes Box */}
              {guide.importantNotes && (
                <div className={styles.notesBox}>
                  <div className={styles.notesHeader}>
                    <ExclamationCircleIcon style={{ width: 16, height: 16 }} /> Important Notes & Common Pitfalls
                  </div>
                  <p className={styles.notesContent}>{guide.importantNotes}</p>
                </div>
              )}
            </article>
          );
        })}
      </div>

      {/* Support Banner */}
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
