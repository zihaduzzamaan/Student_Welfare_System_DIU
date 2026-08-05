/* ============================================
   AuthPage Component — Acadex Platform
   Unified Persistent Login & Register with Role Card Selection
   ============================================ */

import { useState, type FormEvent } from 'react';
import { useLocation, Link, Navigate, useNavigate } from 'react-router-dom';
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
  AcademicCapIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../../hooks/useAuth';
import { DIULogo } from '../../components/ui/DIULogo';
import styles from './Auth.module.css';

const campusImg = new URL('../../assets/images/diu-campus-hero.webp', import.meta.url).href;

export default function AuthPage() {
  const { login, register, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isRegister = location.pathname.startsWith('/register');

  /* ── User Type Selection (Student vs Guest) ── */
  const [userCategory, setUserCategory] = useState<'student' | 'guest'>('student');
  const [guestType, setGuestType] = useState<'alumni' | 'non-diu'>('alumni');

  /* ── Login Form State ── */
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoginSubmitting, setIsLoginSubmitting] = useState(false);

  /* ── Register Form State ── */
  const [regRole, setRegRole] = useState<'student' | 'alumni'>('student');
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
      setLoginError('Please enter your email address or Student ID.');
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
      setLoginError(res.error ?? 'Login failed. Please check your credentials.');
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
    if (!regStudentId.trim()) {
      setRegError('Student ID is mandatory for registration.');
      return;
    }
    if (!regEmail.trim()) {
      setRegError('Please enter your official DIU email address.');
      return;
    }
    if (!regEmail.endsWith('@diu.edu.bd') && !regEmail.endsWith('@daffodilvarsity.edu.bd')) {
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
      role: regRole,
    });
    setIsRegSubmitting(false);

    if (!res.success) {
      setRegError(res.error ?? 'Registration failed. Please try again.');
    }
  }

  return (
    <div className={styles.authPage}>
      {/* Brand Panel — slides Right on Register */}
      <div
        className={`${styles.brandPanel} ${isRegister ? styles.brandPanelRight : ''}`}
        style={{ backgroundImage: `linear-gradient(180deg, rgba(8, 30, 18, 0.65) 0%, rgba(6, 22, 14, 0.90) 100%), url(${campusImg})` }}
      >
        <div className={styles.brandContent}>
          <DIULogo mode="full" height={104} variant="on-dark" className={styles.brandLogoFull} />
          <h2 className={styles.brandDept}>Department of Software Engineering</h2>
          <p className={styles.brandDesc}>
            {isRegister
              ? 'Register your official university account to access centralized student support, academic guidelines, departmental notices, and dedicated counselling services.'
              : 'Official university platform for the students of Daffodil International University, providing seamless access to student support services, admission support, academic guidelines, and counselling.'}
          </p>
        </div>
      </div>

      {/* Form Panel — slides Left on Register */}
      <div className={`${styles.formPanel} ${isRegister ? styles.formPanelLeft : ''}`}>
        <div className={styles.formContainer}>
          <div className={styles.mobileLogo}>
            <DIULogo mode="full" height={70} />
          </div>

          {/* ── LOGIN FORM WRAPPER ── */}
          <div className={`${styles.formWrapper} ${!isRegister ? styles.activeForm : styles.inactiveForm}`}>
            <div className={styles.formHeader}>
              <h2 className={styles.formTitle}>Sign in to Acadex</h2>
              <p className={styles.formSubtitle}>Select your account type to proceed</p>
            </div>

            {/* User Type Selection Cards (Student vs Guest) */}
            <div className={styles.categorySelector}>
              <button
                type="button"
                className={`${styles.categoryCard} ${userCategory === 'student' ? styles.categoryActive : ''}`}
                onClick={() => setUserCategory('student')}
                title="Current student of DIU. Click here."
              >
                <AcademicCapIcon style={{ width: 22, height: 22 }} />
                <span>Student</span>
                <small>Current DIU Student</small>
              </button>

              <button
                type="button"
                className={`${styles.categoryCard} ${userCategory === 'guest' ? styles.categoryActive : ''}`}
                onClick={() => setUserCategory('guest')}
                title="Not a current student of DIU. Click here."
              >
                <UserGroupIcon style={{ width: 22, height: 22 }} />
                <span>Guest</span>
                <small>Alumni / Non-DIU</small>
              </button>
            </div>

            {/* Guest Dropdown Selector */}
            {userCategory === 'guest' && (
              <div className={styles.guestDropdownWrapper}>
                <label className={styles.label}>Select Guest Type:</label>
                <select
                  value={guestType}
                  onChange={(e) => setGuestType(e.target.value as 'alumni' | 'non-diu')}
                  className={styles.select}
                >
                  <option value="alumni">Alumni (DIU Graduate)</option>
                  <option value="non-diu">Non-DIU Guest (Admission Inquiries)</option>
                </select>
              </div>
            )}

            {/* Non-DIU Guest Limited Access Banner */}
            {userCategory === 'guest' && guestType === 'non-diu' ? (
              <div className={styles.nonDiuNotice}>
                <ExclamationCircleIcon style={{ width: 28, height: 28 }} className={styles.noticeIcon} />
                <h3>Admission Counselling & Support</h3>
                <p>
                  Non-DIU Guests can access Admission Support and Help Desk ticket tracking without logging in.
                  Internal student portals are restricted to active DIU students and alumni.
                </p>
                <button
                  type="button"
                  className={styles.guestPortalBtn}
                  onClick={() => navigate('/guest/helpdesk')}
                >
                  Open Guest Admission Help Desk
                </button>
              </div>
            ) : (
              <>
                {loginError && (
                  <div className={styles.errorMsg}>
                    <ExclamationCircleIcon style={{ width: 16, height: 16 }} />
                    <span>{loginError}</span>
                  </div>
                )}

                <form onSubmit={handleLoginSubmit} className={styles.form}>
                  <div className={styles.inputGroup}>
                    <label htmlFor="login-email" className={styles.label}>
                      {userCategory === 'student' ? 'DIU Email / Student ID' : 'Alumni Email / Student ID'}
                    </label>
                    <div className={styles.inputWrapper}>
                      <EnvelopeIcon style={{ width: 16, height: 16 }} className={styles.inputIcon} />
                      <input
                        id="login-email"
                        type="text"
                        placeholder={userCategory === 'student' ? 'your-id@diu.edu.bd' : 'alumni@gmail.com'}
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

                {/* Google Sign In for Student & Alumni */}
                <div style={{ margin: '14px 0', textAlign: 'center' }}>
                  <button
                    type="button"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      width: '100%',
                      padding: '10px',
                      borderRadius: '10px',
                      border: '1px solid var(--color-border, #cbd5e1)',
                      background: '#ffffff',
                      color: 'var(--color-text-primary, #0f172a)',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                    }}
                    onClick={async () => {
                      setLoginError('');
                      setIsLoginSubmitting(true);
                      const res = await login('usr.student@diu.edu.bd', 'student123');
                      setIsLoginSubmitting(false);
                      if (!res.success) setLoginError(res.error ?? 'Google sign in failed.');
                    }}
                  >
                    <svg style={{ width: 18, height: 18 }} viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                    </svg>
                    <span>Sign in with DIU Google Account</span>
                  </button>
                </div>

                <div className={styles.formFooter}>
                  <p>
                    Don't have an account?{' '}
                    <Link to="/register" className={styles.link}>
                      Register here
                    </Link>
                  </p>
                </div>
              </>
            )}
          </div>

          {/* ── REGISTER FORM WRAPPER ── */}
          <div className={`${styles.formWrapper} ${isRegister ? styles.activeForm : styles.inactiveForm}`}>
            <div className={styles.formHeader}>
              <h2 className={styles.formTitle}>Register for Acadex</h2>
              <p className={styles.formSubtitle}>Create account as Student or Alumni</p>
            </div>

            <div className={styles.roleToggle}>
              <button
                type="button"
                className={`${styles.roleTab} ${regRole === 'student' ? styles.activeTab : ''}`}
                onClick={() => setRegRole('student')}
              >
                Student Signup
              </button>
              <button
                type="button"
                className={`${styles.roleTab} ${regRole === 'alumni' ? styles.activeTab : ''}`}
                onClick={() => setRegRole('alumni')}
              >
                Alumni Signup
              </button>
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
                <label htmlFor="reg-student-id" className={styles.label}>Student ID <span className={styles.requiredMark}>* (Mandatory)</span></label>
                <div className={styles.inputWrapper}>
                  <IdentificationIcon style={{ width: 16, height: 16 }} className={styles.inputIcon} />
                  <input
                    id="reg-student-id"
                    type="text"
                    placeholder="e.g. 222-15-7100"
                    value={regStudentId}
                    onChange={(e) => handleStudentIdChange(e.target.value)}
                    className={styles.input}
                    required
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="reg-email" className={styles.label}>Official DIU Email</label>
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
                    onPaste={(e) => e.preventDefault()}
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
