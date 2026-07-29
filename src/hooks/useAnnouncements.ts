/* ============================================
   useAnnouncements Hook (State & LocalStorage)
   DIU Student Welfare System
   ============================================ */

import { useState, useEffect, useCallback } from 'react';
import { mockAnnouncements } from '../data/mockAnnouncements';
import type { Announcement, AnnouncementCategory, User } from '../types';

const ANNOUNCEMENTS_STORAGE_KEY = 'diu-sws-announcements';

export function useAnnouncements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    try {
      const saved = localStorage.getItem(ANNOUNCEMENTS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return mockAnnouncements;
  });

  useEffect(() => {
    try {
      localStorage.setItem(ANNOUNCEMENTS_STORAGE_KEY, JSON.stringify(announcements));
    } catch (e) {
      console.error('Failed to save announcements', e);
    }
  }, [announcements]);

  /* Create new announcement */
  const createAnnouncement = useCallback(
    (
      data: { title: string; content: string; category: AnnouncementCategory; isPinned: boolean },
      author: User
    ): Announcement => {
      const newAnc: Announcement = {
        id: `anc-${Date.now()}`,
        authorId: author.id,
        authorName: `${author.fullName} (${author.role === 'admin' ? 'HoD, SWE' : 'SW Rep'})`,
        title: data.title,
        content: data.content,
        category: data.category,
        isPinned: data.isPinned,
        createdAt: new Date().toISOString(),
      };

      setAnnouncements((prev) => [newAnc, ...prev]);
      return newAnc;
    },
    []
  );

  /* Toggle pin status */
  const togglePin = useCallback((id: string) => {
    setAnnouncements((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isPinned: !a.isPinned } : a))
    );
  }, []);

  /* Delete announcement */
  const deleteAnnouncement = useCallback((id: string) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
  }, []);

  return {
    announcements,
    createAnnouncement,
    togglePin,
    deleteAnnouncement,
  };
}
