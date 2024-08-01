import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  label?: string;
  id: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, className, variant, id, ...props }, ref) => {
    return (
      <div className='flex flex-col'>
        {label && (
          <label htmlFor={id} className='text-sm font-medium'>
            {label}
          </label>
        )}
        <textarea
          id={id}
          ref={ref}
          className={cn(textareaVariants({ variant, className }))}
          {...props}
        />
      </div>
    );
  }
);
TextArea.displayName = 'TextArea';

// TODO add variants
const textareaVariants = cva('', {
  variants: {
    variant: {
      default:
        'overflow-y-auto resize-none min-h-36 w-full rounded-md px-3 py-2 text-sm bg-white dark:bg-white/20  ring-1 ring-black/10 dark:ring-white/10 dark:ring-1 focus:ring-1 focus:ring-black/10 dark:focus:ring-white/10 focus:ring-offset-1 focus:ring-offset-black/10 dark:focus:ring-offset-white/10 mt-1',
      unstyled: 'bg-transparent',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});
