"use client"

import { Field as BaseField } from "@base-ui/react/field"
import { cva } from "class-variance-authority"
import type * as React from "react"

import { cn } from "../../lib/cn.ts"

/**
 * Textarea. Rendered through Base UI Field.Control so it participates
 * in Field (label association, error wiring) while staying usable
 * standalone. `autoGrow` uses `field-sizing: content` where supported,
 * with a scrollHeight fallback elsewhere. Pair `maxLength` with the
 * Field `count`/`max` props for the character counter.
 */
export const textareaVariants = cva(
  cn(
    "w-full min-w-0 rounded-md border border-input bg-input-background px-3 py-2 text-sm text-foreground",
    "min-h-16",
    "placeholder:text-faint-foreground",
    "transition-[border-color,background-color,box-shadow] duration-(--duration-fast) ease-(--ease-out)",
    "hover:border-border-strong",
    "disabled:pointer-events-none disabled:opacity-50",
    "aria-invalid:border-destructive data-invalid:border-destructive",
  ),
)

const supportsFieldSizing =
  typeof CSS !== "undefined" && CSS.supports("field-sizing", "content")

export interface TextareaProps
  extends Omit<React.ComponentPropsWithRef<"textarea">, "className" | "style"> {
  className?: string | undefined
  /** Grows with content instead of scrolling. */
  autoGrow?: boolean
}

export function Textarea({ className, autoGrow = false, onInput, ...props }: TextareaProps) {
  function handleInput(event: React.InputEvent<HTMLTextAreaElement>) {
    onInput?.(event)
    if (!autoGrow || supportsFieldSizing || event.defaultPrevented) {
      return
    }
    /* Fallback for browsers without field-sizing: measure content. */
    const el = event.currentTarget
    el.style.height = "auto"
    el.style.height = `${el.scrollHeight}px`
  }
  return (
    <BaseField.Control
      render={
        <textarea
          {...props}
          onInput={handleInput}
          className={cn(
            textareaVariants(),
            autoGrow && "resize-none [field-sizing:content]",
            className,
          )}
        />
      }
    />
  )
}
