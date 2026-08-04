import { EnvelopeSimple, User } from "@phosphor-icons/react"
import { useState } from "react"

import { Button } from "../../../../src/components/ui/button.tsx"
import { Checkbox } from "../../../../src/components/ui/checkbox.tsx"
import { Field } from "../../../../src/components/ui/field.tsx"
import { Input } from "../../../../src/components/ui/input.tsx"
import { Label } from "../../../../src/components/ui/label.tsx"
import { SimpleSelect } from "../../../../src/components/ui/select.tsx"
import { Switch } from "../../../../src/components/ui/switch.tsx"
import { Textarea } from "../../../../src/components/ui/textarea.tsx"
import { CodeBlock, ExampleBlock, PageIntro, Showcase, VariantRow } from "../../sink/showcase.tsx"

const DISCIPLINES = [
  { value: "bouldering", label: "Bouldering" },
  { value: "sport", label: "Sport climbing" },
  { value: "strength", label: "Strength" },
  { value: "endurance", label: "Endurance" },
  { value: "mobility", label: "Mobility", disabled: true },
]

function CoachApplication() {
  const [pitch, setPitch] = useState("")
  return (
    <form className="max-w-md space-y-5" onSubmit={(event) => event.preventDefault()}>
      <Field label="Full name" required>
        <Input leading={<User aria-hidden />} placeholder="Maria Kask" autoComplete="name" />
      </Field>
      <Field label="Email" required hint="We only use this for your application.">
        <Input type="email" leading={<EnvelopeSimple aria-hidden />} placeholder="maria@example.com" />
      </Field>
      <Field label="Main discipline" required>
        <SimpleSelect options={DISCIPLINES} placeholder="Pick a discipline" />
      </Field>
      <Field label="Years coaching" error="Required to review your application.">
        <Input type="number" min={0} placeholder="0" />
      </Field>
      <Field
        label="Why Pinchblock?"
        hint="One or two sentences is plenty."
        count={pitch.length}
        max={240}
      >
        <Textarea
          autoGrow
          maxLength={240}
          value={pitch}
          onChange={(event) => setPitch(event.target.value)}
          placeholder="I coach a 20-athlete youth squad and want their sessions in one place."
        />
      </Field>
      <span className="flex items-center gap-2">
        <Checkbox id="field-app-terms" required />
        <Label htmlFor="field-app-terms">I hold a current coaching certification</Label>
      </span>
      <div className="flex items-center justify-between rounded-lg border border-border bg-background-raised px-3 py-2.5">
        <Label htmlFor="field-app-updates">Email me about my application</Label>
        <Switch id="field-app-updates" defaultChecked />
      </div>
      <div className="flex gap-2">
        <Button type="submit" className="flex-1">
          Submit application
        </Button>
        <Button type="button" variant="secondary">
          Save draft
        </Button>
      </div>
    </form>
  )
}

export default function FieldPage() {
  const [bio, setBio] = useState("Coaching finger strength since 2019.")
  return (
    <div>
      <PageIntro
        title="Field"
        description="THE form-row molecule: label + control slot + hint + error (role=alert) + optional character counter. Composes Base UI Field, so any control placed inside is automatically labelled and described. Covers Label too, the standalone form label for controls outside a Field."
        use="Wrap every form row in a Field; never hand-wire label htmlFor + aria-describedby yourself. Reach for standalone Label only next to bare Checkbox, Switch or Radio rows."
      />

      <Showcase
        title="Anatomy"
        hint="Label, hint, required marker, error and counter. The error slot also surfaces Base UI validation errors automatically when no error prop is set."
      >
        <div className="grid max-w-2xl gap-6 sm:grid-cols-2">
          <Field label="Session title" hint="Visible to your athletes.">
            <Input placeholder="Limit bouldering" />
          </Field>
          <Field label="Email" required error="Enter a valid email address.">
            <Input type="email" defaultValue="maria@" />
          </Field>
          <Field
            className="sm:col-span-2"
            label="Coach bio"
            hint="Shown on your public profile."
            count={bio.length}
            max={160}
          >
            <Textarea
              autoGrow
              maxLength={160}
              value={bio}
              onChange={(event) => setBio(event.target.value)}
            />
          </Field>
        </div>
      </Showcase>

      <Showcase
        title="Standalone Label"
        hint="Same styles as Field's built-in label; associate via htmlFor. Dims automatically next to a disabled peer control."
      >
        <VariantRow>
          <span className="flex items-center gap-2">
            <Checkbox id="field-label-cb" defaultChecked />
            <Label htmlFor="field-label-cb">Warm-up done</Label>
          </span>
          <span className="flex items-center gap-2">
            <Switch id="field-label-sw" />
            <Label htmlFor="field-label-sw">Session reminders</Label>
          </span>
        </VariantRow>
      </Showcase>

      <ExampleBlock
        title="Coach application"
        description="Every form primitive composed through Field: inputs, select, textarea with counter, plus standalone Labels for the checkbox and switch rows."
      >
        <CoachApplication />
      </ExampleBlock>

      <CodeBlock
        code={`
import { Field, Input, Label, Checkbox } from "@pinchblock/ui"

<Field label="Session title" hint="Visible to your athletes." required>
  <Input placeholder="Limit bouldering" />
</Field>

// Error from a form lib or the server:
<Field label="Email" error={errors.email?.message}>
  <Input type="email" />
</Field>

// Standalone Label for a bare control:
<Checkbox id="terms" />
<Label htmlFor="terms">I hold a current coaching certification</Label>
`}
      />
    </div>
  )
}
