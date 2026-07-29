/* ============================================
   Navbar Component
   DIU Student Welfare System
   ============================================ */

import { useState, useRef, useEffect } from 'react';
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  BellIcon,
  ChevronDownIcon,
  ArrowRightOnRectangleIcon,
  UserIcon,
  ShieldCheckIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../../hooks/useAuth';
import { getInitials } from '../../utils/helpers';
import { DIULogo } from '../ui/DIULogo';
import styles from './Navbar.module.css';

interface NavbarProps {
  onMenuToggle: () => void;
  pageTitle?: string;
}

export function Navbar({ onMenuToggle, pageTitle }: NavbarProps) {
  const { user, switchRole, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  /* Close dropdown when clicking outside */
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className={styles.navbar}>
      <div className={styles.left}>
        <div className={styles.brand}>
          <DIULogo mode="full" height={44} className={styles.brandLogo} />
          {pageTitle && (
            <div className={styles.brandText}>
              <span className={styles.pageTitle}>{pageTitle}</span>
            </div>
          )}
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.searchBox}>
          <MagnifyingGlassIcon className={styles.searchIcon} style={{ width: 16, height: 16 }} />
          <input
            type="text"
            placeholder="Search..."
            className={styles.searchInput}
            id="navbar-search"
          />
        </div>

        <button className={styles.iconBtn} aria-label="Notifications">
          <BellIcon style={{ width: 18, height: 18 }} />
          <span className={styles.notifDot} />
        </button>

        {/* Profile Selection & Action Dropdown */}
        <div className={styles.profileContainer} ref={dropdownRef}>
          <button
            type="button"
            className={styles.userMenuBtn}
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            aria-expanded={isDropdownOpen}
            aria-label="User profile menu"
          >
            <div className={styles.avatar}>
              {user ? getInitials(user.fullName) : '?'}
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
              {/* Profile Header */}
              <div className={styles.dropdownHeader}>
                <div className={styles.dropdownAvatar}>
                  {user ? getInitials(user.fullName) : '?'}
                </div>
                <div className={styles.dropdownMeta}>
                  <strong className={styles.dropdownName}>{user?.fullName ?? 'Guest User'}</strong>
                  <span className={styles.dropdownEmail}>{user?.email ?? 'student@diu.edu.bd'}</span>
                </div>
              </div>

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
                    <ShieldCheckIcon style={{ width: 16, height: 16 }} />
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

              {/* Logout Button Inside Profile Dropdown */}
              <button
                type="button"
                className={styles.dropdownLogout}
                onClick={() => {
                  setIsDropdownOpen(false);
                  logout();
                }}
              >
                <ArrowRightOnRectangleIcon style={{ width: 16, height: 16 }} />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>

        {/* Hamburger Menu Toggle (VERY RIGHT END) */}
        <button
          className={styles.menuBtn}
          onClick={onMenuToggle}
          aria-label="Toggle sidebar"
          title="Toggle Navigation Menu"
        >
          <Bars3Icon className="w-5 h-5" style={{ width: 20, height: 20 }} />
        </button>
      </div>
    </header>
  );
}
