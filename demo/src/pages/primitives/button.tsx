import { CalendarPlus, Play, Trash } from "@phosphor-icons/react"
import { useState } from "react"

import { Button } from "@pinchblock/ui"
import { CodeBlock, ExampleBlock, PageIntro, Showcase, VariantRow } from "../../sink/showcase.tsx"

/**
 * Exemplar sink page: every component page follows this anatomy.
 * PageIntro, variant/state Showcases, one real ExampleBlock with
 * Pinchblock-flavored copy, one CodeBlock. Keep pages under ~300
 * lines; split extras into sibling pages instead of growing this one.
 */
export default function ButtonPage() {
  const [loading, setLoading] = useState(false)

  return (
    <div>
      <PageIntro
        title="Button"
        description="The action primitive. Base UI Button underneath: disabled semantics, focus behavior and render-prop polymorphism come free."
        use="Primary for the one main action per view. Secondary and ghost for everything else. Destructive only for irreversible actions, always paired with ConfirmDialog. Pill shape is for marketing CTAs, not app chrome."
      />

      <Showcase title="Variants">
        <VariantRow>
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="soft">Soft</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="destructive-soft">Destructive soft</Button>
          <Button variant="link">Link</Button>
        </VariantRow>
      </Showcase>

      <Showcase title="Sizes" hint="Heights ride the density knob; try it in the top bar.">
        <VariantRow>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button size="xl">Extra large</Button>
          <Button size="icon" aria-label="Start session">
            <Play />
          </Button>
        </VariantRow>
      </Showcase>

      <Showcase title="States">
        <VariantRow>
          <Button disabled>Disabled</Button>
          <Button loading>Saving</Button>
          <Button
            loading={loading}
            onClick={() => {
              setLoading(true)
              setTimeout(() => setLoading(false), 1500)
            }}
          >
            Click to load
          </Button>
          <Button pill>Pill CTA</Button>
        </VariantRow>
      </Showcase>

      <Showcase title="With icons" hint="Icons inherit the global weight from IconContext.">
        <VariantRow>
          <Button>
            <CalendarPlus /> Schedule session
          </Button>
          <Button variant="destructive-soft">
            <Trash /> Remove exercise
          </Button>
        </VariantRow>
      </Showcase>

      <ExampleBlock
        title="Session card actions"
        description="Primary action plus quiet secondary, the standard pairing on plan and session cards."
      >
        <div className="flex max-w-md flex-col gap-4 rounded-xl border border-border bg-card p-4">
          <div>
            <p className="font-medium text-card-foreground">Fingerboard: max hangs</p>
            <p className="text-sm text-muted-foreground">Week 3, day 2. 6 sets planned.</p>
          </div>
          <div className="flex gap-2">
            <Button>
              <Play /> Start session
            </Button>
            <Button variant="ghost">Skip today</Button>
          </div>
        </div>
      </ExampleBlock>

      <CodeBlock
        code={`
import { Button } from "@pinchblock/ui"

<Button onClick={start}>
  <Play /> Start session
</Button>
<Button variant="ghost">Skip today</Button>

// Link styled as a button (Base UI render prop):
<Button render={<a href="/plan" />}>View plan</Button>
`}
      />
    </div>
  )
}
