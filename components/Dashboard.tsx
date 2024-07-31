'use client';

import { Button } from '@/components/Button';
import { Center } from '@/components/Center';
import { Input } from '@/components/Input';
import { useSession } from '@/hooks/useSession';
import { addBoard, getAllBoards } from '@/lib/board';
import { BoardData } from '@/models/data';
import { IconCheck, IconPlus, IconX } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Container } from './Container';

export function Dashboard() {
  const [boardList, setBoardList] = useState<BoardData[] | null>(null);
  const [mode, setMode] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const session = useSession();
  const router = useRouter();

  const handleAddBoard = () => {
    if (!inputRef.current?.value) return;
    const board: BoardData = {
      title: inputRef.current.value,
      user_id: session?.user.id,
    };
    addBoard(board).then((data) => {
      if (data) {
        console.log(data);
        inputRef.current?.blur();
        setMode(null);
        boardList ? setBoardList([...boardList, data]) : setBoardList([data]);
      }
    });
  };

  useEffect(() => {
    if (!mode) {
      getAllBoards().then((data) => {
        if (data) setBoardList(data);
      });
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMode(null);
      }
      if (e.key === 'Enter' && inputRef.current?.value !== '') {
        handleAddBoard();
        setMode('false');
      }
    };

    if (mode) {
      inputRef.current?.addEventListener('keydown', handleKeyDown);
      inputRef.current?.focus();
    }

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      inputRef.current?.removeEventListener('keydown', handleKeyDown);
    };
  }, [mode]);

  if (boardList?.length === 0 && !mode && session) {
    return (
      <Center className='gap-2'>
        No boards found
        <Button onClick={() => setMode('add')}>
          <p>Add board</p>
        </Button>
      </Center>
    );
  }

  const DashboardHeader = () => (
    <h1 className='self-start px-2 text-3xl font-bold'>Boards</h1>
  );

  const DashboardContent = () =>
    boardList &&
    boardList.length > 0 && (
      <ul className='divide flex flex-col divide-y divide-black/10 overflow-y-auto rounded-md bg-black/5 shadow-black ring-1 ring-black/10 dark:divide-white/10 dark:bg-white/5 dark:ring-white/10'>
        {boardList.map((item) => (
          <li key={'b' + item.id}>
            <Link href={`/board/${item.id}`}>
              <Button
                variant={'unstyled'}
                className='w-full transition ease-in-out hover:bg-black/5 dark:hover:bg-white/5'
              >
                <div className='flex w-full items-center justify-between gap-2 px-4'>
                  <p className='truncate py-2 text-lg font-medium'>
                    {item.title}
                  </p>
                  <p className='min-w-fit font-mono text-sm text-black/20 dark:text-white/20'>
                    ID: {item.id}
                  </p>
                </div>
              </Button>
            </Link>
          </li>
        ))}
      </ul>
    );

  const DashboardFooter = () => {
    if (!mode)
      return (
        <Button
          className='flex w-full items-center justify-start gap-1'
          onClick={() => setMode('add')}
        >
          <IconPlus size={18} />
          Add board
        </Button>
      );
    if (mode === 'add')
      return (
        <div className='flex w-full flex-row gap-2'>
          <Input
            type='text'
            ref={inputRef}
            placeholder='Board title'
            id='board'
          />
          <Button onClick={() => setMode(null)}>
            <IconX stroke={3} />
          </Button>
          <Button onClick={handleAddBoard}>
            <IconCheck stroke={3} />
            <p>Add</p>
          </Button>
        </div>
      );
  };

  return (
    <Container size={'lg'} padding={'lg'} gap={'lg'}>
      <DashboardHeader />
      <DashboardContent />
      <DashboardFooter />
    </Container>
  );
}
