'use client';

import { forwardRef } from 'react';

interface ModalProps extends React.HTMLAttributes<HTMLDialogElement> {}

export const Modal = forwardRef<HTMLDialogElement, ModalProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <dialog
        className='relative z-10'
        {...props}
        ref={ref}
        onClick={(e) => e.currentTarget.close()}
      >
        <div className='fixed inset-0 bg-black/60 transition-opacity'>
          <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
            <div className='min-h-min min-w-min'>{children}</div>
          </div>
        </div>
      </dialog>
    );
  }
);
Modal.displayName = 'Modal';
