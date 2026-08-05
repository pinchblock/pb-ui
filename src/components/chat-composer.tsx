"use client"

import { ArrowUp, Paperclip } from "@phosphor-icons/react"
import { useCallback, useEffect, useRef, useState } from "react"
import type * as React from "react"

import { cn } from "../lib/cn.ts"
import { Button } from "./ui/button.tsx"

/**
 * ChatComposer: the message input shell. Autogrowing textarea, attach
 * button, send button (disabled while empty), attachment chip row slot.
 * Enter sends, Shift+Enter breaks the line. Works controlled (value +
 * onValueChange) or uncontrolled.
 */
export interface ChatComposerProps {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  /** Called with the trimmed message on Enter or send click. */
  onSend?: (value: string) => void
  /** Renders the attach button when provided. */
  onAttach?: () => void
  placeholder?: string
  disabled?: boolean
  /** Attachment chips (e.g. UploadFileChip) rendered above the input. */
  attachments?: React.ReactNode
  /** Accessible label for the textarea. */
  label?: string
  className?: string | undefined
}

export function ChatComposer({
  value,
  defaultValue = "",
  onValueChange,
  onSend,
  onAttach,
  placeholder = "Message",
  disabled = false,
  attachments,
  label = "Message",
  className,
}: ChatComposerProps) {
  const [internalValue, setInternalValue] = useState(defaultValue)
  const isControlled = value != null
  const currentValue = isControlled ? value : internalValue
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  const setValue = useCallback(
    (next: string) => {
      if (!isControlled) setInternalValue(next)
      onValueChange?.(next)
    },
    [isControlled, onValueChange],
  )

  /* Autogrow: measured height is content, not a token-expressible style. */
  const resize = useCallback(() => {
    const textarea = textareaRef.current
    if (!textarea) return
    textarea.style.height = "auto"
    textarea.style.height = `${textarea.scrollHeight}px`
  }, [])

  /* Covers the initial render and controlled value changes. */
  useEffect(() => {
    resize()
  }, [resize, currentValue])

  const send = useCallback(() => {
    const message = currentValue.trim()
    if (!message || disabled) return
    onSend?.(message)
    setValue("")
    requestAnimationFrame(resize)
  }, [currentValue, disabled, onSend, setValue, resize])

  return (
    <div
      className={cn(
        "flex w-full flex-col gap-2 rounded-2xl border border-input bg-input-background p-2 shadow-card",
        "transition-[border-color,box-shadow] duration-(--duration-fast) ease-(--ease-out)",
        "focus-within:border-ring",
        disabled && "opacity-50",
        className,
      )}
    >
      {attachments != null && (
        <div className="flex flex-wrap gap-2 px-1 pt-1">{attachments}</div>
      )}
      <div className="flex items-end gap-1.5">
        {onAttach && (
          <Button
            variant="ghost"
            size="icon-sm"
            pill
            aria-label="Attach a file"
            disabled={disabled}
            onClick={onAttach}
          >
            <Paperclip aria-hidden />
          </Button>
        )}
        <textarea
          ref={textareaRef}
          rows={1}
          value={currentValue}
          placeholder={placeholder}
          aria-label={label}
          disabled={disabled}
          onChange={(event) => {
            setValue(event.target.value)
            resize()
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault()
              send()
            }
          }}
          className={cn(
            "max-h-40 min-h-8 flex-1 resize-none self-center bg-transparent px-2 py-1.5",
            "text-sm text-foreground placeholder:text-faint-foreground",
            "border-0 outline-none focus-visible:outline-none",
          )}
        />
        <Button
          size="icon-sm"
          pill
          aria-label="Send message"
          disabled={disabled || currentValue.trim().length === 0}
          onClick={send}
        >
          <ArrowUp aria-hidden />
        </Button>
      </div>
    </div>
  )
}
