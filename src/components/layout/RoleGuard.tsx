/* ============================================
   RoleGuard Component — Acadex Role Access Control
   Gates routes based on UserRole permission.
   ============================================ */

import { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { ShieldExclamationIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../hooks/useAuth';
import type { UserRole } from '../../types';

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles: UserRole[];
}

export function RoleGuard({ children, allowedRoles }: RoleGuardProps) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const currentRole = user?.role ?? 'student';

  if (!allowedRoles.includes(currentRole)) {
    return (
      <div style={{
        maxWidth: '600px',
        margin: '60px auto',
        padding: '36px',
        background: 'var(--color-surface, #ffffff)',
        border: '1px solid var(--color-border, #e2e8f0)',
        borderRadius: '20px',
        textAlign: 'center',
        boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
      }}>
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: '#fef2f2',
          color: '#ef4444',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px',
        }}>
          <ShieldExclamationIcon style={{ width: 32, height: 32 }} />
        </div>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--color-text-primary, #0f172a)', marginBottom: '8px' }}>
          Access Restricted
        </h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary, #64748b)', lineHeight: 1.5, marginBottom: '20px' }}>
          This feature requires <strong>{allowedRoles.join(' / ').toUpperCase()}</strong> permissions.
          Your current account role is <strong>{currentRole.toUpperCase()}</strong>.
        </p>
        <a
          href="#/"
          style={{
            display: 'inline-block',
            padding: '10px 20px',
            borderRadius: '10px',
            background: 'var(--color-primary, #059669)',
            color: '#ffffff',
            fontWeight: 600,
            textDecoration: 'none',
            fontSize: '0.9rem',
          }}
        >
          Return to Dashboard
        </a>
      </div>
    );
  }

  return <>{children}</>;
}
