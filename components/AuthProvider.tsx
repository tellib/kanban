'use client';

import { createContext, useEffect, useState, ReactNode, FC } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { getSession } from '@/lib/auth';

interface AuthState {
  session: Session | null;
  user: User | null;
}

const initialState: AuthState = { session: null, user: null };

export const AuthContext = createContext<AuthState>(initialState);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AuthState>(initialState);

  useEffect(() => {
    getSession().then((session) => {
      setState({ session, user: session?.user ?? null });
    });
  }, []);

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};
