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
  IconMenu,
  IconMenu3,
  IconPalette,
  IconPencil,
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
import { cn } from '@/lib/utils';
import { Navcol } from './Navcol';
import { Modal } from './Modal';
import { useBoard } from '@/hooks/useBoard';
import { ListData, BoardData } from '@/lib/data';

export function Board() {
  const { board, addList, deleteBoard, deleteList, updateBoard, updateList } =
    useBoard();

  const [mode, setMode] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  function handleAddList() {
    if (!inputRef.current?.value || !board?.id) return;
    const list: ListData = {
      title: inputRef.current.value,
      board_id: board.id as number,
    };
    addList(list);
    inputRef.current.value = '';
  }

  function handleUpdateTitle() {
    if (!inputRef.current?.value || !board?.id) return;
    updateBoard({ ...board, title: inputRef.current.value });
    inputRef.current.value = '';
    setMode('');
  }

  function handleDeleteBoard() {
    if (!board?.id) return;
    deleteBoard(board.id);
    router.push('/dashboard');
  }
  function handleColorChange(color: string) {
    if (!board?.id) return;
    updateBoard({ ...board, preferences: { ...board.preferences, color } });
  }

  function colorString(color: string | undefined) {
    if (!color) return '';
    switch (color) {
      case 'pink':
        return 'from-pink-600 to-pink-400 dark:from-pink-700 dark:to-pink-600';
      case 'purple':
        return 'from-purple-600 to-purple-400 dark:from-purple-700 dark:to-purple-600';
      case 'fuschia':
        return 'from-fuchsia-600 to-fuchsia-400 dark:from-fuchsia-700 dark:to-fuchsia-600';
      case 'blue':
        return 'from-blue-600 to-blue-400 dark:from-blue-700 dark:to-blue-600';
      case 'cyan':
        return 'from-cyan-600 to-cyan-400 dark:from-cyan-700 dark:to-cyan-600';
      case 'emerald':
        return 'from-emerald-600 to-emerald-400 dark:from-emerald-900 dark:bg-emerald-700';
      case 'lime':
        return 'from-lime-600 to-lime-400 dark:from-lime-700 dark:to-lime-600';
      case 'yellow':
        return 'from-yellow-600 to-yellow-400 dark:from-yellow-700 dark:to-yellow-600';
      case 'orange':
        return 'from-orange-600 to-orange-400 dark:from-orange-700 dark:to-orange-600';
      case 'red':
        return 'from-red-600 to-red-400 dark:from-red-700 dark:to-red-600';
      default:
        return '';
    }
  }

  useEffect(() => {
    if (mode === 'add') inputRef.current?.focus();
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
        <Dropdown
          title={'More'}
          options={[
            {
              name: 'Delete Board',
              func: () => handleDeleteBoard(),
              icon: <IconTrash />,
            },
            {
              name: 'Edit Board Name',
              func: () => setMode('edit'),
              icon: <IconPencil />,
            },
            {
              name: 'Information',
              func: () => setMode('info'),
              icon: <IconInfoSquareRounded />,
            },
          ]}
        >
          <IconMenu3 />
          <p className='hidden md:inline'>More</p>
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
        board.lists.map((list) => <List key={'l' + list.id} list={list} />)}
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
        <Modal size='sm' title={'Board Info'} ref={modalRef}>
          <p>
            <span className='font-bold'>Board Name: </span>
            {board?.title}
          </p>
          <p>
            <span className='font-bold'>Board ID: </span>
            {board?.id}
          </p>
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

      {mode === 'edit' && (
        <Modal size='sm' title={'Edit Board'} ref={modalRef}>
          <Input
            type='text'
            ref={inputRef}
            placeholder='Board title'
            id='board'
          />
          <div className='flex gap-2'>
            <Button variant={'outlined'} onClick={() => setMode('')}>
              <IconX stroke={3} />
            </Button>
            <Button
              variant={'outlined'}
              className='w-full'
              onClick={() => handleUpdateTitle()}
            >
              <IconCheck stroke={3} />
              <p>Save</p>
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}
