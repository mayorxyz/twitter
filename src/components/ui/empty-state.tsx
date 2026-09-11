import * as React from 'react';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';
import type { HTMLAttributes, ForwardedRef } from 'react';

interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

const EmptyState = (props: EmptyStateProps, ref: ForwardedRef<HTMLDivElement>) => {
  const { className, icon: Icon, title, description, action, ...rest } = props;
  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed p-12 text-center',
        className
      )}
      {...rest}
    >
      {Icon && (
        <div className="rounded-full bg-muted p-3">
          <Icon className="h-6 w-6 text-muted-foreground" />
        </div>
      )}
      <div className="flex flex-col items-center gap-1">
        <h3 className="text-lg font-semibold">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground max-w-sm">{description}</p>
        )}
      </div>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
};
EmptyState.displayName = 'EmptyState';
const EmptyStateForwardRef = React.forwardRef(EmptyState);

export { EmptyStateForwardRef as EmptyState };
