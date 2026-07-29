/* ============================================
   AppLayout Component — Root Layout Wrapper
   DIU Student Welfare System
   ============================================ */

import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import styles from './AppLayout.module.css';

export function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={styles.layout}>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className={styles.mainArea}>
        <Navbar
          onMenuToggle={() => setSidebarOpen((prev) => !prev)}
        />
        <main className={styles.content}>
          <div className={styles.contentInner}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
