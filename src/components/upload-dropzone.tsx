"use client"

import { cva } from "class-variance-authority"
import { CloudArrowUp, File as FileIcon, X } from "@phosphor-icons/react"
import type * as React from "react"

import { useFileDrop } from "../hooks/use-file-drop.ts"
import { cn } from "../lib/cn.ts"
import { Button } from "./ui/button.tsx"

/**
 * UploadDropzone: drag-and-drop + click-to-browse file picking.
 * UI only: it emits File[] via onFiles; uploading, retries and object
 * URL lifecycle stay app-side. Render progress with UploadFileChip
 * children.
 */
export const uploadDropzoneVariants = cva(
  cn(
    "flex w-full flex-col items-center justify-center gap-2 p-8 text-center",
    "rounded-xl border-2 border-dashed border-border-strong",
    "transition-[border-color,background-color] duration-(--duration-fast) ease-(--ease-out)",
    "hover:border-border-strong hover:bg-muted",
    "data-[drag-over]:border-foreground data-[drag-over]:bg-secondary",
    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  ),
)

export interface UploadDropzoneProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onDrop"> {
  /** Native input accept syntax: ".mp4,video/*,image/png". */
  accept?: string
  multiple?: boolean
  disabled?: boolean
  /** Receives accepted files after a drop or a browse pick. */
  onFiles: (files: File[]) => void
  /** Headline copy. */
  label?: string
  /** Secondary copy: formats, size limits. */
  hint?: string
  /** File chips / progress rows, rendered under the zone. */
  children?: React.ReactNode
}

export function UploadDropzone({
  accept,
  multiple = false,
  disabled = false,
  onFiles,
  label = "Drag files here or click to browse",
  hint,
  className,
  children,
  ...props
}: UploadDropzoneProps) {
  const { isDragOver, rootProps, inputProps, browse } = useFileDrop({
    ...(accept !== undefined ? { accept } : {}),
    multiple,
    disabled,
    onFiles,
  })

  return (
    <div className={cn("w-full", className)} {...props}>
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label={label}
        aria-disabled={disabled || undefined}
        data-drag-over={isDragOver || undefined}
        data-disabled={disabled || undefined}
        className={uploadDropzoneVariants()}
        onClick={browse}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            browse()
          }
        }}
        {...rootProps}
      >
        <span
          className={cn(
            "flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground",
            "transition-colors duration-(--duration-fast) ease-(--ease-out)",
            isDragOver && "bg-foreground text-background",
          )}
        >
          <CloudArrowUp aria-hidden className="size-5" />
        </span>
        <span className="text-sm font-medium text-foreground">{label}</span>
        {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
      </div>
      <input {...inputProps} className="sr-only" aria-hidden />
      {children != null && (
        <div className="mt-3 flex flex-wrap gap-2">{children}</div>
      )}
    </div>
  )
}

export interface UploadFileChipProps
  extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  /** Object URL / thumbnail for image files; falls back to a file icon. */
  previewUrl?: string
  /** 0-100. While < 100 a progress bar renders under the name. */
  progress?: number
  /** Marks the chip as failed (e.g. upload error). */
  error?: boolean
  onRemove?: () => void
}

/** Per-file chip for the dropzone: preview, progress slot, remove. */
export function UploadFileChip({
  name,
  previewUrl,
  progress,
  error = false,
  onRemove,
  className,
  ...props
}: UploadFileChipProps) {
  const uploading = progress != null && progress < 100
  return (
    <div
      data-error={error || undefined}
      className={cn(
        "flex min-w-40 items-center gap-2 rounded-lg border border-border bg-card p-1.5",
        "data-[error]:border-destructive",
        className,
      )}
      {...props}
    >
      {previewUrl ? (
        <img
          src={previewUrl}
          alt=""
          className="size-9 shrink-0 rounded-md bg-muted object-cover"
        />
      ) : (
        <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
          <FileIcon aria-hidden className="size-4" />
        </span>
      )}
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-medium text-foreground">{name}</p>
        {uploading && (
          <div
            role="progressbar"
            aria-label={`Uploading ${name}`}
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            className="mt-1 h-1 w-full overflow-hidden rounded-full bg-muted"
          >
            <div
              className="h-full rounded-full bg-foreground transition-[width] duration-(--duration-base) ease-(--ease-out)"
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
          </div>
        )}
        {error && <p className="mt-0.5 text-xs text-destructive">Upload failed</p>}
      </div>
      {onRemove && (
        <Button
          variant="ghost"
          size="icon-xs"
          aria-label={`Remove ${name}`}
          onClick={onRemove}
        >
          <X aria-hidden />
        </Button>
      )}
    </div>
  )
}
