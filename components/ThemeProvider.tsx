'use client';

import React, { useEffect, ReactNode } from 'react';
import { initializeTheme } from '@/lib/utils';

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  useEffect(() => {
    initializeTheme();
  }, []);

  return <>{children}</>;
}
