'use client';
import { forwardRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { IconX } from '@tabler/icons-react';

export interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Message = forwardRef<HTMLDivElement, DialogProps>(
  ({ children, className, title, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
      setIsOpen(true);
    }, []);

    useEffect(() => {
      if (isOpen) {
        const timer = setTimeout(() => {
          setIsOpen(false);
        }, 2000);
        return () => clearTimeout(timer);
      }
    }, [isOpen]);

    return (
      <div
        ref={ref}
        className={cn(
          className,
          'fixed bottom-6 right-6 z-40 flex w-48 min-w-48 items-center gap-2 rounded-xl bg-white p-4 shadow-lg transition-opacity duration-200 dark:bg-neutral-800',
          isOpen ? 'opacity-100' : 'opacity-0'
        )}
        {...props}
      >
        <div className='flex w-full flex-col gap-1'>
          {title && <p className='text-md font-medium'>{title}</p>}
          <p className='text-sm'>{children}</p>
        </div>
        <div className='flex flex-col gap-y-2'>
          <IconX className='cursor-pointer' onClick={() => setIsOpen(false)} />
        </div>
      </div>
    );
  }
);
Message.displayName = 'Message';
