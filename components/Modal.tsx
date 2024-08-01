'use client';

import { forwardRef } from 'react';

interface ModalProps extends React.HTMLAttributes<HTMLDialogElement> {}

export const Modal = forwardRef<HTMLDialogElement, ModalProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <dialog className='relative z-10' {...props} ref={ref}>
        <div className='fixed inset-0 bg-black/60 transition-opacity'>
          <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
            {children}
          </div>
        </div>
      </dialog>
    );
  }
);
Modal.displayName = 'Modal';
