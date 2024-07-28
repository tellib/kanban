'use client';

import { useEffect, useState } from 'react';
import { IconLoader2 } from '@tabler/icons-react';
import { BoardData } from '@/models/data';
import { Board } from '@/components/Board';
import { Center } from '@/components/Center';
import { getBoard } from '@/lib/board';

export default function Page({ params }: { params: { id: number } }) {
  const { id } = params;
  const [data, setData] = useState<BoardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getBoard(id).then((board) => {
        if (board) setData(board as BoardData);
        setLoading(false);
        // setTimeout(() => {
        //   setLoading(false);
        // }, 1000);
      });
    }
  }, [id]);
  // if [id] is removed as dependency, the overflow scroll of board gets messed up

  if (loading) {
    return (
      <Center className='flex-row gap-1 text-2xl font-medium'>
        <IconLoader2 className='animate-spin' size={24} strokeWidth={2} />
        <p>Loading...</p>
      </Center>
    );
  }

  if (!data) return <Center>Board not found</Center>;

  return <Board data={data} />;
}
