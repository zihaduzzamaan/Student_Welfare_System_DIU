/* ============================================
   ManageTickets Page — Help Desk Module (Rep/Admin)
   DIU Student Welfare System
   ============================================ */

import { useState, useMemo, type FormEvent } from 'react';
import {
  ClipboardDocumentCheckIcon,
  MagnifyingGlassIcon,
  ChatBubbleLeftEllipsisIcon,
  PaperAirplaneIcon,
  XMarkIcon,
  ClockIcon,
  UserIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../../hooks/useAuth';
import { useTickets } from '../../hooks/useTickets';
import { TicketCard } from '../../components/shared/TicketCard';
import { TICKET_STATUS_CONFIG, TICKET_CATEGORIES } from '../../utils/constants';
import { formatDateTime, slugToLabel } from '../../utils/helpers';
import type { Ticket, TicketStatus } from '../../types';
import styles from './ManageTickets.module.css';

export default function ManageTickets() {
  const { user } = useAuth();
  const { tickets, addReply, updateStatus } = useTickets();

  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTicket, setActiveTicket] = useState<Ticket | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter all tickets
  const filteredTickets = useMemo(() => {
    return tickets.filter((t) => {
      const matchesStatus = selectedStatus === 'all' || t.status === selectedStatus;
      const matchesCat = selectedCategory === 'all' || t.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesQ =
        !q ||
        t.title.toLowerCase().includes(q) ||
        t.studentName.toLowerCase().includes(q) ||
        t.id.toLowerCase().includes(q);

      return matchesStatus && matchesCat && matchesQ;
    });
  }, [tickets, selectedStatus, selectedCategory, searchQuery]);

  const openCount = tickets.filter((t) => t.status === 'open').length;
  const escalatedCount = tickets.filter((t) => t.status === 'escalated').length;

  function handleSendReply(e: FormEvent) {
    e.preventDefault();
    if (!activeTicket || !replyContent.trim() || !user) return;

    setIsSubmitting(true);
    addReply(activeTicket.id, replyContent.trim(), user);

    const updated = tickets.find((t) => t.id === activeTicket.id);
    if (updated) {
      setActiveTicket(updated);
    }
    setReplyContent('');
    setIsSubmitting(false);
  }

  function handleStatusChange(ticketId: string, newStatus: TicketStatus) {
    updateStatus(ticketId, newStatus, user);

    const updated = tickets.find((t) => t.id === ticketId);
    if (updated) {
      setActiveTicket(updated);
    }
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Manage Support Tickets</h1>
          <p className={styles.subtitle}>
            Student Welfare Representatives & Admin console to assign, reply, resolve, and escalate support issues.
          </p>
        </div>

        <div className={styles.quickStats}>
          <div className={styles.statChip}>
            <span className={styles.statDotOpen} /> Open Issues: <strong>{openCount}</strong>
          </div>
          <div className={styles.statChip}>
            <span className={styles.statDotEscalated} /> Escalated: <strong>{escalatedCount}</strong>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className={styles.filterBar}>
        <div className={styles.statusTabs}>
          <button
            type="button"
            className={`${styles.tab} ${selectedStatus === 'all' ? styles.activeTab : ''}`}
            onClick={() => setSelectedStatus('all')}
          >
            All ({tickets.length})
          </button>
          <button
            type="button"
            className={`${styles.tab} ${selectedStatus === 'open' ? styles.activeTab : ''}`}
            onClick={() => setSelectedStatus('open')}
          >
            Open ({openCount})
          </button>
          <button
            type="button"
            className={`${styles.tab} ${selectedStatus === 'in_progress' ? styles.activeTab : ''}`}
            onClick={() => setSelectedStatus('in_progress')}
          >
            In Progress ({tickets.filter((t) => t.status === 'in_progress').length})
          </button>
          <button
            type="button"
            className={`${styles.tab} ${selectedStatus === 'resolved' ? styles.activeTab : ''}`}
            onClick={() => setSelectedStatus('resolved')}
          >
            Resolved ({tickets.filter((t) => t.status === 'resolved').length})
          </button>
          <button
            type="button"
            className={`${styles.tab} ${selectedStatus === 'escalated' ? styles.activeTab : ''}`}
            onClick={() => setSelectedStatus('escalated')}
          >
            Escalated ({escalatedCount})
          </button>
        </div>

        <div className={styles.rightFilters}>
          <div className={styles.selectWrapper}>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={styles.categorySelect}
            >
              <option value="all">All Categories</option>
              {TICKET_CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
            <ChevronDownIcon style={{ width: 14, height: 14 }} className={styles.selectChevron} />
          </div>

          <div className={styles.searchBox}>
            <MagnifyingGlassIcon style={{ width: 16, height: 16 }} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search by student or subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>
      </div>

      {/* Ticket Grid List */}
      <div className={styles.ticketGrid}>
        {filteredTickets.length > 0 ? (
          filteredTickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              showStudent={true}
              onClick={(t) => setActiveTicket(t)}
            />
          ))
        ) : (
          <div className={styles.emptyState}>
            <ClipboardDocumentCheckIcon style={{ width: 48, height: 48 }} className={styles.emptyIcon} />
            <h3 className={styles.emptyTitle}>No tickets found</h3>
            <p className={styles.emptyText}>
              No tickets match your selected filters or search query.
            </p>
          </div>
        )}
      </div>

      {/* Rep Management Modal */}
      {activeTicket && (
        <div className={styles.modalBackdrop} onClick={() => setActiveTicket(null)}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className={styles.modalHeader}>
              <div className={styles.modalTitleGroup}>
                <span className={styles.modalId}>#{activeTicket.id}</span>
                <span
                  className={styles.modalBadge}
                  style={{
                    backgroundColor: `color-mix(in srgb, var(${TICKET_STATUS_CONFIG[activeTicket.status].colorVar}) 12%, transparent)`,
                    color: `var(${TICKET_STATUS_CONFIG[activeTicket.status].colorVar})`,
                  }}
                >
                  {TICKET_STATUS_CONFIG[activeTicket.status].label}
                </span>
                <span className={styles.modalCategory}>
                  {TICKET_CATEGORIES.find((c) => c.value === activeTicket.category)?.label || slugToLabel(activeTicket.category)}
                </span>
              </div>

              <button
                type="button"
                className={styles.closeBtn}
                onClick={() => setActiveTicket(null)}
                aria-label="Close modal"
              >
                <XMarkIcon style={{ width: 18, height: 18 }} />
              </button>
            </div>

            {/* Rep Status Control Toolbar */}
            <div className={styles.controlsBar}>
              <div className={styles.controlsBarInner}>
                <span className={styles.controlLabel}>Set Status:</span>
                <div className={styles.statusBtnGroup}>
                  <button
                    type="button"
                    className={`${styles.statusBtn} ${activeTicket.status === 'open' ? styles.activeStatusBtn : ''}`}
                    onClick={() => handleStatusChange(activeTicket.id, 'open')}
                  >
                    Open
                  </button>
                  <button
                    type="button"
                    className={`${styles.statusBtn} ${activeTicket.status === 'in_progress' ? styles.activeStatusBtn : ''}`}
                    onClick={() => handleStatusChange(activeTicket.id, 'in_progress')}
                  >
                    In Progress
                  </button>
                  <button
                    type="button"
                    className={`${styles.statusBtn} ${styles.resolveBtn} ${activeTicket.status === 'resolved' ? styles.activeStatusBtn : ''}`}
                    onClick={() => handleStatusChange(activeTicket.id, 'resolved')}
                  >
                    Resolved
                  </button>
                  <button
                    type="button"
                    className={`${styles.statusBtn} ${styles.escalateBtn} ${activeTicket.status === 'escalated' ? styles.activeStatusBtn : ''}`}
                    onClick={() => handleStatusChange(activeTicket.id, 'escalated')}
                  >
                    Escalate
                  </button>
                </div>
              </div>

              <div className={styles.assignControl}>
                {activeTicket.assignedName ? (
                  <span className={styles.assignedBadge}>
                    <UserIcon style={{ width: 14, height: 14 }} /> Assigned to {activeTicket.assignedName}
                  </span>
                ) : (
                  <button
                    type="button"
                    className={styles.assignBtn}
                    onClick={() => handleStatusChange(activeTicket.id, 'in_progress')}
                  >
                    Assign to Me
                  </button>
                )}
              </div>
            </div>

            {/* Modal Body / Thread */}
            <div className={styles.modalBody}>
              <div className={styles.studentInfoBox}>
                <UserIcon style={{ width: 20, height: 20 }} className={styles.studentIcon} />
                <div>
                  <strong className={styles.studentName}>{activeTicket.studentName}</strong>
                  <span className={styles.submittedTime}>
                    <ClockIcon style={{ width: 12, height: 12 }} /> Submitted on {formatDateTime(activeTicket.createdAt)}
                  </span>
                </div>
              </div>

              <h3 className={styles.detailTitle}>{activeTicket.title}</h3>

              <div className={styles.detailBox}>
                <p className={styles.detailContent}>{activeTicket.description}</p>
              </div>

              {/* Discussion Thread */}
              <div className={styles.repliesSection}>
                <h4 className={styles.repliesTitle}>
                  <ChatBubbleLeftEllipsisIcon style={{ width: 16, height: 16 }} /> Discussion Thread ({activeTicket.replies.length})
                </h4>

                {activeTicket.replies.length === 0 ? (
                  <p className={styles.noReplies}>No replies posted yet. Type your official response below.</p>
                ) : (
                  <div className={styles.repliesList}>
                    {activeTicket.replies.map((reply) => (
                      <div
                        key={reply.id}
                        className={`${styles.replyBubble} ${reply.authorRole === 'student' ? styles.studentReply : styles.staffReply}`}
                      >
                        <div className={styles.replyHeader}>
                          <span className={styles.replyAuthor}>
                            {reply.authorName}
                            {reply.authorRole !== 'student' && <span className={styles.staffTag}>SW Rep</span>}
                          </span>
                          <span className={styles.replyTime}>{formatDateTime(reply.createdAt)}</span>
                        </div>
                        <p className={styles.replyText}>{reply.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Rep Official Reply Footer */}
            <div className={styles.modalFooter}>
              <form onSubmit={handleSendReply} className={styles.replyForm}>
                <input
                  type="text"
                  placeholder="Write an official response or instructions for the student..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  className={styles.replyInput}
                />
                <button
                  type="submit"
                  className={styles.sendReplyBtn}
                  disabled={isSubmitting || !replyContent.trim()}
                >
                  <PaperAirplaneIcon style={{ width: 16, height: 16 }} /> Post Response
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
