'use client';

import { useEffect, useState } from 'react';
import { Center } from '@/components/Center';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/Button';
import { useRouter } from 'next/navigation';
import { useSession } from '@/hooks/useSession';

export default function Page() {
  const [showH1, setShowH1] = useState(false);
  const [showH2, setShowH2] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setShowH1(true);
    let timer = setTimeout(() => {
      setShowH2(true);
    }, 500);
    timer = setTimeout(() => {
      setShowBtn(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Center>
        <div className='flex flex-col gap-2 p-4'>
          <h1
            className={`text-7xl font-bold transition-opacity duration-500 sm:text-9xl ${showH1 ? 'opacity-100' : 'opacity-0'}`}
          >
            Kanban
          </h1>
          <h2
            className={`text-md font-medium transition-opacity delay-500 duration-1000 sm:text-3xl ${showH2 ? 'opacity-100' : 'opacity-0'}`}
          >
            The ultimate way to manage your projects
          </h2>
          <Button
            variant={'primary'}
            className={`transition-opacity delay-1000 duration-1000 ${showBtn ? 'opacity-100' : 'opacity-0'}`}
            onClick={() => router.push('/login')}
          >
            Get started
          </Button>
        </div>
      </Center>
    </>
  );
}
