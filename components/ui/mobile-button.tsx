import * as React from "react"
import { cn } from "@/lib/utils"
import { Button, ButtonProps } from "./button"
import { motion } from "framer-motion"

export interface MobileButtonProps extends ButtonProps {
  mobileFullWidth?: boolean
  touchFeedback?: boolean
}

const MobileButton = React.forwardRef<HTMLButtonElement, MobileButtonProps>(
  ({ className, mobileFullWidth = false, touchFeedback = true, children, ...props }, ref) => {
    return (
      <motion.div
        whileTap={touchFeedback ? { scale: 0.95 } : undefined}
        className={cn(mobileFullWidth && "w-full md:w-auto")}
      >
        <Button
          ref={ref}
          className={cn(
            // Ensure minimum touch target size
            "min-h-[44px] min-w-[44px]",
            // Better padding for mobile
            "px-6 py-3",
            // Full width on mobile if specified
            mobileFullWidth && "w-full md:w-auto",
            // Larger text on mobile
            "text-base md:text-sm",
            // Better touch feedback
            "active:scale-95 transition-transform duration-150",
            className
          )}
          {...props}
        >
          {children}
        </Button>
      </motion.div>
    )
  }
)
MobileButton.displayName = "MobileButton"

export { MobileButton }