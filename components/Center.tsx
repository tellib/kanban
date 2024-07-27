import { cn } from '@/lib/utils';

interface CenterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Center = ({ className, children, ...props }: CenterProps) => {
  return (
    <div
      className={cn(
        'flex h-full flex-col items-center justify-center',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
