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

export function colorString(color: string | undefined) {
  switch (color) {
    case 'pink':
      return 'from-pink-600 to-pink-400 dark:from-pink-700 dark:to-pink-600';
    case 'purple':
      return 'from-purple-600 to-purple-400 dark:from-purple-700 dark:to-purple-600';
    case 'fuschia':
      return 'from-fuchsia-600 to-fuchsia-400 dark:from-fuchsia-700 dark:to-fuchsia-600';
    case 'blue':
      return 'from-blue-600 to-blue-400 dark:from-blue-700 dark:to-blue-600';
    case 'cyan':
      return 'from-cyan-600 to-cyan-400 dark:from-cyan-700 dark:to-cyan-600';
    case 'emerald':
      return 'from-emerald-600 to-emerald-400 dark:from-emerald-900 dark:bg-emerald-700';
    case 'lime':
      return 'from-lime-600 to-lime-400 dark:from-lime-700 dark:to-lime-600';
    case 'yellow':
      return 'from-yellow-600 to-yellow-400 dark:from-yellow-700 dark:to-yellow-600';
    case 'orange':
      return 'from-orange-600 to-orange-400 dark:from-orange-700 dark:to-orange-600';
    case 'red':
      return 'from-red-600 to-red-400 dark:from-red-700 dark:to-red-600';
    default:
      return '';
  }
}
