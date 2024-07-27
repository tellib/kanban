// BoardDisplay

'use client';

import { cva, VariantProps } from 'class-variance-authority';
import { useEffect, useRef, useState } from 'react';

import { BoardData, CardData, ListData } from '@/models/data';
import { List } from './List';
import { Button } from './Button';
import {
  IconCheck,
  IconPlus,
  IconSearch,
  IconSettings,
  IconTrash,
  IconUsers,
  IconX,
} from '@tabler/icons-react';
import { Input } from './Input';
import { addList } from '@/lib/list';
import { cn } from '@/lib/utils';
import { deleteBoard, updateBoard } from '@/lib/board';
import { Center } from './Center';
import router from 'next/router';
import { useRouter } from 'next/navigation';

export interface BoardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof boardVariants> {
  board: BoardData;
}

export function Board({ board, variant }: BoardProps) {
  const [data, setData] = useState<BoardData | null>(board);
  const [lists, setLists] = useState<ListData[]>(board.lists as ListData[]);
  const [addMode, setAddMode] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleAddList = () => {
    if (!inputRef.current?.value || !board.id) return;
    const list: ListData = {
      title: inputRef.current.value,
      board_id: board.id,
    };
    addList(list).then((data) => {
      if (data) {
        inputRef.current?.blur();
        setAddMode(false);
        lists ? setLists([...lists, data]) : setLists([data]);
      } else console.log('Error adding list');
    });
  };

  function handleUpdateBoard() {
    if (!data) return;
    updateBoard(data).then((data) => {
      if (data) setData(data);
      else console.log('Error updating board');
    });
  }

  function handleDeleteBoard() {
    if (!data || !data.id) return;
    deleteBoard(data.id).then((data) => {
      if (data) {
        router.push('/dashboard');
      } else console.log('Error deleting board');
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
            handleAddList();
          }
          setAddMode(false);
        }
      });
      inputRef.current?.focus();
    }
  });

  return (
    <div
      className={cn(
        boardVariants({ variant }),
        'flex flex-col overflow-y-auto'
      )}
    >
      <div className='flex items-center justify-between border-b border-white/30 bg-white/50 py-3 pl-8 pr-4 backdrop-blur dark:border-black/50 dark:bg-black/50'>
        <h1 className='truncate text-xl font-bold dark:text-white'>
          {board.title}
        </h1>
        <div className='flex min-w-fit items-center gap-x-1'>
          <Button variant={'hover'}>
            <IconSearch size={24} stroke={1.5} />
            <p className='hidden md:inline'>Search</p>
          </Button>
          <Button variant={'hover'}>
            <IconUsers size={24} stroke={1.5} />
            <p className='hidden md:inline'>Share</p>
          </Button>
          <Button variant={'hover'} onClick={() => handleDeleteBoard()}>
            <IconTrash size={24} stroke={1.5} />
            <p className='hidden md:inline'>Delete Board</p>
          </Button>
          <Button variant={'hover'}>
            <IconSettings size={24} stroke={1.5} />
            <p className='hidden md:inline'>Settings</p>
          </Button>
          <Button variant={'hover'} onClick={() => setAddMode(true)}>
            <IconPlus size={24} stroke={1.5} />
            <p className='hidden md:inline'>New List</p>
          </Button>
        </div>
      </div>
      <div className='flex flex-1 snap-x snap-mandatory gap-4 overflow-y-auto p-4 sm:snap-none dark:[color-scheme:dark]'>
        {lists.length > 0 ? (
          lists.map((list) => <List key={'l' + list.id} list={list} />)
        ) : (
          <></>
        )}

        {!addMode ? (
          <></>
        ) : (
          <div className='flex h-max max-h-full min-w-full snap-center snap-always flex-col gap-3 rounded-lg bg-white/70 p-4 shadow-xl ring-1 ring-inset ring-white/70 backdrop-blur sm:w-72 sm:min-w-72 dark:bg-black/70 dark:ring-black/70'>
            <Input type='text' ref={inputRef} placeholder='List title' />
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
                onClick={() => handleAddList()}
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
}

const boardVariants = cva('flex-1', {
  variants: {
    variant: {
      default: '',
      silver:
        'from-slate-300 to-slate-200 dark:from-slate-700 dark:to-slate-600',
      blue: 'from-blue-300 to-blue-200 dark:from-blue-900 dark:bg-blue-800',
      green:
        'from-emerald-400 to-emerald-600 dark:from-emerald-900 dark:bg-emerald-700',
      red: 'from-red-500 to-red-300 dark:from-red-900 dark:bg-red-800',
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
    direction: 'bl',
  },
});
