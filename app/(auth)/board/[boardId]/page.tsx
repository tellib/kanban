// Board Loader

'use client';

import { useEffect, useState } from 'react';
import { BoardData } from '@/models/data';
import { Board } from '@/components/Board';
import { Center } from '@/components/Center';
import { getBoard } from '@/lib/board';
import { IconLoader2 } from '@tabler/icons-react';

export default function Page({ params }: { params: { boardId: number } }) {
  const { boardId } = params;

  const [board, setBoard] = useState<BoardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (boardId) {
      getBoard(boardId).then((data) => {
        setLoading(false);
        if (data) setBoard(data as BoardData);
      });
    }
  }, [boardId]);

  if (loading) {
    return (
      <Center className='flex-row gap-1 bg-black/20 text-2xl font-medium'>
        <IconLoader2 className='animate-spin' size={24} strokeWidth={2} />
        Loading...
      </Center>
    );
  }

  if (!board) {
    return <Center>Board not found</Center>;
  }

  return <Board board={board} />;
}
