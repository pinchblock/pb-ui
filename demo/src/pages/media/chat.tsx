import {
  EmojiPicker,
} from "react"

import {
  ChatBubble,
  ChatComposer,
  DateDivider,
  TypingIndicator,
  UploadFileChip,
} from "@pinchblock/ui"
import { CodeBlock, ExampleBlock, PageIntro, Showcase } from "../../sink/showcase.tsx"
import { img } from "./assets.ts"

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

/** Interactive coach thread: sends render pending until a fake ack. */
function ChatDemo() {
  const [messages, setMessages] = useState<DemoMessage[]>(SEED_MESSAGES)
  const nextId = useRef(100)

  const send = (text: string) => {
    const id = nextId.current++
    setMessages((prev) => [...prev, { id, variant: "mine", text, pending: true }])
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

export default function ChatPage() {
  return (
    <div>
      <PageIntro
        title="Chat"
        description="The conversational kit, four components that ship as one family: ChatBubble (a message), DateDivider (day separators), ChatComposer (the input shell) and TypingIndicator (presence)."
        use="Coach/athlete threads and session comments. Bubbles handle alignment and pending state; the composer handles autogrow, Enter-to-send and attachments. Compose the thread layout app-side."
      />

      <Showcase title="Bubble variants" hint="mine aligns right on primary, theirs aligns left on card. Pending (optimistic send) dims and shows a clock until the server confirms.">
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

      <Showcase title="Typing indicator" hint="Dots use currentColor, so it inherits wherever it sits; here inside a theirs-style bubble on text-muted-foreground.">
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-full bg-primary-soft text-xs font-semibold text-primary">
            M
          </span>
          <div className="rounded-2xl rounded-bl-md border border-border bg-card px-3 py-2.5 text-muted-foreground">
            <TypingIndicator label="Coach Maria is typing" />
          </div>
        </div>
      </Showcase>

      <Showcase title="Composer with attachments" hint="Attachment chips render in the slot above the input row. Send stays disabled while empty unless canSendWithoutText says the attachment is the message; Enter sends, Shift+Enter breaks the line.">
        <div className="mx-auto max-w-md">
          <ChatComposer
            placeholder="Add a note for your coach"
            onSend={() => {}}
            onAttach={() => {}}
            attachments={
              <UploadFileChip
                name="warmup-set.mp4"
                previewUrl={img("pb-attach", 96, 96)}
                progress={38}
                onRemove={() => {}}
              />
            }
          />
        </div>
      </Showcase>

      <Showcase title="Composer sending an attachment alone" hint="canSendWithoutText keeps Send live while the message is empty, for a photo or a clip that is the whole message. Without it the caller needs a second send button beside the disabled one.">
        <div className="mx-auto max-w-md">
          <ChatComposer
            canSendWithoutText
            placeholder="Add a note for your coach"
            onSend={() => {}}
            onAttach={() => {}}
            attachments={
              <UploadFileChip
                name="topout.jpg"
                previewUrl={img("pb-attach-solo", 96, 96)}
                onRemove={() => {}}
              />
            }
          />
        </div>
      </Showcase>

      <Showcase
        title="Emoji picker"
        hint="Native emoji in a searchable grid, for surfaces where the platform picker is out of reach: a desktop composer, a reaction row. A touch keyboard already carries one, so callers usually render this only on pointer devices. The set loads on first open."
      >
        <div className="mx-auto w-fit rounded-lg border border-border bg-popover p-2 shadow-raised">
          <EmojiPicker onSelect={() => {}} recent={["\u{1F4AA}", "\u{1F525}", "\u{1F44D}"]} />
        </div>
      </Showcase>

      <ExampleBlock
        title="Coach thread"
        description="The full family together. Send a message: it renders pending (clock) until the fake server acks."
      >
        <ChatDemo />
      </ExampleBlock>

      <CodeBlock
        code={`
import { ChatBubble, ChatComposer, DateDivider, TypingIndicator } from "@pinchblock/ui"

<DateDivider label="Today" />
<ChatBubble variant="theirs" meta="07:42">
  How did the tempo run feel?
</ChatBubble>
<ChatBubble variant="mine" pending>
  Legs were heavy but I held pace.
</ChatBubble>
<TypingIndicator label="Coach Maria is typing" />
<ChatComposer placeholder="Message Coach Maria" onSend={send} onAttach={openPicker} />
`}
      />
    </div>
  )
}
