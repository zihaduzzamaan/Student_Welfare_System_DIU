/* ============================================
   Router Configuration
   DIU Student Welfare System
   
   Auth-gated: All portal routes require login.
   Login & Register are public routes without layout.
   ============================================ */

import { lazy, Suspense } from 'react';
import { createHashRouter, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout.tsx';
import { AuthGuard } from './components/layout/AuthGuard.tsx';

/* ── Lazy-loaded pages ── */
const HomePage = lazy(() => import('./pages/HomePage.tsx'));
const SubmitTicket = lazy(() => import('./pages/helpdesk/SubmitTicket.tsx'));
const MyTickets = lazy(() => import('./pages/helpdesk/MyTickets.tsx'));
const ManageTickets = lazy(() => import('./pages/helpdesk/ManageTickets.tsx'));
const AcademicCenter = lazy(() => import('./pages/academic/AcademicCenter.tsx'));
const FreshmanGuide = lazy(() => import('./pages/academic/FreshmanGuide.tsx'));
const AcademicPolicies = lazy(() => import('./pages/academic/AcademicPolicies.tsx'));
const FAQ = lazy(() => import('./pages/academic/FAQ.tsx'));
const Announcements = lazy(() => import('./pages/announcements/Announcements.tsx'));
const CreateAnnouncement = lazy(() => import('./pages/announcements/CreateAnnouncement.tsx'));
const RequestCounselling = lazy(() => import('./pages/counselling/RequestCounselling.tsx'));
const ManageCounselling = lazy(() => import('./pages/counselling/ManageCounselling.tsx'));
const AnalyticsDashboard = lazy(() => import('./pages/dashboard/AnalyticsDashboard.tsx'));
const AuthPage = lazy(() => import('./pages/auth/AuthPage.tsx'));

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
      Loading...
    </div>
  );
}

/* Wrap lazy components in Suspense */
function withSuspense(Component: React.ComponentType) {
  return (
    <Suspense fallback={<PageLoader />}>
      <Component />
    </Suspense>
  );
}

/* ── App Router ── */
export const router = createHashRouter([
  /* ── Public Auth Routes (Shared AuthPage for smooth GPU slide transitions) ── */
  { path: '/login', element: withSuspense(AuthPage) },
  { path: '/register', element: withSuspense(AuthPage) },

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

      /* Help Desk */
      { path: 'helpdesk/submit', element: withSuspense(SubmitTicket) },
      { path: 'helpdesk/my-tickets', element: withSuspense(MyTickets) },
      { path: 'helpdesk/manage', element: withSuspense(ManageTickets) },

      /* Academic Info Center */
      { path: 'academic', element: withSuspense(AcademicCenter) },
      { path: 'academic/freshman-guide', element: withSuspense(FreshmanGuide) },
      { path: 'academic/policies', element: withSuspense(AcademicPolicies) },
      { path: 'academic/faq', element: withSuspense(FAQ) },

      /* Announcements */
      { path: 'announcements', element: withSuspense(Announcements) },
      { path: 'announcements/create', element: withSuspense(CreateAnnouncement) },

      /* Counselling */
      { path: 'counselling/request', element: withSuspense(RequestCounselling) },
      { path: 'counselling/manage', element: withSuspense(ManageCounselling) },

      /* Dashboard */
      { path: 'dashboard', element: withSuspense(AnalyticsDashboard) },

      /* Catch-all redirect */
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]);
