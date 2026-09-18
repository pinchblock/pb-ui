"use client"

import { MagnifyingGlass } from "@phosphor-icons/react"
import { useEffect, useMemo, useRef, useState } from "react"

import { cn } from "../../lib/cn.ts"
import { Input } from "./input.tsx"
import type { EmojiGroup } from "./emoji-data.ts"

/**
 * EmojiPicker. Native emoji in a searchable grid, for surfaces where the
 * platform picker is out of reach: a desktop composer, a reaction row. A
 * touch keyboard already carries one, so callers usually render this only
 * on pointer devices.
 *
 * The set loads on first open, so a conversation that never opens the
 * picker never pays for its data.
 */
export interface EmojiPickerProps {
  /** Emoji this person reached for lately, shown first. */
  recent?: string[]
  onSelect: (emoji: string) => void
  /** Accessible name for the search field. */
  searchLabel?: string
  recentLabel?: string
  emptyLabel?: string
  className?: string | undefined
}

export function EmojiPicker({
  recent = [],
  onSelect,
  searchLabel = "Search emoji",
  recentLabel = "Recent",
  emptyLabel = "No emoji found",
  className,
}: EmojiPickerProps) {
  const [query, setQuery] = useState("")
  const [data, setData] = useState<{ groups: EmojiGroup[]; search: (value: string) => { char: string }[] | null } | null>(null)
  const searchRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    let cancelled = false
    void import("./emoji-data.ts").then((module) => {
      if (!cancelled) setData({ groups: module.emojiGroups, search: module.searchEmoji })
    })
    searchRef.current?.focus()
    return () => { cancelled = true }
  }, [])

  const results = useMemo(() => data?.search(query) ?? null, [data, query])

  return (
    <div className={cn("flex w-72 flex-col gap-2", className)}>
      <div className="relative">
        <MagnifyingGlass
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          aria-label={searchLabel}
          className="ps-8"
          onChange={(event) => setQuery(event.target.value)}
          placeholder={searchLabel}
          ref={searchRef}
          value={query}
        />
      </div>
      <div className="max-h-64 overflow-y-auto pe-1">
        {results ? (
          results.length === 0 ? (
            <p className="px-1 py-6 text-center text-sm text-muted-foreground">{emptyLabel}</p>
          ) : (
            <EmojiRow emoji={results.map((entry) => entry.char)} onSelect={onSelect} />
          )
        ) : (
          <>
            {recent.length > 0 && (
              <section>
                <h3 className="px-1 pt-1 pb-1.5 text-xs font-medium text-muted-foreground">{recentLabel}</h3>
                <EmojiRow emoji={recent} onSelect={onSelect} />
              </section>
            )}
            {(data?.groups ?? []).map((group) => (
              <section key={group.name}>
                <h3 className="px-1 pt-2 pb-1.5 text-xs font-medium text-muted-foreground">{group.name}</h3>
                <EmojiRow emoji={group.emoji.map((entry) => entry.char)} onSelect={onSelect} />
              </section>
            ))}
          </>
        )}
      </div>
    </div>
  )
}

function EmojiRow({ emoji, onSelect }: { emoji: string[]; onSelect: (emoji: string) => void }) {
  return (
    <div className="grid grid-cols-8 gap-0.5">
      {emoji.map((char, index) => (
        <button
          className={cn(
            "flex size-8 items-center justify-center rounded-md text-xl leading-none no-min-tap",
            "transition-colors duration-(--duration-fast) ease-(--ease-out)",
            "hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          )}
          key={`${char}-${index}`}
          onClick={() => onSelect(char)}
          type="button"
        >
          {char}
        </button>
      ))}
    </div>
  )
}
