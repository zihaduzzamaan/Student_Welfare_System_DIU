/* ============================================
   useCounselling Hook (State & LocalStorage)
   DIU Student Welfare System
   ============================================ */

import { useState, useEffect, useCallback } from 'react';
import { mockCounsellingRequests } from '../data/mockCounselling';
import type { CounsellingRequest, CounsellingType, CounsellingStatus, User } from '../types';

const COUNSELLING_STORAGE_KEY = 'diu-sws-counselling';

export function useCounselling() {
  const [requests, setRequests] = useState<CounsellingRequest[]>(() => {
    try {
      const saved = localStorage.getItem(COUNSELLING_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return mockCounsellingRequests;
  });

  useEffect(() => {
    try {
      localStorage.setItem(COUNSELLING_STORAGE_KEY, JSON.stringify(requests));
    } catch (e) {
      console.error('Failed to save counselling requests', e);
    }
  }, [requests]);

  /* Create new request */
  const createRequest = useCallback(
    (
      data: {
        type: CounsellingType;
        description: string;
        preferredDate: string;
        preferredTime: string;
      },
      student: User
    ): CounsellingRequest => {
      const newReq: CounsellingRequest = {
        id: `cns-${Date.now()}`,
        studentId: student.id,
        studentName: student.fullName,
        type: data.type,
        description: data.description,
        preferredDate: data.preferredDate || null,
        preferredTime: data.preferredTime || null,
        status: 'pending',
        assignedTo: null,
        assignedName: null,
        createdAt: new Date().toISOString(),
      };

      setRequests((prev) => [newReq, ...prev]);
      return newReq;
    },
    []
  );

  /* Update status / assign staff */
  const updateRequestStatus = useCallback(
    (id: string, status: CounsellingStatus, staffUser?: User) => {
      setRequests((prev) =>
        prev.map((req) => {
          if (req.id !== id) return req;
          return {
            ...req,
            status,
            assignedTo: staffUser ? staffUser.id : req.assignedTo,
            assignedName: staffUser ? staffUser.fullName : req.assignedName,
          };
        })
      );
    },
    []
  );

  return {
    requests,
    createRequest,
    updateRequestStatus,
  };
}
