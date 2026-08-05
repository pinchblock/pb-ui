"use client"

import { Slider as BaseSlider } from "@base-ui/react/slider"
import { cva } from "class-variance-authority"

import { cn } from "../../lib/cn.ts"

/**
 * Slider. Base UI Slider with primary track fill; the Pinchblock
 * effort-1-to-10 control. Pass an array value for a range slider
 * (thumbs are derived from the array length). Give each thumb an
 * accessible name via `aria-label` (single) or `getThumbAriaLabel`.
 */
export const sliderThumbVariants = cva(
  cn(
    "size-4 rounded-full border border-primary bg-card shadow-card select-none",
    "transition-[box-shadow] duration-(--duration-fast) ease-(--ease-out)",
    "data-dragging:shadow-raised",
    "data-disabled:pointer-events-none",
  ),
)

export interface SliderProps extends Omit<BaseSlider.Root.Props, "className"> {
  className?: string | undefined
  /** aria-label for the (single) thumb. */
  "aria-label"?: string
  /** aria-label per thumb for range sliders. */
  getThumbAriaLabel?: (index: number) => string
}

export function Slider({
  className,
  "aria-label": ariaLabel,
  getThumbAriaLabel,
  ...props
}: SliderProps) {
  const values = props.value ?? props.defaultValue
  const thumbCount = Array.isArray(values) ? values.length : 1
  return (
    <BaseSlider.Root
      className={cn("w-full data-disabled:opacity-50", className)}
      {...props}
    >
      <BaseSlider.Control className="flex w-full touch-none items-center py-2 select-none">
        <BaseSlider.Track className="h-1.5 w-full rounded-full bg-muted select-none">
          <BaseSlider.Indicator className="rounded-full bg-primary select-none" />
          {Array.from({ length: thumbCount }, (_, index) => (
            <BaseSlider.Thumb
              key={index}
              index={index}
              getAriaLabel={
                getThumbAriaLabel ??
                (ariaLabel !== undefined ? () => ariaLabel : undefined)
              }
              className={sliderThumbVariants()}
            />
          ))}
        </BaseSlider.Track>
      </BaseSlider.Control>
    </BaseSlider.Root>
  )
}
