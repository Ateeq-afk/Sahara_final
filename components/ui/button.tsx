import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap font-medium focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.985] relative overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
  {
    variants: {
      variant: {
        default: 'bg-black text-white hover:bg-gray-800 shadow-sm hover:shadow-md',
        destructive: 'bg-red-500 text-white hover:bg-red-600',
        outline: 'border-2 border-gray-200 bg-transparent hover:bg-gray-50 hover:border-gray-300',
        secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 border-2 border-gray-200 hover:border-gray-300',
        ghost: 'hover:bg-gray-100 hover:text-gray-900',
        link: 'text-blue-600 underline-offset-4 hover:text-blue-700 p-0 h-auto hover:scale-100',
        apple: 'bg-black text-white hover:bg-gray-800 shadow-sm hover:shadow-md',
        blue: 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-md',
      },
      size: {
        default: 'h-11 px-6 rounded-full text-[17px]',
        sm: 'h-9 px-4 rounded-full text-[15px]',
        lg: 'h-14 px-8 rounded-full text-[19px]',
        xl: 'h-16 px-10 rounded-full text-[21px]',
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