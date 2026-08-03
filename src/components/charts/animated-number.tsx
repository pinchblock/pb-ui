"use client"

import NumberFlow, { NumberFlowGroup } from "@number-flow/react"
import type { NumberFlowProps } from "@number-flow/react"

import { cn } from "../../lib/cn.ts"

/**
 * AnimatedNumber. Stat-counter numerals that roll to their new value
 * (@number-flow/react underneath). Tabular numerals by default so
 * digits never jitter sideways in stat tiles; number-flow respects
 * prefers-reduced-motion on its own.
 *
 * Format via the standard Intl options: format={{ notation: "compact" }},
 * prefix/suffix for units: suffix=" kg".
 */

export type AnimatedNumberProps = NumberFlowProps

export function AnimatedNumber({ className, ...props }: AnimatedNumberProps) {
  return <NumberFlow className={cn("tabular-nums", className)} {...props} />
}

/**
 * Wrap sibling AnimatedNumbers so they animate in lockstep
 * (e.g. "12 / 16" where both sides tick together).
 */
export { NumberFlowGroup as AnimatedNumberGroup }
