import * as PhosphorIcons from "@phosphor-icons/react"
import type { Icon } from "@phosphor-icons/react"
import { useState } from "react"

import { Badge, SearchInput, toast, Toaster } from "@pinchblock/ui"
import manifest from "../../icon-manifest.json"
import { CodeBlock, PageIntro, Showcase } from "../../sink/showcase.tsx"

/**
 * Every Phosphor icon the system and sink actually import, from the
 * generated manifest (npm run gen). Icons render live, so the global
 * weight toggle in the top bar restyles this whole page.
 */

interface ManifestIcon {
  name: string
  library: number
  sink: number
}

const ICONS = (manifest as { icons: ManifestIcon[] }).icons

function IconCell({ entry }: { entry: ManifestIcon }) {
  const Component = (PhosphorIcons as unknown as Record<string, Icon>)[entry.name]
  if (!Component) return null
  return (
    <button
      type="button"
      title={`Copy "${entry.name}"`}
      onClick={() => {
        void navigator.clipboard.writeText(entry.name).then(() => {
          toast.success(`Copied ${entry.name}`)
        })
      }}
      className="flex flex-col items-center gap-2 rounded-lg border border-border p-3 transition-colors duration-(--duration-fast) hover:border-primary-border hover:bg-muted"
    >
      <Component className="size-6 text-foreground" aria-hidden />
      <span className="max-w-full truncate font-mono text-xs text-muted-foreground">
        {entry.name}
      </span>
      <span className="flex gap-1">
        {entry.library > 0 && <Badge tone="primary" size="sm">{`lib ${entry.library}`}</Badge>}
        {entry.sink > 0 && <Badge tone="neutral" size="sm">{`sink ${entry.sink}`}</Badge>}
      </span>
    </button>
  )
}

export default function IconsPage() {
  const [query, setQuery] = useState("")
  const q = query.trim().toLowerCase()
  const visible = q ? ICONS.filter((i) => i.name.toLowerCase().includes(q)) : ICONS

  return (
    <div>
      <Toaster />
      <PageIntro
        title="Icons in use"
        description={`The ${ICONS.length} Phosphor icons the library and sink import today, from the generated manifest (demo/src/icon-manifest.json, refreshed by npm run gen). Click an icon to copy its name.`}
        use="Phosphor only (AGENTS.md rule 6). Never set per-icon weights in library code; the consumer's IconContext owns weight globally. Flip the Icons control in the top bar: this entire page follows. Counts show how many files import each icon (lib = src/, sink = demo/src/)."
      />

      <Showcase
        title="Manifest"
        hint="Filter by name; the badge counts are import sites, a proxy for how load-bearing an icon is."
      >
        <div className="mb-4 max-w-sm">
          <SearchInput
            size="sm"
            placeholder={`Filter ${ICONS.length} icons`}
            aria-label="Filter icons"
            value={query}
            onValueChange={setQuery}
          />
        </div>
        {visible.length === 0 ? (
          <p className="text-sm text-muted-foreground">No icon matches "{query}"</p>
        ) : (
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6">
            {visible.map((entry) => (
              <IconCell key={entry.name} entry={entry} />
            ))}
          </div>
        )}
      </Showcase>

      <CodeBlock
        code={`
import { Barbell, Flame } from "@phosphor-icons/react"

// Library code: no weight prop; IconContext owns it globally.
<Barbell className="size-4" />

// Regenerate the manifest after adding icons:
// npm run gen   (checked in CI via npm run gen:check)
`}
      />
    </div>
  )
}
