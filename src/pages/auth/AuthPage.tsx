/* ============================================
   AuthPage Component — Unified Persistent Login & Register with 90 FPS GPU Slide
   DIU Student Welfare System
   ============================================ */

import { useState, type FormEvent } from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import {
  ArrowRightOnRectangleIcon,
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  UserIcon,
  IdentificationIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
  UserPlusIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../../hooks/useAuth';
import { DIULogo } from '../../components/ui/DIULogo';
import styles from './Auth.module.css';

const campusImg = new URL('../../assets/images/diu-campus-hero.webp', import.meta.url).href;

export default function AuthPage() {
  const { login, register, isAuthenticated } = useAuth();
  const location = useLocation();

  const isRegister = location.pathname.startsWith('/register');

  /* ── Login Form State ── */
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoginSubmitting, setIsLoginSubmitting] = useState(false);

  /* ── Register Form State ── */
  const [regName, setRegName] = useState('');
  const [regStudentId, setRegStudentId] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirm, setRegConfirm] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [regError, setRegError] = useState('');
  const [isRegSubmitting, setIsRegSubmitting] = useState(false);

  /* Already authenticated -> redirect home */
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  /* Handle Login Submit */
  async function handleLoginSubmit(e: FormEvent) {
    e.preventDefault();
    setLoginError('');

    if (!loginEmail.trim()) {
      setLoginError('Please enter your email address.');
      return;
    }
    if (!loginPassword) {
      setLoginError('Please enter your password.');
      return;
    }

    setIsLoginSubmitting(true);
    const res = await login(loginEmail.trim(), loginPassword);
    setIsLoginSubmitting(false);

    if (!res.success) {
      setLoginError(res.error ?? 'Login failed. Please try again.');
    }
  }

  /* Handle Student ID Auto Fill */
  function handleStudentIdChange(val: string) {
    setRegStudentId(val);
    const cleaned = val.trim();
    if (cleaned.length >= 6 && !regEmail) {
      setRegEmail(`${cleaned.toLowerCase()}@diu.edu.bd`);
    }
  }

  /* Password Strength Calculation */
  function getPasswordStrength() {
    if (!regPassword) return { label: '', color: '', level: 0 };
    if (regPassword.length < 4) return { label: 'Too Short', color: 'var(--color-danger)', level: 1 };
    if (regPassword.length < 6) return { label: 'Weak', color: 'var(--color-warning)', level: 2 };
    if (regPassword.length < 8) return { label: 'Fair', color: 'var(--color-accent)', level: 3 };
    return { label: 'Strong', color: 'var(--color-success)', level: 4 };
  }

  const passwordStrength = getPasswordStrength();

  /* Handle Register Submit */
  async function handleRegisterSubmit(e: FormEvent) {
    e.preventDefault();
    setRegError('');

    if (!regName.trim()) {
      setRegError('Please enter your full name.');
      return;
    }
    if (!regEmail.trim()) {
      setRegError('Please enter your email address.');
      return;
    }
    if (!regEmail.endsWith('@diu.edu.bd')) {
      setRegError('Registration is restricted to official DIU email addresses (@diu.edu.bd).');
      return;
    }
    if (regPassword.length < 6) {
      setRegError('Password must be at least 6 characters long.');
      return;
    }
    if (regPassword !== regConfirm) {
      setRegError('Passwords do not match.');
      return;
    }

    setIsRegSubmitting(true);
    const res = await register({
      fullName: regName.trim(),
      email: regEmail.trim(),
      studentId: regStudentId.trim(),
      password: regPassword,
    });
    setIsRegSubmitting(false);

    if (!res.success) {
      setRegError(res.error ?? 'Registration failed. Please try again.');
    }
  }

  return (
    <div
      className={styles.authPage}
      style={{ '--campus-bg': `linear-gradient(180deg, rgba(8, 30, 18, 0.65) 0%, rgba(6, 22, 14, 0.90) 100%), url(${campusImg})` } as React.CSSProperties}
    >
      {/* Brand Panel (Campus Image & Overlay) — slides Right on Register */}
      <div
        className={`${styles.brandPanel} ${isRegister ? styles.brandPanelRight : ''}`}
        style={{ backgroundImage: `linear-gradient(180deg, rgba(8, 30, 18, 0.65) 0%, rgba(6, 22, 14, 0.90) 100%), url(${campusImg})` }}
      >
        <div className={styles.brandContent}>
          <DIULogo mode="full" height={104} variant="on-dark" className={styles.brandLogoFull} />
          <h2 className={styles.brandDept}>Department of Software Engineering</h2>
          <p className={styles.brandDesc}>
            {isRegister
              ? 'Register your official university account to access centralized help desk support, departmental announcements, academic resources, and 1-on-1 faculty counselling.'
              : 'Official university portal for student help desk support, academic guidelines, departmental notices, and dedicated counselling services.'}
          </p>
        </div>
      </div>

      {/* Form Panel — slides Left on Register */}
      <div className={`${styles.formPanel} ${isRegister ? styles.formPanelLeft : ''}`}>
        <div className={styles.formContainer}>
          {/* Mobile Brand Header */}
          <div className={styles.mobileLogo}>
            <DIULogo mode="full" height={40} />
          </div>

          {/* ── LOGIN FORM WRAPPER (Persistent DOM) ── */}
          <div className={`${styles.formWrapper} ${!isRegister ? styles.activeForm : styles.inactiveForm}`}>
            <div className={styles.formHeader}>
              <h2 className={styles.formTitle}>Welcome Back</h2>
              <p className={styles.formSubtitle}>
                Sign in to access the Student Welfare Portal
              </p>
            </div>

            {/* Quick Demo Accounts */}
            <div className={styles.demoNotice}>
              <div className={styles.demoTitle}>Demo Accounts</div>
              <div className={styles.demoAccounts}>
                <button
                  type="button"
                  className={styles.demoAccount}
                  onClick={() => { setLoginEmail('zishan15-7100@diu.edu.bd'); setLoginPassword('demo1234'); setLoginError(''); }}
                >
                  Student
                </button>
                <button
                  type="button"
                  className={styles.demoAccount}
                  onClick={() => { setLoginEmail('fariha15-7050@diu.edu.bd'); setLoginPassword('demo1234'); setLoginError(''); }}
                >
                  Representative
                </button>
                <button
                  type="button"
                  className={styles.demoAccount}
                  onClick={() => { setLoginEmail('touhid.swe@diu.edu.bd'); setLoginPassword('demo1234'); setLoginError(''); }}
                >
                  Admin
                </button>
              </div>
            </div>

            {loginError && (
              <div className={styles.errorMsg}>
                <ExclamationCircleIcon style={{ width: 16, height: 16 }} />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <label htmlFor="login-email" className={styles.label}>Email Address</label>
                <div className={styles.inputWrapper}>
                  <EnvelopeIcon style={{ width: 16, height: 16 }} className={styles.inputIcon} />
                  <input
                    id="login-email"
                    type="email"
                    placeholder="your-id@diu.edu.bd"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className={styles.input}
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="login-password" className={styles.label}>Password</label>
                <div className={styles.inputWrapper}>
                  <LockClosedIcon style={{ width: 16, height: 16 }} className={styles.inputIcon} />
                  <input
                    id="login-password"
                    type={showLoginPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className={styles.input}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className={styles.togglePassword}
                    onClick={() => setShowLoginPassword((v) => !v)}
                    aria-label={showLoginPassword ? 'Hide password' : 'Show password'}
                    tabIndex={-1}
                  >
                    {showLoginPassword ? <EyeSlashIcon style={{ width: 16, height: 16 }} /> : <EyeIcon style={{ width: 16, height: 16 }} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className={styles.submitBtn}
                disabled={isLoginSubmitting}
              >
                {isLoginSubmitting ? (
                  <span className={styles.spinner} />
                ) : (
                  <ArrowRightOnRectangleIcon style={{ width: 18, height: 18 }} />
                )}
                {isLoginSubmitting ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div className={styles.formFooter}>
              <p>
                Don't have an account?{' '}
                <Link to="/register" className={styles.link}>
                  Register here
                </Link>
              </p>
            </div>
          </div>

          {/* ── REGISTER FORM WRAPPER (Persistent DOM) ── */}
          <div className={`${styles.formWrapper} ${isRegister ? styles.activeForm : styles.inactiveForm}`}>
            <div className={styles.formHeader}>
              <h2 className={styles.formTitle}>Create Account</h2>
              <p className={styles.formSubtitle}>
                Register with your DIU email to get started
              </p>
            </div>

            {regError && (
              <div className={styles.errorMsg}>
                <ExclamationCircleIcon style={{ width: 16, height: 16 }} />
                <span>{regError}</span>
              </div>
            )}

            <form onSubmit={handleRegisterSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <label htmlFor="reg-name" className={styles.label}>Full Name</label>
                <div className={styles.inputWrapper}>
                  <UserIcon style={{ width: 16, height: 16 }} className={styles.inputIcon} />
                  <input
                    id="reg-name"
                    type="text"
                    placeholder="e.g. Zishan Ahmed"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className={styles.input}
                    autoComplete="name"
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="reg-student-id" className={styles.label}>Student ID <span className={styles.optional}>(optional)</span></label>
                <div className={styles.inputWrapper}>
                  <IdentificationIcon style={{ width: 16, height: 16 }} className={styles.inputIcon} />
                  <input
                    id="reg-student-id"
                    type="text"
                    placeholder="e.g. 222-15-7100"
                    value={regStudentId}
                    onChange={(e) => handleStudentIdChange(e.target.value)}
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="reg-email" className={styles.label}>DIU Email</label>
                <div className={styles.inputWrapper}>
                  <EnvelopeIcon style={{ width: 16, height: 16 }} className={styles.inputIcon} />
                  <input
                    id="reg-email"
                    type="email"
                    placeholder="your-id@diu.edu.bd"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className={styles.input}
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="reg-password" className={styles.label}>Password</label>
                <div className={styles.inputWrapper}>
                  <LockClosedIcon style={{ width: 16, height: 16 }} className={styles.inputIcon} />
                  <input
                    id="reg-password"
                    type={showRegPassword ? 'text' : 'password'}
                    placeholder="Create a password (min 6 characters)"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className={styles.input}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className={styles.togglePassword}
                    onClick={() => setShowRegPassword((v) => !v)}
                    aria-label={showRegPassword ? 'Hide password' : 'Show password'}
                    tabIndex={-1}
                  >
                    {showRegPassword ? <EyeSlashIcon style={{ width: 16, height: 16 }} /> : <EyeIcon style={{ width: 16, height: 16 }} />}
                  </button>
                </div>
                {regPassword && (
                  <div className={styles.strengthBar}>
                    <div className={styles.strengthTrack}>
                      {[1, 2, 3, 4].map((seg) => (
                        <div
                          key={seg}
                          className={styles.strengthSeg}
                          style={{
                            backgroundColor: seg <= passwordStrength.level
                              ? passwordStrength.color
                              : 'var(--color-border)',
                          }}
                        />
                      ))}
                    </div>
                    <span className={styles.strengthLabel} style={{ color: passwordStrength.color }}>
                      {passwordStrength.label}
                    </span>
                  </div>
                )}
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="reg-confirm" className={styles.label}>Confirm Password</label>
                <div className={styles.inputWrapper}>
                  <LockClosedIcon style={{ width: 16, height: 16 }} className={styles.inputIcon} />
                  <input
                    id="reg-confirm"
                    type={showRegPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    value={regConfirm}
                    onChange={(e) => setRegConfirm(e.target.value)}
                    className={styles.input}
                    autoComplete="new-password"
                  />
                  {regConfirm && regPassword === regConfirm && (
                    <CheckCircleIcon style={{ width: 16, height: 16 }} className={styles.matchIcon} />
                  )}
                </div>
              </div>

              <button
                type="submit"
                className={styles.submitBtn}
                disabled={isRegSubmitting}
              >
                {isRegSubmitting ? (
                  <span className={styles.spinner} />
                ) : (
                  <UserPlusIcon style={{ width: 18, height: 18 }} />
                )}
                {isRegSubmitting ? 'Creating account...' : 'Create Account'}
              </button>
            </form>

            <div className={styles.formFooter}>
              <p>
                Already have an account?{' '}
                <Link to="/login" className={styles.link}>
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
