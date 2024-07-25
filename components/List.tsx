'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from './Button';
import { Card } from './Card';
import { ListData, CardData } from '@/models/data';
import { IconCheck, IconDots, IconPlus, IconX } from '@tabler/icons-react';
import { Input } from './Input';
import { addCard } from '@/lib/db';

interface ListProps {
  list: ListData;
}

export const List = ({ list }: ListProps) => {
  const [items, setItems] = useState<CardData[]>(list.cards as CardData[]);
  const [addMode, setAddMode] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAdd = () => {
    if (!inputRef.current?.value || !list.id) return;
    const card: CardData = {
      title: inputRef.current.value,
      list_id: list.id,
    };
    addCard(card).then((data: CardData) => {
      if (data) {
        inputRef.current?.blur();
        setAddMode(false);
        items ? setItems([...items, data]) : setItems([data]);
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
    <div className='flex h-max max-h-full min-w-full flex-col rounded-lg bg-slate-200 shadow-sm sm:w-72 sm:min-w-72 dark:bg-slate-800'>
      <div className='flex items-center justify-between py-2 text-xl font-semibold sm:text-lg dark:text-white'>
        <h1 className='pl-4'>{list.title}</h1>
        <Button variant={'simple'} className='mr-2 p-2'>
          <IconDots size={24} />
        </Button>
      </div>
      <div className='flex flex-col gap-y-2 overflow-y-scroll px-2 py-0'>
        {items ? (
          items.map((item) => <Card key={'c' + item.id} card={item} />)
        ) : (
          <div className='py-0'>
            <div className='border-2 border-transparent px-2 py-2'>
              No cards yet
            </div>
          </div>
        )}
      </div>
      <div className='flex p-2 text-lg font-medium sm:text-base dark:text-white'>
        {!addMode ? (
          <Button
            variant={'simple'}
            className='flex w-full items-center justify-start gap-1'
            onClick={() => setAddMode(true)}
          >
            <IconPlus size={18} />
            Add card
          </Button>
        ) : (
          <div className='flex w-full flex-col gap-2'>
            <Input type='text' ref={inputRef} />
            <div className='flex gap-2'>
              <Button
                variant={'simple'}
                className='flex flex-1 justify-center bg-red-300'
                onClick={() => setAddMode(false)}
              >
                <IconX color='red' size={24} stroke={3} />
              </Button>
              <Button
                variant={'simple'}
                className='flex flex-1 justify-center bg-green-300 shadow-sm'
                onClick={() => handleAdd()}
              >
                <IconCheck color='green' size={24} stroke={3} />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
