'use client';

import { useEffect, useState } from 'react';
import { BoardData } from '@/models/data';
import { Board } from '@/components/Board';
import { Center } from '@/components/Center';
import { getBoard } from '@/lib/board';

export default function Page({ params }: { params: { boardId: number } }) {
  const { boardId } = params;

  const [board, setBoard] = useState<BoardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (boardId) {
      getBoard(boardId).then((data) => {
        if (data) {
          setBoard(data as BoardData);
          setLoading(false);
        }
      });
    }
  }, [boardId]);

  if (loading) {
    return <Center>Loading...</Center>;
  }

  if (!board) {
    return <Center>Board not found</Center>;
  }

  return <Board board={board} />;
}
