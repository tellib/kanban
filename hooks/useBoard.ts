'use client';

import { BoardContext } from '@/components/BoardProvider';
import { useContext } from 'react';

export const useBoard = () => {
  const context = useContext(BoardContext);
  if (context === null) {
    throw new Error('useBoard must be used within a BoardProvider');
  }
  return context;
};
