"use client"

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type PaginationState,
  type RowSelectionState,
  type SortingState,
} from "@tanstack/react-table"
import { useEffect, useMemo, useRef, useState } from "react"
import type * as React from "react"

import { cn } from "../lib/cn.ts"
import {
  columnMetaOf,
  DataTableHeaderCell,
  DataTableSkeletonRows,
  dataTableSelectionColumn,
} from "./data-table-parts.tsx"
import { EmptyState } from "./empty-state.tsx"
import { Pagination } from "./ui/pagination.tsx"
import { SearchInput } from "./ui/search-input.tsx"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
} from "./ui/table.tsx"

export type { ColumnDef } from "@tanstack/react-table"
export { type DataTableColumnMeta } from "./data-table-parts.tsx"

export interface DataTableProps<TData> {
  /** TanStack column definitions. `meta: { numeric, mono }` aligns cells. */
  columns: ColumnDef<TData, /* mixed accessor value types */ any>[]
  data: TData[]
  /** Accessible name for the table; screen readers announce it. */
  label?: string
  /** Show the global search input above the table (default true). */
  searchable?: boolean
  searchPlaceholder?: string
  /** Rows per page (default 10). */
  pageSize?: number
  /** Render skeleton rows instead of data. */
  loading?: boolean
  /** Skeleton row count while loading (default 5). */
  loadingRows?: number
  /** Slot shown when no rows match; defaults to a no-results EmptyState. */
  emptyState?: React.ReactNode
  /**
   * Makes rows clickable (Enter/Space via keyboard too).
   *
   * A clickable row is a shortcut, never the only path (WCAG): always
   * pair it with an explicit link or button in a cell that performs
   * the same action, the way the roster sink page pairs row click with
   * a View button. Pass `getRowLabel` so assistive tech announces what
   * the row opens.
   */
  onRowClick?: (row: TData) => void
  /** Adds a leading checkbox column with tri-state select-all. */
  selectable?: boolean
  /** Fires with the selected originals whenever selection changes. */
  onSelectionChange?: (rows: TData[]) => void
  /** Stable row identity for selection (default: row index). */
  getRowId?: (row: TData, index: number) => string
  /**
   * Human-readable name for a row ("Mari Tamm"): selection checkboxes
   * read "Select <label>" and clickable rows announce it as their
   * accessible name.
   */
  getRowLabel?: (row: TData) => string
  className?: string
}

/**
 * DataTable. TanStack Table (headless) rendered with our Table
 * primitives: click-to-sort headers with aria-sort, global search via
 * SearchInput, Pagination underneath, optional row selection with a
 * tri-state header Checkbox, skeleton loading rows and an EmptyState
 * slot.
 *
 * CLIENT-SIDE ONLY (by design, for now): sorting, filtering and
 * pagination all run in the browser over the full `data` array. Server
 * mode is deferred on the roadmap; when the dataset is too big to ship
 * to the client, paginate at the API and compose the Table primitives
 * directly instead of reaching for this.
 */
export function DataTable<TData>({
  columns,
  data,
  label,
  searchable = true,
  searchPlaceholder = "Search…",
  pageSize = 10,
  loading = false,
  loadingRows = 5,
  emptyState,
  onRowClick,
  selectable = false,
  onSelectionChange,
  getRowId,
  getRowLabel,
  className,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState("")
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize })

  const allColumns = useMemo<ColumnDef<TData, any>[]>(
    () => (selectable ? [dataTableSelectionColumn<TData>(getRowLabel), ...columns] : columns),
    [columns, selectable, getRowLabel],
  )

  const table = useReactTable({
    data,
    columns: allColumns,
    state: { sorting, globalFilter, rowSelection, pagination },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: "includesString",
    enableRowSelection: selectable,
    getRowId,
  })

  /* Ref keeps the effect off the callback identity: an inline callback
     from the parent must not re-fire (or loop) the notification. */
  const selectionCallback = useRef(onSelectionChange)
  selectionCallback.current = onSelectionChange
  /* Signature of the selected ids still present in `data`: the effect
     also re-fires (with the pruned selection) when selected rows are
     removed from the data, not only when a checkbox is toggled. */
  const selectedIdsSignature = table
    .getSelectedRowModel()
    .rows.map((row) => row.id)
    .join("\u001f")
  useEffect(() => {
    selectionCallback.current?.(table.getSelectedRowModel().rows.map((row) => row.original))
  }, [selectedIdsSignature, table])

  /* pageSize is a plain prop; the state initializer captures only the
     first value, so propagate later changes into the table state. */
  useEffect(() => {
    table.setPageSize(pageSize)
  }, [pageSize, table])

  const rows = table.getRowModel().rows
  const filteredCount = table.getFilteredRowModel().rows.length
  /* Count within the filtered set: the footer reads "x of y selected"
     against the same y, so x can never exceed it while a search hides
     selected rows. */
  const selectedCount = table.getFilteredSelectedRowModel().rows.length
  const pageCount = table.getPageCount()
  const columnCount = allColumns.length

  return (
    <div className={cn("w-full", className)} aria-busy={loading || undefined}>
      {searchable ? (
        <div className="mb-3 w-full max-w-xs">
          <SearchInput
            aria-label={label ? `Search ${label}` : "Search table"}
            placeholder={searchPlaceholder}
            defaultValue={globalFilter}
            onDebouncedChange={setGlobalFilter}
          />
        </div>
      ) : null}

      <TableContainer>
        <Table aria-label={label}>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => (
                  <DataTableHeaderCell key={header.id} header={header} />
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              <DataTableSkeletonRows rows={loadingRows} columns={columnCount} />
            ) : rows.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={columnCount}>
                  {emptyState ?? (
                    <EmptyState
                      title="No results"
                      description="Try a different search or clear the filters."
                    />
                  )}
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-selected={row.getIsSelected() || undefined}
                  tabIndex={onRowClick ? 0 : undefined}
                  aria-label={
                    onRowClick && getRowLabel ? getRowLabel(row.original) : undefined
                  }
                  onClick={onRowClick ? () => onRowClick(row.original) : undefined}
                  onKeyDown={
                    onRowClick
                      ? (event) => {
                          /* Only when the row itself is focused, so cell
                             controls (checkbox, buttons) keep their keys. */
                          if (
                            event.target === event.currentTarget &&
                            (event.key === "Enter" || event.key === " ")
                          ) {
                            event.preventDefault()
                            onRowClick(row.original)
                          }
                        }
                      : undefined
                  }
                  className={cn(
                    onRowClick &&
                      "focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-inset",
                  )}
                >
                  {row.getVisibleCells().map((cell) => {
                    const meta = columnMetaOf(cell.column.columnDef.meta)
                    return (
                      <TableCell key={cell.id} numeric={meta.numeric} mono={meta.mono}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {!loading && (selectable || pageCount > 1) ? (
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3">
          <p className="text-sm text-muted-foreground tabular-nums">
            {selectable
              ? `${selectedCount} of ${filteredCount} selected`
              : `${filteredCount} row${filteredCount === 1 ? "" : "s"}`}
          </p>
          {pageCount > 1 ? (
            <Pagination
              page={pagination.pageIndex + 1}
              pageCount={pageCount}
              onPageChange={(page) => table.setPageIndex(page - 1)}
            />
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
