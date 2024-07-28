'use client';

import { IconX } from '@tabler/icons-react';
import { useState } from 'react';

import { cn } from '@/lib/utils';
import { CardData } from '@/models/data';
import { deleteCard } from '@/lib/card';

interface CardProps {
  card: CardData;
}

export function Card({ card }: CardProps) {
  const [data, setData] = useState<CardData | null>(card as CardData);
  const [isHovered, setIsHovered] = useState(false);
  // const inputRef = useRef<HTMLInputElement>(null);

  const handleDeleteCard = () => {
    if (!data || !data.id) return;
    deleteCard(data.id).then((data) => {
      if (data) {
        console.log('Deleted card', data);
        setData(null);
      }
    });
  };

  if (!data) return <></>;

  return (
    <div
      className={cn(
        'flex flex-row items-start gap-2 rounded-md border-2 border-transparent bg-white py-2 pl-4 pr-2 transition duration-150 hover:border-blue-500 hover:ease-linear dark:bg-white/10'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <p
        onClick={() => console.log('Clicked on card', data.id)}
        className='flex-1 self-center font-medium'
      >
        {data.description}
      </p>
      <IconX
        strokeWidth={2}
        {...(isHovered
          ? {
              className:
                'opacity-100 transition hover:bg-black/10 dark:hover:bg-white/10  rounded-md',
            }
          : { className: 'opacity-0' })}
        onClick={() => handleDeleteCard()}
      />
    </div>
  );
}
