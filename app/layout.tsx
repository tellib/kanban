import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { cn } from '@/lib/utils';
import { SessionProvider } from '@/components/SessionProvider';
import { Navbar } from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Kanban',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={cn(
          'flex h-screen w-screen flex-col bg-gradient-to-bl from-blue-300 to-blue-200 text-black/60 antialiased dark:from-blue-700 dark:to-blue-600 dark:text-white/70',
          inter.className
        )}
      >
        <SessionProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
