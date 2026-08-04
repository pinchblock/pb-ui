import { useState } from "react"

import { Button } from "../../../../src/components/ui/button.tsx"
import { Label } from "../../../../src/components/ui/label.tsx"
import { Slider } from "../../../../src/components/ui/slider.tsx"
import { CodeBlock, ExampleBlock, PageIntro, Showcase } from "../../sink/showcase.tsx"

export default function SliderPage() {
  const [effort, setEffort] = useState(7)
  const [zone, setZone] = useState<readonly number[]>([120, 155])
  const [rpe, setRpe] = useState(8)
  return (
    <div>
      <PageIntro
        title="Slider"
        description="Base UI Slider with primary track fill; the Pinchblock effort-1-to-10 control. An array value renders a range slider with one thumb per entry."
        use="Use for bounded scales where the position itself carries meaning (effort, RPE, heart-rate zones). Always show the current value next to the label; give every thumb an accessible name via aria-label or getThumbAriaLabel."
      />

      <Showcase title="Single value" hint="Pair with a Label and a tabular-nums value readout.">
        <div className="max-w-md">
          <div className="mb-1 flex items-center justify-between">
            <Label>Effort</Label>
            <span className="text-sm font-semibold text-primary tabular-nums">{effort}/10</span>
          </div>
          <Slider
            aria-label="Effort"
            min={1}
            max={10}
            value={effort}
            onValueChange={(value) => setEffort(value as number)}
          />
        </div>
      </Showcase>

      <Showcase title="Range" hint="Array values render one thumb per entry; name each via getThumbAriaLabel.">
        <div className="max-w-md">
          <div className="mb-1 flex items-center justify-between">
            <Label>Heart-rate zone</Label>
            <span className="text-sm text-muted-foreground tabular-nums">
              {zone[0]} to {zone[1]} bpm
            </span>
          </div>
          <Slider
            aria-label="Heart-rate zone"
            getThumbAriaLabel={(index) => (index === 0 ? "Zone lower bound" : "Zone upper bound")}
            min={80}
            max={200}
            value={zone}
            onValueChange={(value) => setZone(value as readonly number[])}
          />
        </div>
      </Showcase>

      <Showcase title="Disabled">
        <div className="max-w-md">
          <Label className="mb-1">Disabled</Label>
          <Slider aria-label="Disabled example" defaultValue={4} min={1} max={10} disabled />
        </div>
      </Showcase>

      <ExampleBlock
        title="Rate a set"
        description="RPE capture right after a max-hang set; the readout keeps the number honest while the thumb does the feel."
      >
        <div className="max-w-sm space-y-4 rounded-xl border border-border bg-card p-4">
          <div>
            <p className="text-sm font-semibold text-card-foreground">Max hangs, 20 mm edge</p>
            <p className="text-xs text-muted-foreground">Set 4 of 6, +12 kg, 7 seconds</p>
          </div>
          <div>
            <div className="mb-1 flex items-center justify-between">
              <Label>RPE</Label>
              <span className="text-sm font-semibold text-primary tabular-nums">{rpe}/10</span>
            </div>
            <Slider
              aria-label="Rate of perceived exertion"
              min={1}
              max={10}
              value={rpe}
              onValueChange={(value) => setRpe(value as number)}
            />
          </div>
          <Button size="sm" className="w-full">
            Save set
          </Button>
        </div>
      </ExampleBlock>

      <CodeBlock
        code={`
import { Slider } from "@pinchblock/ui"

<Slider
  aria-label="Effort"
  min={1}
  max={10}
  value={effort}
  onValueChange={(v) => setEffort(v as number)}
/>

// Range: pass an array, name each thumb
<Slider
  getThumbAriaLabel={(i) => (i === 0 ? "Lower bound" : "Upper bound")}
  min={80}
  max={200}
  value={[low, high]}
  onValueChange={(v) => setZone(v as readonly number[])}
/>
`}
      />
    </div>
  )
}
