import { Separator as BaseSeparator } from "@base-ui/react/separator"

import { cn } from "../../lib/cn.ts"

/**
 * Separator. Base UI separator (accessible to screen readers).
 * Vertical orientation needs a stretchable or fixed-height parent.
 */
export function Separator({
  className,
  orientation = "horizontal",
  ...props
}: BaseSeparator.Props) {
  return (
    <BaseSeparator
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        "data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full",
        "data-[orientation=vertical]:w-px data-[orientation=vertical]:self-stretch",
        className,
      )}
      {...props}
    />
  )
}
