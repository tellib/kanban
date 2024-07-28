'use client';
import { useState, useRef, useEffect } from 'react';

import Link from 'next/link';
import { ThemeSwitcher } from './ThemeSwitcher';
import { Button } from './Button';
import { IconMenu2 } from '@tabler/icons-react';
import { Center } from './Center';
import { Dialog } from './Dialog';
import { useSession } from '@/hooks/useSession';

const components: { title: string; href: string }[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'Login',
    href: '/login',
  },
  {
    title: 'Sign out',
    href: '/signout',
  },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDialogElement>(null);
  const session = useSession();

  useEffect(() => {
    isOpen ? menuRef.current?.showModal() : menuRef.current?.close();
  }, [isOpen]);

  const links = components.map((component) => (
    <Link key={component.title} title={component.title} href={component.href}>
      <Button
        variant={'hover'}
        onClick={() => {
          if (isOpen) setIsOpen(false);
        }}
      >
        {component.title}
      </Button>
    </Link>
  ));

  return (
    <nav className='sticky top-0 flex w-screen justify-between border-b border-black/10 bg-white/50 p-4 shadow-sm dark:border-white/10 dark:bg-black/50'>
      <div className='hidden items-center justify-center gap-x-3 sm:flex'>
        <Link key='Home' title='Home' href='/'>
          <Button
            variant={'hover'}
            onClick={() => {
              if (isOpen) setIsOpen(false);
            }}
          >
            <p className='font-bold'>Kanban</p>
          </Button>
        </Link>
        {links}
      </div>
      <div className='flex justify-center gap-4'>
        <div className='flex flex-1 items-center text-sm'>
          {session ? <p>{session.user.email}</p> : <></>}
        </div>
        <ThemeSwitcher />
      </div>

      <div className='flex sm:hidden'>
        <Button variant={'hover'} onClick={() => setIsOpen(true)}>
          <IconMenu2 size={24} stroke={2} />
        </Button>
        <Dialog ref={menuRef} className='text-right'>
          <div className='flex flex-col items-end gap-2 p-4 text-2xl'>
            <Button variant={'hover'} onClick={() => setIsOpen(false)}>
              <IconMenu2 size={24} stroke={2} />
            </Button>
            {links}
          </div>
        </Dialog>
      </div>
    </nav>
  );
}
