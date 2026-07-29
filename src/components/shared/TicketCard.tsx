/* ============================================
   TicketCard — Shared Component
   Displays a single ticket summary with status badge.
   ============================================ */

import { ChatBubbleLeftEllipsisIcon, ClockIcon, UserIcon } from '@heroicons/react/24/outline';
import { TICKET_STATUS_CONFIG, TICKET_CATEGORIES } from '../../utils/constants';
import { timeAgo, slugToLabel } from '../../utils/helpers';
import type { Ticket } from '../../types';
import styles from './TicketCard.module.css';

interface TicketCardProps {
  ticket: Ticket;
  onClick?: (ticket: Ticket) => void;
  showStudent?: boolean;
}

export function TicketCard({ ticket, onClick, showStudent = false }: TicketCardProps) {
  const statusConfig = TICKET_STATUS_CONFIG[ticket.status];
  const categoryLabel = TICKET_CATEGORIES.find((c) => c.value === ticket.category)?.label ?? slugToLabel(ticket.category);

  return (
    <button
      className={styles.card}
      onClick={() => onClick?.(ticket)}
      type="button"
    >
      <div className={styles.top}>
        <span
          className={styles.badge}
          style={{
            backgroundColor: `color-mix(in srgb, var(${statusConfig.colorVar}) 12%, transparent)`,
            color: `var(${statusConfig.colorVar})`,
          }}
        >
          {statusConfig.label}
        </span>
        <span className={styles.category}>{categoryLabel}</span>
      </div>

      <h4 className={styles.subject}>{ticket.title}</h4>

      <div className={styles.footer}>
        {showStudent && (
          <span className={styles.meta}>
            <UserIcon style={{ width: 14, height: 14 }} />
            {ticket.studentName}
          </span>
        )}

        <span className={styles.meta}>
          <ClockIcon style={{ width: 14, height: 14 }} />
          {timeAgo(ticket.createdAt)}
        </span>

        {ticket.replies.length > 0 && (
          <span className={styles.meta}>
            <ChatBubbleLeftEllipsisIcon style={{ width: 14, height: 14 }} />
            {ticket.replies.length} {ticket.replies.length === 1 ? 'reply' : 'replies'}
          </span>
        )}
      </div>
    </button>
  );
}
