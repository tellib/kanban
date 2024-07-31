'use client';

import { IconPencil, IconX } from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';
import { CardData } from '@/lib/data';
import { CardWindow } from './CardWindow';

interface CardProps {
  data: CardData;
  onDelete: (id: number) => void;
  onUpdate: (card: CardData) => void;
}

export function Card({ data, onDelete, onUpdate }: CardProps) {
  const [card, setCard] = useState<CardData>(data);
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const modalRef = useRef<HTMLDialogElement>(null);

  const handleDeleteCard = (id: number) => {
    onDelete(id);
  };

  const handleUpdateCard = (uCard: CardData) => {
    setCard(uCard);
    onUpdate(uCard);
  };

  useEffect(() => {
    isOpen
      ? (modalRef.current?.showModal(),
        modalRef.current?.addEventListener('close', () => {
          setIsOpen(false);
        }))
      : modalRef.current?.close();
  }, [isOpen]);

  if (!card) return <></>;

  const CardContent = () => (
    <div
      className={cn(
        'flex cursor-pointer flex-row items-start gap-2 rounded-md border-2 border-transparent bg-white py-2 pl-4 pr-2 shadow-inner transition duration-150 hover:border-blue-500 hover:ease-linear dark:bg-white/10'
      )}
      onClick={() => setIsOpen(true)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <p className='flex-1 self-center font-medium'>{card.title}</p>

      <IconPencil
        strokeWidth={2}
        className={cn(
          'rounded-md transition ease-linear hover:shadow-sm hover:ring-1 dark:hover:bg-white/10',
          isHovered ? 'opacity-100' : 'opacity-0'
        )}
      />
      <span className='font-mono text-black/20 dark:text-white/20'>
        {card.id}
      </span>
    </div>
  );

  return (
    <>
      <CardContent />
      {isOpen && (
        <CardWindow
          data={card}
          ref={modalRef}
          onClose={() => setIsOpen(false)}
          onDelete={handleDeleteCard}
          onUpdate={handleUpdateCard}
        />
      )}
    </>
  );
}
