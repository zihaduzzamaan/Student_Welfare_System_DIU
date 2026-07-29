/* ============================================
   MyTickets Page — Help Desk Module
   DIU Student Welfare System
   ============================================ */

import { useState, useMemo, type FormEvent, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  TicketIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  ChatBubbleLeftEllipsisIcon,
  PaperAirplaneIcon,
  XMarkIcon,
  ClockIcon,
  UserIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../../hooks/useAuth';
import { useTickets } from '../../hooks/useTickets';
import { TicketCard } from '../../components/shared/TicketCard';
import { TICKET_STATUS_CONFIG, TICKET_CATEGORIES } from '../../utils/constants';
import { formatDateTime, slugToLabel } from '../../utils/helpers';
import type { Ticket } from '../../types';
import styles from './MyTickets.module.css';

export default function MyTickets() {
  const { user } = useAuth();
  const { tickets, addReply } = useTickets();

  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTicket, setActiveTicket] = useState<Ticket | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [isReplying, setIsReplying] = useState(false);

  // Filter student tickets
  const myTickets = useMemo(() => {
    return tickets.filter((t) => t.studentId === user?.id);
  }, [tickets, user]);

  const filteredTickets = useMemo(() => {
    return myTickets.filter((t) => {
      const matchesStatus = selectedStatus === 'all' || t.status === selectedStatus;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.id.toLowerCase().includes(q);

      return matchesStatus && matchesQuery;
    });
  }, [myTickets, selectedStatus, searchQuery]);

  // Sync activeTicket with latest tickets state automatically
  useEffect(() => {
    if (activeTicket) {
      const fresh = tickets.find((t) => t.id === activeTicket.id);
      if (fresh) {
        setActiveTicket(fresh);
      }
    }
  }, [tickets]);

  function handleSendReply(e: FormEvent) {
    e.preventDefault();
    if (!activeTicket || !replyContent.trim() || !user) return;

    setIsReplying(true);
    addReply(activeTicket.id, replyContent.trim(), user);
    setReplyContent('');
    setIsReplying(false);
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>My Support Tickets</h1>
          <p className={styles.subtitle}>
            Track the status of your inquiries, view staff responses, and reply to open tickets.
          </p>
        </div>

        <Link to="/helpdesk/submit" className={styles.newTicketBtn}>
          <PlusIcon style={{ width: 18, height: 18 }} /> Submit New Ticket
        </Link>
      </div>

      {/* Filter Tabs & Search */}
      <div className={styles.filterBar}>
        <div className={styles.statusTabs}>
          <button
            type="button"
            className={`${styles.tab} ${selectedStatus === 'all' ? styles.activeTab : ''}`}
            onClick={() => setSelectedStatus('all')}
          >
            All Tickets ({myTickets.length})
          </button>
          <button
            type="button"
            className={`${styles.tab} ${selectedStatus === 'open' ? styles.activeTab : ''}`}
            onClick={() => setSelectedStatus('open')}
          >
            Open ({myTickets.filter((t) => t.status === 'open').length})
          </button>
          <button
            type="button"
            className={`${styles.tab} ${selectedStatus === 'in_progress' ? styles.activeTab : ''}`}
            onClick={() => setSelectedStatus('in_progress')}
          >
            In Progress ({myTickets.filter((t) => t.status === 'in_progress').length})
          </button>
          <button
            type="button"
            className={`${styles.tab} ${selectedStatus === 'resolved' ? styles.activeTab : ''}`}
            onClick={() => setSelectedStatus('resolved')}
          >
            Resolved ({myTickets.filter((t) => t.status === 'resolved').length})
          </button>
        </div>

        <div className={styles.searchBox}>
          <MagnifyingGlassIcon style={{ width: 16, height: 16 }} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search tickets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      {/* Ticket Grid List */}
      <div className={styles.ticketGrid}>
        {filteredTickets.length > 0 ? (
          filteredTickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              onClick={(t) => setActiveTicket(t)}
            />
          ))
        ) : (
          <div className={styles.emptyState}>
            <TicketIcon style={{ width: 48, height: 48 }} className={styles.emptyIcon} />
            <h3 className={styles.emptyTitle}>No tickets found</h3>
            <p className={styles.emptyText}>
              {myTickets.length === 0
                ? "You haven't submitted any support tickets yet."
                : 'No tickets match your selected filters.'}
            </p>
            {myTickets.length === 0 && (
              <Link to="/helpdesk/submit" className={styles.newTicketBtn} style={{ marginTop: 'var(--space-4)' }}>
                <PlusIcon style={{ width: 18, height: 18 }} /> Submit First Ticket
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Thread Detail Modal */}
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

            {/* Modal Body / Thread */}
            <div className={styles.modalBody}>
              <h3 className={styles.detailTitle}>{activeTicket.title}</h3>

              <div className={styles.detailBox}>
                <p className={styles.detailContent}>{activeTicket.description}</p>
                <span className={styles.submittedTime}>
                  <ClockIcon style={{ width: 12, height: 12 }} /> Submitted on {formatDateTime(activeTicket.createdAt)}
                </span>
              </div>

              {/* Assignment Badge */}
              {activeTicket.assignedName && (
                <div className={styles.assignedBanner}>
                  <UserIcon style={{ width: 16, height: 16 }} />
                  <span>Assigned Representative: <strong>{activeTicket.assignedName}</strong></span>
                </div>
              )}

              {/* Discussion Thread */}
              <div className={styles.repliesSection}>
                <h4 className={styles.repliesTitle}>
                  <ChatBubbleLeftEllipsisIcon style={{ width: 16, height: 16 }} /> Discussion Thread ({activeTicket.replies.length})
                </h4>

                {activeTicket.replies.length === 0 ? (
                  <p className={styles.noReplies}>No responses from representatives yet.</p>
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

            {/* Modal Footer / Reply Input */}
            <div className={styles.modalFooter}>
              {activeTicket.status === 'resolved' ? (
                <div className={styles.resolvedNotice}>
                  <CheckCircleIcon style={{ width: 16, height: 16 }} /> This ticket has been marked as resolved by Student Welfare representatives.
                </div>
              ) : (
                <form onSubmit={handleSendReply} className={styles.replyForm}>
                  <textarea
                    rows={3}
                    placeholder="Type your response to the representative..."
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    className={styles.replyTextarea}
                  />
                  <button
                    type="submit"
                    className={styles.sendReplyBtn}
                    disabled={isReplying || !replyContent.trim()}
                  >
                    <PaperAirplaneIcon style={{ width: 16, height: 16 }} /> Send Response
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
