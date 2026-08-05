"use client"

import { Button as BaseButton } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import {
  CameraRotate,
  CircleNotch,
  Microphone,
  MicrophoneSlash,
  PhoneDisconnect,
  VideoCamera,
  VideoCameraSlash,
} from "@phosphor-icons/react"
import type * as React from "react"

import { cn } from "../../lib/cn.ts"

/**
 * Call control cluster: sized-up circular icon controls for in-call
 * use (arm's-length targets). Presentational: pb-app's call provider
 * owns mute/camera/join state and passes it down. Toggles carry the
 * off state as data-active (destructive-soft treatment) plus
 * aria-pressed, the same "pressed = muted/off" convention as the
 * status bar in every mainstream call UI.
 */
export const callControlVariants = cva(
  cn(
    "relative inline-flex shrink-0 items-center justify-center rounded-full select-none",
    "transition-[background-color,border-color,color,box-shadow,transform] duration-(--duration-fast) ease-(--ease-out)",
    "active:scale-[0.97]",
    /* Both disabled paths, matching IconButton: native :disabled and
       Base UI's data-disabled (focusableWhenDisabled). */
    "disabled:pointer-events-none disabled:opacity-50",
    "data-disabled:pointer-events-none data-disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ),
  {
    variants: {
      intent: {
        neutral: cn(
          "border border-border bg-secondary-soft text-foreground hover:bg-muted",
          "data-active:border-destructive/40 data-active:bg-destructive-soft data-active:text-destructive",
          "data-active:hover:bg-destructive/25",
        ),
        success: "bg-success text-success-foreground hover:opacity-90",
        destructive: "bg-destructive text-destructive-foreground hover:opacity-90",
      },
      size: {
        sm: "h-10 w-10 [&_svg:not([class*='size-'])]:size-5",
        md: "h-12 w-12 [&_svg:not([class*='size-'])]:size-5",
        lg: "h-14 w-14 [&_svg:not([class*='size-'])]:size-6",
      },
      /** Pill width for the prominent end-call control. */
      wide: {
        true: "",
      },
    },
    compoundVariants: [
      { size: "sm", wide: true, class: "w-16" },
      { size: "md", wide: true, class: "w-20" },
      { size: "lg", wide: true, class: "w-24" },
    ],
    defaultVariants: {
      intent: "neutral",
      size: "md",
    },
  },
)

export interface CallControlButtonProps
  extends BaseButton.Props,
    VariantProps<typeof callControlVariants> {
  /** Required: call controls are icon-only. */
  "aria-label": string
  /** Toggled-off state (muted mic, camera off): destructive-soft look. */
  active?: boolean
  /** Device switch in flight: spinner replaces the icon, input locked. */
  loading?: boolean
}

export function CallControlButton({
  className,
  intent,
  size,
  wide,
  active = false,
  loading = false,
  disabled,
  children,
  ...props
}: CallControlButtonProps) {
  return (
    <BaseButton
      data-active={active || undefined}
      data-loading={loading || undefined}
      aria-busy={loading || undefined}
      disabled={disabled || loading}
      className={cn(callControlVariants({ intent, size, wide }), className)}
      {...props}
    >
      {loading ? <CircleNotch aria-hidden className="animate-spin" /> : children}
    </BaseButton>
  )
}

export interface CallMicToggleProps
  extends Omit<CallControlButtonProps, "aria-label" | "active" | "children"> {
  /** True when the microphone is muted. */
  muted: boolean
  /** Static label; the muted state is conveyed via aria-pressed. */
  "aria-label"?: string | undefined
}

export function CallMicToggle({
  muted,
  "aria-label": ariaLabel = "Mute microphone",
  ...props
}: CallMicToggleProps) {
  return (
    <CallControlButton
      aria-label={ariaLabel}
      aria-pressed={muted}
      active={muted}
      {...props}
    >
      {muted ? <MicrophoneSlash aria-hidden /> : <Microphone aria-hidden />}
    </CallControlButton>
  )
}

export interface CallCameraToggleProps
  extends Omit<CallControlButtonProps, "aria-label" | "active" | "children"> {
  /** True when the camera is off. */
  off: boolean
  /** Static label; the off state is conveyed via aria-pressed. */
  "aria-label"?: string | undefined
}

export function CallCameraToggle({
  off,
  "aria-label": ariaLabel = "Turn off camera",
  ...props
}: CallCameraToggleProps) {
  return (
    <CallControlButton
      aria-label={ariaLabel}
      aria-pressed={off}
      active={off}
      {...props}
    >
      {off ? <VideoCameraSlash aria-hidden /> : <VideoCamera aria-hidden />}
    </CallControlButton>
  )
}

export interface CallFlipCameraButtonProps
  extends Omit<CallControlButtonProps, "aria-label" | "children"> {
  "aria-label"?: string | undefined
}

export function CallFlipCameraButton({
  "aria-label": ariaLabel = "Flip camera",
  ...props
}: CallFlipCameraButtonProps) {
  return (
    <CallControlButton aria-label={ariaLabel} {...props}>
      <CameraRotate aria-hidden />
    </CallControlButton>
  )
}

export interface CallEndButtonProps
  extends Omit<CallControlButtonProps, "aria-label" | "children" | "intent"> {
  "aria-label"?: string | undefined
}

/** The prominent destructive pill; always reads red (fixed status semantics). */
export function CallEndButton({
  "aria-label": ariaLabel = "End call",
  wide = true,
  ...props
}: CallEndButtonProps) {
  return (
    <CallControlButton
      intent="destructive"
      wide={wide}
      aria-label={ariaLabel}
      {...props}
    >
      <PhoneDisconnect aria-hidden />
    </CallControlButton>
  )
}

export type CallControlsProps = React.HTMLAttributes<HTMLDivElement>

/** The cluster container: centers and spaces the controls as a group. */
export function CallControls({
  className,
  "aria-label": ariaLabel = "Call controls",
  ...props
}: CallControlsProps) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={cn("flex items-center justify-center gap-3", className)}
      {...props}
    />
  )
}
