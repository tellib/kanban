// TODO add mobile menu

'use client';
import { useState, useRef, useEffect } from 'react';

import Link from 'next/link';
import { ThemeSwitcher } from './ThemeSwitcher';
import { Button } from './Button';
import { IconMenu2 } from '@tabler/icons-react';
import { useSession } from '@/hooks/useSession';
import { links } from '@/lib/links';
import { useRouter } from 'next/navigation';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    open ? menuRef.current?.showModal() : menuRef.current?.close();
  }, [open]);

  const NavbarLinks = () =>
    links.map((link) => (
      <Link key={link.title} title={link.title} href={link.href}>
        <Button
          variant={'hover'}
          onClick={() => {
            router.push(link.href);
            setOpen(!open);
          }}
        >
          {link.title}
        </Button>
      </Link>
    ));

  return (
    <nav className='sticky top-0 flex w-screen justify-between border-b border-black/10 bg-white/50 p-3 shadow-sm dark:border-white/10 dark:bg-black/50'>
      {/* desktop menu */}
      <div className='hidden items-center justify-center gap-x-3 md:flex'>
        <NavbarLinks />
      </div>
      {/* email & theme toggle */}
      <div className='flex flex-row-reverse items-center justify-center gap-4 md:flex-row'>
        {session && <p className='text font-medium'>{session.user.email}</p>}
        <ThemeSwitcher />
      </div>
      {/* mobile menu */}
      <div className='flex md:hidden'>
        <Button variant={'hover'} onClick={() => setOpen(true)}>
          <IconMenu2 stroke={2} />
        </Button>
      </div>
    </nav>
  );
}
