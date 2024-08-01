import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';

interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {}

export const Container = ({
  children,
  className,
  size,
  transparency,
  padding,
  gap,
  centered,
  snap,
  ...props
}: ContainerProps) => {
  return (
    <div
      className={cn(
        containerVariants({ size, transparency, padding, gap, centered, snap }),
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const containerVariants = cva(
  'flex h-max max-h-full flex-col rounded-lg shadow-xl ring-1 ring-inset ring-white/70 dark:ring-neutral-800/70',
  {
    variants: {
      size: {
        default: 'w-full',
        sm: 'min-w-full sm:w-[18rem] sm:min-w-[18rem]',
        md: 'min-w-full sm:w-[24rem] md:min-w-[24rem]',
        lg: 'min-w-full sm:w-[36rem] sm:min-w-[36rem]',
        xl: 'min-w-full sm:w-[60rem] sm:min-w-[60rem]',
      },
      transparency: {
        100: 'bg-neutral-100 dark:bg-neutral-800',
        70: 'bg-white/70 dark:bg-black/70 backdrop-blur',
        50: 'bg-white/50 dark:bg-black/50 backdrop-blur',
        0: 'bg-transparent',
      },
      padding: {
        none: 'p-0',
        sm: 'p-2',
        md: 'p-4',
        lg: 'p-6',
        xl: 'p-8',
      },
      gap: {
        none: 'gap-0',
        sm: 'gap-2',
        md: 'gap-4',
        lg: 'gap-6',
        xl: 'gap-8',
      },
      centered: {
        true: 'flex h-full flex-col items-center justify-center mx-auto',
        false: '',
      },
      snap: {
        true: 'snap-center snap-always',
        false: '',
      },
    },
    defaultVariants: {
      size: 'default',
      transparency: 100,
      padding: 'sm',
      gap: 'sm',
      centered: false,
      snap: false,
    },
  }
);
