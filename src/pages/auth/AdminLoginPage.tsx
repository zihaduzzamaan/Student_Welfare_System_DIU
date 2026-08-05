/* ============================================
   AdminLoginPage Component — Dedicated Secured Admin Gateway
   Acadex Platform
   ============================================ */

import { useState, type FormEvent } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { ShieldCheckIcon, LockClosedIcon, EnvelopeIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../hooks/useAuth';
import styles from './AdminLoginPage.module.css';

export default function AdminLoginPage() {
  const { login, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isAuthenticated && user?.role === 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  async function handleAdminSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please provide administrative email and security key.');
      return;
    }

    setIsSubmitting(true);
    const res = await login(email.trim(), password);
    setIsSubmitting(false);

    if (res.success) {
      navigate('/dashboard');
    } else {
      setError(res.error || 'Invalid administrator credentials.');
    }
  }

  return (
    <div className={styles.adminPage}>
      <div className={styles.adminCard}>
        <div className={styles.iconWrapper}>
          <ShieldCheckIcon className={styles.shieldIcon} />
        </div>
        <h1>Acadex Admin Gateway</h1>
        <p className={styles.subtitle}>Secured Administrative Portal Access</p>

        {error && (
          <div className={styles.errorBox}>
            <ExclamationCircleIcon style={{ width: 18, height: 18 }} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleAdminSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label>Admin Email</label>
            <div className={styles.inputWrapper}>
              <EnvelopeIcon className={styles.inputIcon} />
              <input
                type="email"
                placeholder="admin@diu.edu.bd"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>Password / Security Key</label>
            <div className={styles.inputWrapper}>
              <LockClosedIcon className={styles.inputIcon} />
              <input
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" disabled={isSubmitting} className={styles.submitBtn}>
            {isSubmitting ? 'Authenticating...' : 'Authorize Access'}
          </button>
        </form>
      </div>
    </div>
  );
}
