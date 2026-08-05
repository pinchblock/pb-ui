"use client"

import { Check, CircleNotch, VideoCameraSlash, Warning } from "@phosphor-icons/react"
import type * as React from "react"

import { cn } from "../../lib/cn.ts"
import { Button } from "../ui/button.tsx"

/**
 * PreCallPanel: the device-check moment before joining a call.
 * Carries the "stage" class on its own root so the pre-call surface
 * renders identically in every theme, like the call it leads into.
 * Presentational: the app owns getUserMedia, device state and the
 * join flow; it passes the preview node and readiness per row.
 */

export type PreCallDeviceStatus = "checking" | "ready" | "error"

const STATUS_LABELS: Record<PreCallDeviceStatus, string> = {
  checking: "Checking",
  ready: "Ready",
  error: "Not available",
}

const STATUS_TEXT_COLOR: Record<PreCallDeviceStatus, string> = {
  checking: "text-muted-foreground",
  ready: "text-success",
  error: "text-destructive",
}

export interface PreCallDeviceRowProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Device icon (e.g. <Microphone />). */
  icon?: React.ReactNode
  /** Device kind ("Microphone"). */
  label: string
  /** Selected device detail ("MacBook Pro Microphone"). */
  detail?: string | undefined
  status: PreCallDeviceStatus
  /** Override the visible status text. */
  statusLabel?: string | undefined
}

export function PreCallDeviceRow({
  icon,
  label,
  detail,
  status,
  statusLabel,
  className,
  ...props
}: PreCallDeviceRowProps) {
  return (
    <div
      data-status={status}
      className={cn(
        "flex items-center gap-3 rounded-lg border border-border bg-secondary-soft px-3 py-2",
        className,
      )}
      {...props}
    >
      {icon != null && (
        <span
          aria-hidden
          className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground [&_svg]:size-4"
        >
          {icon}
        </span>
      )}
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-sm font-medium text-foreground">{label}</span>
        {detail != null && (
          <span className="truncate text-xs text-muted-foreground">{detail}</span>
        )}
      </span>
      {/* Readiness resolves async; role=status announces the flip politely. */}
      <span
        role="status"
        className={cn(
          "flex shrink-0 items-center gap-1.5 text-xs font-medium",
          STATUS_TEXT_COLOR[status],
        )}
      >
        {status === "checking" && (
          <CircleNotch aria-hidden className="size-3.5 animate-spin" />
        )}
        {status === "ready" && <Check aria-hidden className="size-3.5" />}
        {status === "error" && <Warning aria-hidden className="size-3.5" />}
        <span className="sr-only">{label}: </span>
        {statusLabel ?? STATUS_LABELS[status]}
      </span>
    </div>
  )
}

export interface PreCallPanelProps extends React.HTMLAttributes<HTMLElement> {
  title?: string | undefined
  description?: string | undefined
  /** Camera preview slot; the app's local <video>, sized to fill
   * (size-full object-cover). Omitted: a camera-off placeholder. */
  preview?: React.ReactNode
  /** Placeholder line when no preview is provided. */
  previewFallbackLabel?: string | undefined
  joinLabel?: string | undefined
  cancelLabel?: string | undefined
  onJoin?: (() => void) | undefined
  onCancel?: (() => void) | undefined
  /** Join request in flight. */
  joining?: boolean
  /** Gate joining until devices are ready. */
  joinDisabled?: boolean
}

export function PreCallPanel({
  title = "Ready to join?",
  description,
  preview,
  previewFallbackLabel = "Camera is off",
  joinLabel = "Join call",
  cancelLabel = "Cancel",
  onJoin,
  onCancel,
  joining = false,
  joinDisabled = false,
  className,
  children,
  "aria-label": ariaLabel,
  ...props
}: PreCallPanelProps) {
  return (
    <section
      aria-label={ariaLabel ?? title}
      className={cn(
        "stage flex w-full flex-col gap-4 rounded-2xl border border-border bg-card p-4 text-card-foreground shadow-raised",
        className,
      )}
      {...props}
    >
      <div className="relative aspect-video overflow-hidden rounded-xl bg-background-sunken">
        {preview != null ? (
          <div className="absolute inset-0">{preview}</div>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground">
            <VideoCameraSlash aria-hidden className="size-6" />
            <span className="text-xs font-medium">{previewFallbackLabel}</span>
          </div>
        )}
      </div>

      <div>
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
        {description != null && (
          <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      {children != null && <div className="flex flex-col gap-2">{children}</div>}

      <div className="flex flex-col gap-2">
        <Button
          size="lg"
          className="w-full"
          loading={joining}
          disabled={joinDisabled}
          onClick={onJoin}
        >
          {joinLabel}
        </Button>
        <Button variant="ghost" size="lg" className="w-full" onClick={onCancel}>
          {cancelLabel}
        </Button>
      </div>
    </section>
  )
}
