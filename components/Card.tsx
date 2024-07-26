'use client';

import { forwardRef, useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';
import { CardData } from '@/models/data';
import axios from '@/lib/axios';

interface CardProps {
  card: CardData;
}

export function Card({ card }: CardProps) {
  const [data, setData] = useState<CardData>(card);
  // const [editMode, setEditMode] = useState(false);
  // const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className={cn(
        'rounded-md border-2 border-transparent bg-white px-4 py-2 shadow-inner transition duration-150 hover:border-blue-500 hover:ease-linear dark:bg-white/10'
      )}
    >
      <p className='font-normal'>{data.description}</p>
    </div>
  );
}
