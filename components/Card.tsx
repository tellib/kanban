'use client';

import { IconPencil, IconTrash, IconX } from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';
import { CardData } from '@/lib/data';
import { Input } from './Input';
import { Button } from './Button';
import { Modal } from './Modal';
import { TextArea } from './TextArea';
import { useBoard } from '@/hooks/useBoard';

export function Card({ card }: { card: CardData }) {
  const { deleteCard, updateCard } = useBoard();
  const [mode, setMode] = useState('');

  const modalRef = useRef<HTMLDialogElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const dueRef = useRef<HTMLInputElement>(null);
  const completedRef = useRef<HTMLInputElement>(null);

  const handleDeleteCard = () => {
    deleteCard(card.id as number);
  };

  const handleUpdateCard = () => {
    const updatedCard: CardData = {
      ...card,
      title: titleRef.current?.value || '',
      description: descriptionRef.current?.value || '',
      // due_on: dueRef.current?.value || '',
      // completed_at: completedRef.current?.value || '',
    };
    updateCard(updatedCard);
  };

  useEffect(() => {
    mode === 'edit'
      ? (modalRef.current?.showModal(),
        modalRef.current?.addEventListener('close', () => {
          setMode('');
        }))
      : modalRef.current?.close();
  }, [mode]);

  if (!card) return <></>;

  const CardContent = () => (
    <div
      className={cn(
        'flex cursor-pointer flex-row items-start gap-2 rounded-md border-2 border-transparent bg-white py-2 pl-4 pr-2 shadow-inner transition duration-150 hover:border-blue-500 hover:ease-linear dark:bg-white/10'
      )}
      onClick={() => setMode('edit')}
      onMouseEnter={() => setMode('hovered')}
      onMouseLeave={() => setMode('')}
    >
      <p className='flex-1 self-center hyphens-auto font-medium'>
        {card.title}
      </p>
      <IconPencil
        strokeWidth={2}
        className={cn(mode === 'hovered' ? 'opacity-50' : 'opacity-0')}
      />
    </div>
  );

  const CardModal = () => {
    if (mode)
      return (
        <Modal size='lg' ref={modalRef}>
          <Input
            id='title'
            ref={titleRef}
            type='text'
            defaultValue={card?.title}
            label='Title'
            className='text-lg font-bold'
          />
          <TextArea
            id='description'
            ref={descriptionRef}
            defaultValue={card?.description}
            label='Description'
            typeof='text'
          />
          <div>
            <Button onClick={() => handleDeleteCard()} className=''>
              <IconTrash />
              <p>Delete</p>
            </Button>
          </div>
          <div className='flex gap-4'>
            <Input
              id='due'
              ref={dueRef}
              type='date'
              defaultValue={card?.due_on}
              label='Due Date'
            />
            <Input
              id='completed'
              ref={completedRef}
              type='date'
              defaultValue={card?.completed_at}
              label='Completed'
            />
          </div>
          <div className='flex gap-4'>
            <Button
              variant={'secondary'}
              onClick={() => setMode('')}
              className='w-full'
            >
              Cancel
            </Button>
            <Button onClick={() => handleUpdateCard()} className='w-full'>
              Save
            </Button>
          </div>
        </Modal>
      );
  };

  return (
    <>
      <CardContent />
      <CardModal />
    </>
  );
}
