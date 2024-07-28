// BoardDisplay

'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from './Button';
import {
  IconApple,
  IconCactus,
  IconCheck,
  IconCloudRain,
  IconHome,
  IconInfoSquareRounded,
  IconPalette,
  IconPlane,
  IconPlus,
  IconRipple,
  IconSailboat,
  IconSearch,
  IconTrain,
  IconTrash,
  IconWaveSine,
  IconX,
} from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

import { List } from './List';
import { Input } from './Input';
// import { Modal } from './Modal';
import { ThemeSwitcher } from './ThemeSwitcher';
import { Dropdown } from './Dropdown';

import { BoardData, ListData } from '@/models/data';
import { deleteBoard, updateBoard } from '@/lib/board';
import { addList } from '@/lib/list';
import { cn } from '@/lib/utils';

export interface BoardProps {
  data: BoardData;
}

export function Board({ data }: BoardProps) {
  const [board, setBoard] = useState<BoardData>(data);
  const [mode, setMode] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  // const modalRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  const handleAddList = () => {
    if (!inputRef.current?.value || !board?.id) return;
    const list: ListData = {
      title: inputRef.current.value,
      board_id: board.id,
    };
    addList(list).then((aList) => {
      if (aList) {
        inputRef.current?.blur();
        setMode('');
        setBoard({
          ...board,
          lists: [...(board?.lists as ListData[]), aList],
        });
      } else console.log('Error adding list');
    });
  };

  function handleUpdateBoard(board: BoardData) {
    updateBoard(board).then((uBoard) => {
      if (uBoard) {
        console.log('Updated board', uBoard);
      } else {
        console.log('Error updating board');
      }
    });
  }

  function handleDeleteBoard() {
    if (!board.id) return;
    deleteBoard(board.id).then((deletedBoard) => {
      if (deletedBoard) {
        router.push('/dashboard');
      } else console.log('Error deleting board');
    });
  }
  const handleColorChange = (color: string) => {
    const preferences = { ...board.preferences, themeColor: color };
    setBoard((board) => {
      const updatedBoard = { ...board, preferences: preferences };
      handleUpdateBoard(updatedBoard);
      return updatedBoard;
    });
  };

  const BoardHeader = () => (
    <div className='z-10 flex items-center justify-between border-b border-white/30 bg-white/50 py-3 pl-8 pr-4 backdrop-blur dark:border-black/50 dark:bg-black/50'>
      <div className='flex items-center gap-2'>
        <Button variant={'hover'} onClick={() => router.push('/dashboard')}>
          <IconHome size={24} stroke={1.5} />
        </Button>
        <h1 className='truncate text-xl font-bold dark:text-white'>
          {board?.title}
        </h1>
      </div>
      <div className='flex min-w-fit items-center gap-x-1'>
        <Button variant={'hover'}>
          <IconSearch size={24} stroke={1.5} />
          <p className='hidden md:inline'>Search</p>
        </Button>
        <Dropdown
          title={'Colors'}
          options={[
            {
              name: 'Red Delicous',
              func: () => handleColorChange('red'),
              icon: <IconApple />,
            },
            {
              name: 'Blue Ocean',
              func: () => handleColorChange('blue'),
              icon: <IconSailboat />,
            },
            {
              name: 'Yellow Sea',
              func: () => handleColorChange('yellow'),
              icon: <IconRipple />,
            },
            {
              name: 'Orange Fantasy',
              func: () => handleColorChange('orange'),
              icon: <IconWaveSine />,
            },
            {
              name: 'Purple Pastel',
              func: () => handleColorChange('purple'),
              icon: <IconTrain />,
            },
            {
              name: 'Pink Coral',
              func: () => handleColorChange('pink'),
              icon: <IconCactus />,
            },
            {
              name: 'Cyan Sky',
              func: () => handleColorChange('cyan'),
              icon: <IconPlane />,
            },
            {
              name: 'Lime Juice',
              func: () => handleColorChange('lime'),
              icon: <IconCloudRain />,
            },
            {
              name: 'Remove Color',
              func: () => handleColorChange(''),
            },
            // { name: 'Green', func: () => handleColorChange('green') },
            // { name: 'Fuschia', func: () => handleColorChange('fuschia') },
            // { name: 'Emerald', func: () => handleColorChange('emerald') },
          ]}
        >
          <IconPalette size={24} stroke={1.5} />
          <p className='hidden md:inline'>Colors</p>
        </Dropdown>
        <Button variant={'hover'} onClick={() => setMode('delete')}>
          <IconTrash size={24} stroke={1.5} />
          <p className='hidden md:inline'>Delete</p>
        </Button>
        <Button variant={'hover'} onClick={() => setMode('add')}>
          <IconPlus size={24} stroke={1.5} />
          <p className='hidden md:inline'>New</p>
        </Button>
        <Button variant={'hover'} onClick={() => {}}>
          <IconInfoSquareRounded size={24} stroke={1.5} />
          <p className='hidden md:inline'>Info</p>
        </Button>
      </div>
    </div>
  );

  const BoardContent = () => (
    <div className='flex flex-1 snap-x snap-mandatory gap-4 overflow-y-auto p-4 sm:snap-none dark:[color-scheme:dark]'>
      {board?.lists &&
        board.lists.length > 0 &&
        board.lists.map((list) => <List key={'l' + list.id} data={list} />)}
      {mode === 'add' && (
        <div className='flex h-max max-h-full min-w-full snap-center snap-always flex-col gap-3 rounded-lg bg-white/70 p-4 shadow-xl ring-1 ring-inset ring-white/70 backdrop-blur sm:w-72 sm:min-w-72 dark:bg-black/70 dark:ring-black/70'>
          <Input type='text' ref={inputRef} placeholder='List title' />
          <div className='flex gap-2'>
            <Button
              variant={'hover'}
              className='flex-1 justify-center'
              onClick={() => setMode('')}
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
  );

  const BoardFooter = () => (
    <div className='flex items-center justify-start border-t bg-white/10 p-2'>
      <ThemeSwitcher />
    </div>
  );

  return (
    <div
      className={cn(
        'flex flex-1 flex-col overflow-y-auto',
        board.preferences?.themeColor !== 'null'
          ? `bg-gradient-to-bl from-${board.preferences?.themeColor}-300 to-${board.preferences?.themeColor}-200 dark:from-${board.preferences?.themeColor}-700 dark:to-${board.preferences?.themeColor}-600`
          : ''
      )}
    >
      <BoardHeader />
      <BoardContent />
      <BoardFooter />
      {mode === 'delete' && (
        // <Modal
        //   open={true}
        //   title='Are you sure you want to delete the board?'
        //   func={() => handleDeleteBoard()}
        //   ref={modalRef}
        // />
        <></>
      )}
    </div>
  );
}
