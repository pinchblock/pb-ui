import { Input as BaseInput } from "@base-ui/react/input"
import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"

import { cn } from "../../lib/cn.ts"

/**
 * Input. Base UI Input underneath (works inside Field out of the box:
 * label association, description/error wiring, data-invalid).
 * Invalid state: set aria-invalid yourself, or let Field do it.
 */
export const inputVariants = cva(
  cn(
    "w-full min-w-0 rounded-md border border-input bg-input-background text-foreground",
    "placeholder:text-faint-foreground",
    "transition-[border-color,background-color,box-shadow] duration-(--duration-fast) ease-(--ease-out)",
    "hover:border-border-strong",
    "disabled:pointer-events-none disabled:opacity-50",
    "aria-invalid:border-destructive data-invalid:border-destructive",
    "file:me-3 file:h-full file:border-0 file:bg-transparent file:font-medium file:text-foreground",
  ),
  {
    variants: {
      size: {
        sm: "h-8 px-2.5 text-xs",
        md: "h-9 px-3 text-sm",
        lg: "h-10 px-3.5 text-sm",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

export interface InputProps
  extends Omit<BaseInput.Props, "size" | "className">,
    VariantProps<typeof inputVariants> {
  className?: string
  /** Icon/adornment before the text; non-interactive (clicks pass through). */
  leading?: React.ReactNode
  /** Icon/adornment after the text; may be interactive (e.g. clear button). */
  trailing?: React.ReactNode
}

export function Input({ className, size, leading, trailing, ...props }: InputProps) {
  const input = (
    <BaseInput
      className={cn(
        inputVariants({ size }),
        leading != null && "pl-9",
        trailing != null && "pr-9",
        className,
      )}
      {...props}
    />
  )
  if (leading == null && trailing == null) {
    return input
  }
  return (
    <div className="relative w-full">
      {leading != null && (
        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground [&_svg:not([class*='size-'])]:size-4">
          {leading}
        </span>
      )}
      {input}
      {trailing != null && (
        <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground [&_svg:not([class*='size-'])]:size-4">
          {trailing}
        </span>
      )}
    </div>
  )
}
