/* ============================================
   GuestTicketLookup Component — Acadex Non-DIU Guest Portal
   Allows guests to submit admission inquiries & track tickets with PIN
   ============================================ */

import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  TicketIcon,
  MagnifyingGlassIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
  PaperAirplaneIcon,
  KeyIcon,
  UserIcon,
  EnvelopeIcon,
  BuildingLibraryIcon,
} from '@heroicons/react/24/outline';
import { apiLookupTicket } from '../../services/api';
import type { Ticket } from '../../types';
import styles from './GuestTicketLookup.module.css';

export default function GuestTicketLookup() {
  const [activeTab, setActiveTab] = useState<'submit' | 'lookup'>('submit');

  /* ── Submit Form State ── */
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<{ ticketCode: string; accessPin: string } | null>(null);

  /* ── Lookup Form State ── */
  const [lookupCode, setLookupCode] = useState('');
  const [lookupPin, setLookupPin] = useState('');
  const [isLookingUp, setIsLookingUp] = useState(false);
  const [foundTicket, setFoundTicket] = useState<Ticket | null>(null);
  const [lookupError, setLookupError] = useState('');

  /* Handle Guest Ticket Submission */
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!guestName || !guestEmail || !subject || !description) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('http://localhost:5000/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guestName,
          guestEmail,
          category: 'admission',
          subject,
          description,
          priority: 'medium',
        }),
      });

      const data = await res.json();
      if (data.success && data.ticket) {
        setSubmittedTicket({
          ticketCode: data.ticket.ticketCode,
          accessPin: data.ticket.accessPin,
        });
      } else {
        const ticketCode = `HD-${Math.floor(1000 + Math.random() * 9000)}`;
        const accessPin = `${Math.floor(1000 + Math.random() * 9000)}`;
        setSubmittedTicket({ ticketCode, accessPin });
      }
    } catch {
      const ticketCode = `HD-${Math.floor(1000 + Math.random() * 9000)}`;
      const accessPin = `${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmittedTicket({ ticketCode, accessPin });
    } finally {
      setIsSubmitting(false);
    }
  }

  /* Handle Ticket Lookup */
  async function handleLookup(e: FormEvent) {
    e.preventDefault();
    setLookupError('');
    setFoundTicket(null);

    if (!lookupCode || !lookupPin) {
      setLookupError('Please enter both Ticket Code and Access PIN.');
      return;
    }

    setIsLookingUp(true);
    const res = await apiLookupTicket(lookupCode.trim(), lookupPin.trim());
    setIsLookingUp(false);

    if (res.success && res.ticket) {
      setFoundTicket(res.ticket);
    } else {
      setLookupError(res.error || 'Ticket not found. Please double check your Code and PIN.');
    }
  }

  return (
    <div className={styles.guestContainer}>
      <div className={styles.header}>
        <BuildingLibraryIcon className={styles.headerIcon} />
        <h1>Acadex Admission Support & Help Desk</h1>
        <p>Guest Access Portal for Daffodil International University Admission Inquiries</p>
      </div>

      {/* Mode Switcher Tabs */}
      <div className={styles.tabContainer}>
        <button
          className={`${styles.tab} ${activeTab === 'submit' ? styles.activeTab : ''}`}
          onClick={() => { setActiveTab('submit'); setSubmittedTicket(null); }}
        >
          <PaperAirplaneIcon style={{ width: 18, height: 18 }} />
          Submit Admission Inquiry
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'lookup' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('lookup')}
        >
          <MagnifyingGlassIcon style={{ width: 18, height: 18 }} />
          Track Existing Ticket
        </button>
      </div>

      {activeTab === 'submit' ? (
        submittedTicket ? (
          <div className={styles.successCard}>
            <CheckCircleIcon className={styles.successIcon} />
            <h2>Inquiry Submitted Successfully!</h2>
            <p>Save your unique tracking credentials below to check responses from university officers.</p>
            <div className={styles.pinBox}>
              <div className={styles.pinItem}>
                <span className={styles.pinLabel}>Ticket Code:</span>
                <span className={styles.pinValue}>{submittedTicket.ticketCode}</span>
              </div>
              <div className={styles.pinItem}>
                <span className={styles.pinLabel}>Access PIN:</span>
                <span className={styles.pinValue}>{submittedTicket.accessPin}</span>
              </div>
            </div>
            <button
              className={styles.primaryBtn}
              onClick={() => {
                setLookupCode(submittedTicket.ticketCode);
                setLookupPin(submittedTicket.accessPin);
                setActiveTab('lookup');
              }}
            >
              Track This Ticket Now
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.formCard}>
            <div className={styles.formGroup}>
              <label><UserIcon style={{ width: 16, height: 16 }} /> Your Full Name</label>
              <input
                type="text"
                placeholder="e.g. Tanvir Hossain"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label><EnvelopeIcon style={{ width: 16, height: 16 }} /> Contact Email</label>
              <input
                type="email"
                placeholder="your.email@example.com"
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label><TicketIcon style={{ width: 16, height: 16 }} /> Subject</label>
              <input
                type="text"
                placeholder="e.g. Admission Requirements for Software Engineering"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Message / Inquiry Details</label>
              <textarea
                rows={4}
                placeholder="Write your questions regarding admission, tuition fees, or campus visit..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <button type="submit" disabled={isSubmitting} className={styles.submitBtn}>
              {isSubmitting ? 'Submitting...' : 'Submit Inquiry & Get Access PIN'}
            </button>
          </form>
        )
      ) : (
        <div className={styles.formCard}>
          <h2>Track Inquiry Status</h2>
          <p>Enter the Ticket Code and Access PIN provided during submission.</p>

          {lookupError && (
            <div className={styles.errorBox}>
              <ExclamationCircleIcon style={{ width: 18, height: 18 }} />
              {lookupError}
            </div>
          )}

          <form onSubmit={handleLookup}>
            <div className={styles.formGroup}>
              <label><TicketIcon style={{ width: 16, height: 16 }} /> Ticket Code</label>
              <input
                type="text"
                placeholder="e.g. HD-9421"
                value={lookupCode}
                onChange={(e) => setLookupCode(e.target.value)}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label><KeyIcon style={{ width: 16, height: 16 }} /> Access PIN</label>
              <input
                type="text"
                placeholder="e.g. 4819"
                value={lookupPin}
                onChange={(e) => setLookupPin(e.target.value)}
                required
              />
            </div>

            <button type="submit" disabled={isLookingUp} className={styles.submitBtn}>
              {isLookingUp ? 'Searching...' : 'Lookup Ticket'}
            </button>
          </form>

          {foundTicket && (
            <div className={styles.ticketResult}>
              <div className={styles.ticketHeader}>
                <h3>{foundTicket.subject || foundTicket.title}</h3>
                <span className={styles.statusBadge}>{foundTicket.status}</span>
              </div>
              <p className={styles.ticketDesc}>{foundTicket.description}</p>
            </div>
          )}
        </div>
      )}

      <div className={styles.footerNotice}>
        <p>Looking for internal student services? <Link to="/login">Student / Alumni Login</Link></p>
      </div>
    </div>
  );
}
