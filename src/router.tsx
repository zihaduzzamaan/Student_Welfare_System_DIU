/* ============================================
   Router Configuration
   Acadex Platform — DIU Student Welfare System
   ============================================ */

import { lazy, Suspense } from 'react';
import { createHashRouter, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { AuthGuard } from './components/layout/AuthGuard';
import { RoleGuard } from './components/layout/RoleGuard';

/* ── Lazy-loaded pages ── */
const HomePage = lazy(() => import('./pages/HomePage'));
const SubmitTicket = lazy(() => import('./pages/helpdesk/SubmitTicket'));
const MyTickets = lazy(() => import('./pages/helpdesk/MyTickets'));
const ManageTickets = lazy(() => import('./pages/helpdesk/ManageTickets'));
const AcademicCenter = lazy(() => import('./pages/academic/AcademicCenter'));
const FreshmanGuide = lazy(() => import('./pages/academic/FreshmanGuide'));
const AcademicPolicies = lazy(() => import('./pages/academic/AcademicPolicies'));
const FAQ = lazy(() => import('./pages/academic/FAQ'));
const Announcements = lazy(() => import('./pages/announcements/Announcements'));
const CreateAnnouncement = lazy(() => import('./pages/announcements/CreateAnnouncement'));
const RequestCounselling = lazy(() => import('./pages/counselling/RequestCounselling'));
const ManageCounselling = lazy(() => import('./pages/counselling/ManageCounselling'));
const AnalyticsDashboard = lazy(() => import('./pages/dashboard/AnalyticsDashboard'));
const EditProfile = lazy(() => import('./pages/dashboard/EditProfile'));
const AuthPage = lazy(() => import('./pages/auth/AuthPage'));
const AdminLoginPage = lazy(() => import('./pages/auth/AdminLoginPage'));
const GuestTicketLookup = lazy(() => import('./pages/helpdesk/GuestTicketLookup'));

/* ── Page Loading Fallback ── */
function PageLoader() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '300px',
      color: 'var(--color-text-tertiary)',
      fontSize: 'var(--text-sm)',
    }}>
      <div className="animate-spin" style={{
        width: 24,
        height: 24,
        border: '2px solid var(--color-border)',
        borderTopColor: 'var(--color-primary)',
        borderRadius: '50%',
        marginRight: 'var(--space-3)',
      }} />
      Loading Acadex...
    </div>
  );
}

function withSuspense(Component: React.ComponentType) {
  return (
    <Suspense fallback={<PageLoader />}>
      <Component />
    </Suspense>
  );
}

/* ── App Router ── */
export const router = createHashRouter([
  /* ── Public Auth & Guest Routes ── */
  { path: '/login', element: withSuspense(AuthPage) },
  { path: '/register', element: withSuspense(AuthPage) },
  { path: '/admin/login', element: withSuspense(AdminLoginPage) },
  { path: '/guest/helpdesk', element: withSuspense(GuestTicketLookup) },

  /* ── Protected Portal Routes (requires authentication) ── */
  {
    path: '/',
    element: (
      <AuthGuard>
        <AppLayout />
      </AuthGuard>
    ),
    children: [
      { index: true, element: withSuspense(HomePage) },

      /* User Profile */
      { path: 'profile', element: withSuspense(EditProfile) },

      /* Help Desk */
      { path: 'helpdesk/submit', element: withSuspense(SubmitTicket) },
      { path: 'helpdesk/my-tickets', element: withSuspense(MyTickets) },
      {
        path: 'helpdesk/manage',
        element: (
          <RoleGuard allowedRoles={['representative', 'admin']}>
            {withSuspense(ManageTickets)}
          </RoleGuard>
        ),
      },

      /* Academic Info Center */
      { path: 'academic', element: withSuspense(AcademicCenter) },
      { path: 'academic/freshman-guide', element: withSuspense(FreshmanGuide) },
      { path: 'academic/policies', element: withSuspense(AcademicPolicies) },
      { path: 'academic/faq', element: withSuspense(FAQ) },

      /* Announcements */
      { path: 'announcements', element: withSuspense(Announcements) },
      {
        path: 'announcements/create',
        element: (
          <RoleGuard allowedRoles={['representative', 'admin']}>
            {withSuspense(CreateAnnouncement)}
          </RoleGuard>
        ),
      },

      /* Counselling */
      { path: 'counselling/request', element: withSuspense(RequestCounselling) },
      {
        path: 'counselling/manage',
        element: (
          <RoleGuard allowedRoles={['representative', 'admin']}>
            {withSuspense(ManageCounselling)}
          </RoleGuard>
        ),
      },

      /* Admin Analytics Dashboard (Strictly for Admin) */
      {
        path: 'dashboard',
        element: (
          <RoleGuard allowedRoles={['admin']}>
            {withSuspense(AnalyticsDashboard)}
          </RoleGuard>
        ),
      },

      /* Catch-all redirect */
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]);
