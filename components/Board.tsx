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
  IconTrain,
  IconTrash,
  IconTree,
  IconWalk,
  IconX,
} from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { List } from './List';
import { Input } from './Input';
import { ThemeSwitcher } from './ThemeSwitcher';
import { Dropdown } from './Dropdown';
import { BoardData, ListData } from '@/lib/data';
import { deleteBoard, updateBoard } from '@/lib/db';
import { addList, deleteList, updateList } from '@/lib/db';
import { cn, colorString } from '@/lib/utils';
import { Navcol } from './Navcol';
import { Modal } from './Modal';

export function Board({ data }: { data: BoardData }) {
  const [board, setBoard] = useState<BoardData>(data);
  const [mode, setMode] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  function handleAddList() {
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
  }

  function handleDeleteList(id: number) {
    deleteList(id).then((dList) => {
      if (dList) {
        setBoard({
          ...board,
          lists: board?.lists?.filter((list) => list.id !== id),
        });
        console.log('Deleted list', dList);
      }
    });
  }

  function handleUpdateList(uList: ListData) {
    setBoard({
      ...board,
      lists: board?.lists?.map((list) => (list.id === uList.id ? uList : list)),
    });
  }

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
    deleteBoard(board.id).then((dBoard) => {
      if (dBoard) {
        router.push('/dashboard');
      } else console.log('Error deleting board');
    });
  }
  function handleColorChange(color: string) {
    const preferences = { ...board.preferences, color };
    setBoard((board) => {
      const updatedBoard = { ...board, preferences: preferences };
      handleUpdateBoard(updatedBoard);
      return updatedBoard;
    });
  }

  useEffect(() => {
    if (mode === 'add') {
      inputRef.current?.focus();
    }
    mode !== '' ? modalRef.current?.showModal() : modalRef.current?.close();
  }, [mode]);

  const BoardHeader = () => (
    <div className='z-10 flex items-center justify-between border-b border-white/30 bg-white/50 py-3 pl-8 pr-4 backdrop-blur dark:border-black/50 dark:bg-black/50'>
      <div className='flex items-center gap-2'>
        {/* TODO maybe include an emoji/icon option for board? */}
        <h1 className='truncate text-xl font-bold dark:text-white'>
          {board?.title}
        </h1>
      </div>
      <div className='flex min-w-fit items-center gap-x-2'>
        <Button variant={'hover'} onClick={() => router.push('/dashboard')}>
          <IconHome />
          <p className='hidden md:inline'>Dashboard</p>
        </Button>
        <Button variant={'hover'} onClick={() => setMode('delete')}>
          <IconTrash />
          <p className='hidden md:inline'>Delete</p>
        </Button>
        <Button variant={'hover'} onClick={() => setMode('info')}>
          <IconInfoSquareRounded />
          <p className='hidden md:inline'>Info</p>
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
              name: 'Yellow Banana',
              func: () => handleColorChange('yellow'),
              icon: <IconRipple />,
            },
            {
              name: 'Orange Peel',
              func: () => handleColorChange('orange'),
              icon: <IconWalk />,
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
              name: 'Green Emerald',
              func: () => handleColorChange('emerald'),
              icon: <IconTree />,
            },
          ]}
        >
          <IconPalette />
          <p className='hidden md:inline'>Colors</p>
        </Dropdown>
        <Button variant={'hover'} onClick={() => setMode('add')}>
          <IconPlus />
          <p className='hidden md:inline'>Add List</p>
        </Button>
        <ThemeSwitcher />
      </div>
    </div>
  );

  const BoardContent = () => (
    <div className='flex flex-1 snap-x snap-mandatory gap-4 overflow-y-auto p-4 sm:snap-none dark:[color-scheme:dark]'>
      {board?.lists &&
        board.lists.length > 0 &&
        board.lists.map((list) => (
          <List
            key={'l' + list.id}
            onDelete={handleDeleteList}
            onUpdate={handleUpdateList}
            data={list}
          />
        ))}
      {mode === 'add' && (
        <div className='flex h-max max-h-full min-w-full snap-center snap-always flex-col gap-2 rounded-lg bg-white/70 p-2 shadow-xl ring-1 ring-inset ring-white/70 backdrop-blur sm:w-72 sm:min-w-72 dark:bg-black/70 dark:ring-black/70'>
          <Input
            type='text'
            ref={inputRef}
            placeholder='List title'
            id='list'
          />
          <div className='flex gap-2'>
            <Button variant={'outlined'} onClick={() => setMode('')}>
              <IconX stroke={3} />
            </Button>
            <Button
              variant={'outlined'}
              className='w-full'
              onClick={() => handleAddList()}
            >
              <IconCheck stroke={3} />
              <p>Add</p>
            </Button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div
      className={cn(
        'flex flex-1 flex-col overflow-y-scroll bg-gradient-to-tl',
        colorString(board?.preferences?.color)
      )}
    >
      <BoardHeader />
      <BoardContent />

      {mode === 'delete' && (
        <Modal title={'Delete Board'} ref={modalRef}>
          <p>Are you sure you want to delete this board?</p>
          <div className='flex gap-4'>
            <Button
              variant={'secondary'}
              padding={'wide'}
              onClick={() => setMode('')}
            >
              <IconX />
              <p>Cancel</p>
            </Button>
            <Button onClick={() => handleDeleteBoard()}>
              <IconTrash />
              <p>Delete</p>
            </Button>
          </div>
        </Modal>
      )}

      {mode === 'info' && (
        <Modal title={'Board Info'} ref={modalRef}>
          <p>
            Board Name: <span className='font-mono'>{board?.title}</span>
          </p>
          <p>Board ID: {board?.id}</p>
          <Button
            variant={'secondary'}
            padding={'wide'}
            onClick={() => setMode('')}
          >
            <IconX />
            <p>Close</p>
          </Button>
        </Modal>
      )}
    </div>
  );
}
