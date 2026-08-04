import { useState } from "react"

import { Button } from "../../../../src/components/ui/button.tsx"
import { Field } from "../../../../src/components/ui/field.tsx"
import { NumberField } from "../../../../src/components/ui/number-field.tsx"
import { CodeBlock, ExampleBlock, PageIntro, Showcase } from "../../sink/showcase.tsx"

export default function NumberFieldPage() {
  const [reps, setReps] = useState<number | null>(5)
  const [weight, setWeight] = useState<number | null>(80)
  const [rpe, setRpe] = useState<number | null>(8)

  return (
    <div>
      <PageIntro
        title="NumberField"
        description="Numeric entry with stepper buttons. Base UI NumberField underneath: locale-aware parsing and formatting, arrow-key stepping, clamping, and Field integration come free."
        use="Use wherever a number is edited in small steps: sets, reps, weights, RPE. For free-form numbers without stepping (a phone number, a year), plain Input is enough. For bounded scales picked by feel, use Slider."
      />

      <Showcase title="Sizes" hint="sm h-8, md h-9 (default). Stepper buttons keep a w-9 touch target in both sizes.">
        <div className="max-w-xs space-y-3">
          <NumberField size="sm" defaultValue={3} min={0} aria-label="Sets (small)" />
          <NumberField defaultValue={3} min={0} aria-label="Sets (medium)" />
        </div>
      </Showcase>

      <Showcase
        title="Format"
        hint="format takes Intl.NumberFormatOptions: units and currencies parse and round-trip while the value stays a plain number."
      >
        <div className="max-w-xs space-y-3">
          <NumberField
            defaultValue={82.5}
            min={0}
            step={2.5}
            format={{ style: "unit", unit: "kilogram", maximumFractionDigits: 1 }}
            aria-label="Weight in kilograms"
          />
          <NumberField
            defaultValue={49}
            min={0}
            format={{ style: "currency", currency: "EUR" }}
            aria-label="Monthly plan price"
          />
        </div>
      </Showcase>

      <Showcase
        title="Steps and limits"
        hint="min/max clamp, step drives the buttons and arrow keys, shift+arrow steps by largeStep, Home/End jump to the limits."
      >
        <div className="max-w-xs">
          <NumberField
            defaultValue={80}
            min={0}
            max={300}
            step={2.5}
            largeStep={10}
            aria-label="Working weight"
          />
        </div>
      </Showcase>

      <Showcase
        title="States"
        hint="Invalid via aria-invalid here or automatically under a Field with an error. Disabled and read-only ride the group."
      >
        <div className="max-w-xs space-y-3">
          <NumberField defaultValue={999} aria-invalid aria-label="Invalid example" />
          <NumberField defaultValue={12} disabled aria-label="Disabled example" />
          <Field label="Rest between sets" error="Rest must be 3 minutes or less.">
            <NumberField defaultValue={5} min={0} max={3} />
          </Field>
        </div>
      </Showcase>

      <Showcase
        title="Scrub area"
        hint="scrub adds a pointer-drag handle (drag it sideways). Pointer-only affordance; keyboard stepping is unchanged. Off by default."
      >
        <div className="max-w-xs">
          <NumberField scrub defaultValue={120} min={0} step={5} aria-label="Hang duration in seconds" />
        </div>
      </Showcase>

      <ExampleBlock
        title="Log a set"
        description="The sets/reps/weight editor row: steppers sized for mid-session thumbs, RPE in half steps."
      >
        <form
          className="flex max-w-lg flex-wrap items-end gap-3"
          onSubmit={(event) => event.preventDefault()}
        >
          <Field label="Reps" className="w-32">
            <NumberField value={reps} onValueChange={setReps} min={1} max={50} />
          </Field>
          <Field label="Weight" className="w-40">
            <NumberField
              value={weight}
              onValueChange={setWeight}
              min={0}
              step={2.5}
              largeStep={10}
              format={{ style: "unit", unit: "kilogram", maximumFractionDigits: 1 }}
            />
          </Field>
          <Field label="RPE" hint="6 to 10, half steps." className="w-32">
            <NumberField value={rpe} onValueChange={setRpe} min={6} max={10} step={0.5} />
          </Field>
          <Button type="submit">Add set</Button>
        </form>
      </ExampleBlock>

      <CodeBlock
        code={`
import { Field, NumberField } from "@pinchblock/ui"

<Field label="Weight">
  <NumberField
    value={weight}
    onValueChange={setWeight}
    min={0}
    step={2.5}
    largeStep={10}
    format={{ style: "unit", unit: "kilogram", maximumFractionDigits: 1 }}
  />
</Field>

// Standalone: name it yourself; invalid paints the border destructive.
<NumberField aria-label="Reps" aria-invalid={reps == null} min={1} />
`}
      />
    </div>
  )
}
