import { IconDashboard, IconHome, IconLogout } from '@tabler/icons-react';
import { Button } from './Button';
import { useRouter } from 'next/navigation';
import { useSession } from '@/hooks/useSession';

export const Navcol = () => {
  const router = useRouter();
  const session = useSession();

  return (
    <div className='z-0 flex flex-col items-start justify-between gap-2 overflow-y-auto bg-white/70 p-3 backdrop-blur sm:border-r dark:bg-black/80'>
      <div className='flex flex-col gap-1'>
        <Button variant={'hover'} onClick={() => router.push('/')}>
          <IconHome />
          <p>Home</p>
        </Button>
        <Button variant={'hover'} onClick={() => router.push('/dashboard')}>
          <IconDashboard />
          <p>Dashboard</p>
        </Button>
      </div>
      <div className='flex flex-col gap-1'>
        <Button variant={'hover'} onClick={() => router.push('/signout')}>
          <IconLogout />
          <p>Logout</p>
        </Button>
      </div>
    </div>
  );
};
