'use client';

import { Center } from '@/components/Center';
import { Dashboard } from '@/components/Dashboard';
import { useSession } from '@/hooks/useSession';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    }
  });

  if (!session?.user)
    return (
      <Center>
        <p>You must be signed in to view your boards.</p>
        <p>Redirecting you to the login page...</p>
      </Center>
    );

  return (
    <Center className='justify-start p-4'>
      <Dashboard />
    </Center>
  );
}
