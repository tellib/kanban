'use client';
import { forwardRef, use, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

export interface DialogProps extends React.HTMLAttributes<HTMLDialogElement> {
  children: React.ReactNode;
}

export const Dialog = forwardRef<HTMLDialogElement, DialogProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <dialog
        ref={ref}
        className={cn(
          'absolute inset-0 z-50 min-h-full min-w-full truncate bg-white/20 text-3xl font-medium backdrop-blur dark:bg-black/20 dark:text-white',
          className
        )}
        {...props}
      >
        {children}
      </dialog>
    );
  }
);
Dialog.displayName = 'Dialog';
