"use client"

import { CircleNotch } from "@phosphor-icons/react"
import { useEffect, useRef, useState } from "react"
import type * as React from "react"

import {
  Combobox,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
  ComboboxStatus,
  type ComboboxInputProps,
} from "./ui/combobox.tsx"

/**
 * AsyncCombobox. Combobox over a server-backed list: you provide
 * `onSearch(query) => Promise<items>`, it handles the debounce
 * (SearchInput convention, 250 ms), the loading row, the empty state
 * and out-of-order responses (a request id ref drops stale
 * resolutions). Selection is controlled: `value` + `onValueChange`.
 * Generic over the item type; identity comes from `getKey`, display
 * from `getLabel` / `renderItem`.
 */
export interface AsyncComboboxProps<Item> {
  /** Runs a search; resolves with the items for that query. */
  onSearch: (query: string) => Promise<Item[]>
  /** Stable identity for an item (keys, equality, form value). */
  getKey: (item: Item) => string
  /** Plain-text label: input display and typed-label matching. */
  getLabel: (item: Item) => string
  /** Rich option row content; defaults to getLabel text. */
  renderItem?: (item: Item) => React.ReactNode
  /** Controlled selected item; null when nothing is selected. */
  value: Item | null
  onValueChange: (item: Item | null) => void
  placeholder?: string
  size?: ComboboxInputProps["size"]
  /** Show the clear button while an item is selected. @default true */
  clearable?: boolean
  disabled?: boolean
  /** Pause after typing before onSearch fires. @default 250 */
  debounceMs?: number
  /** Copy for the no-results row when the query is empty. */
  emptyMessage?: React.ReactNode
  /** Copy for the loading row, next to the spinner. */
  loadingMessage?: React.ReactNode
  /** Submitted via a hidden input using getKey when inside a form. */
  name?: string
  id?: string
  "aria-label"?: string
}

export function AsyncCombobox<Item>({
  onSearch,
  getKey,
  getLabel,
  renderItem,
  value,
  onValueChange,
  placeholder,
  size,
  clearable = true,
  disabled = false,
  debounceMs = 250,
  emptyMessage = "No results found",
  loadingMessage = "Searching…",
  name,
  id,
  "aria-label": ariaLabel,
}: AsyncComboboxProps<Item>) {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  /* The query whose results are currently shown; drives the completion
   * summary in the status row ("No results for X"). */
  const [landedQuery, setLandedQuery] = useState("")
  /* Monotonic request id: a response only lands if it is still the
   * latest request, so slow early responses never clobber fast late
   * ones (the PeopleSearch out-of-order bug this component replaces). */
  const requestIdRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(
    () => () => {
      clearTimeout(timerRef.current)
      requestIdRef.current += 1 // drop in-flight responses after unmount
    },
    [],
  )

  function runSearch(query: string) {
    const requestId = ++requestIdRef.current
    setLoading(true)
    onSearch(query).then(
      (results) => {
        if (requestIdRef.current !== requestId) {
          return // stale response, a newer request is in flight
        }
        setItems(results)
        setLoading(false)
        setSearched(true)
        setLandedQuery(query)
      },
      () => {
        if (requestIdRef.current !== requestId) {
          return
        }
        setItems([])
        setLoading(false)
        setSearched(true)
        setLandedQuery(query)
      },
    )
  }

  function scheduleSearch(query: string) {
    clearTimeout(timerRef.current)
    /* Invalidate any in-flight request the moment a newer search is
     * SCHEDULED: without this, the previous query's late response
     * could land as final during the debounce window. */
    requestIdRef.current += 1
    setLoading(true)
    timerRef.current = setTimeout(() => runSearch(query), debounceMs)
  }

  return (
    <Combobox
      items={items}
      filter={null} /* the server filters; never re-filter client-side */
      value={value}
      onValueChange={(next) => onValueChange(next ?? null)}
      itemToStringLabel={getLabel}
      itemToStringValue={getKey}
      isItemEqualToValue={(a, b) => getKey(a) === getKey(b)}
      disabled={disabled}
      name={name}
      onOpenChange={(open, eventDetails) => {
        /* Opening by click/caret/arrow shows fresh top results; opening
         * by typing is handled by onInputValueChange below. */
        if (open && eventDetails.reason !== "input-change") {
          runSearch("")
        }
      }}
      onInputValueChange={(query, eventDetails) => {
        if (eventDetails.reason === "input-change") {
          /* Covers typing and paste; both surface as input-change. */
          scheduleSearch(query)
        } else if (eventDetails.reason === "input-clear" || eventDetails.reason === "clear-press") {
          runSearch("") // clearing searches immediately, like SearchInput
        }
        /* Other reasons (selection filling the input, programmatic
         * resets) must not trigger a search. */
      }}
    >
      <ComboboxInput
        size={size}
        clearable={clearable}
        placeholder={placeholder}
        id={id}
        aria-label={ariaLabel}
      />
      <ComboboxPopup>
        {/* One live region for the whole async lifecycle: searching,
            then a completion summary (count or no-results copy), so
            screen readers hear that the search finished, not silence. */}
        <ComboboxStatus
          className={
            !loading && searched && items.length === 0 ? "justify-center py-4" : undefined
          }
        >
          {loading ? (
            <>
              <CircleNotch aria-hidden className="size-4 animate-spin" />
              {loadingMessage}
            </>
          ) : searched && items.length === 0 ? (
            landedQuery ? `No results for "${landedQuery}"` : emptyMessage
          ) : searched ? (
            `${items.length} result${items.length === 1 ? "" : "s"}`
          ) : null}
        </ComboboxStatus>
        <ComboboxList>
          {(item: Item) => (
            <ComboboxItem key={getKey(item)} value={item}>
              {renderItem ? renderItem(item) : getLabel(item)}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxPopup>
    </Combobox>
  )
}
