/* ============================================
   SubmitTicket Page — Help Desk Module
   DIU Student Welfare System
   ============================================ */

import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  PaperAirplaneIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
  ExclamationCircleIcon,
  TagIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../../hooks/useAuth';
import { useTickets } from '../../hooks/useTickets';
import { TICKET_CATEGORIES } from '../../utils/constants';
import type { TicketCategory } from '../../types';
import styles from './SubmitTicket.module.css';

export default function SubmitTicket() {
  const { user } = useAuth();
  const { createTicket } = useTickets();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<TicketCategory>('academic');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicketId, setSubmittedTicketId] = useState<string | null>(null);
  const [error, setError] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Please enter a ticket subject / title.');
      return;
    }
    if (!description.trim()) {
      setError('Please describe your issue or inquiry in detail.');
      return;
    }
    if (description.trim().length < 15) {
      setError('Description is too short. Please provide at least 15 characters to describe your issue.');
      return;
    }

    if (!user) {
      setError('You must be logged in to submit a ticket.');
      return;
    }

    setIsSubmitting(true);

    const newTicket = createTicket(
      {
        title: title.trim(),
        category,
        description: description.trim(),
      },
      user
    );

    setIsSubmitting(false);
    setSubmittedTicketId(newTicket.id);
  }

  /* Success Confirmation Screen */
  if (submittedTicketId) {
    return (
      <div className={styles.container}>
        <div className={styles.successCard}>
          <div className={styles.successIcon}>
            <CheckCircleIcon style={{ width: 48, height: 48 }} />
          </div>
          <h2 className={styles.successTitle}>Ticket Submitted Successfully!</h2>
          <p className={styles.successMessage}>
            Your ticket tracking ID is <code className={styles.ticketIdCode}>{submittedTicketId}</code>. A Student Welfare Representative will review your issue and respond shortly.
          </p>

          <div className={styles.successActions}>
            <Link to="/helpdesk/my-tickets" className={styles.primaryActionBtn}>
              View My Tickets
            </Link>
            <button
              type="button"
              className={styles.secondaryActionBtn}
              onClick={() => {
                setSubmittedTicketId(null);
                setTitle('');
                setDescription('');
              }}
            >
              Submit Another Ticket
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header & Back Button */}
      <div className={styles.headerNav}>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className={styles.backBtn}
        >
          <ArrowLeftIcon style={{ width: 16, height: 16 }} /> Back
        </button>
      </div>

      <div className={styles.titleHeader}>
        <h1 className={styles.title}>Submit a Support Ticket</h1>
        <p className={styles.subtitle}>
          Have an issue with BLC, Student Portal, accounts, exam schedules, or transcripts? Select a category below and describe your concern.
        </p>
      </div>

      <div className={styles.mainGrid}>
        {/* Main Ticket Form Card */}
        <div className={styles.formCard}>
          {error && (
            <div className={styles.errorAlert}>
              <ExclamationCircleIcon style={{ width: 20, height: 20 }} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Category Picker */}
            <div className={styles.fieldGroup}>
              <label className={styles.label}>
                Select Category <span className={styles.required}>*</span>
              </label>
              <div className={styles.categoryPills}>
                {TICKET_CATEGORIES.map((cat) => {
                  const isSelected = category === cat.value;
                  return (
                    <button
                      key={cat.value}
                      type="button"
                      className={`${styles.categoryPill} ${isSelected ? styles.activePill : ''}`}
                      onClick={() => setCategory(cat.value as TicketCategory)}
                    >
                      <TagIcon style={{ width: 14, height: 14 }} />
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Ticket Subject */}
            <div className={styles.fieldGroup}>
              <label htmlFor="ticket-subject" className={styles.label}>
                Subject / Brief Title <span className={styles.required}>*</span>
              </label>
              <input
                id="ticket-subject"
                type="text"
                placeholder="e.g. BLC password reset request for Spring 2026 courses"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={styles.input}
                maxLength={120}
              />
            </div>

            {/* Description */}
            <div className={styles.fieldGroup}>
              <div className={styles.labelRow}>
                <label htmlFor="ticket-desc" className={styles.label}>
                  Detailed Description <span className={styles.required}>*</span>
                </label>
                <span className={styles.charCount}>{description.length} characters</span>
              </div>
              <textarea
                id="ticket-desc"
                rows={6}
                placeholder="Please provide details about your problem, student ID, course codes, or error messages encountered..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={styles.textarea}
              />
            </div>

            {/* Form Actions */}
            <div className={styles.formFooter}>
              <button
                type="button"
                className={styles.cancelBtn}
                onClick={() => navigate(-1)}
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
                {isSubmitting ? 'Submitting...' : 'Submit Ticket'}
              </button>
            </div>
          </form>
        </div>

        {/* Sidebar Tips Panel */}
        <div className={styles.sidebarPanel}>
          <div className={styles.infoCard}>
            <div className={styles.infoCardHeader}>
              <InformationCircleIcon style={{ width: 20, height: 20 }} className={styles.infoIcon} />
              <h3 className={styles.infoTitle}>Ticket Tips</h3>
            </div>
            <ul className={styles.infoList}>
              <li>
                <strong>Be Specific:</strong> Include relevant course codes, section numbers, or transaction IDs for faster resolution.
              </li>
              <li>
                <strong>Expected Turnaround:</strong> Most tickets are addressed within 24 to 48 hours by Student Welfare representatives.
              </li>
              <li>
                <strong>Urgent Matters:</strong> For physical campus emergencies, visit Room 502, AB5 directly during office hours.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
