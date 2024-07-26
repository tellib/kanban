import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, type, className, variant, ...props }, ref) => {
    return (
      <>
        {label && <label className='mb-1 mt-3 text-sm'>{label}</label>}
        <input
          ref={ref}
          type={type}
          className={cn(inputVariants({ variant, className }))}
          {...props}
        />
      </>
    );
  }
);
Input.displayName = 'Input';

// TODO add variants
const inputVariants = cva('', {
  variants: {
    variant: {
      default: 'w-full rounded-md px-3 py-2 text-sm bg-white dark:bg-white/20 ',
      unstyled: 'bg-none px-0 py-0',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});
