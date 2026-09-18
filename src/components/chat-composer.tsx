"use client"

import { PaperPlaneRight, Paperclip } from "@phosphor-icons/react"
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
  /**
   * Lets the composer send with an empty message, for a caller whose
   * attachments carry the content (a photo or a clip on its own). Without it
   * such a caller needs a second send button beside the disabled one.
   */
  canSendWithoutText?: boolean
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
  canSendWithoutText = false,
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

  /* The first measurement runs against the fallback face. When the real one
     swaps in the content grows by a pixel or two and the box, already sized,
     shows a scrollbar beside the send button. Measure again once fonts are
     ready, and whenever the composer changes width. */
  useEffect(() => {
    let cancelled = false
    void document.fonts?.ready.then(() => {
      if (!cancelled) resize()
    })
    const textarea = textareaRef.current
    if (!textarea || typeof ResizeObserver === "undefined") return () => { cancelled = true }
    const observer = new ResizeObserver(() => resize())
    observer.observe(textarea)
    return () => {
      cancelled = true
      observer.disconnect()
    }
  }, [resize])

  const send = useCallback(() => {
    const message = currentValue.trim()
    if (disabled || (!message && !canSendWithoutText)) return
    onSend?.(message)
    setValue("")
    requestAnimationFrame(() => {
      resize()
      /* A sent message is rarely the last one; the cursor stays where the
         next one is typed, whether the send came from Enter or the button. */
      textareaRef.current?.focus()
    })
  }, [canSendWithoutText, currentValue, disabled, onSend, setValue, resize])

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
          disabled={disabled || (currentValue.trim().length === 0 && !canSendWithoutText)}
          onClick={send}
        >
          <PaperPlaneRight aria-hidden />
        </Button>
      </div>
    </div>
  )
}
