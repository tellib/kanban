'use client';
import { useState, useRef, useEffect } from 'react';

import Link from 'next/link';
import { ThemeSwitcher } from './ThemeSwitcher';
import { Button } from './Button';
import { IconMenu2 } from '@tabler/icons-react';
import { Center } from './Center';
import { Dialog } from './Dialog';

const components: { title: string; href: string }[] = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'About',
    href: '/about',
  },
  {
    title: 'Login',
    href: '/login',
  },
  {
    title: 'Boards',
    href: '/admin/boards',
  },
  {
    title: 'Users',
    href: '/admin/users',
  },
  {
    title: 'Status',
    href: '/status',
  },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    open ? dialogRef.current?.showModal() : dialogRef.current?.close();
  }, [open]);

  const links = components.map((component) => (
    <Link key={component.title} title={component.title} href={component.href}>
      <Button
        onClick={() => {
          if (open) setOpen(false);
        }}
        variant={'simple'}
      >
        {component.title}
      </Button>
    </Link>
  ));

  return (
    <nav className='flex w-screen justify-between border-b border-slate-200 bg-slate-100 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-800'>
      <div className='hidden justify-center sm:flex'>{links}</div>
      <div className='flex sm:hidden'>
        {/* TODO add menu for mobile */}
        <Button variant={'simple'} onClick={() => setOpen(true)}>
          <IconMenu2 size={24} stroke={2} />
        </Button>
        <Dialog ref={dialogRef}>
          <div className='flex flex-col gap-2 p-4 text-2xl'>
            <Button variant={'simple'} onClick={() => setOpen(false)}>
              <IconMenu2 size={24} stroke={2} />
            </Button>
            {links}
          </div>
        </Dialog>
      </div>
      <div className='flex justify-center'>
        <ThemeSwitcher />
      </div>
    </nav>
  );
}
