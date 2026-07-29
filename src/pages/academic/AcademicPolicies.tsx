/* ============================================
   AcademicPolicies Page — Academic Info Center
   DIU Student Welfare System
   ============================================ */

import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeftIcon,
  ShieldCheckIcon,
  ExclamationCircleIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';
import { mockAcademicPolicies } from '../../data/mockGuides';
import styles from './AcademicPolicies.module.css';

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
          Official regulations regarding overlap examinations, medical leaves, semester drops, course retakes, and improvement exams.
        </p>
      </div>

      {/* Policy Accordions / Content */}
      <div className={styles.policyList}>
        {mockAcademicPolicies.map((policy) => (
          <article key={policy.id} id={policy.id} className={styles.policyCard}>
            <div className={styles.policyHeader}>
              <div className={styles.policyIconWrapper}>
                <span>{policy.icon}</span>
              </div>
              <div className={styles.policyTitleGroup}>
                <h2 className={styles.policyTitle}>{policy.title}</h2>
                <span className={styles.categoryBadge}>{policy.category}</span>
              </div>
            </div>

            <p className={styles.policySummary}>{policy.summary}</p>

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

            {policy.importantNotes && (
              <div className={styles.notesBox}>
                <div className={styles.notesTitle}>
                  <ExclamationCircleIcon style={{ width: 16, height: 16 }} /> Important Requirements
                </div>
                <p className={styles.notesList}>{policy.importantNotes}</p>
              </div>
            )}
          </article>
        ))}
      </div>

      {/* Still have questions banner */}
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
