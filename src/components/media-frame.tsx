import { cva, type VariantProps } from "class-variance-authority"
import { ImageIcon, ImageOff, Loader2 } from "lucide-react"
import type * as React from "react"

import { cn } from "../lib/cn.ts"

/**
 * MediaFrame: the aspect-ratio container every piece of media sits in.
 * Replaces broken-image placeholders: instead of a naked <img> that can
 * 404 into an ugly glyph, the frame owns the lifecycle (pending while a
 * clip uploads, processing while it transcodes, error with a retry
 * slot) and always renders something intentional on bg-background-sunken.
 */
export const mediaFrameVariants = cva(
  "relative isolate flex w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-xl bg-background-sunken",
  {
    variants: {
      /* Ratios are structural (not scale values): 16:9 video, 1:1
         thumbnails, 3:4 phone-shot form checks, 21:9 banners. */
      ratio: {
        video: "aspect-video",
        square: "aspect-square",
        portrait: "aspect-[3/4]",
        wide: "aspect-[21/9]",
      },
    },
    defaultVariants: {
      ratio: "video",
    },
  },
)

export type MediaFrameRatio = NonNullable<
  VariantProps<typeof mediaFrameVariants>["ratio"]
>

export type MediaFrameState = "ready" | "pending" | "processing" | "error"

interface MediaFrameBaseProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof mediaFrameVariants> {
  /** Lifecycle state. "ready" renders the image or children. */
  state?: MediaFrameState
  /** Label under the spinner while media is transcoding/analyzing. */
  processingLabel?: string
  /** Label for the error state. */
  errorLabel?: string
  /** Action slot for the error state (e.g. a retry Button). */
  retry?: React.ReactNode
}

/** `alt` is mandatory whenever `src` is given; the types enforce it. */
export type MediaFrameProps = MediaFrameBaseProps &
  ({ src: string; alt: string } | { src?: undefined; alt?: never })

export function MediaFrame({
  className,
  ratio,
  state = "ready",
  src,
  alt,
  processingLabel = "Processing",
  errorLabel = "Media unavailable",
  retry,
  children,
  ...props
}: MediaFrameProps) {
  return (
    <div
      data-state={state}
      className={cn(mediaFrameVariants({ ratio }), className)}
      {...props}
    >
      {state === "ready" && src != null && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="absolute inset-0 size-full object-cover"
        />
      )}

      {state === "ready" && src == null && children}

      {state === "pending" && (
        <>
          <div aria-hidden className="absolute inset-0 animate-pulse bg-muted" />
          <ImageIcon aria-hidden className="relative size-6 text-faint-foreground" />
          <span className="sr-only">Loading media</span>
        </>
      )}

      {state === "processing" && (
        <div role="status" className="flex flex-col items-center gap-2">
          <Loader2 aria-hidden className="size-6 animate-spin text-muted-foreground" />
          <span className="text-xs font-medium text-muted-foreground">
            {processingLabel}
          </span>
        </div>
      )}

      {state === "error" && (
        <div role="status" className="flex flex-col items-center gap-2">
          <ImageOff aria-hidden className="size-6 text-faint-foreground" />
          <span className="text-xs font-medium text-muted-foreground">{errorLabel}</span>
          {retry}
        </div>
      )}
    </div>
  )
}
