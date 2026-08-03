import "media-chrome"
import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"

import { cn } from "../lib/cn.ts"
import { MediaFrame, type MediaFrameRatio } from "./media-frame.tsx"

/*
 * media-chrome ships web components; React 19 renders custom elements
 * natively. Instead of augmenting JSX.IntrinsicElements (which breaks
 * when a consumer program resolves a second @types/react copy), each
 * tag is typed as a component: at runtime it is still just the string,
 * so React renders the custom element.
 */
type MediaChromeProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
> &
  Record<string, unknown>

function mediaElement(tag: string) {
  return tag as unknown as (props: MediaChromeProps) => React.ReactNode
}

const MediaController = mediaElement("media-controller")
const MediaControlBar = mediaElement("media-control-bar")
const MediaLoadingIndicator = mediaElement("media-loading-indicator")
const MediaPlayButton = mediaElement("media-play-button")
const MediaMuteButton = mediaElement("media-mute-button")
const MediaVolumeRange = mediaElement("media-volume-range")
const MediaTimeRange = mediaElement("media-time-range")
const MediaTimeDisplay = mediaElement("media-time-display")
const MediaFullscreenButton = mediaElement("media-fullscreen-button")

/**
 * VideoPlayer: owned-source player skinned with semantic tokens via
 * media-chrome's CSS custom properties (bridged with arbitrary-property
 * utilities, so every value stays a token).
 */
export const videoPlayerVariants = cva(
  cn(
    "relative block w-full overflow-hidden rounded-xl bg-background-sunken",
    /* Token bridge into media-chrome's theming API. */
    "[--media-primary-color:var(--foreground)]",
    "[--media-text-color:var(--foreground)]",
    "[--media-icon-color:var(--foreground)]",
    "[--media-control-background:transparent]",
    "[--media-control-hover-background:var(--accent)]",
    "[--media-range-bar-color:var(--primary)]",
    "[--media-range-thumb-background:var(--primary)]",
    "[--media-range-track-background:var(--border-strong)]",
    "[--media-focus-box-shadow:0_0_0_2px_var(--ring)]",
    "[--media-font-family:var(--font-sans)]",
  ),
  {
    variants: {
      aspect: {
        video: "aspect-video",
        square: "aspect-square",
        portrait: "aspect-[3/4]",
        wide: "aspect-[21/9]",
      },
    },
    defaultVariants: {
      aspect: "video",
    },
  },
)

export interface VideoPlayerProps
  extends VariantProps<typeof videoPlayerVariants> {
  /** Video source URL. Missing src renders the MediaFrame error state. */
  src?: string
  poster?: string
  /**
   * "full": full control bar (play, mute, volume, scrub, time,
   * fullscreen). "loop": autoplaying muted loop without controls, for
   * exercise demo clips.
   */
  mode?: "full" | "loop"
  /** Accessible label for the player / clip. */
  label?: string
  /** Action slot shown when src is missing (e.g. a retry Button). */
  retry?: React.ReactNode
  className?: string
}

export function VideoPlayer({
  src,
  poster,
  aspect,
  mode = "full",
  label,
  retry,
  className,
}: VideoPlayerProps) {
  if (!src) {
    return (
      <MediaFrame
        ratio={(aspect ?? "video") as MediaFrameRatio}
        state="error"
        errorLabel="Video unavailable"
        retry={retry}
        className={className}
      />
    )
  }

  if (mode === "loop") {
    return (
      <MediaFrame
        ratio={(aspect ?? "video") as MediaFrameRatio}
        className={className}
      >
        <video
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          aria-label={label}
          className="absolute inset-0 size-full object-cover"
        />
      </MediaFrame>
    )
  }

  return (
    <MediaController
      aria-label={label}
      className={cn(videoPlayerVariants({ aspect }), className)}
    >
      <video
        slot="media"
        src={src}
        poster={poster}
        playsInline
        preload="metadata"
        crossOrigin="anonymous"
        className="size-full object-cover"
      />
      <MediaLoadingIndicator slot="centered-chrome" />
      <MediaControlBar
        className={cn(
          "flex w-full items-center gap-0.5 px-2 pb-1.5 pt-8",
          "bg-linear-to-t from-background/90 via-background/40 to-transparent",
        )}
      >
        <MediaPlayButton />
        <MediaMuteButton />
        <MediaVolumeRange className="hidden w-20 sm:block" />
        <MediaTimeRange className="grow" />
        <MediaTimeDisplay showduration={true} />
        <MediaFullscreenButton />
      </MediaControlBar>
    </MediaController>
  )
}
