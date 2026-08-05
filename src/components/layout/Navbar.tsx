/* ============================================
   Navbar Component — Acadex Platform
   Modern Navigation Bar with Home, About, Partners, Search Bar & Menu
   ============================================ */

import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Bars3Icon,
  EllipsisVerticalIcon,
  MagnifyingGlassIcon,
  BellIcon,
  ChevronDownIcon,
  ArrowRightOnRectangleIcon,
  UserIcon,
  AcademicCapIcon,
  PencilSquareIcon,
  HomeIcon,
  InformationCircleIcon,
  UserGroupIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../../hooks/useAuth';
import { getInitials } from '../../utils/helpers';
import { DIULogo } from '../ui/DIULogo';
import styles from './Navbar.module.css';

interface NavbarProps {
  onMenuToggle?: () => void;
  pageTitle?: string;
}

export function Navbar({ onMenuToggle, pageTitle }: NavbarProps) {
  const { user, switchRole, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showPartnersModal, setShowPartnersModal] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  /* Close dropdowns when clicking outside */
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <header className={styles.navbar}>
        <div className={styles.left}>
          {/* Mobile Sidebar Toggle Button */}
          {onMenuToggle && (
            <button
              type="button"
              className={styles.sidebarToggleBtn}
              onClick={onMenuToggle}
              aria-label="Toggle navigation drawer"
            >
              <Bars3Icon style={{ width: 22, height: 22 }} />
            </button>
          )}

          <Link to="/" className={styles.brand} aria-label="Go to Acadex Homepage">
            <DIULogo mode="full" height={42} className={styles.brandLogo} />
            {pageTitle && (
              <div className={styles.brandText}>
                <span className={styles.pageTitle}>{pageTitle}</span>
              </div>
            )}
          </Link>

          {/* Navigation Links: Home, About, Partners */}
          <nav className={styles.topNavLinks}>
            <Link to="/" className={styles.navLinkItem}>
              <HomeIcon style={{ width: 16, height: 16 }} />
              <span>Home</span>
            </Link>
            <button
              type="button"
              className={styles.navBtnItem}
              onClick={() => setShowAboutModal(true)}
            >
              <InformationCircleIcon style={{ width: 16, height: 16 }} />
              <span>About</span>
            </button>
            <button
              type="button"
              className={styles.navBtnItem}
              onClick={() => setShowPartnersModal(true)}
            >
              <UserGroupIcon style={{ width: 16, height: 16 }} />
              <span>Partners</span>
            </button>
          </nav>
        </div>

        <div className={styles.right}>
          {/* Search Bar */}
          <div className={styles.searchBox}>
            <MagnifyingGlassIcon className={styles.searchIcon} style={{ width: 16, height: 16 }} />
            <input
              type="text"
              placeholder="Search FAQs, Notices, Guides (Ctrl+K)..."
              className={styles.searchInput}
              id="navbar-search"
            />
          </div>

          {isAuthenticated ? (
            <>
              <button className={styles.iconBtn} aria-label="Notifications" title="Notifications">
                <BellIcon style={{ width: 18, height: 18 }} />
                <span className={styles.notifDot} />
              </button>

              {/* Authenticated User Menu & Profile Dropdown */}
              <div className={styles.profileContainer} ref={dropdownRef}>
                <button
                  type="button"
                  className={styles.userMenuBtn}
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  aria-expanded={isDropdownOpen}
                  aria-label="User profile menu"
                >
                  <div className={styles.avatar}>
                    {user?.avatarUrl ? (
                      <img src={user.avatarUrl} alt="Avatar" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                    ) : user ? (
                      getInitials(user.fullName)
                    ) : (
                      '?'
                    )}
                  </div>
                  <div className={styles.userInfo}>
                    <span className={styles.userName}>{user?.fullName ?? 'Guest'}</span>
                    <span className={styles.userRole}>{user?.role ?? ''}</span>
                  </div>
                  <ChevronDownIcon
                    style={{ width: 14, height: 14 }}
                    className={`${styles.chevron} ${isDropdownOpen ? styles.chevronOpen : ''}`}
                  />
                </button>

                {isDropdownOpen && (
                  <div className={styles.dropdownMenu}>
                    <div className={styles.dropdownHeader}>
                      <div className={styles.dropdownAvatar}>
                        {user?.avatarUrl ? (
                          <img src={user.avatarUrl} alt="Avatar" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                        ) : user ? (
                          getInitials(user.fullName)
                        ) : (
                          '?'
                        )}
                      </div>
                      <div className={styles.dropdownMeta}>
                        <strong className={styles.dropdownName}>{user?.fullName ?? 'Guest User'}</strong>
                        <span className={styles.dropdownEmail}>{user?.email ?? 'student@diu.edu.bd'}</span>
                      </div>
                    </div>

                    <div className={styles.dropdownDivider} />

                    {/* Edit Profile Action Link */}
                    <Link
                      to="/profile"
                      className={styles.dropdownActionItem}
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <PencilSquareIcon style={{ width: 16, height: 16 }} />
                      <span>Edit Profile</span>
                    </Link>

                    <div className={styles.dropdownDivider} />

                    {/* Role Selection Options */}
                    <div className={styles.dropdownSection}>
                      <span className={styles.sectionLabel}>Switch View Role</span>
                      <div className={styles.roleOptions}>
                        <button
                          type="button"
                          className={`${styles.roleOption} ${user?.role === 'student' ? styles.activeRole : ''}`}
                          onClick={() => { switchRole('student'); setIsDropdownOpen(false); }}
                        >
                          <AcademicCapIcon style={{ width: 16, height: 16 }} />
                          <span>Student View</span>
                        </button>
                        <button
                          type="button"
                          className={`${styles.roleOption} ${user?.role === 'representative' ? styles.activeRole : ''}`}
                          onClick={() => { switchRole('representative'); setIsDropdownOpen(false); }}
                        >
                          <UserIcon style={{ width: 16, height: 16 }} />
                          <span>SW Rep View</span>
                        </button>
                        <button
                          type="button"
                          className={`${styles.roleOption} ${user?.role === 'admin' ? styles.activeRole : ''}`}
                          onClick={() => { switchRole('admin'); setIsDropdownOpen(false); }}
                        >
                          <UserIcon style={{ width: 16, height: 16 }} />
                          <span>Admin View</span>
                        </button>
                      </div>
                    </div>

                    <div className={styles.dropdownDivider} />

                    <button
                      type="button"
                      className={styles.logoutBtn}
                      onClick={() => { logout(); setIsDropdownOpen(false); navigate('/login'); }}
                    >
                      <ArrowRightOnRectangleIcon style={{ width: 16, height: 16 }} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className={styles.authLinks}>
              <Link to="/login" className={styles.loginBtn}>Sign In</Link>
              <Link to="/register" className={styles.registerBtn}>Create Account</Link>
            </div>
          )}

          {/* Three-Dot (⋮) Menu Button */}
          <div className={styles.threeDotContainer} ref={menuRef}>
            <button
              type="button"
              className={styles.threeDotBtn}
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label="Three-dot navigation menu"
              title="Navigation Options"
            >
              <EllipsisVerticalIcon style={{ width: 22, height: 22 }} />
            </button>

            {isMenuOpen && (
              <div className={styles.threeDotMenu}>
                <Link to="/" className={styles.threeDotItem} onClick={() => setIsMenuOpen(false)}>
                  <HomeIcon style={{ width: 16, height: 16 }} />
                  <span>Home</span>
                </Link>
                <Link to="/login" className={styles.threeDotItem} onClick={() => setIsMenuOpen(false)}>
                  <ArrowRightOnRectangleIcon style={{ width: 16, height: 16 }} />
                  <span>Login</span>
                </Link>
                <Link to="/register" className={styles.threeDotItem} onClick={() => setIsMenuOpen(false)}>
                  <PencilSquareIcon style={{ width: 16, height: 16 }} />
                  <span>Create Account</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* About Modal */}
      {showAboutModal && (
        <div className={styles.modalOverlay} onClick={() => setShowAboutModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>About Acadex Platform</h3>
              <button className={styles.closeBtn} onClick={() => setShowAboutModal(false)}>
                <XMarkIcon style={{ width: 20, height: 20 }} />
              </button>
            </div>
            <div className={styles.modalBody}>
              <p>
                <strong>Acadex</strong> is the official student welfare and support platform for Daffodil International University (DIU), Department of Software Engineering.
              </p>
              <p style={{ marginTop: '12px' }}>
                It provides centralized access to student help desk ticketing, admission counselling, academic guidelines, freshman handbooks, departmental notices, and dedicated 1-on-1 counselling sessions.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Partners Modal */}
      {showPartnersModal && (
        <div className={styles.modalOverlay} onClick={() => setShowPartnersModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>DIU Academic & Institutional Partners</h3>
              <button className={styles.closeBtn} onClick={() => setShowPartnersModal(false)}>
                <XMarkIcon style={{ width: 20, height: 20 }} />
              </button>
            </div>
            <div className={styles.modalBody}>
              <p>
                Acadex collaborates with internal university clubs, the DIU Career Development Center (CDC), Software Engineering Club (SEC), and external industry partners for student internships and career guidance.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
