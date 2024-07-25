'use client';

import { cva, VariantProps } from 'class-variance-authority';
import { useEffect, useRef, useState } from 'react';

import { BoardData, CardData, ListData } from '@/models/data';
import { List } from './List';
import { Button } from './Button';
import { IconCheck, IconPlus, IconX } from '@tabler/icons-react';
import { Input } from './Input';
import { addList } from '@/lib/db';

export interface BoardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof boardVariants> {
  board: BoardData;
}

export function Board({ board, variant }: BoardProps) {
  const [items, setItems] = useState<ListData[]>(board.lists as ListData[]);
  const [addMode, setAddMode] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleAdd = () => {
    if (!inputRef.current?.value || !board.id) return;
    const list: ListData = {
      title: inputRef.current.value,
      board_id: board.id,
      cards: [] as CardData[],
    };
    addList(list).then((data: ListData) => {
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
    <>
      <div className={boardVariants({ variant })}>
        {items && items.length > 0 ? (
          items.map((list) => <List key={'l' + list.id} list={list} />)
        ) : (
          <></>
        )}

        {!addMode ? (
          <Button
            className='text-md flex h-fit min-w-72 items-center justify-start gap-1 bg-slate-500 py-3 hover:bg-slate-600'
            onClick={() => setAddMode(true)}
          >
            <IconPlus size={18} />
            Add list p
          </Button>
        ) : (
          <>
            <div className='text-md flex min-w-72 flex-col items-center justify-start gap-2'>
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
          </>
        )}
      </div>
    </>
  );
}

// TODO add variants
const boardVariants = cva('flex h-full gap-4 p-4 overflow-y-auto', {
  variants: {
    variant: {
      white:
        'from-slate-300 to-slate-200 dark:from-slate-700 dark:to-slate-600',
      blue: 'from-slate-300 to-slate-200 dark:to-slate-400 dark:from-slate-600',
      green:
        'from-emerald-500 to-emerald-600 dark:from-emerald-900 dark:bg-emerald-700',
      unstyled: 'bg-none',
    },
    direction: {
      l: 'bg-gradient-to-l',
      r: 'bg-gradient-to-r',
      t: 'bg-gradient-to-t',
      b: 'bg-gradient-to-b',
      tl: 'bg-gradient-to-tl',
      tr: 'bg-gradient-to-tr',
      bl: 'bg-gradient-to-bl',
      br: 'bg-gradient-to-br',
      bt: 'bg-gradient-to-b',
    },
  },
  defaultVariants: {
    variant: 'blue',
    direction: 'b',
  },
});
