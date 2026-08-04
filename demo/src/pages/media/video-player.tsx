import { ArrowsClockwise } from "@phosphor-icons/react"

import { VideoPlayer } from "../../../../src/components/video-player.tsx"
import { Button } from "../../../../src/components/ui/button.tsx"
import { CodeBlock, ExampleBlock, PageIntro, Showcase } from "../../sink/showcase.tsx"
import { DEAD_VIDEO, SAMPLE_LOOP, SAMPLE_VIDEO, img } from "./assets.ts"

export default function VideoPlayerPage() {
  return (
    <div>
      <PageIntro
        title="VideoPlayer"
        description="Owned-source player, media-chrome underneath, skinned entirely through tokens: primary range accent, background gradient control bar, ring focus."
        use="Full mode for technique videos and form-check reviews. Loop mode for exercise demo clips inside the workout builder. Missing src or a failed load degrades into the MediaFrame error state, never a black rectangle."
      />

      <Showcase
        title="Full mode"
        hint="Play, mute, volume, scrub, time and fullscreen. Every control color and font resolves through the token bridge."
      >
        <div className="max-w-2xl">
          <VideoPlayer
            src={SAMPLE_VIDEO}
            poster={img("pb-poster")}
            label="Technique breakdown video"
          />
        </div>
      </Showcase>

      <Showcase
        title="Loop mode"
        hint="Autoplay, muted, looped: for exercise demo clips inside a workout builder. A minimal pause/play toggle shows on hover/focus (always on touch), and under prefers-reduced-motion the clip starts paused instead of autoplaying."
      >
        <div className="max-w-sm">
          <VideoPlayer
            src={SAMPLE_LOOP}
            mode="loop"
            aspect="square"
            label="Kettlebell swing demo loop"
          />
        </div>
      </Showcase>

      <Showcase
        title="Error state (deliberately dead URL)"
        hint="This src 404s on purpose: the media element's error event flips the player into the MediaFrame error state, and Retry re-attempts the load. A missing src degrades the same way."
      >
        <div className="max-w-sm">
          <VideoPlayer
            src={DEAD_VIDEO}
            label="Clip that fails to load"
            retry={
              <Button variant="secondary" size="sm">
                <ArrowsClockwise aria-hidden /> Retry
              </Button>
            }
          />
        </div>
      </Showcase>

      <ExampleBlock
        title="Form check review"
        description="A coach reviews an athlete's squat clip and leaves a timestamped comment; the standard clip surface in session detail."
      >
        <div className="max-w-xl rounded-xl border border-border bg-card p-4">
          <VideoPlayer
            src={SAMPLE_VIDEO}
            poster={img("pb-formcheck")}
            label="Back squat set 3, form check"
          />
          <div className="mt-3 flex items-start gap-3">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary-soft text-xs font-semibold text-primary">
              M
            </span>
            <div className="min-w-0">
              <p className="text-sm text-foreground">
                <span className="font-semibold">Coach Maria</span>{" "}
                <span className="text-muted-foreground">at 0:14</span>
              </p>
              <p className="text-sm text-muted-foreground">
                Depth looks great. Watch the left knee tracking on the last two reps.
              </p>
              <Button variant="ghost" size="sm" className="mt-1">
                Reply
              </Button>
            </div>
          </div>
        </div>
      </ExampleBlock>

      <CodeBlock
        code={`
import { VideoPlayer } from "@pinchblock/ui"

// Full control bar for technique videos and form checks.
<VideoPlayer src={clip.url} poster={clip.posterUrl} label="Back squat set 3" />

// Autoplaying muted loop for exercise demos; reduced motion starts paused.
<VideoPlayer src={demo.loopUrl} mode="loop" aspect="square" label="Kettlebell swing demo" />

// Failed loads render the MediaFrame error state; retry re-attempts.
<VideoPlayer
  src={clip.url}
  label="Form check clip"
  retry={<Button variant="secondary" size="sm">Retry</Button>}
/>
`}
      />
    </div>
  )
}
