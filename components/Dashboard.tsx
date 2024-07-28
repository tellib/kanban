'use client';

import { Button } from '@/components/Button';
import { Center } from '@/components/Center';
import { Input } from '@/components/Input';
import { useSession } from '@/hooks/useSession';
import { addBoard, getAllBoards } from '@/lib/board';
import { BoardData } from '@/models/data';
import { IconCheck, IconLoader2, IconPlus, IconX } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export function Dashboard() {
  const [boardList, setBoardList] = useState<BoardData[] | null>(null);
  const [loading, setLoading] = useState(true);
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
    if (loading) {
      getAllBoards().then((data) => {
        if (data) {
          setBoardList(data);
          setLoading(false);
          // setTimeout(() => {
          //   setBoardList(data);
          //   setLoading(false);
          // }, 1000);
        }
      });
    }
    if (mode) {
      inputRef.current?.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setMode(null);
        }
        if (e.key === 'Enter') {
          if (inputRef.current?.value !== '') {
            handleAddBoard();
          }
          setMode('false');
        }
      });
      inputRef.current?.focus();
    }
  });

  if (loading)
    return (
      <Center className='flex-row gap-1 text-2xl font-medium'>
        <IconLoader2 className='animate-spin' size={24} strokeWidth={2} />
        Loading...
      </Center>
    );

  if (!session || !session.user.id) {
    setTimeout(() => router.push('/login'), 3000);
    return (
      <Center>
        <p>
          You must be signed in to see your boards. Redirecting you to the sign
          in page...
        </p>
      </Center>
    );
  }

  if (boardList?.length === 0 && !mode && session) {
    return (
      <Center className='gap-2'>
        No boards found
        <Button
          variant={'primary'}
          className='flex w-48 items-center justify-center gap-1'
          onClick={() => setMode('add')}
        >
          <p>Add board</p>
        </Button>
      </Center>
    );
  }

  return (
    <>
      {boardList && boardList.length > 0 && (
        <ul className='divide flex flex-col divide-y divide-black/5 dark:divide-white/5'>
          {boardList.map((item) => (
            <li key={'b' + item.id}>
              <Link href={`/board/${item.id}`}>
                <Button
                  variant={'unstyled'}
                  className='w-full transition ease-in-out hover:bg-black/5 dark:hover:bg-white/5'
                >
                  <div className='flex w-full items-center justify-between gap-2'>
                    <p className='truncate p-2 text-lg font-medium'>
                      {item.title}
                    </p>
                    <p className='min-w-fit p-2 text-sm text-black/20 dark:text-white/20'>
                      ID: {item.id}
                    </p>
                  </div>
                </Button>
              </Link>
            </li>
          ))}
        </ul>
      )}
      {!mode ? (
        <Button
          variant={'primary'}
          className='flex w-full items-center justify-start gap-1'
          onClick={() => setMode('add')}
        >
          <IconPlus size={18} />
          Add board
        </Button>
      ) : (
        <div className='flex w-full flex-col gap-2'>
          <Input type='text' ref={inputRef} />
          <div className='flex gap-2'>
            <Button
              variant={'hover'}
              className='flex flex-1 justify-center bg-red-300'
              onClick={() => setMode(null)}
            >
              <IconX color='red' size={24} stroke={3} />
            </Button>
            <Button
              variant={'hover'}
              className='flex flex-1 justify-center bg-green-300 shadow-sm'
              onClick={() => handleAddBoard()}
            >
              <IconCheck color='green' size={24} stroke={3} />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
