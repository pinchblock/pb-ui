"use client"

import { Field as BaseField } from "@base-ui/react/field"
import type * as React from "react"

import { cn } from "../../lib/cn.ts"
import { labelVariants } from "./label.tsx"

/**
 * Field. THE form-row molecule: label + control slot + hint + error +
 * optional character counter. Composes Base UI Field, so any Base UI
 * control placed as a child (Input, Textarea, Checkbox, SimpleSelect,
 * Switch, RadioGroup, Slider) is automatically labelled and described.
 *
 * Error handling:
 * - `error` prop set: shown with role="alert", control gets data-invalid.
 * - no `error` prop: Base UI validation errors (required, validate fn)
 *   surface automatically in the same slot.
 */
export interface FieldProps extends Omit<BaseField.Root.Props, "className"> {
  className?: string
  label?: React.ReactNode
  /** Quiet helper text under the control; hidden while an error shows. */
  hint?: React.ReactNode
  /** External error message (form lib / server). Marks the field invalid. */
  error?: React.ReactNode
  /** Renders a required marker after the label. */
  required?: boolean
  /** Character counter: current count. Shown when `max` is also set. */
  count?: number
  /** Character counter: maximum. Pairs with Textarea maxLength. */
  max?: number
  children: React.ReactNode
}

export function Field({
  className,
  label,
  hint,
  error,
  required = false,
  count,
  max,
  invalid,
  children,
  ...props
}: FieldProps) {
  const showCounter = count !== undefined && max !== undefined
  const overLimit = showCounter && count > max
  return (
    <BaseField.Root
      invalid={invalid ?? (error ? true : undefined)}
      className={cn("flex w-full flex-col gap-1.5", className)}
      {...props}
    >
      {label != null && (
        <BaseField.Label className={labelVariants()}>
          {label}
          {required && (
            <span aria-hidden className="text-destructive">
              *
            </span>
          )}
        </BaseField.Label>
      )}
      {children}
      <div className="flex items-start justify-between gap-2 empty:hidden">
        {error != null ? (
          <BaseField.Error match role="alert" className="text-xs text-destructive">
            {error}
          </BaseField.Error>
        ) : (
          <>
            <BaseField.Error role="alert" className="text-xs text-destructive" />
            {hint != null && (
              <BaseField.Description className="text-xs text-muted-foreground data-invalid:hidden">
                {hint}
              </BaseField.Description>
            )}
          </>
        )}
        {showCounter && (
          <span
            className={cn(
              "ml-auto text-xs tabular-nums",
              overLimit ? "text-destructive" : "text-muted-foreground",
            )}
          >
            {count}/{max}
          </span>
        )}
      </div>
    </BaseField.Root>
  )
}
