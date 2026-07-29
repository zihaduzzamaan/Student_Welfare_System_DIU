/* ============================================
   RequestCounselling Page — Student Counselling Module
   DIU Student Welfare System
   ============================================ */

import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeftIcon,
  CalendarIcon,
  ClockIcon,
  PaperAirplaneIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
  SparklesIcon,
  UserIcon,
  AcademicCapIcon,
  BookOpenIcon,
  BriefcaseIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../../hooks/useAuth';
import { useCounselling } from '../../hooks/useCounselling';
import { COUNSELLING_TYPES, COUNSELLING_STATUS_CONFIG } from '../../utils/constants';
import { formatDate } from '../../utils/helpers';
import type { CounsellingType } from '../../types';
import styles from './RequestCounselling.module.css';

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  admission: AcademicCapIcon,
  academic: BookOpenIcon,
  research: SparklesIcon,
  career: BriefcaseIcon,
};

export default function RequestCounselling() {
  const { user } = useAuth();
  const { requests, createRequest } = useCounselling();
  const navigate = useNavigate();

  const [type, setType] = useState<CounsellingType>('academic');
  const [description, setDescription] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // My submitted requests history
  const myRequests = requests.filter((r) => r.studentId === user?.id);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!description.trim()) {
      setError('Please describe your counselling request or topic.');
      return;
    }
    if (description.trim().length < 15) {
      setError('Description is too short. Please provide at least 15 characters to explain your request.');
      return;
    }

    setIsSubmitting(true);

    if (user) {
      createRequest(
        {
          type,
          description: description.trim(),
          preferredDate,
          preferredTime,
        },
        user
      );
    }

    setIsSubmitting(false);
    setSuccessMsg('Your counselling session request has been successfully submitted! A representative will contact you soon.');
    setDescription('');
    setPreferredDate('');
    setPreferredTime('');
  }

  return (
    <div className={styles.container}>
      {/* Header & Nav */}
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
        <h1 className={styles.title}>Request 1-on-1 Counselling</h1>
        <p className={styles.subtitle}>
          Schedule an academic, career, research, or admission counselling session with faculty members and Student Welfare representatives.
        </p>
      </div>

      {/* Main Layout Grid — Left Form + Right Sidebar */}
      <div className={styles.mainGrid}>
        {/* Booking Form Card */}
        <div className={styles.formCard}>
          <div className={styles.formHeader}>
            <div className={styles.iconCircle}>
              <UserIcon style={{ width: 24, height: 24 }} />
            </div>
            <div>
              <h2 className={styles.cardTitle}>Book Session</h2>
              <p className={styles.cardDesc}>Select a category and specify your availability</p>
            </div>
          </div>

          {/* Success Banner */}
          {successMsg && (
            <div className={styles.successAlert}>
              <CheckCircleIcon style={{ width: 20, height: 20 }} />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Error Banner */}
          {error && (
            <div className={styles.errorAlert}>
              <ExclamationCircleIcon style={{ width: 20, height: 20 }} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Counselling Type Selection Grid */}
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Select Counselling Type</label>
              <div className={styles.typeGrid}>
                {COUNSELLING_TYPES.map((t) => {
                  const IconComponent = CATEGORY_ICONS[t.value] || AcademicCapIcon;
                  const isSelected = type === t.value;

                  return (
                    <button
                      key={t.value}
                      type="button"
                      className={`${styles.typeCard} ${isSelected ? styles.selectedTypeCard : ''}`}
                      onClick={() => setType(t.value as CounsellingType)}
                    >
                      <div className={styles.typeCardTop}>
                        <div className={`${styles.typeIconBox} ${isSelected ? styles.selectedIconBox : ''}`}>
                          <IconComponent style={{ width: 20, height: 20 }} />
                        </div>
                        {isSelected && (
                          <CheckCircleIcon style={{ width: 18, height: 18 }} className={styles.typeCheck} />
                        )}
                      </div>
                      <div className={styles.typeContent}>
                        <h3 className={styles.typeLabel}>{t.label}</h3>
                        <p className={styles.typeDesc}>{t.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Description Textarea */}
            <div className={styles.fieldGroup}>
              <label htmlFor="counsell-desc" className={styles.label}>
                Topic / Concern Description <span className={styles.required}>*</span>
              </label>
              <textarea
                id="counsell-desc"
                rows={4}
                placeholder="Briefly describe what you would like to discuss (e.g., course improvement, internship advice, capstone thesis, admission query)..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={styles.textarea}
              />
              <span className={styles.hintText}>Provide at least 15 characters detailing your discussion topic.</span>
            </div>

            {/* Date & Time Row */}
            <div className={styles.rowFields}>
              <div className={styles.fieldGroup}>
                <label htmlFor="counsell-date" className={styles.label}>Preferred Date <span className={styles.optional}>(Optional)</span></label>
                <div className={styles.inputWrapper}>
                  <CalendarIcon style={{ width: 16, height: 16 }} className={styles.inputIcon} />
                  <input
                    id="counsell-date"
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor="counsell-time" className={styles.label}>Preferred Time <span className={styles.optional}>(Optional)</span></label>
                <div className={styles.inputWrapper}>
                  <ClockIcon style={{ width: 16, height: 16 }} className={styles.inputIcon} />
                  <input
                    id="counsell-time"
                    type="time"
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className={styles.input}
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
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
              {isSubmitting ? 'Submitting...' : 'Submit Counselling Request'}
            </button>
          </form>
        </div>

        {/* Sidebar Panel — Guidelines & Past Requests */}
        <div className={styles.sidebarPanel}>
          {/* Guidelines Card */}
          <div className={styles.infoCard}>
            <div className={styles.infoCardHeader}>
              <InformationCircleIcon style={{ width: 20, height: 20 }} className={styles.infoIcon} />
              <h3 className={styles.infoTitle}>Session Guidelines</h3>
            </div>
            <ul className={styles.infoList}>
              <li>
                <strong>1-on-1 Confidential Sessions:</strong> All discussions remain private between you and your appointed counsellor.
              </li>
              <li>
                <strong>Prompt Scheduling:</strong> An appointed SW Representative or faculty member will confirm your date within 24 hours.
              </li>
              <li>
                <strong>Location & Link:</strong> Virtual sessions will include a Meet link; walk-in sessions meet at Room 502, AB5.
              </li>
            </ul>
          </div>

          {/* History Card */}
          <div className={styles.historyCard}>
            <div className={styles.historyHeader}>
              <h3 className={styles.historyTitle}>My Session Requests ({myRequests.length})</h3>
            </div>

            {myRequests.length === 0 ? (
              <div className={styles.noHistory}>
                <SparklesIcon style={{ width: 28, height: 28 }} className={styles.sparkleIcon} />
                <p>You haven't submitted any counselling requests yet.</p>
              </div>
            ) : (
              <div className={styles.historyList}>
                {myRequests.map((req) => {
                  const statusConf = COUNSELLING_STATUS_CONFIG[req.status];
                  const typeLabel = COUNSELLING_TYPES.find((t) => t.value === req.type)?.label || req.type;

                  return (
                    <div key={req.id} className={styles.historyItem}>
                      <div className={styles.itemHeader}>
                        <span className={styles.itemType}>{typeLabel}</span>
                        <span
                          className={styles.itemStatus}
                          style={{
                            backgroundColor: `color-mix(in srgb, var(${statusConf.colorVar}) 12%, transparent)`,
                            color: `var(${statusConf.colorVar})`,
                          }}
                        >
                          {statusConf.label}
                        </span>
                      </div>

                      <p className={styles.itemDesc}>{req.description}</p>

                      <div className={styles.itemFooter}>
                        {req.assignedName && (
                          <span className={styles.itemStaff}>Staff: {req.assignedName}</span>
                        )}
                        <span className={styles.itemDate}>{formatDate(req.createdAt)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
