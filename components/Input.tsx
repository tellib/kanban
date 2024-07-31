import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  label?: string;
  id: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, className, variant, id, ...props }, ref) => {
    return (
      <div className='flex flex-col'>
        {label && (
          <label htmlFor={id} className='text-sm font-medium'>
            {label}
          </label>
        )}
        <input
          id={id}
          ref={ref}
          className={cn(inputVariants({ variant, className }))}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = 'Input';

// TODO add variants
const inputVariants = cva('w-full', {
  variants: {
    variant: {
      default:
        'rounded-md px-3 py-2 text-sm bg-white dark:bg-white/20  ring-1 ring-black/10 dark:ring-white/10 dark:ring-1 focus:ring-1 focus:ring-black/10 dark:focus:ring-white/10 focus:ring-offset-1 focus:ring-offset-black/10 dark:focus:ring-offset-white/10 mt-1',
      unstyled: 'bg-transparent',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});
