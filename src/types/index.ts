/* ============================================
   TypeScript Type Definitions
   DIU Student Welfare System
   ============================================ */

/* ── User Roles ── */
export type UserRole = 'student' | 'representative' | 'admin';

/* ── User / Profile ── */
export interface User {
  id: string;
  fullName: string;
  studentId: string | null;
  department: string;
  role: UserRole;
  avatarUrl: string | null;
  email: string;
  createdAt: string;
}

/* ── Ticket Categories ── */
export type TicketCategory =
  | 'academic'
  | 'blc'
  | 'student-portal'
  | 'accounts'
  | 'exam'
  | 'registration'
  | 'transcript'
  | 'welfare';

/* ── Ticket Status ── */
export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'escalated';

/* ── Help Desk Ticket ── */
export interface Ticket {
  id: string;
  studentId: string;
  studentName: string;
  title: string;
  description: string;
  category: TicketCategory;
  status: TicketStatus;
  assignedTo: string | null;
  assignedName: string | null;
  createdAt: string;
  updatedAt: string;
  replies: TicketReply[];
}

/* ── Ticket Reply ── */
export interface TicketReply {
  id: string;
  ticketId: string;
  authorId: string;
  authorName: string;
  authorRole: UserRole;
  content: string;
  createdAt: string;
}

/* ── Announcement Category ── */
export type AnnouncementCategory =
  | 'exam-notice'
  | 'workshop'
  | 'seminar'
  | 'competition'
  | 'scholarship'
  | 'internship';

/* ── Announcement ── */
export interface Announcement {
  id: string;
  authorId: string;
  authorName: string;
  title: string;
  content: string;
  category: AnnouncementCategory;
  isPinned: boolean;
  createdAt: string;
}

/* ── Counselling Type ── */
export type CounsellingType = 'admission' | 'academic' | 'research' | 'career';

/* ── Counselling Status ── */
export type CounsellingStatus =
  | 'pending'
  | 'accepted'
  | 'scheduled'
  | 'completed'
  | 'declined';

/* ── Counselling Request ── */
export interface CounsellingRequest {
  id: string;
  studentId: string;
  studentName: string;
  type: CounsellingType;
  description: string;
  preferredDate: string | null;
  preferredTime: string | null;
  status: CounsellingStatus;
  assignedTo: string | null;
  assignedName: string | null;
  createdAt: string;
}

/* ── FAQ ── */
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: TicketCategory;
  viewCount: number;
}

/* ── Academic Guide ── */
export interface AcademicGuide {
  id: string;
  title: string;
  description: string;
  content: string;
  icon: string;
  category: 'freshman' | 'policy';
}

/* ── Dashboard Stats ── */
export interface DashboardStats {
  totalTickets: number;
  unresolvedTickets: number;
  counsellingRequests: number;
  announcementsPosted: number;
  ticketsByCategory: Record<TicketCategory, number>;
  monthlyTrends: { month: string; count: number }[];
  topProblems: { problem: string; count: number }[];
}

/* ── Navigation Item ── */
export interface NavItem {
  label: string;
  path: string;
  icon: string;
  roles: UserRole[];
  badge?: number;
}
