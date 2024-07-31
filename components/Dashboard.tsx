'use client';

import { Button } from '@/components/Button';
import { Center } from '@/components/Center';
import { Input } from '@/components/Input';
import { useSession } from '@/hooks/useSession';
import { addBoard, getAllBoards } from '@/lib/db';
import { BoardData } from '@/lib/data';
import { IconCheck, IconPlus, IconX } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Container } from './Container';
import { Modal } from './Modal';

export function Dashboard() {
  const [boardList, setBoardList] = useState<BoardData[] | null>(null);
  const [mode, setMode] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDialogElement>(null);

  const session = useSession();

  const handleAdd = () => {
    if (!inputRef.current?.value) return;
    const board: BoardData = {
      title: inputRef.current.value,
      user_id: session?.user.id,
    };
    addBoard(board).then((aBoard) => {
      if (aBoard) {
        console.log(aBoard);
        inputRef.current?.blur();
        setMode('');
        boardList
          ? setBoardList([...boardList, aBoard])
          : setBoardList([aBoard]);
      }
      setMode('');
    });
  };

  useEffect(() => {
    getAllBoards().then((data) => {
      if (data) setBoardList(data);
    });
  }, []);

  useEffect(() => {
    if (mode === 'add') inputRef.current?.focus();
    if (mode !== '') modalRef.current?.showModal();
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
    if (mode === '')
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
        <Modal title={'Add Board'} ref={modalRef}>
          <Input
            type='text'
            ref={inputRef}
            placeholder='Board title'
            id='board'
          />
          <div className='flex gap-2'>
            <Button onClick={() => setMode('')}>
              <IconX stroke={3} />
            </Button>
            <Button onClick={handleAdd}>
              <IconCheck stroke={3} />
              <p>Add</p>
            </Button>
          </div>
        </Modal>
      );
  };

  if (mode !== '') {
    modalRef.current?.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMode('');
      if (inputRef.current?.value !== '' && e.key === 'Enter') {
        mode == 'add' && handleAdd();
        // mode == 'edit' && handleEdit();
      }
    });
    inputRef.current?.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMode('');
      if (inputRef.current?.value !== '' && e.key === 'Enter') {
        mode == 'add' && handleAdd();
        // mode == 'edit' && handleEdit();
      }
    });
  }
  return (
    <Container size={'lg'} padding={'lg'} gap={'lg'}>
      <DashboardHeader />
      <DashboardContent />
      <DashboardFooter />
    </Container>
  );
}
