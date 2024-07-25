'use client';

import { Button } from '@/components/Button';
import { Center } from '@/components/Center';
import { Input } from '@/components/Input';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/Table';
import { addBoard, getAllBoards } from '@/lib/db';
import { BoardData } from '@/models/data';
import { IconCheck, IconPlus, IconX } from '@tabler/icons-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function Page() {
  const [boardList, setBoardList] = useState<BoardData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [addMode, setAddMode] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAdd = () => {
    if (!inputRef.current?.value) return;
    const board: BoardData = {
      title: inputRef.current.value,
      owner_id: 1, // TODO once auth set up, this should be the current user
    };
    addBoard(board).then((data) => {
      if (data) {
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
            handleAdd();
          }
          setAddMode(false);
        }
      });
      inputRef.current?.focus();
    }
  }, [addMode]);

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

  if (loading) {
    return <Center>Loading...</Center>;
  }

  const data = boardList?.map(({ id, title, description }) => (
    <TableRow key={id}>
      <TableCell>{id}</TableCell>
      <TableCell>
        <Link href={`/board/${id}`} key={id}>
          {title}
        </Link>
      </TableCell>
      <TableCell>{description}</TableCell>
    </TableRow>
  ));

  return (
    <>
      {!addMode ? (
        <Button
          variant={'simple'}
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
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHeader>

        <TableBody>{data}</TableBody>
      </Table>
    </>
  );
}
