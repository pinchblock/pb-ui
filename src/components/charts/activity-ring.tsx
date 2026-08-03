import { cva, type VariantProps } from "class-variance-authority"
import { motion, useInView, useReducedMotion } from "motion/react"
import { useRef } from "react"
import type * as React from "react"

import { cn } from "../../lib/cn.ts"
import { shared } from "../../tokens/index.ts"

/**
 * ActivityRing. Circular progress ring, single or nested up to three,
 * with an animated sweep when it scrolls into view. The B2C progress
 * jewel: weekly session goals, volume targets, recovery. Reduced motion
 * jumps straight to the end state.
 */

export interface ActivityRingData {
  /** Progress percent, clamped to 0-100. */
  value: number
  /** Ring color, normally a chart token. Defaults through chart-1..3. */
  color?: string
  /** Named in the accessible label: "Sessions 80%". */
  label?: string
}

export const activityRingVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center",
  {
    variants: {
      size: {
        sm: "size-16",
        md: "size-24",
        lg: "size-36",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

export interface ActivityRingProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof activityRingVariants> {
  /** Single-ring shorthand; ignored when `rings` is given. */
  value?: number
  /** Up to three rings, outermost first. */
  rings?: ReadonlyArray<ActivityRingData>
  /**
   * Ring stroke width in viewBox units (viewBox is 100x100).
   * Defaults adapt to ring count (10 / 8 / 7) so the center slot stays usable.
   */
  thickness?: number
  /** Center slot: a value, an AnimatedNumber, an icon. */
  children?: React.ReactNode
}

/** Motion wants seconds and bezier arrays; tokens store ms strings. */
const seconds = (token: string) => parseFloat(token) / 1000

function bezier(token: string): [number, number, number, number] {
  const nums = token.match(/-?\d*\.?\d+/g)?.map(Number)
  return nums && nums.length === 4
    ? [nums[0]!, nums[1]!, nums[2]!, nums[3]!]
    : [0, 0, 1, 1]
}

const SWEEP_DURATION = seconds(shared.motion.duration.slower)
const SWEEP_STAGGER = seconds(shared.motion.duration.fast)
const SWEEP_EASE = bezier(shared.motion.ease.out)

const clampPercent = (value: number) => Math.min(100, Math.max(0, value))

export function ActivityRing({
  value,
  rings,
  thickness,
  size,
  children,
  className,
  "aria-label": ariaLabel,
  ...props
}: ActivityRingProps) {
  const reducedMotion = useReducedMotion()
  /* Observe the root div, not the SVG circles: IntersectionObserver on
     SVG child elements does not fire reliably, which left rings stuck
     at their initial (empty) sweep state. */
  const rootRef = useRef<HTMLDivElement>(null)
  const inView = useInView(rootRef, { once: true, amount: 0.4 })
  const ringData = (rings ?? (value != null ? [{ value }] : [])).slice(0, 3)
  const stroke = thickness ?? (ringData.length === 3 ? 7 : ringData.length === 2 ? 8 : 10)

  const defaultLabel = ringData
    .map((ring, i) => `${ring.label ?? `Ring ${i + 1}`} ${Math.round(clampPercent(ring.value))}%`)
    .join(", ")

  return (
    <div
      ref={rootRef}
      role="img"
      aria-label={ariaLabel ?? defaultLabel}
      className={cn(activityRingVariants({ size }), className)}
      {...props}
    >
      <svg viewBox="0 0 100 100" className="size-full" aria-hidden>
        <g transform="rotate(-90 50 50)">
          {ringData.map((ring, i) => {
            const radius = 50 - stroke / 2 - i * (stroke + 2)
            if (radius <= 0) return null
            const circumference = 2 * Math.PI * radius
            const offset = circumference * (1 - clampPercent(ring.value) / 100)
            const color = ring.color ?? `var(--chart-${i + 1})`
            return (
              <g key={i}>
                <circle
                  cx={50}
                  cy={50}
                  r={radius}
                  fill="none"
                  stroke="var(--chart-track)"
                  strokeWidth={stroke}
                />
                {reducedMotion ? (
                  /* Reduced motion: no sweep, jump straight to the end state. */
                  <circle
                    cx={50}
                    cy={50}
                    r={radius}
                    fill="none"
                    stroke={color}
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                  />
                ) : (
                  <motion.circle
                    cx={50}
                    cy={50}
                    r={radius}
                    fill="none"
                    stroke={color}
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: inView ? offset : circumference }}
                    transition={{
                      duration: SWEEP_DURATION,
                      delay: i * SWEEP_STAGGER,
                      ease: SWEEP_EASE,
                    }}
                  />
                )}
              </g>
            )
          })}
        </g>
      </svg>
      {children != null && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {children}
        </div>
      )}
    </div>
  )
}
