'use client';

import { Center } from '@/components/Center';
import { Dashboard } from '@/components/Dashboard';
import { useSession } from '@/hooks/useSession';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Page() {
  const session = useSession();
  const router = useRouter();

  return (
    <div className='mx-auto flex w-full flex-1 flex-col items-center gap-2 overflow-y-auto p-4 sm:w-[640px]'>
      <Dashboard />
    </div>
  );
}
