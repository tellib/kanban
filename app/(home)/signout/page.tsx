'use client';

import { Center } from '@/components/Center';
import { useSession } from '@/hooks/useSession';
import { signOut } from '@/lib/db';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      setTimeout(() => {
        signOut().then(() => router.push('/'));
      }, 1000);
    }
  }, [session, router]);

  if (session) {
    return <Center>Signing out...</Center>;
  }
}
