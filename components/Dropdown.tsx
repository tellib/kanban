import { forwardRef, useState } from 'react';
import { Button, buttonVariants } from './Button';
import { VariantProps } from 'class-variance-authority';

export interface Option {
  name: string;
  func?: () => Promise<void> | void | Promise<Promise<void>>;
  icon?: React.ReactNode;
}

export function Option({ name, func, icon }: Option) {
  return (
    <div
      className='flex flex-row items-center gap-1 px-4 py-3 text-sm transition ease-linear hover:cursor-pointer'
      role='menuitem'
      onClick={func}
    >
      {icon}
      <p className='font-medium'>{name}</p>
    </div>
  );
}

export interface DropdownProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof buttonVariants> {
  title: string;
  options: Option[];
}

export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  ({ children, className, options, variant, ...props }, ref) => {
    const [open, setOpen] = useState(false);

    return (
      <div className='relative inline-block text-left'>
        <div>
          <Button
            variant={variant}
            onClick={() => {
              setOpen(!open);
            }}
            // onMouseOver={() => setOpen(!open)}
            // onFocus={() => setOpen(!open)}
          >
            {children}
          </Button>
        </div>
        <div
          className={`absolute right-0 z-50 mt-1.5 w-max origin-top-right divide-y divide-black/10 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 backdrop-blur-md transition-opacity duration-150 ease-in-out focus:outline-none dark:divide-white/10 dark:bg-neutral-900 ${
            open ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
          onMouseLeave={() => setOpen(false)}
        >
          {options.map((option) => (
            <div key={option.name} role='none'>
              <Option
                name={option.name}
                func={option.func}
                icon={option.icon}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
);
Dropdown.displayName = 'Dropdown';
