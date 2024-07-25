import { cn } from '@/lib/utils';

export function Center({
  children,
  flex = 'flex-col',
}: {
  children: React.ReactNode;
  flex?: string;
}) {
  return (
    <div className={cn('flex h-full items-center justify-center', flex)}>
      {children}
    </div>
  );
}
