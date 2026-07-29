/* ============================================
   Sidebar Component
   DIU Student Welfare System
   ============================================ */

import { NavLink } from 'react-router-dom';
import {
  HomeIcon,
  QuestionMarkCircleIcon,
  TicketIcon,
  ClipboardDocumentCheckIcon,
  BookOpenIcon,
  AcademicCapIcon,
  DocumentTextIcon,
  MegaphoneIcon,
  PlusCircleIcon,
  UserGroupIcon,
  ChartBarIcon,
  UserIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../../hooks/useAuth';
import { cn } from '../../utils/helpers';
import { DIULogo } from '../ui/DIULogo';
import styles from './Sidebar.module.css';
import type { UserRole } from '../../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SidebarLink {
  label: string;
  path: string;
  icon: React.ReactNode;
  roles: UserRole[];
}

const iconStyle = { width: 18, height: 18 };

const NAV_SECTIONS: { title: string; links: SidebarLink[] }[] = [
  {
    title: 'Main',
    links: [
      { label: 'Dashboard', path: '/', icon: <HomeIcon style={iconStyle} />, roles: ['student', 'representative', 'admin'] },
    ],
  },
  {
    title: 'Help Desk',
    links: [
      { label: 'Submit Ticket', path: '/helpdesk/submit', icon: <QuestionMarkCircleIcon style={iconStyle} />, roles: ['student'] },
      { label: 'My Tickets', path: '/helpdesk/my-tickets', icon: <TicketIcon style={iconStyle} />, roles: ['student'] },
      { label: 'Manage Tickets', path: '/helpdesk/manage', icon: <ClipboardDocumentCheckIcon style={iconStyle} />, roles: ['representative', 'admin'] },
    ],
  },
  {
    title: 'Academic',
    links: [
      { label: 'Info Center', path: '/academic', icon: <BookOpenIcon style={iconStyle} />, roles: ['student', 'representative', 'admin'] },
      { label: 'Freshman Guide', path: '/academic/freshman-guide', icon: <AcademicCapIcon style={iconStyle} />, roles: ['student', 'representative', 'admin'] },
      { label: 'Policies', path: '/academic/policies', icon: <DocumentTextIcon style={iconStyle} />, roles: ['student', 'representative', 'admin'] },
      { label: 'FAQ', path: '/academic/faq', icon: <QuestionMarkCircleIcon style={iconStyle} />, roles: ['student', 'representative', 'admin'] },
    ],
  },
  {
    title: 'Communication',
    links: [
      { label: 'Announcements', path: '/announcements', icon: <MegaphoneIcon style={iconStyle} />, roles: ['student', 'representative', 'admin'] },
      { label: 'Post Announcement', path: '/announcements/create', icon: <PlusCircleIcon style={iconStyle} />, roles: ['representative', 'admin'] },
    ],
  },
  {
    title: 'Counselling',
    links: [
      { label: 'Request Counselling', path: '/counselling/request', icon: <UserIcon style={iconStyle} />, roles: ['student'] },
      { label: 'Manage Sessions', path: '/counselling/manage', icon: <UserGroupIcon style={iconStyle} />, roles: ['representative', 'admin'] },
    ],
  },
  {
    title: 'Admin',
    links: [
      { label: 'Analytics', path: '/dashboard', icon: <ChartBarIcon style={iconStyle} />, roles: ['admin'] },
    ],
  },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { user } = useAuth();
  const currentRole = user?.role ?? 'student';

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className={styles.backdrop}
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside className={cn(styles.sidebar, isOpen && styles.open)}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.logo}>
            <DIULogo mode="full" height={44} variant="on-dark" />
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close sidebar">
            <XMarkIcon style={{ width: 18, height: 18 }} />
          </button>
        </div>

        {/* Navigation */}
        <nav className={styles.nav}>
          {NAV_SECTIONS.map((section) => {
            const visibleLinks = section.links.filter((link) =>
              link.roles.includes(currentRole)
            );
            if (visibleLinks.length === 0) return null;

            return (
              <div key={section.title} className={styles.section}>
                <h6 className={styles.sectionTitle}>{section.title}</h6>
                <ul className={styles.linkList}>
                  {visibleLinks.map((link) => (
                    <li key={link.path}>
                      <NavLink
                        to={link.path}
                        end={true}
                        className={({ isActive }) =>
                          cn(styles.navLink, isActive && styles.active)
                        }
                        onClick={onClose}
                      >
                        <span className={styles.linkIcon}>{link.icon}</span>
                        <span className={styles.linkLabel}>{link.label}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </nav>

        {/* Footer */}
        <div className={styles.sidebarFooter}>
          <small>Student Welfare System v1.0</small>
        </div>
      </aside>
    </>
  );
}
