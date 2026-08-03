import type { ReactNode } from "react"

/** Consistent chrome for a showcase block inside a sink section. */
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
