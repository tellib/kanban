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

  useEffect(() => {
    getBoard(id).then((board) => {
      if (board) setData(board as BoardData);
    });
  }, [id]);

  if (data) return <Board data={data} />;
  else return <Center>No board found</Center>;
}
