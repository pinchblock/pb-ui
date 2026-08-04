import { motion } from "motion/react"
import { ArrowsClockwise, Barbell, Flame, Trophy } from "@phosphor-icons/react"
import { useEffect, useRef, useState } from "react"

import type { SinkSection } from "./types.ts"
import { Showcase, VariantRow } from "./section-shell.tsx"
import { Button } from "../../../src/components/ui/button.tsx"
import { MediaFrame } from "../../../src/components/media-frame.tsx"
import { VideoPlayer } from "../../../src/components/video-player.tsx"
import {
  UploadDropzone,
  UploadFileChip,
} from "../../../src/components/upload-dropzone.tsx"
import { ChatBubble, DateDivider } from "../../../src/components/chat-bubble.tsx"
import { ChatComposer } from "../../../src/components/chat-composer.tsx"
import { TypingIndicator } from "../../../src/components/typing-indicator.tsx"
import {
  Reveal,
  fadeInUp,
  springPop,
  staggerChildren,
} from "../../../src/lib/motion.ts"

/* Sample media: public test assets, nothing vendored. */
const SAMPLE_VIDEO = "https://media.w3.org/2010/05/sintel/trailer.mp4"
const SAMPLE_LOOP = "https://media.w3.org/2010/05/bunny/trailer.mp4"
/* Deliberately dead URL: exercises the player's onError -> error state. */
const DEAD_VIDEO = "https://media.w3.org/2010/05/does-not-exist/missing.mp4"
const IMG = (seed: string, w = 800, h = 450) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`

/* ------------------------------------------------------------------ */
/* Motion presets                                                      */
/* ------------------------------------------------------------------ */

function PrCelebration() {
  const [replay, setReplay] = useState(0)
  return (
    <div className="flex flex-col items-start gap-4">
      <motion.div
        key={replay}
        initial="hidden"
        animate="visible"
        variants={springPop}
        className="flex items-center gap-4 rounded-xl border border-primary-border bg-primary-soft p-5"
      >
        <span className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Trophy aria-hidden className="size-6" />
        </span>
        <div>
          <p className="text-sm font-semibold text-primary">New PR!</p>
          <p className="text-lg font-bold text-foreground">Deadlift 180 kg</p>
          <p className="text-xs text-muted-foreground">+5 kg over your March best</p>
        </div>
      </motion.div>
      <Button variant="secondary" size="sm" onClick={() => setReplay((n) => n + 1)}>
        <ArrowsClockwise aria-hidden /> Replay springPop
      </Button>
    </div>
  )
}

function StaggerDemo() {
  const [replay, setReplay] = useState(0)
  const rows = [
    { icon: Flame, label: "Streak", value: "21 days" },
    { icon: Barbell, label: "Sessions this week", value: "4 of 5" },
    { icon: Trophy, label: "PRs this month", value: "3" },
  ]
  return (
    <div className="flex flex-col items-start gap-4">
      <motion.ul
        key={replay}
        initial="hidden"
        animate="visible"
        variants={staggerChildren()}
        className="w-full max-w-sm space-y-2"
      >
        {rows.map(({ icon: Icon, label, value }) => (
          <motion.li
            key={label}
            variants={fadeInUp}
            className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3"
          >
            <Icon aria-hidden className="size-4 text-primary" />
            <span className="flex-1 text-sm text-muted-foreground">{label}</span>
            <span className="text-sm font-semibold text-foreground">{value}</span>
          </motion.li>
        ))}
      </motion.ul>
      <Button variant="secondary" size="sm" onClick={() => setReplay((n) => n + 1)}>
        <ArrowsClockwise aria-hidden /> Replay stagger
      </Button>
    </div>
  )
}

function RevealDemo() {
  const [replay, setReplay] = useState(0)
  return (
    <div className="flex flex-col items-start gap-4">
      <Reveal
        key={replay}
        className="w-full max-w-sm rounded-xl border border-border bg-card p-5"
      >
        <p className="eyebrow mb-1">Session summary</p>
        <p className="text-sm font-semibold text-foreground">
          Lower body strength, 52 min
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Back squat 5x5 at 120 kg, Romanian deadlift 3x8, box jumps. Coach Maria
          left 2 comments on your squat clips.
        </p>
      </Reveal>
      <Button variant="secondary" size="sm" onClick={() => setReplay((n) => n + 1)}>
        <ArrowsClockwise aria-hidden /> Replay Reveal
      </Button>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* UploadDropzone                                                      */
/* ------------------------------------------------------------------ */

interface DemoUpload {
  id: number
  name: string
  previewUrl?: string
  progress: number
}

function UploadDemo() {
  const [uploads, setUploads] = useState<DemoUpload[]>([])
  const nextId = useRef(1)

  /* Fake per-file progress so the chips have something to show. */
  useEffect(() => {
    if (!uploads.some((u) => u.progress < 100)) return
    const timer = setInterval(() => {
      setUploads((prev) =>
        prev.map((u) =>
          u.progress < 100
            ? { ...u, progress: Math.min(100, u.progress + 6 + Math.random() * 12) }
            : u,
        ),
      )
    }, 200)
    return () => clearInterval(timer)
  }, [uploads])

  return (
    <UploadDropzone
      multiple
      accept="video/*,image/*"
      label="Drop training clips or photos"
      hint="MP4, MOV, JPG or PNG. Uploading itself stays app-side."
      onFiles={(files) => {
        setUploads((prev) => [
          ...prev,
          ...files.map((file) => ({
            id: nextId.current++,
            name: file.name,
            previewUrl: file.type.startsWith("image/")
              ? URL.createObjectURL(file)
              : undefined,
            progress: 0,
          })),
        ])
      }}
    >
      {uploads.map((upload) => (
        <UploadFileChip
          key={upload.id}
          name={upload.name}
          previewUrl={upload.previewUrl}
          progress={upload.progress}
          onRemove={() => {
            if (upload.previewUrl) URL.revokeObjectURL(upload.previewUrl)
            setUploads((prev) => prev.filter((u) => u.id !== upload.id))
          }}
        />
      ))}
    </UploadDropzone>
  )
}

/* ------------------------------------------------------------------ */
/* Chat                                                                */
/* ------------------------------------------------------------------ */

interface DemoMessage {
  id: number
  variant: "mine" | "theirs"
  text: string
  meta?: string
  pending?: boolean
}

const SEED_MESSAGES: DemoMessage[] = [
  {
    id: 1,
    variant: "theirs",
    text: "Morning! How did the tempo run feel yesterday?",
    meta: "07:42",
  },
  {
    id: 2,
    variant: "mine",
    text: "Legs were heavy at the start but I held 4:50/km for all six reps.",
    meta: "07:45",
  },
  {
    id: 3,
    variant: "theirs",
    text: "That is a solid session on tired legs. Keep today easy, zone 2 only, and send me a clip of your squat warm-up set.",
    meta: "07:47",
  },
]

function ChatDemo() {
  const [messages, setMessages] = useState<DemoMessage[]>(SEED_MESSAGES)
  const nextId = useRef(100)

  const send = (text: string) => {
    const id = nextId.current++
    setMessages((prev) => [
      ...prev,
      { id, variant: "mine", text, pending: true },
    ])
    /* Fake the server ack so the pending state resolves. */
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === id
            ? {
                ...m,
                pending: false,
                meta: new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              }
            : m,
        ),
      )
    }, 1200)
  }

  return (
    <div className="mx-auto flex max-w-md flex-col rounded-xl border border-border bg-background p-4">
      <DateDivider label="Today" />
      <div className="flex flex-col gap-2">
        {messages.map((message) => (
          <ChatBubble
            key={message.id}
            variant={message.variant}
            pending={message.pending}
            meta={message.meta}
          >
            {message.text}
          </ChatBubble>
        ))}
        <div className="mr-auto flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-full bg-primary-soft text-xs font-semibold text-primary">
            M
          </span>
          <div className="rounded-2xl rounded-bl-md border border-border bg-card px-3 py-2.5 text-muted-foreground">
            <TypingIndicator label="Coach Maria is typing" />
          </div>
        </div>
      </div>
      <div className="mt-4">
        <ChatComposer
          placeholder="Message Coach Maria"
          onSend={send}
          onAttach={() => {}}
        />
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Sections                                                            */
/* ------------------------------------------------------------------ */

export const sections: SinkSection[] = [
  {
    id: "media-motion",
    label: "Motion presets",
    render: () => (
      <>
        <Showcase
          title="springPop, a reward moment"
          hint="src/lib/motion.ts derives every duration and easing from the token source, so JS animation cannot drift from CSS. Overshoot is reserved for streaks, PRs and reactions."
        >
          <PrCelebration />
        </Showcase>
        <Showcase
          title="staggerChildren + fadeInUp"
          hint="Parent cascades hidden/visible to children with a token-fast interval."
        >
          <StaggerDemo />
        </Showcase>
        <Showcase
          title="Reveal"
          hint="whileInView fade-up, fires once. Under prefers-reduced-motion it falls back to a pure opacity fade."
        >
          <RevealDemo />
        </Showcase>
      </>
    ),
  },
  {
    id: "media-frame",
    label: "MediaFrame",
    render: () => (
      <>
        <Showcase
          title="Lifecycle states"
          hint="Every piece of media sits in a frame that owns pending, processing and error, so nothing ever renders a broken-image glyph."
        >
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div>
              <MediaFrame src={IMG("pb-gym")} alt="Athlete setting up a barbell" />
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
        <Showcase title="Ratios" hint="video 16:9, square 1:1, portrait 3:4, wide 21:9.">
          <div className="grid items-start gap-4 sm:grid-cols-4">
            {(["video", "square", "portrait", "wide"] as const).map((ratio) => (
              <div key={ratio}>
                <MediaFrame
                  ratio={ratio}
                  src={IMG(`pb-${ratio}`, 600, 600)}
                  alt={`Training photo in ${ratio} ratio`}
                />
                <p className="mt-2 text-center font-mono text-xs text-muted-foreground">
                  {ratio}
                </p>
              </div>
            ))}
          </div>
        </Showcase>
      </>
    ),
  },
  {
    id: "media-video",
    label: "VideoPlayer",
    render: () => (
      <>
        <Showcase
          title="Full mode"
          hint="media-chrome underneath, skinned entirely through tokens: primary range accent, background gradient control bar, ring focus."
        >
          <div className="max-w-2xl">
            <VideoPlayer
              src={SAMPLE_VIDEO}
              poster={IMG("pb-poster")}
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
      </>
    ),
  },
  {
    id: "media-upload",
    label: "UploadDropzone",
    render: () => (
      <>
        <Showcase
          title="Interactive"
          hint="Drag files in or click to browse. Image files get preview chips; progress here is simulated, real uploads stay app-side via onFiles."
        >
          <UploadDemo />
        </Showcase>
        <Showcase title="States">
          <div className="grid gap-4 lg:grid-cols-2">
            <UploadDropzone
              label="Single video only"
              hint="accept=video/*"
              accept="video/*"
              onFiles={() => {}}
            />
            <UploadDropzone
              disabled
              label="Disabled"
              hint="Upgrade your plan to attach clips"
              onFiles={() => {}}
            />
          </div>
        </Showcase>
        <Showcase title="File chips" hint="Progress bar while uploading, error state, remove button.">
          <VariantRow>
            <UploadFileChip name="squat-warmup.mp4" progress={62} onRemove={() => {}} />
            <UploadFileChip
              name="finish-line.jpg"
              previewUrl={IMG("pb-chip", 96, 96)}
              onRemove={() => {}}
            />
            <UploadFileChip name="race-plan.pdf" error onRemove={() => {}} />
          </VariantRow>
        </Showcase>
      </>
    ),
  },
  {
    id: "media-chat",
    label: "Chat",
    render: () => (
      <>
        <Showcase
          title="Coach thread"
          hint="ChatBubble + DateDivider + TypingIndicator + ChatComposer. Send a message: it renders pending (clock) until the fake server acks."
        >
          <ChatDemo />
        </Showcase>
        <Showcase title="Bubble variants">
          <div className="mx-auto flex max-w-md flex-col gap-2">
            <ChatBubble variant="theirs" meta="09:14">
              Nice pace on the intervals today.
            </ChatBubble>
            <ChatBubble variant="mine" meta="09:15">
              Thanks! Felt controlled the whole way.
            </ChatBubble>
            <ChatBubble variant="mine" pending>
              Uploading my last set now.
            </ChatBubble>
          </div>
        </Showcase>
        <Showcase
          title="Composer with attachments"
          hint="Attachment chips render in the slot above the input row. Send stays disabled while empty."
        >
          <div className="mx-auto max-w-md">
            <ChatComposer
              placeholder="Add a note for your coach"
              onSend={() => {}}
              onAttach={() => {}}
              attachments={
                <UploadFileChip name="warmup-set.mp4" progress={38} onRemove={() => {}} />
              }
            />
          </div>
        </Showcase>
      </>
    ),
  },
]
