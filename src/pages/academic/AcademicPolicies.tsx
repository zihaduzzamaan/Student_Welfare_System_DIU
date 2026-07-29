/* ============================================
   AcademicPolicies Page — Academic Info Center
   DIU Student Welfare System
   ============================================ */

import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeftIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  QuestionMarkCircleIcon,
  ClockIcon,
  HeartIcon,
  ShieldExclamationIcon,
  DocumentTextIcon,
  Squares2X2Icon,
  BookOpenIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline';
import { mockAcademicPolicies } from '../../data/mockGuides';
import styles from './AcademicPolicies.module.css';

/* ── Heroicon Map for Dynamic Icon Resolver ── */
const POLICY_ICONS: Record<string, React.ReactNode> = {
  Clock: <ClockIcon style={{ width: 22, height: 22 }} />,
  Activity: <HeartIcon style={{ width: 22, height: 22 }} />,
  ShieldAlert: <ShieldExclamationIcon style={{ width: 22, height: 22 }} />,
  FileText: <DocumentTextIcon style={{ width: 22, height: 22 }} />,
  Layers: <Squares2X2Icon style={{ width: 22, height: 22 }} />,
  BookOpen: <BookOpenIcon style={{ width: 22, height: 22 }} />,
  AcademicCap: <AcademicCapIcon style={{ width: 22, height: 22 }} />,
};

export default function AcademicPolicies() {
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
        <h1 className={styles.title}>Academic Rules & Regulations</h1>
        <p className={styles.subtitle}>
          Official university regulations regarding overlap examinations, medical leaves, semester drops, course retakes, and improvement exams.
        </p>
      </div>

      {/* Policy Feed */}
      <div className={styles.policyList}>
        {mockAcademicPolicies.map((policy) => {
          const iconElement = POLICY_ICONS[policy.icon] ?? (
            <DocumentTextIcon style={{ width: 22, height: 22 }} />
          );

          return (
            <article key={policy.id} id={policy.id} className={styles.policyCard}>
              {/* Card Header */}
              <div className={styles.cardHeader}>
                <div className={styles.headerLeft}>
                  <div className={styles.iconWrapper}>{iconElement}</div>
                  <h2 className={styles.policyTitle}>{policy.title}</h2>
                </div>
                <span className={styles.categoryBadge}>{policy.category}</span>
              </div>

              {/* Summary Callout */}
              <p className={styles.summaryText}>{policy.summary}</p>

              {/* Rules & Application Steps */}
              <div className={styles.stepsSection}>
                <h3 className={styles.stepsTitle}>
                  <ShieldCheckIcon style={{ width: 18, height: 18 }} /> Rules & Application Steps
                </h3>
                <ol className={styles.stepsList}>
                  {policy.stepsOrRules.map((step: string, idx: number) => (
                    <li key={idx} className={styles.stepItem}>
                      <span className={styles.stepNumber}>{idx + 1}</span>
                      <span className={styles.stepText}>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Important Requirements Box */}
              {policy.importantNotes && (
                <div className={styles.notesBox}>
                  <div className={styles.notesHeader}>
                    <ExclamationTriangleIcon style={{ width: 16, height: 16 }} /> Important Requirements
                  </div>
                  <p className={styles.notesContent}>{policy.importantNotes}</p>
                </div>
              )}
            </article>
          );
        })}
      </div>

      {/* Support Banner */}
      <div className={styles.supportBanner}>
        <div className={styles.bannerContent}>
          <h3 className={styles.bannerTitle}>Have a special academic query?</h3>
          <p className={styles.bannerDesc}>
            If you need assistance regarding specialized cases or advisor clearance, submit a ticket to the Student Welfare team.
          </p>
        </div>
        <Link to="/helpdesk/submit" className={styles.submitTicketBtn}>
          <QuestionMarkCircleIcon style={{ width: 18, height: 18 }} /> Submit Ticket
        </Link>
      </div>
    </div>
  );
}
