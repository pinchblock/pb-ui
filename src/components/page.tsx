import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"

import { cn } from "../lib/cn.ts"

/**
 * Page: width-capped content container with responsive horizontal
 * padding. Pairs with PageHeader (content group) passed as children;
 * Page deliberately does not import it so the groups stay decoupled.
 */
export const pageVariants = cva("mx-auto w-full px-4 sm:px-6 lg:px-8", {
  variants: {
    size: {
      sm: "max-w-xl",
      md: "max-w-3xl",
      lg: "max-w-5xl",
      xl: "max-w-7xl",
      full: "max-w-none",
    },
  },
  defaultVariants: {
    size: "lg",
  },
})

export interface PageProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pageVariants> {}

export function Page({ className, size, ...props }: PageProps) {
  return <div className={cn(pageVariants({ size }), className)} {...props} />
}
