/* ============================================
   App-Wide Constants
   DIU Student Welfare System
   ============================================ */

import type { TicketCategory, AnnouncementCategory, CounsellingType, UserRole } from '../types';

/* ── App Info ── */
export const APP_NAME = 'DIU Student Welfare';
export const APP_FULL_NAME = 'Departmental Student Success & Engagement Platform';
export const UNIVERSITY_NAME = 'Daffodil International University';
export const DEPARTMENT_NAME = 'Software Engineering (SWE)';

/* ── Ticket Categories ── */
export const TICKET_CATEGORIES: { value: TicketCategory; label: string }[] = [
  { value: 'academic', label: 'Academic' },
  { value: 'blc', label: 'BLC' },
  { value: 'student-portal', label: 'Student Portal' },
  { value: 'accounts', label: 'Accounts' },
  { value: 'exam', label: 'Exam' },
  { value: 'registration', label: 'Registration' },
  { value: 'transcript', label: 'Transcript' },
  { value: 'welfare', label: 'Welfare' },
];

/* ── Announcement Categories ── */
export const ANNOUNCEMENT_CATEGORIES: { value: AnnouncementCategory; label: string; emoji: string }[] = [
  { value: 'exam-notice', label: 'Exam Notice', emoji: '📝' },
  { value: 'workshop', label: 'Workshop', emoji: '🔧' },
  { value: 'seminar', label: 'Seminar', emoji: '🎤' },
  { value: 'competition', label: 'Competition', emoji: '🏆' },
  { value: 'scholarship', label: 'Scholarship', emoji: '🎓' },
  { value: 'internship', label: 'Internship', emoji: '💼' },
];

/* ── Counselling Types ── */
export const COUNSELLING_TYPES: { value: CounsellingType; label: string; description: string }[] = [
  { value: 'admission', label: 'Admission Counselling', description: 'Help with admission queries and processes' },
  { value: 'academic', label: 'Academic Counselling', description: 'Study plans, course selection, GPA improvement' },
  { value: 'research', label: 'Research Counselling', description: 'Research opportunities, thesis guidance, publications' },
  { value: 'career', label: 'Career Counselling', description: 'Job preparation, CV review, career planning' },
];

/* ── Status Labels & Colors ── */
export const TICKET_STATUS_CONFIG = {
  open: { label: 'Open', colorVar: '--color-info' },
  in_progress: { label: 'In Progress', colorVar: '--color-warning' },
  resolved: { label: 'Resolved', colorVar: '--color-success' },
  escalated: { label: 'Escalated', colorVar: '--color-danger' },
} as const;

export const COUNSELLING_STATUS_CONFIG = {
  pending: { label: 'Pending', colorVar: '--color-info' },
  accepted: { label: 'Accepted', colorVar: '--color-warning' },
  scheduled: { label: 'Scheduled', colorVar: '--color-accent' },
  completed: { label: 'Completed', colorVar: '--color-success' },
  declined: { label: 'Declined', colorVar: '--color-danger' },
} as const;

/* ── User Roles ── */
export const USER_ROLES: { value: UserRole; label: string }[] = [
  { value: 'student', label: 'Student' },
  { value: 'representative', label: 'SW Representative' },
  { value: 'admin', label: 'Admin / HoD' },
];
