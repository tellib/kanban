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
  const [fadeOut, setFadeOut] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    if (id) {
      getBoard(id).then((board) => {
        if (board) setData(board as BoardData);
        setTimeout(() => {
          // fade out login
          setFadeOut(true);
          setTimeout(() => {
            // fade out login
            setLoading(false);
            setTimeout(() => {
              // fade in board
              setFadeIn(true);
            }, 100);
          }, 500);
        }, 1000);
      });
    }
  }, [id]);

  if (loading) {
    return (
      <Center
        className={`flex-col gap-1 text-2xl font-medium transition-opacity duration-500 ${
          fadeOut ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <IconLoader2
          className='animate-spin'
          size={60}
          strokeWidth={2}
          strokeLinecap='round'
        />
      </Center>
    );
  }

  if (!data) return <Center>Board not found</Center>;

  return (
    <div
      className={`flex flex-1 overflow-y-auto transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}
    >
      <Board data={data} />
    </div>
  );
}
