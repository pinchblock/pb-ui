import { emailSamples, renderEmail } from "@pinchblock/ui/email"
import { useMemo, useState } from "react"

import { CodeBlock, PageIntro, Showcase } from "../../sink/showcase.tsx"

type Scheme = "light" | "dark"
type Width = "desktop" | "phone"
type View = "rendered" | "text" | "source"

/**
 * The frame renders the mail in isolation. Client colour scheme is
 * forced rather than inherited, so both halves of the design can be
 * checked from one machine: the dark rules live in a media query that
 * the preview neutralises for the light view.
 */
function frameFor(html: string, scheme: Scheme): string {
  return scheme === "dark"
    ? html.replaceAll("prefers-color-scheme:dark", "prefers-color-scheme:no-preference")
    : html.replaceAll("prefers-color-scheme:dark", "prefers-color-scheme:never-match")
}

const schemes: { id: Scheme; label: string }[] = [
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
]
const widths: { id: Width; label: string; px: number }[] = [
  { id: "desktop", label: "Desktop", px: 680 },
  { id: "phone", label: "Phone", px: 390 },
]
const views: { id: View; label: string }[] = [
  { id: "rendered", label: "Rendered" },
  { id: "text", label: "Plain text" },
  { id: "source", label: "HTML source" },
]

function Choice<T extends string>({
  onSelect,
  options,
  value,
}: {
  onSelect: (value: T) => void
  options: { id: T; label: string }[]
  value: T
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          aria-pressed={option.id === value}
          onClick={() => onSelect(option.id)}
          className={
            option.id === value
              ? "rounded-full border border-border-strong bg-secondary px-3 py-1.5 text-sm font-medium"
              : "rounded-full border border-border px-3 py-1.5 text-sm text-muted-foreground"
          }
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

export default function EmailPage() {
  const [sampleId, setSampleId] = useState(emailSamples[0]!.id)
  const [scheme, setScheme] = useState<Scheme>("light")
  const [width, setWidth] = useState<Width>("desktop")
  const [view, setView] = useState<View>("rendered")

  const sample = emailSamples.find((entry) => entry.id === sampleId) ?? emailSamples[0]!
  const { html, text } = useMemo(() => renderEmail(sample.input), [sample])
  const frameWidth = widths.find((entry) => entry.id === width)!.px

  return (
    <div>
      <PageIntro
        title="Email"
        description="Every transactional mail the product sends, on one layout. The catalogue lives in the library (src/email/samples.ts), so a new kind of email appears here by adding a record rather than a page."
        use="renderEmail is framework-free, so a backend worker imports it without React: import { renderEmail } from '@pinchblock/ui/email'. It returns the HTML document and the matching plain text from one input. Colours come from the marquee brand surface and the turquoise light set, type from the shared stack and scale, corners from the one radius, and the action is a fully rounded button sized to its label."
      />

      <Showcase title="Catalogue" hint="Pick a mail, then check it in both colour schemes and at phone width.">
        <div className="flex flex-wrap gap-2">
          {emailSamples.map((entry) => (
            <button
              key={entry.id}
              type="button"
              aria-pressed={entry.id === sampleId}
              onClick={() => setSampleId(entry.id)}
              className={
                entry.id === sampleId
                  ? "rounded-full border border-border-strong bg-secondary px-4 py-2 text-sm font-medium"
                  : "rounded-full border border-border px-4 py-2 text-sm text-muted-foreground"
              }
            >
              {entry.label}
            </button>
          ))}
        </div>

        <div className="mt-4 rounded-md border border-border bg-muted p-4">
          <p className="text-sm">{sample.description}</p>
          <dl className="mt-3 grid grid-cols-[max-content_1fr] gap-x-4 gap-y-1 text-xs">
            <dt className="text-muted-foreground">Subject</dt>
            <dd className="font-mono">{sample.subject}</dd>
            <dt className="text-muted-foreground">Built in</dt>
            <dd className="font-mono break-all">{sample.builtIn}</dd>
          </dl>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-4">
          <Choice options={views} onSelect={setView} value={view} />
          {view === "rendered" ? (
            <>
              <Choice options={schemes} onSelect={setScheme} value={scheme} />
              <Choice options={widths} onSelect={setWidth} value={width} />
            </>
          ) : null}
        </div>

        {view === "rendered" ? (
          <div className="mt-4 flex justify-center rounded-md border border-border bg-background-sunken p-4">
            <iframe
              key={`${sample.id}-${scheme}-${width}`}
              title={`${sample.label}, ${scheme}`}
              srcDoc={frameFor(html, scheme)}
              style={{ width: frameWidth }}
              className="h-[680px] max-w-full rounded-md border border-border bg-white"
            />
          </div>
        ) : (
          <pre className="mt-4 max-h-[680px] overflow-auto rounded-md border border-border bg-muted p-4 font-mono text-xs whitespace-pre-wrap">
            {view === "text" ? text : html}
          </pre>
        )}
      </Showcase>

      <Showcase title="Blocks" hint="Every part is optional except the title, so one layout covers a receipt and a one-line notice.">
        <ul className="grid gap-2 text-sm md:grid-cols-2">
          <li><span className="font-medium">eyebrow</span> <span className="text-muted-foreground">a short line above the headline, sentence case</span></li>
          <li><span className="font-medium">title</span> <span className="text-muted-foreground">the headline, the one required field</span></li>
          <li><span className="font-medium">paragraphs</span> <span className="text-muted-foreground">body copy, one string per paragraph</span></li>
          <li><span className="font-medium">quote</span> <span className="text-muted-foreground">quoted lines, for message previews</span></li>
          <li><span className="font-medium">details</span> <span className="text-muted-foreground">label and value rows, one may carry the figure</span></li>
          <li><span className="font-medium">action</span> <span className="text-muted-foreground">one button, sized to its label</span></li>
          <li><span className="font-medium">actionNote</span> <span className="text-muted-foreground">a quiet caveat under the button</span></li>
          <li><span className="font-medium">fine</span> <span className="text-muted-foreground">reference identifiers in small print</span></li>
          <li><span className="font-medium">footerLinks</span> <span className="text-muted-foreground">the links area</span></li>
          <li><span className="font-medium">info</span> <span className="text-muted-foreground">the info area: why this arrived</span></li>
        </ul>
      </Showcase>

      <CodeBlock
        code={`import { emailSamples, renderEmail } from "@pinchblock/ui/email"

const { html, text } = renderEmail({
  origin: "https://pinchblock.app",
  eyebrow: "Payment received",
  title: "Your payment went through",
  paragraphs: ["Your coaching purchase is confirmed."],
  details: [
    { label: "Offering", value: "Twelve week strength block" },
    { label: "Amount", value: "149.00 EUR", emphasis: true },
  ],
  action: { href: transactionUrl, label: "View the transaction" },
  fine: [{ label: "Transaction", value: transactionId }],
  footerLinks: [{ href: billingUrl, label: "Payments and purchases" }],
  info: ["Pinchblock sends this whenever a payment settles."],
})

// Every mail the product sends is listed in emailSamples.`}
      />
    </div>
  )
}
