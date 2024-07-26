import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, padding: size, type, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, padding: size, className }))}
        {...props}
        type={type || 'button'}
      />
    );
  }
);
Button.displayName = 'Button';

// TODO add variants, fix styles
const buttonVariants = cva('font-medium', {
  variants: {
    variant: {
      default: 'ring-1 ring-inset ring-black/10 ',
      primary:
        'flex items-center justify-center rounded-md font-medium transition duration-150 ease-in hover:duration-150 bg-slate-400 dark:bg-slate-900 hover:bg-slate-400/80 dark:hover:bg-slate-900/80 shadow-sm text-white',
      hover:
        'rounded-md font-medium transition duration-150 ease-out hover:bg-black/5  hover:ease-in dark:hover:bg-white/10 flex flex-row gap-x-1 items-center hover:ring-1 ring-inset ring-black/10 dark:ring-white/10 hover:shadow-sm',
      unstyled: 'bg-none',
    },
    padding: {
      default: 'px-2 py-2',
      icon: 'px-2 py-2',
    },
  },
  defaultVariants: {
    variant: 'default',
    padding: 'default',
  },
});
