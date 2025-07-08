import * as React from "react"
import { cn } from "@/lib/utils"
import { Input, InputProps } from "./input"

export interface MobileInputProps extends InputProps {
  icon?: React.ReactNode
  clearable?: boolean
  onClear?: () => void
}

const MobileInput = React.forwardRef<HTMLInputElement, MobileInputProps>(
  ({ className, type, icon, clearable, onClear, value, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false)

    return (
      <div className={cn("relative", isFocused && "ring-2 ring-primary ring-offset-2 rounded-md")}>
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
            {icon}
          </div>
        )}
        
        <Input
          type={type}
          className={cn(
            // Prevent iOS zoom
            "text-base",
            // Minimum touch target
            "h-12 md:h-10",
            // Better padding
            "px-4 py-3",
            // Icon padding
            icon && "pl-10",
            // Clear button padding
            clearable && value && "pr-10",
            // Focus styles
            "focus:outline-none focus:ring-0",
            className
          )}
          ref={ref}
          value={value}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        
        {clearable && value && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              onClear?.()
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    )
  }
)
MobileInput.displayName = "MobileInput"

export { MobileInput }