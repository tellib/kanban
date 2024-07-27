'use client';

import { Button } from '@/components/Button';
import { Center } from '@/components/Center';
import { Input } from '@/components/Input';
import { useSession } from '@/hooks/useSession';
import { addBoard, getAllBoards } from '@/lib/board';
import { BoardData } from '@/models/data';
import { IconCheck, IconPlus, IconX } from '@tabler/icons-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function Page() {
  const [boardList, setBoardList] = useState<BoardData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [addMode, setAddMode] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const session = useSession();

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
        setAddMode(false);
        boardList ? setBoardList([...boardList, data]) : setBoardList([data]);
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
            handleAddBoard();
          }
          setAddMode(false);
        }
      });
      inputRef.current?.focus();
    }
  });

  useEffect(() => {
    if (loading) {
      getAllBoards().then((data) => {
        if (data) {
          setBoardList(data);
          setLoading(false);
        }
      });
    }
  }, [loading]);

  if (loading) return <Center>Loading...</Center>;

  if (boardList?.length === 0 && !addMode) {
    return (
      <Center className='gap-2'>
        No boards found
        <Button
          variant={'primary'}
          className='flex w-48 items-center justify-center gap-1'
          onClick={() => setAddMode(true)}
        >
          <p>Add board</p>
        </Button>
      </Center>
    );
  }

  return (
    <div className='flex flex-col items-center gap-2 p-4'>
      <h1 className='text-3xl font-bold'>Boards</h1>
      <div className='flex h-max max-h-full min-w-full flex-1 flex-col-reverse gap-4 rounded-lg bg-white/70 p-4 shadow-xl ring-1 ring-inset ring-white/70 backdrop-blur sm:w-[640px] sm:min-w-72 dark:bg-black/70 dark:ring-black/70'>
        {!addMode ? (
          <Button
            variant={'primary'}
            className='flex w-full items-center justify-start gap-1'
            onClick={() => setAddMode(true)}
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
                onClick={() => setAddMode(false)}
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
      </div>
    </div>
  );
}
