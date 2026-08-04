import { Kbd } from "../../../../src/components/ui/kbd.tsx"
import { CodeBlock, ExampleBlock, PageIntro, Showcase, VariantRow } from "../../sink/showcase.tsx"

const SHORTCUTS = [
  { action: "Log a session", keys: ["L"] },
  { action: "Search everything", keys: ["⌘", "K"] },
  { action: "Jump to today's training", keys: ["G", "T"] },
  { action: "Open shortcut help", keys: ["Shift", "?"] },
  { action: "Close any overlay", keys: ["Esc"] },
]

export default function KbdPage() {
  return (
    <div>
      <PageIntro
        title="Kbd"
        description="Keyboard key cap for shortcut hints. Compose multiple for combos; sits well inline in prose and inside TooltipContent."
        use="Hint at shortcuts next to the actions they trigger and in help surfaces. It is presentation only: the Kbd does not bind the key, your shortcut handler does."
      />

      <Showcase title="Keys and combos" hint="One Kbd per key; combos are just adjacent caps.">
        <VariantRow>
          <span className="flex items-center gap-1">
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </span>
          <span className="flex items-center gap-1">
            <Kbd>Shift</Kbd>
            <Kbd>?</Kbd>
          </span>
          <Kbd>Esc</Kbd>
          <Kbd>Enter</Kbd>
        </VariantRow>
      </Showcase>

      <Showcase title="Inline in prose" hint="Reads at text size; no extra wrapper needed.">
        <p className="max-w-prose text-sm text-muted-foreground">
          Press <Kbd>G</Kbd> <Kbd>T</Kbd> to jump to today's training, or <Kbd>⌘</Kbd>{" "}
          <Kbd>K</Kbd> to search everything.
        </p>
      </Showcase>

      <ExampleBlock
        title="Shortcut help"
        description="The list a Shift+? overlay would show: action on the left, keys on the right."
      >
        <div className="max-w-sm divide-y divide-border rounded-xl border border-border bg-card px-4">
          {SHORTCUTS.map(({ action, keys }) => (
            <div key={action} className="flex items-center justify-between gap-3 py-2.5">
              <span className="text-sm text-foreground">{action}</span>
              <span className="flex items-center gap-1">
                {keys.map((key) => (
                  <Kbd key={key}>{key}</Kbd>
                ))}
              </span>
            </div>
          ))}
        </div>
      </ExampleBlock>

      <CodeBlock
        code={`
import { Kbd } from "@pinchblock/ui"

<Kbd>Esc</Kbd>

// Combos are adjacent caps:
<span className="flex items-center gap-1">
  <Kbd>⌘</Kbd>
  <Kbd>K</Kbd>
</span>
`}
      />
    </div>
  )
}
