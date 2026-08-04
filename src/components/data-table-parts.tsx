"use client"

import { CaretDown, CaretUp, CaretUpDown } from "@phosphor-icons/react"
import { flexRender, type ColumnDef, type Header, type RowData } from "@tanstack/react-table"

import { cn } from "../lib/cn.ts"
import { Checkbox } from "./ui/checkbox.tsx"
import { SkeletonText } from "./ui/skeleton.tsx"
import { TableCell, TableHead, TableRow } from "./ui/table.tsx"

/**
 * DataTable internals: sortable header cell, selection column and
 * skeleton rows. Split from data-table.tsx for the file-size cap; the
 * main component re-exports what consumers need.
 */

/** Display hints for DataTable columns, set on a ColumnDef via `meta`. */
export interface DataTableColumnMeta {
  /** Right-align header and cells with tabular figures. */
  numeric?: boolean
  /** Monospace cells: identifiers, splits, precise values. */
  mono?: boolean
}

/* TanStack's documented pattern: `meta` is typed by module augmentation,
   so consumers get autocomplete on { numeric, mono } in ColumnDefs. */
declare module "@tanstack/react-table" {
  /* Type params must match the upstream declaration for merging. */
  interface ColumnMeta<TData extends RowData, TValue> extends DataTableColumnMeta {}
}

export function columnMetaOf(meta: unknown): DataTableColumnMeta {
  return (meta ?? {}) as DataTableColumnMeta
}

/**
 * Header cell: sortable columns render a toggle button with a caret
 * indicator (up/down/both) and expose the state via aria-sort on the th.
 */
export function DataTableHeaderCell<TData>({ header }: { header: Header<TData, unknown> }) {
  const column = header.column
  const meta = columnMetaOf(column.columnDef.meta)
  const sorted = column.getIsSorted()
  const canSort = column.getCanSort()
  const content = header.isPlaceholder
    ? null
    : flexRender(column.columnDef.header, header.getContext())

  return (
    <TableHead
      numeric={meta.numeric}
      colSpan={header.colSpan}
      aria-sort={
        sorted === "asc"
          ? "ascending"
          : sorted === "desc"
            ? "descending"
            : canSort
              ? "none"
              : undefined
      }
    >
      {canSort ? (
        <button
          type="button"
          onClick={column.getToggleSortingHandler()}
          className={cn(
            "-mx-1 inline-flex items-center gap-1 rounded-sm px-1 py-0.5 uppercase select-none",
            "transition-colors duration-(--duration-fast) ease-(--ease-out)",
            "hover:text-foreground",
            "focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
            sorted && "text-foreground",
          )}
        >
          {content}
          <span aria-hidden className="shrink-0 [&_svg]:size-3.5">
            {sorted === "asc" ? (
              <CaretUp />
            ) : sorted === "desc" ? (
              <CaretDown />
            ) : (
              <CaretUpDown className="text-faint-foreground" />
            )}
          </span>
        </button>
      ) : (
        content
      )}
    </TableHead>
  )
}

/**
 * Leading checkbox column: tri-state select-all in the header. Pass
 * `getRowLabel` to name each checkbox after its row ("Select Mari
 * Tamm"); without it the label falls back to the row's display
 * position across pages (row.index is the position in the unsorted
 * data, so it cannot be used once sorting or filtering kicks in).
 */
export function dataTableSelectionColumn<TData>(
  getRowLabel?: (row: TData) => string,
): ColumnDef<TData> {
  return {
    id: "select",
    enableSorting: false,
    enableGlobalFilter: false,
    header: ({ table }) => (
      <Checkbox
        aria-label="Select all rows on this page"
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()}
        onCheckedChange={(checked) => table.toggleAllPageRowsSelected(checked)}
      />
    ),
    cell: ({ row, table }) => {
      let label: string
      if (getRowLabel) {
        label = `Select ${getRowLabel(row.original)}`
      } else {
        const { pageIndex, pageSize } = table.getState().pagination
        const indexOnPage = table
          .getPaginationRowModel()
          .rows.findIndex((pageRow) => pageRow.id === row.id)
        label = `Select row ${pageIndex * pageSize + Math.max(indexOnPage, 0) + 1}`
      }
      return (
        /* Stop propagation so toggling never fires the row click. */
        <span className="flex items-center" onClick={(event) => event.stopPropagation()}>
          <Checkbox
            aria-label={label}
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            onCheckedChange={(checked) => row.toggleSelected(checked)}
          />
        </span>
      )
    },
  }
}

/** Placeholder body while data loads; mirrors the column count. */
export function DataTableSkeletonRows({ rows, columns }: { rows: number; columns: number }) {
  return (
    <>
      {Array.from({ length: rows }, (_, rowIndex) => (
        <TableRow key={rowIndex} className="hover:bg-transparent">
          {Array.from({ length: columns }, (_, colIndex) => (
            <TableCell key={colIndex}>
              <SkeletonText lines={1} />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  )
}
