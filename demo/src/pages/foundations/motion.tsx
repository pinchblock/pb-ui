import { shared } from "../../../../src/tokens/index.ts"
import { CodeBlock, PageIntro, Showcase, VariantRow } from "../../sink/showcase.tsx"

/** TS token key to CSS custom property suffix (inOut -> in-out). */
function kebab(name: string): string {
  return name.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)
}

export default function MotionPage() {
  return (
    <div>
      <PageIntro
        title="Motion"
        description="Durations and easings are tokens, exactly like colors. Micro-interactions ride CSS transitions; springs, layout moves and exits go through Motion for React, still on token durations."
        use="Default pairing is duration-(--duration-fast) with ease-(--ease-out). Playful overshoot (--ease-spring) is reserved for B2C reward moments: streaks, PRs, reactions. Never for navigation. The base layer kills all CSS animation under prefers-reduced-motion; JS-driven animation must check it explicitly."
      />

      <Showcase title="Durations" hint="Hover a tile to preview. Values from src/tokens/shared.ts.">
        <VariantRow>
          {Object.entries(shared.motion.duration).map(([name, value]) => (
            <div key={name} className="group rounded-md border border-border px-4 py-3">
              <div
                className="mb-2 h-2 w-8 rounded-full bg-primary transition-transform ease-(--ease-out) group-hover:translate-x-16"
                style={{ transitionDuration: `var(--duration-${name})` }}
              />
              <p className="font-mono text-xs text-muted-foreground">
                --duration-{name} {value}
              </p>
            </div>
          ))}
        </VariantRow>
      </Showcase>

      <Showcase
        title="Easings"
        hint="Same distance, same duration, different curve. Out for entrances, in-out for moves, spring for reward moments."
      >
        <VariantRow>
          {Object.entries(shared.motion.ease).map(([name]) => (
            <div key={name} className="group rounded-md border border-border px-4 py-3">
              <div
                className="mb-2 h-2 w-8 rounded-full bg-primary transition-transform duration-(--duration-slower) group-hover:translate-x-16"
                style={{ transitionTimingFunction: `var(--ease-${kebab(name)})` }}
              />
              <p className="font-mono text-xs text-muted-foreground">--ease-{kebab(name)}</p>
            </div>
          ))}
        </VariantRow>
      </Showcase>

      <CodeBlock
        code={`
/* Micro-interactions: CSS transitions with token pairs. */
<button className="transition-colors duration-(--duration-fast) ease-(--ease-out)">

/* Springs and exits: Motion for React, durations still from tokens. */
import { shared } from "@pinchblock/ui/tokens"

const slow = parseFloat(shared.motion.duration.slow) / 1000 // 0.32

<motion.div
  initial={{ opacity: 0, y: 8 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: slow }}
/>
`}
      />
    </div>
  )
}
