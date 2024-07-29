import { IconLoader2 } from '@tabler/icons-react';
import { Center } from '@/components/Center';

export default function Loading() {
  return (
    <Center className='flex-col gap-1 text-2xl font-medium'>
      <IconLoader2
        className='animate-spin'
        size={60}
        strokeWidth={3}
        strokeLinecap='round'
      />
    </Center>
  );
}
