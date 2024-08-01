'use client';

import { useEffect, useState } from 'react';
import { BoardData } from '@/lib/data';
import { Board } from '@/components/Board';
import { Center } from '@/components/Center';
import { getBoard } from '@/lib/db';
import { BoardProvider } from '@/components/BoardProvider';

export default function Page({ params }: { params: { id: number } }) {
  const { id } = params;
  const [data, setData] = useState<BoardData | null>(null);

  useEffect(() => {
    getBoard(id).then((board) => {
      if (board) setData(board as BoardData);
    });
  }, [id]);

  if (!data) return <Center>No board found</Center>;

  return (
    <BoardProvider data={data}>
      <Board />
    </BoardProvider>
  );
}
