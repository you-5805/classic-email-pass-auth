import { cn } from '@/lib/cn';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'button'>;

export const Button = ({ children, className, ...props }: Props) => (
  <button
    {...props}
    className={cn(
      'rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700',
      className
    )}
  >
    {children}
  </button>
);
