import { forwardRef, useState } from 'react';
import { Button } from './Button';

export interface Option {
  name: string;
  func?: () => Promise<void> | void | Promise<Promise<void>>;
}

export function Option({ name, func }: Option) {
  return (
    <div className='block px-4 py-2 text-sm' role='menuitem' onClick={func}>
      {name}
    </div>
  );
}

export interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  options: Option[];
}

export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  ({ children, className, options, ...props }, ref) => {
    const [open, setOpen] = useState(false);

    return (
      <div className='relative inline-block text-left'>
        <div>
          {open ? (
            <Button
              variant={'hover'}
              onClick={() => setOpen(!open)}
              className='bg-white/50 ring-1 ring-black/10 dark:bg-black/50 dark:ring-white/10'
            >
              {children}
            </Button>
          ) : (
            <Button variant={'hover'} onClick={() => setOpen(!open)}>
              {children}
            </Button>
          )}
        </div>
        <div
          className={`z-2 absolute right-0 mt-1.5 w-max origin-top-right divide-y divide-black/10 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition-opacity duration-150 ease-in-out focus:outline-none dark:divide-white/10 dark:bg-black/90 ${
            open ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
          role='menu'
          aria-orientation='vertical'
          aria-labelledby='menu-button'
          tabIndex={-1}
        >
          {options.map((option) => (
            <div
              key={option.name}
              className='p-1.5 transition ease-linear hover:cursor-pointer hover:bg-black/5 dark:hover:bg-white/5'
              role='none'
            >
              <Option name={option.name} func={option.func} />
            </div>
          ))}
          {/* <div className='py-1' role='none'>
            <a
              href='#'
              className='block px-4 py-2 text-sm text-gray-700 hover:bg-black/5 hover:transition hover:duration-150 hover:ease-in'
            >
              Edit
            </a>
            <a
              href='#'
              className='block px-4 py-2 text-sm text-gray-700 hover:bg-black/5 hover:transition hover:duration-150 hover:ease-in'
            >
              Delete
            </a>
          </div> */}
          {/* <div className='py-1' role='none'>
            <a
              href='#'
              className='block px-4 py-2 text-sm text-gray-700 hover:bg-black/5 hover:transition hover:duration-150 hover:ease-in'
            >
              Archive
            </a>
            <a
              href='#'
              className='block px-4 py-2 text-sm text-gray-700 hover:bg-black/5 hover:transition hover:duration-150 hover:ease-in'
            >
              Move
            </a>
          </div> */}
        </div>
      </div>
    );
  }
);
Dropdown.displayName = 'Dropdown';
