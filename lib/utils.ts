import { twMerge } from 'tailwind-merge';
import { clsx, ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function initializeTheme() {
  if (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  return true;
}

export function toggleTheme() {
  localStorage.theme === 'light'
    ? (localStorage.theme = 'dark')
    : (localStorage.theme = 'light');

  initializeTheme();
  return localStorage.theme;
}
