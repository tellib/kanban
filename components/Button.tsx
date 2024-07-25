import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

// TODO add variants, fix styles
const buttonVariants = cva('', {
  variants: {
    variant: {
      default:
        'flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition duration-150 ease-in hover:duration-150 bg-slate-400 dark:bg-slate-900 hover:bg-slate-400/80 dark:hover:bg-slate-900/80 shadow-sm text-white',
      link: 'underline-offset-4 hover:underline',
      unstyled: 'bg-none',
      simple:
        'rounded-md px-3 py-2 font-medium transition duration-150 ease-out hover:bg-black/5  hover:ease-in dark:hover:bg-white/10',
    },
    size: {
      default: 'px-4 py-2',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});
