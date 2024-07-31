'use client';

import { forwardRef, useEffect, useState } from 'react';
import { Container } from './Container';
import { Center } from './Center';

interface ModalProps extends React.HTMLAttributes<HTMLDialogElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Modal = forwardRef<HTMLDialogElement, ModalProps>(
  ({ children, className, size, ...props }, ref) => {
    return (
      <dialog className='relative z-10' {...props} ref={ref}>
        <div className='fixed inset-0 bg-black/70 transition-opacity dark:bg-black/60'>
          <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
            <Center className='justify-center p-4'>
              <Container
                transparency={100}
                padding={'xl'}
                size={size || 'md'}
                gap={'lg'}
                className='z-20'
              >
                {children}
              </Container>
            </Center>
          </div>
        </div>
      </dialog>
    );
  }
);
Modal.displayName = 'Modal';
