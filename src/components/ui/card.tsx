import * as React from 'react';
import { cn } from '@/lib/utils';
import type { HTMLAttributes, ForwardedRef } from 'react';

const Card = (props: HTMLAttributes<HTMLDivElement>, ref: ForwardedRef<HTMLDivElement>) => {
  const { className, ...rest } = props;
  return (
    <div
      ref={ref}
      className={cn(
        'rounded-lg border bg-card text-card-foreground shadow-sm',
        className
      )}
      {...rest}
    />
  );
};
Card.displayName = 'Card';
const CardForwardRef = React.forwardRef(Card);

const CardHeader = (props: HTMLAttributes<HTMLDivElement>, ref: ForwardedRef<HTMLDivElement>) => {
  const { className, ...rest } = props;
  return (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 p-6', className)}
      {...rest}
    />
  );
};
CardHeader.displayName = 'CardHeader';
const CardHeaderForwardRef = React.forwardRef(CardHeader);

const CardTitle = (props: HTMLAttributes<HTMLHeadingElement>, ref: ForwardedRef<HTMLHeadingElement>) => {
  const { className, ...rest } = props;
  return (
    <h3
      ref={ref}
      className={cn('font-semibold leading-none tracking-tight', className)}
      {...rest}
    />
  );
};
CardTitle.displayName = 'CardTitle';
const CardTitleForwardRef = React.forwardRef(CardTitle);

const CardDescription = (props: HTMLAttributes<HTMLParagraphElement>, ref: ForwardedRef<HTMLParagraphElement>) => {
  const { className, ...rest } = props;
  return (
    <p
      ref={ref}
      className={cn('text-sm text-muted-foreground', className)}
      {...rest}
    />
  );
};
CardDescription.displayName = 'CardDescription';
const CardDescriptionForwardRef = React.forwardRef(CardDescription);

const CardContent = (props: HTMLAttributes<HTMLDivElement>, ref: ForwardedRef<HTMLDivElement>) => {
  const { className, ...rest } = props;
  return (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...rest} />
  );
};
CardContent.displayName = 'CardContent';
const CardContentForwardRef = React.forwardRef(CardContent);

const CardFooter = (props: HTMLAttributes<HTMLDivElement>, ref: ForwardedRef<HTMLDivElement>) => {
  const { className, ...rest } = props;
  return (
    <div
      ref={ref}
      className={cn('flex items-center p-6 pt-0', className)}
      {...rest}
    />
  );
};
CardFooter.displayName = 'CardFooter';
const CardFooterForwardRef = React.forwardRef(CardFooter);

export { 
  CardForwardRef as Card, 
  CardHeaderForwardRef as CardHeader, 
  CardFooterForwardRef as CardFooter, 
  CardTitleForwardRef as CardTitle, 
  CardDescriptionForwardRef as CardDescription, 
  CardContentForwardRef as CardContent 
};
