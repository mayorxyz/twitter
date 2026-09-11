import * as React from 'react';
import { cn } from '@/lib/utils';
import type { SelectHTMLAttributes, ForwardedRef } from 'react';

const Select = (props: SelectHTMLAttributes<HTMLSelectElement>, ref: ForwardedRef<HTMLSelectElement>) => {
  const { className, ...rest } = props;
  return (
    <select
      className={cn(
        'flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...rest}
    />
  );
};
Select.displayName = 'Select';
const SelectForwardRef = React.forwardRef(Select);

export { SelectForwardRef as Select };
