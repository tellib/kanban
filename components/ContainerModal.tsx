'use client';

import { forwardRef, useEffect, useState } from 'react';
import { Container, containerVariants } from './Container';
import { Center } from './Center';
import { VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

interface ContainerModalProps
  extends React.HTMLAttributes<HTMLDialogElement>,
    VariantProps<typeof containerVariants> {}

export const ContainerModal = forwardRef<
  HTMLDialogElement,
  ContainerModalProps
>(
  (
    {
      children,
      className,
      size,
      transparency,
      padding,
      gap,
      centered,
      snap,
      ...props
    },
    ref
  ) => {
    return (
      <dialog
        className='relative z-10'
        {...props}
        ref={ref}
        onClick={(e) => e.currentTarget.close()}
      >
        <div className='fixed inset-0 bg-black/60 transition-opacity'>
          <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
            <Center className='p-8'>
              <Container
                size={size}
                transparency={transparency}
                padding={padding}
                gap={gap}
                centered={centered}
                snap={snap}
                className={cn('z-20', className)}
                onClick={(e) => e.stopPropagation()}
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
ContainerModal.displayName = 'ContainerModal';
