import { Search, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import type * as React from "react"

import { cn } from "../../lib/cn.ts"
import { Input, type InputProps } from "./input.tsx"

/**
 * SearchInput. Input with a leading search icon and a clear button that
 * appears once there is a query. `onDebouncedChange` fires after typing
 * pauses (250 ms default); clearing fires it immediately.
 */
export interface SearchInputProps
  extends Omit<InputProps, "leading" | "trailing" | "type" | "onValueChange"> {
  /** Fires on every change (simplified signature, value only). */
  onValueChange?: (value: string) => void
  /** Fires after the user pauses typing; clearing fires immediately. */
  onDebouncedChange?: (value: string) => void
  debounceMs?: number
}

export function SearchInput({
  className,
  value,
  defaultValue,
  onValueChange,
  onDebouncedChange,
  debounceMs = 250,
  ref,
  ...props
}: SearchInputProps) {
  const [internal, setInternal] = useState(defaultValue == null ? "" : String(defaultValue))
  const isControlled = value !== undefined
  const current = isControlled ? String(value ?? "") : internal
  const inputRef = useRef<HTMLInputElement | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => () => clearTimeout(timerRef.current), [])

  function emit(next: string, immediate: boolean) {
    if (!onDebouncedChange) {
      return
    }
    clearTimeout(timerRef.current)
    if (immediate) {
      onDebouncedChange(next)
    } else {
      timerRef.current = setTimeout(() => onDebouncedChange(next), debounceMs)
    }
  }

  function handleChange(next: string) {
    if (!isControlled) {
      setInternal(next)
    }
    onValueChange?.(next)
    emit(next, false)
  }

  function handleClear() {
    handleChange("")
    emit("", true)
    inputRef.current?.focus()
  }

  return (
    <Input
      type="search"
      ref={(node: HTMLInputElement | null) => {
        inputRef.current = node
        if (typeof ref === "function") {
          ref(node)
        } else if (ref != null) {
          ref.current = node
        }
      }}
      value={current}
      onValueChange={handleChange}
      className={cn(
        "[&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden",
        className,
      )}
      leading={<Search aria-hidden />}
      trailing={
        current.length > 0 ? (
          <button
            type="button"
            aria-label="Clear search"
            onClick={handleClear}
            className={cn(
              "flex items-center justify-center rounded-sm text-muted-foreground",
              "transition-colors duration-(--duration-fast) ease-(--ease-out)",
              "hover:text-foreground",
            )}
          >
            <X aria-hidden className="size-4" />
          </button>
        ) : undefined
      }
      {...props}
    />
  )
}
