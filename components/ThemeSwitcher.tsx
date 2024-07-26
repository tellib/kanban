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
    <Button variant={'hover'} onClick={handleToggleTheme}>
      {icon === 'moon' ? <IconMoon size={24} /> : <IconSun size={24} />}
    </Button>
  );
};
