import { ArrowsClockwise } from "@phosphor-icons/react"

import { Button, MediaFrame } from "@pinchblock/ui"
import { CodeBlock, ExampleBlock, PageIntro, Showcase } from "../../sink/showcase.tsx"
import { img } from "./assets.ts"

export default function MediaFramePage() {
  return (
    <div>
      <PageIntro
        title="MediaFrame"
        description="The aspect-ratio container every piece of media sits in. It owns the lifecycle (pending, processing, error with a retry slot), so nothing ever renders a broken-image glyph."
        use="Wrap every image and clip thumbnail in the product. Reach for VideoPlayer when the media needs playback controls; MediaFrame covers stills, posters and lifecycle states."
      />

      <Showcase
        title="Lifecycle states"
        hint="Instead of a naked img that can 404 into an ugly glyph, the frame always renders something intentional on bg-background-sunken."
      >
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div>
            <MediaFrame src={img("pb-gym")} alt="Athlete setting up a barbell" />
            <p className="mt-2 text-xs text-muted-foreground">ready (image, alt required)</p>
          </div>
          <div>
            <MediaFrame state="pending" />
            <p className="mt-2 text-xs text-muted-foreground">pending (upload in flight)</p>
          </div>
          <div>
            <MediaFrame state="processing" processingLabel="Analyzing squat form" />
            <p className="mt-2 text-xs text-muted-foreground">processing</p>
          </div>
          <div>
            <MediaFrame
              state="error"
              errorLabel="Clip failed to load"
              retry={
                <Button variant="secondary" size="sm">
                  <ArrowsClockwise aria-hidden /> Retry
                </Button>
              }
            />
            <p className="mt-2 text-xs text-muted-foreground">error + retry slot</p>
          </div>
        </div>
      </Showcase>

      <Showcase title="Ratios" hint="video 16:9, square 1:1, portrait 3:4, wide 21:9. Ratios are structural, not scale values.">
        <div className="grid items-start gap-4 sm:grid-cols-4">
          {(["video", "square", "portrait", "wide"] as const).map((ratio) => (
            <div key={ratio}>
              <MediaFrame
                ratio={ratio}
                src={img(`pb-${ratio}`, 600, 600)}
                alt={`Training photo in ${ratio} ratio`}
              />
              <p className="mt-2 text-center font-mono text-xs text-muted-foreground">
                {ratio}
              </p>
            </div>
          ))}
        </div>
      </Showcase>

      <ExampleBlock
        title="Session clip gallery"
        description="Form-check clips attached to today's session: one ready, one still transcoding, one upload in flight."
      >
        <div className="grid max-w-2xl gap-4 sm:grid-cols-3">
          <div>
            <MediaFrame
              ratio="portrait"
              src={img("pb-gallery", 600, 800)}
              alt="Back squat, set 2 of 5"
            />
            <p className="mt-2 text-xs text-muted-foreground">Back squat, set 2</p>
          </div>
          <div>
            <MediaFrame ratio="portrait" state="processing" processingLabel="Analyzing squat form" />
            <p className="mt-2 text-xs text-muted-foreground">Back squat, set 3</p>
          </div>
          <div>
            <MediaFrame ratio="portrait" state="pending" />
            <p className="mt-2 text-xs text-muted-foreground">Back squat, set 4</p>
          </div>
        </div>
      </ExampleBlock>

      <CodeBlock
        code={`
import { MediaFrame } from "@pinchblock/ui"

<MediaFrame src={clip.thumbUrl} alt="Back squat form check, set 3" />

<MediaFrame state="processing" processingLabel="Analyzing squat form" />

<MediaFrame
  state="error"
  errorLabel="Clip failed to load"
  retry={<Button variant="secondary" size="sm">Retry</Button>}
/>
`}
      />
    </div>
  )
}
