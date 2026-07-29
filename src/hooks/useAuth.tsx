/* ============================================
   useAuth Hook (Mock — Phase 1)
   Provides mock authentication context.
   Users start logged out and must login to access the portal.
   Will be replaced with Supabase Auth in Phase 2.
   ============================================ */

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { User, UserRole } from '../types';

/* ── Mock Users Database ── */
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

const SESSION_KEY = 'diu-sws-session';

/* ── Auth Context Type ── */
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

export interface RegisterData {
  fullName: string;
  email: string;
  studentId: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

/* ── Auth Provider ── */
interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /* Restore session on mount */
  useEffect(() => {
    try {
      const savedSession = localStorage.getItem(SESSION_KEY);
      if (savedSession) {
        const parsed = JSON.parse(savedSession) as User;
        setUser(parsed);
      }
    } catch {
      localStorage.removeItem(SESSION_KEY);
    }
    setIsLoading(false);
  }, []);

  /* Persist session changes */
  const persistUser = useCallback((u: User | null) => {
    setUser(u);
    if (u) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(u));
    } else {
      localStorage.removeItem(SESSION_KEY);
    }
  }, []);

  /* Mock Login — simulates async auth */
  const login = useCallback(async (email: string, _password: string): Promise<{ success: boolean; error?: string }> => {
    /* Simulate network delay */
    await new Promise((r) => setTimeout(r, 600));

    const found = MOCK_USERS_DB.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (!found) {
      return { success: false, error: 'No account found with this email. Please register first.' };
    }

    /* In mock mode, any non-empty password works */
    if (!_password || _password.length < 4) {
      return { success: false, error: 'Password must be at least 4 characters.' };
    }

    persistUser(found);
    return { success: true };
  }, [persistUser]);

  /* Mock Register — simulates creating a new account */
  const register = useCallback(async (data: RegisterData): Promise<{ success: boolean; error?: string }> => {
    await new Promise((r) => setTimeout(r, 800));

    /* Check for duplicate email */
    const exists = MOCK_USERS_DB.find(
      (u) => u.email.toLowerCase() === data.email.toLowerCase()
    );
    if (exists) {
      return { success: false, error: 'An account with this email already exists.' };
    }

    /* Validate DIU email */
    if (!data.email.endsWith('@diu.edu.bd')) {
      return { success: false, error: 'Please use your DIU email address (@diu.edu.bd).' };
    }

    /* Create new user */
    const newUser: User = {
      id: `usr-${Date.now()}`,
      fullName: data.fullName,
      studentId: data.studentId || null,
      department: 'SWE',
      role: 'student',
      avatarUrl: null,
      email: data.email,
      createdAt: new Date().toISOString(),
    };

    /* Add to mock DB and login */
    MOCK_USERS_DB.push(newUser);
    persistUser(newUser);
    return { success: true };
  }, [persistUser]);

  const logout = useCallback(() => {
    persistUser(null);
  }, [persistUser]);

  /* Dev tool: switch between mock roles */
  const switchRole = useCallback((role: UserRole) => {
    const mockUser = MOCK_USERS_DB.find((u) => u.role === role);
    if (mockUser) {
      persistUser(mockUser);
    }
  }, [persistUser]);

  const value: AuthContextType = {
    user,
    isAuthenticated: user !== null,
    isLoading,
    login,
    register,
    logout,
    switchRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/* ── Hook ── */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
