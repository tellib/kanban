// TODO add mobile menu

'use client';
import { useState, useRef, useEffect } from 'react';

import Link from 'next/link';
import { ThemeSwitcher } from './ThemeSwitcher';
import { Button } from './Button';
import { IconMenu2 } from '@tabler/icons-react';
import { useSession } from '@/hooks/useSession';
import { useRouter } from 'next/navigation';
import { MobileMenu } from './MobileMenu';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    open ? menuRef.current?.showModal() : menuRef.current?.close();
  }, [open]);

  const NavbarLinks = () => {
    return (
      <>
        <Link key='Home' title='Home' href='/'>
          <Button
            onClick={() => {
              router.push('/');
              setOpen(!open);
            }}
          >
            Home
          </Button>
        </Link>

        {session && (
          <>
            <Link key='Dashboard' title='Dashboard' href='/dashboard'>
              <Button
                onClick={() => {
                  router.push('/dashboard');
                  setOpen(!open);
                }}
              >
                Dashboard
              </Button>
            </Link>

            <Link key='Sign out' title='Sign out' href='/signout'>
              <Button
                onClick={() => {
                  router.push('/signout');
                  setOpen(!open);
                }}
              >
                Sign out
              </Button>
            </Link>
          </>
        )}

        {!session && (
          <Link key='Login' title='Login' href='/login'>
            <Button
              onClick={() => {
                router.push('/login');
                setOpen(!open);
              }}
            >
              Login
            </Button>
          </Link>
        )}
      </>
    );
  };

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
      <MobileMenu ref={menuRef}>
        <div className='flex flex-col items-end gap-4 p-8'>
          <Button
            // variant={'hover'}
            className='w-max'
            onClick={() => setOpen(false)}
          >
            <IconMenu2 stroke={2} />
          </Button>
          <NavbarLinks />
        </div>
      </MobileMenu>
    </nav>
  );
}
