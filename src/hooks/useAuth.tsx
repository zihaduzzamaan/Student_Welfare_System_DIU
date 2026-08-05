/* ============================================
   useAuth Hook — Acadex Platform
   Supports MySQL (XAMPP) & Session-Preserving Local Storage
   ============================================ */

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { User, UserRole } from '../types';
import { apiLogin, apiRegister, apiUpdateProfile } from '../services/api';

/* ── Mock Users Database for Offline Mode ── */
const MOCK_USERS_DB: User[] = [
  {
    id: 'usr-student-001',
    fullName: 'Zishan Ahmed',
    studentId: '222-15-7100',
    department: 'SWE',
    role: 'student',
    avatarUrl: null,
    email: 'zishan15-7100@diu.edu.bd',
    createdAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 'usr-rep-001',
    fullName: 'Fariha Rahman',
    studentId: '222-15-7050',
    department: 'SWE',
    role: 'representative',
    avatarUrl: null,
    email: 'fariha15-7050@diu.edu.bd',
    createdAt: '2024-01-10T00:00:00Z',
  },
  {
    id: 'usr-admin-001',
    fullName: 'Dr. Touhid Bhuiyan',
    studentId: null,
    department: 'SWE',
    role: 'admin',
    avatarUrl: null,
    email: 'touhid.swe@diu.edu.bd',
    createdAt: '2023-06-01T00:00:00Z',
  },
];

const SESSION_KEY = 'acadex-user-session';
const ORIGINAL_USER_KEY = 'acadex-original-user';

/* ── Auth Context Type ── */
interface AuthContextType {
  user: User | null;
  originalUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  updateProfile: (profileData: Partial<User>) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

export interface RegisterData {
  fullName: string;
  email: string;
  studentId: string;
  password: string;
  role?: UserRole;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [originalUser, setOriginalUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /* Restore session on mount */
  useEffect(() => {
    try {
      const savedSession = localStorage.getItem(SESSION_KEY);
      const savedOriginal = localStorage.getItem(ORIGINAL_USER_KEY);
      if (savedSession) {
        const parsed = JSON.parse(savedSession) as User;
        setUser(parsed);
        setOriginalUser(savedOriginal ? JSON.parse(savedOriginal) : parsed);
      }
    } catch {
      localStorage.removeItem(SESSION_KEY);
      localStorage.removeItem(ORIGINAL_USER_KEY);
    }
    setIsLoading(false);
  }, []);

  /* Persist session changes */
  const persistSession = useCallback((active: User | null, orig?: User | null) => {
    setUser(active);
    const mainUser = orig !== undefined ? orig : active;
    setOriginalUser(mainUser);

    if (active) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(active));
    } else {
      localStorage.removeItem(SESSION_KEY);
    }

    if (mainUser) {
      localStorage.setItem(ORIGINAL_USER_KEY, JSON.stringify(mainUser));
    } else {
      localStorage.removeItem(ORIGINAL_USER_KEY);
    }
  }, []);

  /* Login — tries MySQL API first, falls back to local DB */
  const login = useCallback(async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const apiRes = await apiLogin(email, password);
    if (apiRes.success && apiRes.user) {
      persistSession(apiRes.user, apiRes.user);
      return { success: true };
    }

    /* Fallback local mock login */
    const found = MOCK_USERS_DB.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!found) {
      return { success: false, error: 'No user account found with this email. Please register.' };
    }
    if (!password || password.length < 4) {
      return { success: false, error: 'Password must be at least 4 characters.' };
    }

    persistSession(found, found);
    return { success: true };
  }, [persistSession]);

  /* Register — tries MySQL API first, falls back to local DB */
  const register = useCallback(async (data: RegisterData): Promise<{ success: boolean; error?: string }> => {
    /* Enforce DIU Domain check */
    const cleanEmail = data.email.trim().toLowerCase();
    if (!cleanEmail.endsWith('@diu.edu.bd') && !cleanEmail.endsWith('@daffodilvarsity.edu.bd')) {
      return { success: false, error: 'Please use an official DIU email address (@diu.edu.bd).' };
    }

    const apiRes = await apiRegister(data);
    if (apiRes.success && apiRes.user) {
      persistSession(apiRes.user, apiRes.user);
      return { success: true };
    }

    /* Fallback local mock register */
    const exists = MOCK_USERS_DB.find((u) => u.email.toLowerCase() === cleanEmail);
    if (exists) {
      return { success: false, error: 'An account with this email already exists.' };
    }

    const newUser: User = {
      id: `usr-${Date.now()}`,
      fullName: data.fullName,
      studentId: data.studentId || null,
      department: 'SWE',
      role: data.role || 'student',
      avatarUrl: null,
      email: cleanEmail,
      createdAt: new Date().toISOString(),
    };

    MOCK_USERS_DB.push(newUser);
    persistSession(newUser, newUser);
    return { success: true };
  }, [persistSession]);

  /* Update Profile */
  const updateProfile = useCallback(async (profileData: Partial<User>): Promise<{ success: boolean; error?: string }> => {
    if (!user) return { success: false, error: 'User is not logged in.' };

    const updated = { ...user, ...profileData };
    
    /* Try API update */
    await apiUpdateProfile(user.id, profileData);

    /* Update local state */
    const isOriginal = originalUser?.id === user.id;
    persistSession(updated, isOriginal ? updated : originalUser);
    return { success: true };
  }, [user, originalUser, persistSession]);

  /* Logout */
  const logout = useCallback(() => {
    persistSession(null, null);
  }, [persistSession]);

  /* Role Switch Fix — preserves original User identity when returning! */
  const switchRole = useCallback((targetRole: UserRole) => {
    if (!user) return;

    /* If switching back to the authenticated user's actual role, restore original user! */
    if (originalUser && originalUser.role === targetRole) {
      setUser(originalUser);
      localStorage.setItem(SESSION_KEY, JSON.stringify(originalUser));
      return;
    }

    /* Temporarily preview role with original user's identity */
    const previewUser: User = {
      ...user,
      role: targetRole,
    };
    setUser(previewUser);
    localStorage.setItem(SESSION_KEY, JSON.stringify(previewUser));
  }, [user, originalUser]);

  const value: AuthContextType = {
    user,
    originalUser,
    isAuthenticated: user !== null,
    isLoading,
    login,
    register,
    updateProfile,
    logout,
    switchRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
