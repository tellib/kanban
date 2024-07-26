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
          'absolute inset-0 z-50 min-h-full min-w-full bg-white/20 backdrop-blur dark:bg-black/50',
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
