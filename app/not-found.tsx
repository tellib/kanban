'use client';

import { Button } from '@/components/Button';
import { Center } from '@/components/Center';
import { IconArrowLeft, IconError404 } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  return (
    <Center className='gap-2'>
      <p className='text-2xl font-medium'>Page not found</p>
      <Button
        className='ring-1'
        variant={'hover'}
        onClick={() => router.back()}
      >
        <IconArrowLeft size={24} />
        <p>Back</p>
      </Button>
    </Center>
  );
}
