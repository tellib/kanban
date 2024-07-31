'use client';

import { AuthForm } from '@/components/AuthForm';
import { Center } from '@/components/Center';
import { useSession } from '@/hooks/useSession';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/dashboard');
    }
  }, [router, session]);

  return (
    <>
      <Center className='p-4'>
        <AuthForm />
      </Center>
    </>
  );
}
