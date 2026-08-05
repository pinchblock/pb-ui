"use client"

import "media-chrome"
import { cva, type VariantProps } from "class-variance-authority"
import { Pause, Play } from "@phosphor-icons/react"
import * as React from "react"

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
   * fullscreen). "loop": autoplaying muted loop for exercise demo clips,
   * with a minimal overlay pause/play toggle. Under
   * prefers-reduced-motion the loop starts paused instead of autoplaying.
   */
  mode?: "full" | "loop"
  /** Accessible label for the player / clip. */
  label?: string
  /** Action slot shown when src is missing or the load failed
   * (e.g. a retry Button). Activating it re-attempts the load. */
  retry?: React.ReactNode
  className?: string | undefined
}

/** matchMedia in state so JS-driven playback respects the OS setting. */
function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = React.useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  )
  React.useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    const onChange = () => setReduced(query.matches)
    query.addEventListener("change", onChange)
    return () => query.removeEventListener("change", onChange)
  }, [])
  return reduced
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
  const reducedMotion = usePrefersReducedMotion()
  const videoRef = React.useRef<HTMLVideoElement>(null)
  /* Failed loads (403/404/network) flip into the MediaFrame error
     state; retry resets and remounts the video via the attempt key. */
  const [failed, setFailed] = React.useState(false)
  const [attempt, setAttempt] = React.useState(0)
  const [playing, setPlaying] = React.useState(false)

  React.useEffect(() => {
    setFailed(false)
  }, [src])

  if (!src || failed) {
    return (
      <MediaFrame
        ratio={(aspect ?? "video") as MediaFrameRatio}
        state="error"
        errorLabel="Video unavailable"
        retry={
          retry != null ? (
            /* Bubbling wrapper: the interactive element (a Button) lives
               inside the slot; any activation also resets the failure. */
            <span
              className="contents"
              onClick={() => {
                setFailed(false)
                setAttempt((n) => n + 1)
              }}
            >
              {retry}
            </span>
          ) : undefined
        }
        className={className}
      />
    )
  }

  if (mode === "loop") {
    const togglePlayback = () => {
      const video = videoRef.current
      if (!video) return
      if (video.paused) void video.play()
      else video.pause()
    }
    return (
      <MediaFrame
        ratio={(aspect ?? "video") as MediaFrameRatio}
        className={cn("group", className)}
      >
        <video
          key={attempt}
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay={!reducedMotion}
          muted
          loop
          playsInline
          aria-label={label}
          onError={() => setFailed(true)}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          className="absolute inset-0 size-full object-cover"
        />
        {/* WCAG 2.2.2: auto-playing loops need a pause control. Hidden
            until hover/focus on fine pointers, always shown on coarse
            pointers, and always shown while paused. */}
        <button
          type="button"
          aria-label={playing ? "Pause" : "Play"}
          onClick={togglePlayback}
          className={cn(
            "absolute right-2 bottom-2 z-10 inline-flex size-9 items-center justify-center rounded-full",
            "border border-border bg-background/80 text-foreground",
            "transition-[opacity,background-color] duration-(--duration-fast) ease-(--ease-out)",
            "hover:bg-background",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            playing
              ? "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 pointer-coarse:opacity-100"
              : "opacity-100",
          )}
        >
          {playing ? (
            <Pause aria-hidden className="size-4" />
          ) : (
            <Play aria-hidden className="size-4" />
          )}
        </button>
      </MediaFrame>
    )
  }

  return (
    <MediaController
      aria-label={label}
      className={cn(videoPlayerVariants({ aspect }), className)}
    >
      <video
        key={attempt}
        slot="media"
        src={src}
        poster={poster}
        playsInline
        preload="metadata"
        onError={() => setFailed(true)}
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
