import { Barbell, EnvelopeSimple, Repeat } from "@phosphor-icons/react"

import { Button, Field, Input } from "@pinchblock/ui"
import { CodeBlock, ExampleBlock, PageIntro, Showcase } from "../../sink/showcase.tsx"

export default function InputPage() {
  return (
    <div>
      <PageIntro
        title="Input"
        description="The single-line text primitive. Base UI Input underneath, so inside a Field it picks up label association, description wiring and data-invalid for free."
        use="Use for any free-text or numeric entry; wrap in Field for label and error handling. For search boxes with clear and debounce, use SearchInput instead of rebuilding it here."
      />

      <Showcase title="Sizes" hint="sm h-8, md h-9 (default), lg h-10.">
        <div className="max-w-sm space-y-3">
          <Input size="sm" placeholder="Small" />
          <Input placeholder="Medium (default)" />
          <Input size="lg" placeholder="Large" />
        </div>
      </Showcase>

      <Showcase
        title="Adornments"
        hint="leading is non-interactive (clicks pass through to the input); trailing may hold a button or unit."
      >
        <div className="max-w-sm space-y-3">
          <Input leading={<EnvelopeSimple aria-hidden />} placeholder="With leading icon" />
          <Input
            leading={<Barbell aria-hidden />}
            trailing={<span className="text-xs">kg</span>}
            type="number"
            placeholder="Working weight"
          />
        </div>
      </Showcase>

      <Showcase
        title="States and native types"
        hint="Invalid via aria-invalid or a Field error. Native date and file types are styled by the same variants."
      >
        <div className="max-w-sm space-y-3">
          <Input aria-invalid defaultValue="not-an-email" aria-label="Invalid example" />
          <Input disabled placeholder="Disabled" />
          <Input type="date" aria-label="Session date" />
          <Input type="file" aria-label="Proof of certification" />
        </div>
      </Showcase>

      <ExampleBlock
        title="Log a set"
        description="Numeric inputs with unit adornments, the standard row when an athlete records weight and reps."
      >
        <form
          className="flex max-w-md flex-wrap items-end gap-3"
          onSubmit={(event) => event.preventDefault()}
        >
          <Field label="Weight" className="w-28">
            <Input
              type="number"
              min={0}
              step={2.5}
              defaultValue={80}
              trailing={<span className="text-xs">kg</span>}
              aria-label="Weight in kilograms"
            />
          </Field>
          <Field label="Reps" className="w-24">
            <Input type="number" min={1} defaultValue={5} leading={<Repeat aria-hidden />} />
          </Field>
          <Button type="submit">Add set</Button>
        </form>
      </ExampleBlock>

      <CodeBlock
        code={`
import { Field, Input } from "@pinchblock/ui"
import { Barbell } from "@phosphor-icons/react"

<Field label="Working weight">
  <Input
    type="number"
    leading={<Barbell aria-hidden />}
    trailing={<span className="text-xs">kg</span>}
  />
</Field>
`}
      />
    </div>
  )
}
