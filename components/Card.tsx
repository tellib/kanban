'use client';

import { forwardRef, useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';
import { CardData } from '@/models/data';
import axios from '@/lib/axios';

interface CardProps {
  card: CardData;
}

export function Card({ card }: CardProps) {
  const [items, setItems] = useState<CardData>(card);
  // const [editMode, setEditMode] = useState(false);
  // const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className={cn(
        'rounded-md border-2 border-transparent bg-slate-100 px-4 py-2 shadow-inner backdrop-blur-sm transition duration-150 ease-out hover:border-blue-500 hover:ease-in dark:bg-slate-700'
      )}
    >
      {items.title}
    </div>
  );
}
