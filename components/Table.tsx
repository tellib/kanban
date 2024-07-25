import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

// <table>
const Table = forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, children, ...props }, ref) => (
  <table
    ref={ref}
    className={cn(
      'w-full table-auto text-left text-sm text-neutral-500 dark:text-neutral-400',
      className
    )}
    {...props}
  >
    {children}
  </table>
));
Table.displayName = 'Table';

// <thead>
const TableHeader = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn(
      'bg-neutral-50 text-xs uppercase text-neutral-700 dark:bg-neutral-700 dark:text-neutral-400',
      className
    )}
    {...props}
  />
));
TableHeader.displayName = 'TableHeader';

// <tbody>
const TableBody = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn(
      'divide-y divide-neutral-200 dark:divide-neutral-700',
      className
    )}
    {...props}
  />
));
TableBody.displayName = 'TableBody';

// <tr>
const TableRow = forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      'border-b border-neutral-200 transition duration-150 hover:bg-black/5 hover:ease-in dark:border-neutral-700 dark:hover:bg-white/10',
      className
    )}
    {...props}
  />
));
TableRow.displayName = 'TableRow';

// <td>
const TableCell = forwardRef<
  HTMLTableCellElement,
  React.HTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn('whitespace-nowrap px-6 py-3', className)}
    {...props}
  />
));
TableCell.displayName = 'TableCell';

// <tfoot>
const TableFooter = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      'bg-neutral-50 text-xs uppercase text-neutral-700 dark:bg-neutral-700 dark:text-neutral-400',
      className
    )}
    {...props}
  />
));
TableFooter.displayName = 'TableFooter';

export { Table, TableHeader, TableBody, TableRow, TableCell, TableFooter };
