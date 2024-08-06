'use client';

import {
  IconBook,
  IconCalendar,
  IconCheckbox,
  IconList,
  IconMenu2,
  IconPencil,
  IconTrash,
  IconX,
} from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';
import { CardData } from '@/lib/data';
import { Input } from './Input';
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
      // due_on: dueRef.current?.value
      //   ? new Date(dueRef.current?.value).toISOString()
      //   : undefined,
      // completed_at: completedRef.current?.value
      //   ? new Date(completedRef.current?.value).toISOString()
      //   : undefined,
    };
    updateCard(updatedCard);
  };

  useEffect(() => {
    mode === 'edit' ? modalRef.current?.showModal() : modalRef.current?.close();

    if (modalRef.current?.open) {
      modalRef.current.addEventListener('close', () => {
        handleUpdateCard();
        setMode('');
      });
      modalRef.current?.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
          handleUpdateCard();
          setMode('');
        }
      });
    }
  }, [mode]);

  if (!card) return <></>;

  const CardContent = () => (
    <div
      className={cn(
        'flex cursor-pointer flex-row items-start gap-2 rounded-md border-2 border-transparent bg-white py-2 pl-4 pr-2 shadow-sm transition duration-150 hover:border-blue-500 hover:ease-linear dark:bg-white/10'
      )}
      onClick={() => setMode('edit')}
    >
      <p className='relative flex-1 self-center hyphens-auto font-medium'>
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
        <ContainerModal size='lg' padding={'lg'} gap={'md'} ref={modalRef}>
          <div className='flex items-center gap-4'>
            <IconBook size={24} />
            <Input
              id='title'
              ref={titleRef}
              type='text'
              defaultValue={card?.title}
              className='text-xl font-bold'
              variant={'unstyled'}
            />
            <IconX
              strokeWidth={2}
              className='cursor-pointer'
              onClick={() => setMode('')}
            />
          </div>
          <div className='flex gap-4'>
            <IconList size={24} />
            <TextArea
              id='description'
              ref={descriptionRef}
              defaultValue={card?.description}
              label='Description'
              typeof='text'
              placeholder='Add a description...'
            />
          </div>
          {/* <div className='flex gap-4'>
            <IconCalendar size={24} />
            <div className='flex flex-grow gap-8'>
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
          </div> */}
          {/* <div className='flex gap-4'>
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
          </div> */}
          {/* <div className='flex gap-4'>
            <IconCheckbox size={24} />
            <div className='flex flex-col gap-2'>
              <h3 className='font-medium'>Checklist</h3>
              <div className='flex items-center gap-2'>
                <input
                  id='accent'
                  type='checkbox'
                  className='h-5 w-5 accent-blue-500'
                  checked
                />
                <label htmlFor='accent'> Customzied </label>
              </div>
            </div>
          </div> */}
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
