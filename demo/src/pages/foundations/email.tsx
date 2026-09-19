import { renderEmail, type EmailInput } from "@pinchblock/ui/email"
import { useState } from "react"

import { CodeBlock, PageIntro, Showcase } from "../../sink/showcase.tsx"

const ORIGIN = "https://pinchblock.app"

const samples: { id: string; label: string; input: EmailInput }[] = [
  {
    id: "message",
    label: "Message digest",
    input: {
      action: { href: `${ORIGIN}/messages/abc`, label: "Open the conversation" },
      footerLinks: [
        { href: `${ORIGIN}/settings?tab=notifications`, label: "Email settings" },
        { href: `${ORIGIN}/email-preferences/unsubscribe?token=x`, label: "Turn off message emails" },
      ],
      info: [
        "You get this email because message emails are on in your Pinchblock settings.",
        "Pinchblock, coaching that travels with you.",
      ],
      origin: ORIGIN,
      paragraphs: ["She wrote while you were away. Here is the latest."],
      quote: [
        "Saturday session moved to seven, the gym opens late",
        "Bring the crash pad if you still have it",
        "Also, how did the deadlift set feel on Tuesday?",
      ],
      title: "Maya Rivera sent you 3 messages",
    },
  },
  {
    id: "reset",
    label: "Password reset",
    input: {
      action: { href: `${ORIGIN}/auth/reset?token=x`, label: "Choose a new password" },
      actionNote: "The link expires in 60 minutes and can be used once.",
      footerLinks: [{ href: `${ORIGIN}/help`, label: "Help" }],
      headerNote: "Account security",
      info: ["Sent by Pinchblock because a reset was requested for this address."],
      origin: ORIGIN,
      paragraphs: [
        "Somebody asked to reset the password for this account. Use the button below within the next hour.",
        "If it was not you, nothing has changed and you can close this email.",
      ],
      title: "Reset your password",
    },
  },
  {
    id: "notice",
    label: "Notice, no action",
    input: {
      footerLinks: [{ href: `${ORIGIN}/settings`, label: "Email settings" }],
      info: ["You get this email because plan updates are on."],
      origin: ORIGIN,
      paragraphs: [
        "Maya finished building your twelve week block. It is waiting in the app whenever you are.",
      ],
      title: "Your plan is ready",
    },
  },
]

export default function EmailPage() {
  const [selected, setSelected] = useState(samples[0]!.id)
  const sample = samples.find((entry) => entry.id === selected) ?? samples[0]!
  const { html, text } = renderEmail(sample.input)

  return (
    <div>
      <PageIntro
        title="Email"
        description="One transactional template for every message the product sends: a message digest, a password reset, a receipt, an invitation. It emits a self-contained HTML document plus its plain text alternative."
        use="renderEmail is framework-free, so a backend worker imports it without React: import { renderEmail } from '@pinchblock/ui/email'. Colours come from the marquee brand surface and the turquoise light set, the type from the shared stack and scale, corners from the one radius, and the action is a fully rounded button sized to its label."
      />

      <Showcase
        title="Templates"
        hint="Rendered in a frame, exactly as sent. A mail client shows the dark variant when the reader's system is dark."
      >
        <div className="flex flex-wrap gap-2">
          {samples.map((entry) => (
            <button
              key={entry.id}
              type="button"
              onClick={() => setSelected(entry.id)}
              aria-pressed={entry.id === selected}
              className={
                entry.id === selected
                  ? "rounded-full border border-border-strong bg-secondary px-4 py-2 text-sm font-medium"
                  : "rounded-full border border-border px-4 py-2 text-sm text-muted-foreground"
              }
            >
              {entry.label}
            </button>
          ))}
        </div>
        <iframe
          key={sample.id}
          title={`${sample.label} email`}
          srcDoc={html}
          className="mt-4 h-[640px] w-full rounded-md border border-border bg-white"
        />
      </Showcase>

      <Showcase title="Plain text alternative" hint="Built from the same input, so the two never drift.">
        <pre className="overflow-x-auto rounded-md border border-border bg-muted p-4 font-mono text-xs whitespace-pre-wrap">
          {text}
        </pre>
      </Showcase>

      <CodeBlock
        code={`import { renderEmail } from "@pinchblock/ui/email"

const { html, text } = renderEmail({
  origin: "https://pinchblock.app",
  title: "Maya Rivera sent you 3 messages",
  paragraphs: ["She wrote while you were away."],
  quote: ["Saturday session moved to seven"],
  action: { href: threadUrl, label: "Open the conversation" },
  footerLinks: [{ href: settingsUrl, label: "Email settings" }],
  info: ["You get this because message emails are on."],
})`}
      />
    </div>
  )
}
