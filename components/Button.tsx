import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, padding, type, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, padding }), className)}
        {...props}
        type={type || 'button'}
      />
    );
  }
);
Button.displayName = 'Button';

// TODO add variants, fix styles
export const buttonVariants = cva('font-medium', {
  variants: {
    variant: {
      default:
        'flex items-center justify-center rounded-md font-medium transition duration-150 ease-in hover:duration-150 bg-blue-400 dark:bg-blue-900 hover:bg-blue-400/80 dark:hover:bg-blue-900/80 shadow-sm text-white',
      secondary:
        'flex items-center justify-center rounded-md font-medium transition duration-150 ease-in hover:duration-150 bg-neutral-500 dark:bg-neutral-900 hover:bg-neutral-500/80 dark:hover:bg-neutral-900/80 shadow-sm text-white',
      hover:
        'rounded-md font-medium transition duration-150 ease-out hover:bg-black/5  hover:ease-in dark:hover:bg-white/10 flex flex-row gap-x-1 items-center hover:ring-1 ring-inset ring-black/10 dark:ring-white/10 hover:shadow-sm',
      outlined:
        'rounded-md font-medium transition duration-150 ease-out bg-black/10 hover:bg-black/20 dark:hover:bg-black/40 hover:ease-in dark:bg-black/20 flex flex-row gap-x-1 items-center ring-1 ring-inset ring-black/10 dark:ring-white/10 shadow-sm',
      unstyled: 'bg-none',
    },
    padding: {
      default: 'p-2 gap-2',
      wide: 'px-4 p-2',
      icon: 'p-2',
    },
  },
  defaultVariants: {
    variant: 'default',
    padding: 'default',
  },
});
