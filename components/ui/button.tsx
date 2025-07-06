import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap text-[15px] font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]',
  {
    variants: {
      variant: {
        default: 'bg-gray-900 text-white hover:bg-black hover:scale-[1.02] shadow-sm hover:shadow-md',
        destructive: 'bg-red-600 text-white hover:bg-red-700 hover:scale-[1.02]',
        outline: 'border border-gray-300 bg-transparent hover:bg-gray-50 hover:border-gray-400',
        secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 hover:scale-[1.02]',
        ghost: 'hover:bg-gray-100 hover:text-gray-900',
        link: 'text-amber-600 underline-offset-4 hover:underline hover:text-amber-700',
        premium: 'bg-gradient-to-r from-amber-600 to-amber-700 text-white hover:from-amber-700 hover:to-amber-800 hover:scale-[1.02] shadow-lg hover:shadow-xl',
      },
      size: {
        default: 'h-11 px-6 rounded-full',
        sm: 'h-9 px-4 rounded-full text-sm',
        lg: 'h-13 px-8 rounded-full text-base',
        xl: 'h-14 px-10 rounded-full text-base',
        icon: 'h-10 w-10 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };