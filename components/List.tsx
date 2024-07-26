'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from './Button';
import { Card } from './Card';
import { ListData, CardData } from '@/models/data';
import { IconCheck, IconDots, IconPlus, IconX } from '@tabler/icons-react';
import { Input } from './Input';
import { addCard } from '@/lib/card';
import { useSession } from '@/hooks/useSession';

interface ListProps {
  list: ListData;
}

export const List = ({ list }: ListProps) => {
  const [cards, setCards] = useState<CardData[]>(list.cards as CardData[]);
  const [addMode, setAddMode] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const session = useSession();

  const handleAdd = () => {
    if (!inputRef.current?.value || !list.id) return;
    const card: CardData = {
      description: inputRef.current.value,
      user_id: session?.user.id,
      list_id: list.id,
    };
    addCard(card).then((data) => {
      if (data) {
        inputRef.current?.blur();
        setAddMode(false);
        cards ? setCards([...cards, data[0]]) : setCards([data[0]]);
      } else {
        // TODO handle error
      }
    });
  };

  useEffect(() => {
    if (addMode) {
      inputRef.current?.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setAddMode(false);
        }
        if (e.key === 'Enter') {
          if (inputRef.current?.value !== '') {
            handleAdd();
          }
          setAddMode(false);
        }
      });
      inputRef.current?.focus();
    }
  }, [addMode]);

  return (
    <div className='flex h-max max-h-full min-w-full snap-center snap-always flex-col rounded-lg bg-white/70 shadow-xl ring-1 ring-inset ring-white/70 backdrop-blur sm:w-72 sm:min-w-72 dark:bg-black/70 dark:ring-black/70'>
      <div className='mx-2 flex items-center justify-between py-2 text-lg font-semibold dark:text-white'>
        <h1 className='truncate px-2'>{list.title}</h1>
        <div className='flex'>
          <Button variant={'hover'}>
            <IconX size={24} />
          </Button>
          <Button variant={'hover'}>
            <IconDots size={24} />
          </Button>
        </div>
      </div>
      <div className='flex flex-col gap-y-2 overflow-y-scroll px-2 py-0'>
        {cards ? (
          cards.map((item) => <Card key={'c' + item.id} card={item} />)
        ) : (
          <div className='py-0'>
            <div className='border-2 border-transparent px-2 py-2'>
              <p className='font-medium text-black/20 dark:text-white/20'>
                No cards yet
              </p>
            </div>
          </div>
        )}
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
                onClick={() => handleAdd()}
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
