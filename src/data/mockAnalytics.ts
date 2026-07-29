/* ============================================
   Mock Analytics Dataset (Admin / HoD View)
   DIU Student Welfare System
   ============================================ */

import type { DashboardStats } from '../types';

export const mockAnalyticsData: DashboardStats = {
  totalTickets: 128,
  unresolvedTickets: 14,
  counsellingRequests: 42,
  announcementsPosted: 18,
  ticketsByCategory: {
    academic: 24,
    blc: 38,
    'student-portal': 22,
    accounts: 19,
    exam: 12,
    registration: 8,
    transcript: 3,
    welfare: 2,
  },
  monthlyTrends: [
    { month: 'Feb', count: 12 },
    { month: 'Mar', count: 18 },
    { month: 'Apr', count: 26 },
    { month: 'May', count: 31 },
    { month: 'Jun', count: 22 },
    { month: 'Jul', count: 39 },
  ],
  topProblems: [
    { problem: 'BLC course enrollment key missing or not syncing', count: 38 },
    { problem: 'Tuition fee clearance delay on Student Portal', count: 22 },
    { problem: 'Exam Admit Card generation blocked', count: 19 },
    { problem: 'Course registration section conflict & capacity full', count: 16 },
    { problem: 'Student Portal password reset email delivery failure', count: 14 },
    { problem: 'Overlap examination application deadline inquiries', count: 12 },
    { problem: 'Transcript application status tracking', count: 7 },
  ],
};

export const departmentalImpactMetrics = [
  {
    pillar: 'Solves Student Problems',
    feature: 'Centralized Help Desk & Ticket System',
    impact: '128 tickets logged, 89% resolved within 48 hours',
    icon: 'HelpCircle',
    color: 'var(--color-info)',
  },
  {
    pillar: 'Reduces Repetitive Queries',
    feature: 'Academic Info Center & Top 50 FAQ',
    impact: 'Reduced repetitive questions by 54% in Messenger groups',
    icon: 'BookOpen',
    color: 'var(--color-success)',
  },
  {
    pillar: 'Supports Department Growth',
    feature: 'Admission Counselling System',
    impact: '42 prospective & freshman students guided',
    icon: 'UserCheck',
    color: 'var(--color-accent)',
  },
  {
    pillar: 'Develops Student Leaders',
    feature: 'Student Welfare Representative Program',
    impact: '12 active Reps resolving support tickets & managing events',
    icon: 'Users',
    color: 'var(--color-primary)',
  },
  {
    pillar: 'Promotes Research Culture',
    feature: 'Research & Thesis Counselling',
    impact: '16 capstone thesis research guidance sessions booked',
    icon: 'Award',
    color: 'var(--color-primary-light)',
  },
  {
    pillar: 'Improves Employability',
    feature: 'Career Counselling & Internship Notices',
    impact: '18 CV reviews & 5 software internship notices posted',
    icon: 'Briefcase',
    color: 'var(--color-warning)',
  },
];
