"use client"

import { cva, type VariantProps } from "class-variance-authority"
import { Check } from "@phosphor-icons/react"
import type * as React from "react"

import { cn } from "../lib/cn.ts"

/**
 * Stepper. Horizontal step indicator for wizards and guided workout
 * progress. Two variants:
 * - dots: numbered circles with connectors; completed steps show a
 *   check (onboarding wizards, plan builders)
 * - bars: flat segments, one per step (in-workout progress, quick
 *   multi-step sheets)
 *
 * Presentational, not interactive: pair with Buttons for navigation.
 * Screen readers get "Step N of M" plus per-step state.
 */
export const stepperVariants = cva("w-full", {
  variants: {
    variant: {
      dots: "",
      bars: "",
    },
  },
  defaultVariants: {
    variant: "dots",
  },
})

export interface StepperProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof stepperVariants> {
  /** Step labels in order. Empty strings hide the label, keep the slot. */
  steps: string[]
  /** Active step, 0-based. Steps before it render as completed. */
  activeStep: number
}

export function Stepper({
  className,
  variant,
  steps,
  activeStep,
  ...props
}: StepperProps) {
  const resolvedVariant = variant ?? "dots"

  return (
    <nav
      aria-label={`Step ${Math.min(activeStep + 1, steps.length)} of ${steps.length}`}
      className={cn(stepperVariants({ variant }), className)}
      {...props}
    >
      <ol className={cn("flex", resolvedVariant === "dots" ? "items-start" : "gap-2")}>
        {steps.map((label, index) => {
          const completed = index < activeStep
          const current = index === activeStep
          const stateLabel = completed ? "completed" : current ? "current" : "upcoming"

          if (resolvedVariant === "bars") {
            return (
              <li
                key={index}
                aria-current={current ? "step" : undefined}
                className="min-w-0 flex-1"
              >
                <div
                  className={cn(
                    "h-1.5 rounded-full transition-colors duration-(--duration-base) ease-(--ease-out)",
                    completed || current ? "bg-primary" : "bg-muted",
                  )}
                />
                {label ? (
                  <span
                    className={cn(
                      "mt-2 block truncate text-xs",
                      current
                        ? "font-medium text-foreground"
                        : "text-muted-foreground",
                    )}
                  >
                    {label}
                  </span>
                ) : null}
                <span className="sr-only">{stateLabel}</span>
              </li>
            )
          }

          return (
            <li
              key={index}
              aria-current={current ? "step" : undefined}
              className={cn(
                "flex min-w-0 items-start",
                index < steps.length - 1 && "flex-1",
              )}
            >
              <div className="flex min-w-0 flex-col items-center gap-1.5">
                <span
                  className={cn(
                    "flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                    "transition-colors duration-(--duration-base) ease-(--ease-out)",
                    completed && "bg-primary text-primary-foreground",
                    current && "bg-primary-soft text-primary ring-2 ring-primary",
                    !completed && !current && "bg-muted text-muted-foreground",
                  )}
                >
                  {completed ? <Check aria-hidden className="size-4" /> : index + 1}
                </span>
                {label ? (
                  <span
                    className={cn(
                      "max-w-24 truncate text-xs",
                      current ? "font-medium text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {label}
                  </span>
                ) : null}
                <span className="sr-only">{stateLabel}</span>
              </div>
              {index < steps.length - 1 ? (
                <div
                  aria-hidden
                  className={cn(
                    "mx-2 mt-3.5 h-0.5 flex-1 rounded-full",
                    "transition-colors duration-(--duration-base) ease-(--ease-out)",
                    completed ? "bg-primary" : "bg-border",
                  )}
                />
              ) : null}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
