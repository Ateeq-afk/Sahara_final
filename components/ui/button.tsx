import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap font-normal transition-all duration-[250ms] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.985] relative overflow-hidden',
  {
    variants: {
      variant: {
        default: 'bg-primary text-white hover:bg-primary-hover hover:scale-[1.015] shadow-sm hover:shadow-md',
        destructive: 'bg-red-500 text-white hover:bg-red-600 hover:scale-[1.015]',
        outline: 'border border-gray-300 bg-transparent hover:bg-gray-50 hover:border-gray-400',
        secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 hover:scale-[1.015] border border-gray-200',
        ghost: 'hover:bg-gray-100 hover:text-gray-900',
        link: 'text-primary underline-offset-4 hover:opacity-80 p-0 h-auto hover:scale-100',
        apple: 'bg-gray-900 text-white hover:bg-black hover:scale-[1.015] shadow-sm hover:shadow-md',
      },
      size: {
        default: 'h-11 px-5 rounded-[980px] text-[17px]',
        sm: 'h-9 px-4 rounded-[980px] text-[15px]',
        lg: 'h-14 px-8 rounded-[980px] text-[19px]',
        xl: 'h-16 px-10 rounded-[980px] text-[21px]',
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