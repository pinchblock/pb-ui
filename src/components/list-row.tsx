import type * as React from "react"

import { cn } from "../lib/cn.ts"

/**
 * ListRow. The inbox/roster/settings row workhorse: leading slot
 * (avatar, icon), title + meta in the middle, trailing slot (action,
 * chevron, timestamp). Rows carry no border of their own; stack them
 * in a `divide-y divide-border` container (usually a Card).
 *
 * `interactive` renders a real <button> row with hover and focus
 * treatment. Do not put buttons in the trailing slot of an interactive
 * row (nested interactive elements); use a static row with a trailing
 * action instead.
 */
interface ListRowBaseProps {
  /** Leading slot: avatar, icon-in-circle, thumbnail. */
  leading?: React.ReactNode
  title: React.ReactNode
  /** Secondary line under the title. */
  meta?: React.ReactNode
  /** Trailing slot: chevron, timestamp, badge, action. */
  trailing?: React.ReactNode
}

export interface ListRowProps
  extends ListRowBaseProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Renders the row as a <button> with hover/focus treatment. */
  interactive?: false
}

export interface InteractiveListRowProps
  extends ListRowBaseProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "title"> {
  interactive: true
}

function RowContent({ leading, title, meta, trailing }: ListRowBaseProps) {
  return (
    <>
      {leading ? <div className="shrink-0 [&_svg]:size-5">{leading}</div> : null}
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium text-foreground">{title}</div>
        {meta ? (
          <div className="truncate text-xs text-muted-foreground">{meta}</div>
        ) : null}
      </div>
      {trailing ? (
        <div className="flex shrink-0 items-center gap-2 text-muted-foreground [&>svg]:size-4">
          {trailing}
        </div>
      ) : null}
    </>
  )
}

const rowClass = "flex w-full items-center gap-3 px-4 py-3 text-left"

export function ListRow(props: ListRowProps | InteractiveListRowProps) {
  if (props.interactive) {
    const { interactive, leading, title, meta, trailing, className, type, ...rest } =
      props
    return (
      <button
        type={type ?? "button"}
        className={cn(
          rowClass,
          "transition-colors duration-(--duration-fast) ease-(--ease-out)",
          "hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
          "disabled:pointer-events-none disabled:opacity-50",
          className,
        )}
        {...rest}
      >
        <RowContent leading={leading} title={title} meta={meta} trailing={trailing} />
      </button>
    )
  }

  const { interactive, leading, title, meta, trailing, className, ...rest } = props
  return (
    <div className={cn(rowClass, className)} {...rest}>
      <RowContent leading={leading} title={title} meta={meta} trailing={trailing} />
    </div>
  )
}
