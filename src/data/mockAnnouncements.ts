/* ============================================
   Mock Announcements Dataset
   DIU Student Welfare System
   ============================================ */

import type { Announcement } from '../types';

export const mockAnnouncements: Announcement[] = [
  {
    id: 'anc-001',
    authorId: 'usr-admin-001',
    authorName: 'Dr. Touhid Bhuiyan (HoD, SWE)',
    title: 'Final Examination Schedule and Admit Card Notice (Summer 2026)',
    content: 'The Final Examinations for Summer 2026 will commence from August 10, 2026. All students are advised to clear their remaining tuition fee installments before August 5, 2026, to download their Admit Cards from the Student Portal. Please note that no student will be allowed inside the examination hall without a printed Admit Card and valid Student ID.',
    category: 'exam-notice',
    isPinned: true,
    createdAt: '2026-07-28T09:00:00Z',
  },
  {
    id: 'anc-002',
    authorId: 'usr-rep-001',
    authorName: 'Fariha Rahman (SW Rep)',
    title: 'Hands-on Workshop: Building Scalable Web Apps with React 19 & Supabase',
    content: 'The Software Engineering Department, in collaboration with DIU SEC, is hosting an exclusive technical workshop on modern web architecture! Learn how to build production-grade web platforms using React 19, Vite, TypeScript, and Supabase PostgreSQL. \n\nDate: August 2, 2026 (Saturday)\nTime: 10:00 AM to 1:00 PM\nVenue: Lab 502, AB5\nSeats: 60 (First come, first served). Free registration!',
    category: 'workshop',
    isPinned: true,
    createdAt: '2026-07-27T14:30:00Z',
  },
  {
    id: 'anc-003',
    authorId: 'usr-rep-001',
    authorName: 'Fariha Rahman (SW Rep)',
    title: 'National Software Contest 2026 | Team Registration Open',
    content: 'Calling all SWE coders! Registration for the National Inter-University Software Exhibition & Contest 2026 is now open. Teams of 3 students can submit their software project proposals under Web/Mobile Apps, AI/ML, or IoT categories. Top 3 winning teams will receive cash prizes up to BDT 150,000 and direct interview opportunities with leading software firms.',
    category: 'competition',
    isPinned: false,
    createdAt: '2026-07-25T11:00:00Z',
  },
  {
    id: 'anc-004',
    authorId: 'usr-admin-001',
    authorName: 'Dr. Touhid Bhuiyan (HoD, SWE)',
    title: 'Departmental Seminar: AI in Modern Software Engineering',
    content: 'We are honored to invite Dr. Al-Amin, Senior AI Research Lead at Google, for a keynote session on "The Future of Software Development in the Era of Generative AI". Attendance is highly recommended for 3rd and 4th-year students working on capstone projects and thesis research.\n\nDate: August 4, 2026\nTime: 2:30 PM to 4:30 PM\nVenue: DIU Auditorium, AB4',
    category: 'seminar',
    isPinned: false,
    createdAt: '2026-07-22T16:00:00Z',
  },
  {
    id: 'anc-005',
    authorId: 'usr-rep-001',
    authorName: 'Fariha Rahman (SW Rep)',
    title: 'Software Engineering Internship Opportunity at Brain Station 23',
    content: 'Brain Station 23 is hiring Trainee Software Engineers (Frontend, Backend, and SQA) from DIU SWE! Eligible students: Graduating batch of Summer 2026 / Fall 2026. Submit your resume and GitHub profile through the Career Counselling office or via this portal.',
    category: 'internship',
    isPinned: false,
    createdAt: '2026-07-20T10:15:00Z',
  },
  {
    id: 'anc-006',
    authorId: 'usr-admin-001',
    authorName: 'Dr. Touhid Bhuiyan (HoD, SWE)',
    title: 'Merit-Based Scholarship Applications for Fall 2026',
    content: 'Applications are invited for the Dean’s List Honor Scholarship for Fall 2026. Students maintaining a CGPA of 3.80 or higher with zero course retakes are eligible for up to a 50% tuition fee waiver. Submit applications at the Department Head office before August 15, 2026.',
    category: 'scholarship',
    isPinned: false,
    createdAt: '2026-07-18T12:00:00Z',
  },
];
