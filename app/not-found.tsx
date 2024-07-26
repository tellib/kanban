'use client';

import { Button } from '@/components/Button';
import { Center } from '@/components/Center';
import { IconError404 } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  return (
    <Center>
      <IconError404 size={128} />
      <Button variant={'primary'} onClick={() => router.back()}>
        Go Back
      </Button>
    </Center>
  );
}
