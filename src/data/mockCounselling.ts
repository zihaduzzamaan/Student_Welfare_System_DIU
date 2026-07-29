/* ============================================
   Mock Counselling Requests Dataset
   DIU Student Welfare System
   ============================================ */

import type { CounsellingRequest } from '../types';

export const mockCounsellingRequests: CounsellingRequest[] = [
  {
    id: 'cns-001',
    studentId: 'usr-student-001',
    studentName: 'Zishan Ahmed',
    type: 'career',
    description: 'I would like assistance with reviewing my CV and GitHub portfolio for upcoming Software Engineering internships at Brain Station 23 and Therap Java Dev positions.',
    preferredDate: '2026-08-05',
    preferredTime: '11:00 AM',
    status: 'accepted',
    assignedTo: 'usr-rep-001',
    assignedName: 'Fariha Rahman',
    createdAt: '2026-07-28T14:00:00Z',
  },
  {
    id: 'cns-002',
    studentId: 'usr-student-001',
    studentName: 'Zishan Ahmed',
    type: 'research',
    description: 'Looking for guidance on selecting a capstone thesis topic in AI/Machine Learning for Software Testing. Seeking advice on publishing in Scopus-indexed conferences.',
    preferredDate: '2026-08-08',
    preferredTime: '02:30 PM',
    status: 'pending',
    assignedTo: null,
    assignedName: null,
    createdAt: '2026-07-29T09:15:00Z',
  },
  {
    id: 'cns-003',
    studentId: 'usr-student-002',
    studentName: 'Rafiq Hasan',
    type: 'academic',
    description: 'Need help planning my remaining 3 semester course sequence to clear probation and improve my CGPA above 3.00.',
    preferredDate: '2026-08-03',
    preferredTime: '10:00 AM',
    status: 'scheduled',
    assignedTo: 'usr-admin-001',
    assignedName: 'Dr. Touhid Bhuiyan',
    createdAt: '2026-07-25T11:30:00Z',
  },
  {
    id: 'cns-004',
    studentId: 'usr-student-003',
    studentName: 'Nusrat Jahan',
    type: 'admission',
    description: 'Inquiry regarding prerequisite credit waivers for a junior transfer student entering 3rd semester.',
    preferredDate: '2026-07-20',
    preferredTime: '01:00 PM',
    status: 'completed',
    assignedTo: 'usr-rep-001',
    assignedName: 'Fariha Rahman',
    createdAt: '2026-07-18T10:00:00Z',
  },
];
