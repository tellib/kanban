'use client';

import {
  IconMenu2,
  IconMenu3,
  IconMenu4,
  IconPencil,
  IconTrash,
  IconX,
} from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';
import { CardData } from '@/lib/data';
import { Input } from './Input';
import { Button } from './Button';
import { ContainerModal } from './ContainerModal';
import { TextArea } from './TextArea';
import { useBoard } from '@/hooks/useBoard';
import { Dropdown } from './Dropdown';

export function Card({ card }: { card: CardData }) {
  const { deleteCard, updateCard } = useBoard();
  const [mode, setMode] = useState<'' | 'edit'>('');

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

    if (modalRef.current?.open) {
      modalRef.current.addEventListener('close', () => {
        setMode('');
      });
    }
  }, [mode]);

  if (!card) return <></>;

  const CardContent = () => (
    <div
      className={cn(
        'flex cursor-pointer flex-row items-start gap-2 rounded-md border-2 border-transparent bg-white py-2 pl-4 pr-2 shadow-inner transition duration-150 hover:border-blue-500 hover:ease-linear dark:bg-white/10'
      )}
      onClick={() => setMode('edit')}
    >
      <p className='flex-1 self-center hyphens-auto font-medium'>
        {card.title}
      </p>
      <IconPencil
        strokeWidth={2}
        className='opacity-0 transition-opacity duration-300 hover:opacity-20'
      />
    </div>
  );

  const CardModal = () => {
    if (mode)
      return (
        <ContainerModal size='lg' padding={'md'} gap={'md'} ref={modalRef}>
          <Input
            id='title'
            label='Title'
            ref={titleRef}
            type='text'
            defaultValue={card?.title}
            className='flex-grow text-lg font-bold'
          />

          <TextArea
            id='description'
            ref={descriptionRef}
            defaultValue={card?.description}
            label='Description'
            typeof='text'
          />
          {/* <div className='flex gap-4'>
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
          </div> */}
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
            <Dropdown
              variant={'secondary'}
              title={'Actions'}
              options={[
                {
                  name: 'Delete Card',
                  func: handleDeleteCard,
                  icon: <IconTrash />,
                },
              ]}
            >
              <IconMenu2 size={28} />
            </Dropdown>
          </div>
        </ContainerModal>
      );
  };

  return (
    <>
      <CardContent />
      <CardModal />
    </>
  );
}
