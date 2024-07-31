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
          'fixed bottom-4 right-4 z-40 flex items-center gap-2 rounded-xl bg-white p-4 shadow-lg transition-opacity duration-200 dark:bg-neutral-800',
          isOpen ? 'opacity-100' : 'opacity-0'
        )}
        {...props}
      >
        {title && <p className='text-md font-medium'>{title}</p>}
        <p className='text-sm'>{children}</p>
        <div className='flex flex-col items-center gap-y-2'>
          <IconX onClick={() => setIsOpen(false)} className='cursor-pointer' />
        </div>
      </div>
    );
  }
);
Message.displayName = 'Message';
