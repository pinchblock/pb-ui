"use client"

import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DraggableAttributes,
  type DraggableSyntheticListeners,
  type UniqueIdentifier,
} from "@dnd-kit/core"
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { cva } from "class-variance-authority"
import { ArrowDown, ArrowUp, DotsSixVertical } from "@phosphor-icons/react"
import { useReducedMotion } from "motion/react"
import { createContext, useContext, useMemo } from "react"
import type * as React from "react"

import { cn } from "../lib/cn.ts"
import { shared } from "../tokens/shared.ts"
import { IconButton } from "./ui/icon-button.tsx"

/**
 * SortableList kit: dnd-kit wrappers for vertical reorderable lists.
 *
 * Consumers own their arrays: SortableList takes the current order as
 * ids and reports `onReorder(from, to)`; applying the move (and any
 * persistence) stays app-side. Both interaction modes ship together:
 * DragHandle (pointer + keyboard drag via the dnd-kit keyboard sensor)
 * and ReorderButtons (plain up/down buttons) so reordering never
 * requires a drag gesture.
 */

/* dnd-kit takes transitions as JS values; derive them from the token
 * source of truth (src/tokens/shared.ts) so they cannot drift. */
const sortTransition = {
  duration: Number.parseFloat(shared.motion.duration.base),
  easing: shared.motion.ease.out,
}

/* ---------------------------------- SortableList */

export interface SortableListProps
  extends Omit<React.HTMLAttributes<HTMLUListElement>, "onDragEnd" | "onDragStart" | "onDragOver"> {
  /** Current order, as ids matching the rendered SortableItems. */
  items: UniqueIdentifier[]
  /** Apply the move to your array (e.g. with a splice) and re-render. */
  onReorder: (from: number, to: number) => void
}

export function SortableList({
  items,
  onReorder,
  className,
  children,
  ...props
}: SortableListProps) {
  const reducedMotion = useReducedMotion() ?? false
  const sensors = useSensors(
    /* Small distance threshold so taps inside items stay clicks. */
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
      scrollBehavior: reducedMotion ? "auto" : "smooth",
    }),
  )

  function handleDragEnd({ active, over }: DragEndEvent) {
    if (!over || active.id === over.id) return
    const from = items.indexOf(active.id)
    const to = items.indexOf(over.id)
    if (from === -1 || to === -1) return
    onReorder(from, to)
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <ul role="list" className={cn("flex flex-col gap-2", className)} {...props}>
          {children}
        </ul>
      </SortableContext>
    </DndContext>
  )
}

/* ---------------------------------- SortableItem */

interface SortableItemContextValue {
  attributes: DraggableAttributes
  listeners: DraggableSyntheticListeners
  setActivatorNodeRef: (element: HTMLElement | null) => void
  isDragging: boolean
}

const SortableItemContext = createContext<SortableItemContextValue | null>(null)

function useSortableItemContext(caller: string): SortableItemContextValue {
  const context = useContext(SortableItemContext)
  if (!context) throw new Error(`${caller} must be used inside a SortableItem`)
  return context
}

export const sortableItemVariants = cva(
  cn(
    "relative list-none",
    "data-dragging:z-10 data-dragging:scale-[1.02] data-dragging:shadow-raised",
  ),
)

export interface SortableItemProps
  extends Omit<React.LiHTMLAttributes<HTMLLIElement>, "id"> {
  /** Must appear in the parent SortableList `items` array. */
  id: UniqueIdentifier
  /** Excludes the item from dragging (its handle should hide too). */
  disabled?: boolean
}

export function SortableItem({
  id,
  disabled = false,
  className,
  children,
  ...props
}: SortableItemProps) {
  const reducedMotion = useReducedMotion() ?? false
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    disabled,
    /* No settle/shift animation under prefers-reduced-motion. */
    transition: reducedMotion ? null : sortTransition,
  })

  const context = useMemo(
    () => ({ attributes, listeners, setActivatorNodeRef, isDragging }),
    [attributes, listeners, setActivatorNodeRef, isDragging],
  )

  return (
    <SortableItemContext.Provider value={context}>
      <li
        ref={setNodeRef}
        /* Dynamic per-frame drag position; not expressible as a token. */
        style={{ transform: CSS.Translate.toString(transform), transition }}
        data-dragging={isDragging || undefined}
        className={cn(sortableItemVariants(), className)}
        {...props}
      >
        {children}
      </li>
    </SortableItemContext.Provider>
  )
}

/* ---------------------------------- DragHandle */

export const dragHandleVariants = cva(
  cn(
    /* cursor-grab is the guardrails carve-out for drag handles;
     * touch-none keeps the pointer sensor working on touch screens. */
    "inline-flex size-8 shrink-0 cursor-grab touch-none items-center justify-center rounded-md text-muted-foreground select-none",
    "transition-colors duration-(--duration-fast) ease-(--ease-out)",
    "hover:bg-muted hover:text-foreground",
    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
    "active:cursor-grabbing",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:size-4 [&_svg]:shrink-0",
  ),
)

export interface DragHandleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Required: name the item, e.g. "Reorder Monday". */
  "aria-label": string
}

/**
 * Drag activator for a SortableItem. Keyboard operable out of the box:
 * Space or Enter picks the item up, arrows move it, Space drops,
 * Escape cancels (announced by dnd-kit's own live region).
 */
export function DragHandle({ className, disabled, ...props }: DragHandleProps) {
  const { attributes, listeners, setActivatorNodeRef } =
    useSortableItemContext("DragHandle")
  return (
    <button
      type="button"
      ref={setActivatorNodeRef}
      className={cn(dragHandleVariants(), className)}
      disabled={disabled}
      {...attributes}
      {...(disabled ? undefined : listeners)}
      {...props}
    >
      <DotsSixVertical aria-hidden />
    </button>
  )
}

/* ---------------------------------- ReorderButtons */

export interface ReorderButtonsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Required: name the item, e.g. "Move Monday up". */
  upLabel: string
  /** Required: name the item, e.g. "Move Monday down". */
  downLabel: string
  onMoveUp: () => void
  onMoveDown: () => void
  /** Disable at the top of the list. */
  upDisabled?: boolean
  /** Disable at the bottom of the list. */
  downDisabled?: boolean
}

/**
 * Accessible parity path for reordering: plain buttons, no drag
 * gesture required. Works inside a SortableItem or standalone; wire
 * both handlers to the same array move as `onReorder`.
 */
export function ReorderButtons({
  upLabel,
  downLabel,
  onMoveUp,
  onMoveDown,
  upDisabled = false,
  downDisabled = false,
  className,
  ...props
}: ReorderButtonsProps) {
  return (
    <div className={cn("flex shrink-0 flex-col", className)} {...props}>
      {/* focusableWhenDisabled: at the list boundary the pressed button
          goes aria-disabled instead of dropping out of the tab order,
          so keyboard focus stays put (Base UI suppresses activation). */}
      <IconButton
        size="xs"
        aria-label={upLabel}
        disabled={upDisabled}
        focusableWhenDisabled
        onClick={onMoveUp}
      >
        <ArrowUp />
      </IconButton>
      <IconButton
        size="xs"
        aria-label={downLabel}
        disabled={downDisabled}
        focusableWhenDisabled
        onClick={onMoveDown}
      >
        <ArrowDown />
      </IconButton>
    </div>
  )
}
