/* ============================================
   AuthGuard — Route Protection Component
   Redirects unauthenticated users to /login.
   Shows a loading spinner while restoring session.
   ============================================ */

import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import type { ReactNode } from 'react';

interface AuthGuardProps {
  children: ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, isLoading } = useAuth();

  /* Session is being restored from localStorage */
  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'var(--color-bg-primary)',
        flexDirection: 'column',
        gap: 'var(--space-4)',
      }}>
        <div
          className="animate-spin"
          style={{
            width: 32,
            height: 32,
            border: '3px solid var(--color-border)',
            borderTopColor: 'var(--color-primary)',
            borderRadius: '50%',
          }}
        />
        <span style={{
          color: 'var(--color-text-tertiary)',
          fontSize: 'var(--text-sm)',
        }}>
          Loading...
        </span>
      </div>
    );
  }

  /* Not authenticated — redirect to login */
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  /* Authenticated — render protected content */
  return <>{children}</>;
}
