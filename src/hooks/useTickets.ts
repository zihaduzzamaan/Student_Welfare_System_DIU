/* ============================================
   useTickets Hook (State & LocalStorage Persistence)
   DIU Student Welfare System
   ============================================ */

import { useState, useEffect, useCallback } from 'react';
import { mockTickets } from '../data/mockTickets';
import type { Ticket, TicketCategory, TicketStatus, User } from '../types';

const TICKETS_STORAGE_KEY = 'diu-sws-tickets';

export function useTickets() {
  const [tickets, setTickets] = useState<Ticket[]>(() => {
    try {
      const saved = localStorage.getItem(TICKETS_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback if parsing fails
    }
    return mockTickets;
  });

  /* Sync state to LocalStorage */
  useEffect(() => {
    try {
      localStorage.setItem(TICKETS_STORAGE_KEY, JSON.stringify(tickets));
    } catch (e) {
      console.error('Failed to save tickets to localStorage', e);
    }
  }, [tickets]);

  /* Create new ticket */
  const createTicket = useCallback(
    (data: { title: string; description: string; category: TicketCategory }, student: User): Ticket => {
      const newTicket: Ticket = {
        id: `tkt-${Date.now()}`,
        studentId: student.id,
        studentName: student.fullName,
        title: data.title,
        description: data.description,
        category: data.category,
        status: 'open',
        assignedTo: null,
        assignedName: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        replies: [],
      };

      setTickets((prev) => [newTicket, ...prev]);
      return newTicket;
    },
    []
  );

  /* Add reply to a ticket */
  const addReply = useCallback(
    (ticketId: string, content: string, author: User) => {
      setTickets((prev) =>
        prev.map((t) => {
          if (t.id !== ticketId) return t;

          const newReply = {
            id: `rpl-${Date.now()}`,
            ticketId,
            authorId: author.id,
            authorName: author.fullName,
            authorRole: author.role,
            content,
            createdAt: new Date().toISOString(),
          };

          // If a rep replies and ticket is open, update status to in_progress
          let nextStatus = t.status;
          if (author.role !== 'student' && t.status === 'open') {
            nextStatus = 'in_progress';
          }

          return {
            ...t,
            status: nextStatus,
            assignedTo: t.assignedTo || (author.role !== 'student' ? author.id : t.assignedTo),
            assignedName: t.assignedName || (author.role !== 'student' ? author.fullName : t.assignedName),
            updatedAt: new Date().toISOString(),
            replies: [...t.replies, newReply],
          };
        })
      );
    },
    []
  );

  /* Update ticket status or assignee */
  const updateStatus = useCallback(
    (ticketId: string, status: TicketStatus, assignedUser?: User | null) => {
      setTickets((prev) =>
        prev.map((t) => {
          if (t.id !== ticketId) return t;

          return {
            ...t,
            status,
            assignedTo: assignedUser ? assignedUser.id : t.assignedTo,
            assignedName: assignedUser ? assignedUser.fullName : t.assignedName,
            updatedAt: new Date().toISOString(),
          };
        })
      );
    },
    []
  );

  /* Reset tickets to mock defaults */
  const resetTickets = useCallback(() => {
    setTickets(mockTickets);
  }, []);

  return {
    tickets,
    createTicket,
    addReply,
    updateStatus,
    resetTickets,
  };
}
