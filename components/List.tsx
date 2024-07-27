'use client';

import { useEffect, useRef, useState } from 'react';
import { IconCheck, IconDots, IconPlus, IconX } from '@tabler/icons-react';

import { Input } from './Input';
import { Button } from './Button';
import { Card } from './Card';
import { ListData, CardData } from '@/models/data';

import { useSession } from '@/hooks/useSession';

import { addCard } from '@/lib/card';
import { deleteList, updateList } from '@/lib/list';
import { Dropdown } from './Dropdown';

interface ListProps {
  list: ListData;
}

export const List = ({ list }: ListProps) => {
  const [data, setData] = useState<ListData | null>(list);
  const [cards, setCards] = useState<CardData[]>(data?.cards as CardData[]);
  const [addMode, setAddMode] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const session = useSession();

  const handleAddCard = () => {
    if (!inputRef.current?.value || !data?.id) return;

    const card: CardData = {
      description: inputRef.current.value,
      user_id: session?.user.id,
      list_id: data.id,
    };
    addCard(card).then((data) => {
      if (data) {
        inputRef.current?.blur();
        setAddMode(false);
        cards ? setCards([...cards, data]) : setCards([data]);
      } else console.log('Error adding card');
    });
  };

  function handleUpdateList() {
    if (!data) return;
    updateList(data).then((data) => {
      if (data) setData(data);
      else console.log('Error updating list');
    });
  }

  function handleDeleteList() {
    if (!data || !data.id) return;
    deleteList(data.id).then((data) => {
      if (data) {
        console.log('Deleted list', data);
        setData(null);
      }
    });
  }

  useEffect(() => {
    if (addMode) {
      inputRef.current?.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setAddMode(false);
        }
        if (e.key === 'Enter') {
          if (inputRef.current?.value !== '') {
            handleAddCard();
          }
          setAddMode(false);
        }
      });
      inputRef.current?.focus();
    }
  });

  if (!data) return <></>;

  return (
    <div className='flex h-max max-h-full min-w-full snap-center snap-always flex-col rounded-lg bg-white/70 shadow-xl ring-1 ring-inset ring-white/70 backdrop-blur sm:w-72 sm:min-w-72 dark:bg-black/70 dark:ring-black/70'>
      <div className='mx-2 flex items-center justify-between py-2 text-lg font-semibold dark:text-white'>
        <h1 className='truncate px-2'>{list.title}</h1>
        <div className='flex'>
          <Dropdown
            title={'Actions'}
            options={[
              { name: 'Delete List', func: () => handleDeleteList() },
              { name: 'Edit List name', func: () => {} },
            ]}
          >
            <IconDots size={24} />
          </Dropdown>
        </div>
      </div>
      <div className='flex flex-col gap-y-2 overflow-y-scroll px-2 py-0'>
        {cards?.map((card) => <Card key={card.id} card={card} />)}
      </div>
      <div className='p-2'>
        {!addMode ? (
          <Button
            variant={'hover'}
            className='w-full'
            onClick={() => setAddMode(true)}
          >
            <IconPlus size={18} />
            Add card
          </Button>
        ) : (
          <div className='flex w-full flex-col gap-2'>
            <Input type='text' ref={inputRef} placeholder='Card title' />
            <div className='flex gap-2'>
              <Button
                variant={'hover'}
                className='flex-1 justify-center'
                onClick={() => setAddMode(false)}
              >
                <IconX size={24} stroke={3} />
                <p>Cancel</p>
              </Button>
              <Button
                variant={'hover'}
                className='flex-1 justify-center'
                onClick={() => handleAddCard()}
              >
                <IconCheck size={24} stroke={3} />
                <p>Add</p>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
