/* ============================================
   Home Page — Role-based Dashboard
   DIU Student Welfare System
   ============================================ */

import {
  QuestionMarkCircleIcon,
  BookOpenIcon,
  MegaphoneIcon,
  UserIcon,
  ChartBarIcon,
  ArrowRightIcon,
  TicketIcon,
  ClipboardDocumentCheckIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { APP_NAME, UNIVERSITY_NAME } from '../utils/constants';
import styles from './HomePage.module.css';

interface QuickAction {
  label: string;
  description: string;
  path: string;
  icon: React.ReactNode;
  color: string;
}

const iconStyle = { width: 22, height: 22 };

const STUDENT_ACTIONS: QuickAction[] = [
  { label: 'Submit a Ticket', description: 'Ask a question or report an issue', path: '/helpdesk/submit', icon: <QuestionMarkCircleIcon style={iconStyle} />, color: 'var(--color-info)' },
  { label: 'My Tickets', description: 'Track your submitted tickets', path: '/helpdesk/my-tickets', icon: <TicketIcon style={iconStyle} />, color: 'var(--color-warning)' },
  { label: 'Academic Info', description: 'Guides, policies, and FAQ', path: '/academic', icon: <BookOpenIcon style={iconStyle} />, color: 'var(--color-success)' },
  { label: 'Announcements', description: 'Latest notices and events', path: '/announcements', icon: <MegaphoneIcon style={iconStyle} />, color: 'var(--color-accent)' },
  { label: 'Request Counselling', description: 'Book a counselling session', path: '/counselling/request', icon: <UserIcon style={iconStyle} />, color: 'var(--color-primary)' },
  { label: 'FAQ', description: 'Find quick answers', path: '/academic/faq', icon: <QuestionMarkCircleIcon style={iconStyle} />, color: 'var(--color-danger)' },
];

const REP_ACTIONS: QuickAction[] = [
  { label: 'Manage Tickets', description: 'View and respond to student tickets', path: '/helpdesk/manage', icon: <ClipboardDocumentCheckIcon style={iconStyle} />, color: 'var(--color-info)' },
  { label: 'Post Announcement', description: 'Create a new announcement', path: '/announcements/create', icon: <MegaphoneIcon style={iconStyle} />, color: 'var(--color-accent)' },
  { label: 'Manage Counselling', description: 'Review counselling requests', path: '/counselling/manage', icon: <UserIcon style={iconStyle} />, color: 'var(--color-primary)' },
  { label: 'Announcements', description: 'View all announcements', path: '/announcements', icon: <MegaphoneIcon style={iconStyle} />, color: 'var(--color-success)' },
];

const ADMIN_ACTIONS: QuickAction[] = [
  { label: 'Analytics Dashboard', description: 'View system-wide analytics', path: '/dashboard', icon: <ChartBarIcon style={iconStyle} />, color: 'var(--color-primary)' },
  { label: 'Manage Tickets', description: 'View all support tickets', path: '/helpdesk/manage', icon: <ClipboardDocumentCheckIcon style={iconStyle} />, color: 'var(--color-info)' },
  { label: 'Post Announcement', description: 'Create a new announcement', path: '/announcements/create', icon: <MegaphoneIcon style={iconStyle} />, color: 'var(--color-accent)' },
  { label: 'Manage Counselling', description: 'Review counselling requests', path: '/counselling/manage', icon: <UserIcon style={iconStyle} />, color: 'var(--color-success)' },
];

export default function HomePage() {
  const { user } = useAuth();

  const actions = user?.role === 'admin'
    ? ADMIN_ACTIONS
    : user?.role === 'representative'
      ? REP_ACTIONS
      : STUDENT_ACTIONS;

  const greeting = getGreeting();

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroHeaderRow}>
          <img
            src="/images/diu-logo-img.png"
            alt="DIU Welfare Emblem"
            className={styles.heroLogoImg}
          />
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              {greeting}, <span className={styles.userName}>{user?.fullName?.split(' ')[0] ?? 'Student'}</span>
            </h1>
            <p className={styles.heroSubtitle}>
              {APP_NAME} • {UNIVERSITY_NAME}
            </p>
          </div>
        </div>
      </section>

      {/* Quick Actions Grid */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Quick Actions</h2>
        <div className={styles.grid}>
          {actions.map((action, index) => (
            <Link
              key={action.path}
              to={action.path}
              className={`${styles.actionCard} animate-fade-in-up stagger-${index + 1}`}
            >
              <div
                className={styles.actionIcon}
                style={{ backgroundColor: `color-mix(in srgb, ${action.color} 12%, transparent)`, color: action.color }}
              >
                {action.icon}
              </div>
              <div className={styles.actionInfo}>
                <h3 className={styles.actionLabel}>{action.label}</h3>
                <p className={styles.actionDesc}>{action.description}</p>
              </div>
              <ArrowRightIcon style={{ width: 16, height: 16 }} className={styles.actionArrow} />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  return 'Good Evening';
}
