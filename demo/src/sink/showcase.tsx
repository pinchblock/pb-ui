import { Check, Copy } from "@phosphor-icons/react"
import { useState, type ReactNode } from "react"

/**
 * Sink helper kit. Every component page composes these; do not
 * hand-roll page chrome (docs/GUARDRAILS.md, code shape).
 */

/** Page title block: name, one-line purpose, when-to-use guidance. */
export function PageIntro({
  title,
  description,
  use,
}: {
  title: string
  description: string
  /** One or two sentences: when to reach for it, when not to. */
  use?: string
}) {
  return (
    <header className="mb-8">
      <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
      <p className="mt-1 max-w-prose text-sm text-muted-foreground">{description}</p>
      {use ? (
        <p className="mt-3 max-w-prose border-l-2 border-primary-border pl-3 text-sm text-muted-foreground">
          {use}
        </p>
      ) : null}
    </header>
  )
}

/** Framed variant/state grid inside a card. */
export function Showcase({
  title,
  hint,
  children,
}: {
  title: string
  hint?: string
  children: ReactNode
}) {
  return (
    <div className="mb-8">
      <h3 className="mb-1 text-sm font-semibold text-foreground">{title}</h3>
      {hint ? <p className="mb-3 text-xs text-muted-foreground">{hint}</p> : <div className="mb-3" />}
      <div className="rounded-xl border border-border bg-card p-6">{children}</div>
    </div>
  )
}

/** Horizontal cluster of variants inside a Showcase. */
export function VariantRow({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap items-center gap-3">{children}</div>
}

/** A real-product use case, framed on the page background so it reads
 * as an app surface rather than a specimen. */
export function ExampleBlock({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: ReactNode
}) {
  return (
    <div className="mb-8">
      <h3 className="mb-1 text-sm font-semibold text-foreground">Example: {title}</h3>
      {description ? (
        <p className="mb-3 text-xs text-muted-foreground">{description}</p>
      ) : (
        <div className="mb-3" />
      )}
      <div className="rounded-xl border border-border-strong bg-background p-6">{children}</div>
    </div>
  )
}

/** Usage snippet with copy button. Plain text, no highlighter (KISS). */
export function CodeBlock({ code, title = "Usage" }: { code: string; title?: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <div className="mb-8">
      <div className="mb-1 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        <button
          type="button"
          onClick={() => {
            void navigator.clipboard.writeText(code).then(() => {
              setCopied(true)
              setTimeout(() => setCopied(false), 1500)
            })
          }}
          className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors duration-(--duration-fast) hover:bg-muted hover:text-foreground"
        >
          {copied ? <Check aria-hidden className="size-3.5 text-success" /> : <Copy aria-hidden className="size-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto rounded-xl border border-border bg-background-sunken p-4 font-mono text-xs leading-relaxed text-muted-foreground">
        <code>{code.trim()}</code>
      </pre>
    </div>
  )
}
