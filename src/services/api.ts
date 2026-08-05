/* ============================================
   Acadex API Service & Data Layer (MySQL & Offline Engine)
   Connects React Frontend to Local Express/MySQL API (XAMPP)
   ============================================ */

import type { User, Ticket } from '../types';

const API_BASE_URL = 'http://localhost:5000/api';

/* Format raw backend user object */
function normalizeUser(rawUser: any): User | undefined {
  if (!rawUser) return undefined;
  return {
    id: rawUser.id,
    fullName: rawUser.fullName || rawUser.full_name || 'Student User',
    email: rawUser.email,
    studentId: rawUser.studentId ?? rawUser.student_id ?? null,
    role: rawUser.role || 'student',
    department: rawUser.department || 'SWE',
    avatarUrl: rawUser.avatarUrl ?? rawUser.avatar_url ?? null,
    contactNumber: rawUser.contactNumber ?? rawUser.contact_number,
    alternateEmail: rawUser.alternateEmail ?? rawUser.alternate_email,
    semester: rawUser.semester,
    bloodGroup: rawUser.bloodGroup ?? rawUser.blood_group,
    address: rawUser.address,
    bio: rawUser.bio,
    createdAt: rawUser.createdAt ?? rawUser.created_at ?? new Date().toISOString(),
  };
}

/* Check if Backend API is available */
export async function checkBackendStatus(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/health`, { signal: AbortSignal.timeout(2000) });
    const data = await res.json();
    return data?.mysql === 'connected';
  } catch {
    return false;
  }
}

/* ── Auth API Calls ── */
export async function apiLogin(email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.success && data.user) {
      data.user = normalizeUser(data.user);
    }
    return data;
  } catch {
    return { success: false, error: 'Could not connect to MySQL server. Please ensure XAMPP MySQL is running.' };
  }
}

export async function apiRegister(data: { fullName: string; email: string; studentId: string; password: string; role?: string }): Promise<{ success: boolean; user?: User; error?: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const resData = await res.json();
    if (resData.success && resData.user) {
      resData.user = normalizeUser(resData.user);
    }
    return resData;
  } catch {
    return { success: false, error: 'Could not connect to MySQL server. Please ensure XAMPP MySQL is running.' };
  }
}

/* ── Profile Update API ── */
export async function apiUpdateProfile(userId: string, profileData: Partial<User>): Promise<{ success: boolean; user?: User; error?: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/users/profile/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profileData),
    });
    const resData = await res.json();
    if (resData.success && resData.user) {
      resData.user = normalizeUser(resData.user);
    }
    return resData;
  } catch {
    return { success: false, error: 'Failed to update profile on MySQL database.' };
  }
}

/* ── Guest Ticket PIN Lookup API ── */
export async function apiLookupTicket(ticketCode: string, accessPin: string): Promise<{ success: boolean; ticket?: Ticket; error?: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/tickets/lookup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ticketCode, accessPin }),
    });
    return await res.json();
  } catch {
    return { success: false, error: 'Failed to query ticket from MySQL server.' };
  }
}
