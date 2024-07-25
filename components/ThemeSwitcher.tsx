'use client';

import { useState, useEffect } from 'react';
import { toggleTheme } from '@/lib/utils';
import { Button } from './Button';
import { IconMoon, IconSun } from '@tabler/icons-react';

export const ThemeSwitcher = () => {
  const [icon, setIcon] = useState('');

  useEffect(() => {
    const currentTheme = document.documentElement.classList.contains('dark')
      ? 'dark'
      : '';
    setIcon(currentTheme === 'dark' ? 'moon' : 'sun');
  }, []);

  const handleToggleTheme = () => {
    toggleTheme();
    const newTheme = document.documentElement.classList.contains('dark')
      ? 'dark'
      : '';
    setIcon(newTheme === 'dark' ? 'moon' : 'sun');
  };

  return (
    <Button
      className={
        'rounded-md px-3 py-2 font-medium transition duration-300 ease-out hover:bg-slate-200/80 hover:ease-in hover:dark:bg-slate-700/80'
      }
      variant={'unstyled'}
      onClick={handleToggleTheme}
    >
      {icon === 'moon' ? <IconMoon size={24} /> : <IconSun size={24} />}
    </Button>
  );
};
