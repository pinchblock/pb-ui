import {
  Field,
  Select,
  SelectGroup,
  SelectGroupLabel,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
  SimpleSelect,
} from "@pinchblock/ui"
import { CodeBlock, ExampleBlock, PageIntro, Showcase } from "../../sink/showcase.tsx"

const DISCIPLINES = [
  { value: "bouldering", label: "Bouldering" },
  { value: "sport", label: "Sport climbing" },
  { value: "strength", label: "Strength" },
  { value: "endurance", label: "Endurance" },
  { value: "mobility", label: "Mobility", disabled: true },
]

const DURATIONS = [
  { value: "45", label: "45 minutes" },
  { value: "60", label: "60 minutes" },
  { value: "90", label: "90 minutes" },
  { value: "120", label: "2 hours" },
]

export default function SelectPage() {
  return (
    <div>
      <PageIntro
        title="Select"
        description="Base UI Select family: trigger reads like an Input, popup on bg-popover with shadow-overlay. SimpleSelect covers the flat options-array case with one prop; the compound Select.* parts unlock groups and custom item content."
        use="Reach for SimpleSelect first; drop to compound parts only when you need groups or rich items. For four or fewer always-visible options, consider SegmentedControl or RadioGroup instead."
      />

      <Showcase title="SimpleSelect sizes" hint="Same height scale as Input: sm h-8, md h-9, lg h-10.">
        <div className="max-w-sm space-y-3">
          <SimpleSelect size="sm" options={DISCIPLINES} placeholder="Small" />
          <SimpleSelect options={DISCIPLINES} placeholder="Medium (default)" />
          <SimpleSelect size="lg" options={DISCIPLINES} placeholder="Large" />
        </div>
      </Showcase>

      <Showcase title="States" hint="Disabled trigger, and invalid styling inherited from a Field error.">
        <div className="max-w-sm space-y-3">
          <SimpleSelect options={DISCIPLINES} placeholder="Disabled" disabled />
          <Field label="Main discipline" error="Pick a discipline to continue.">
            <SimpleSelect options={DISCIPLINES} placeholder="Invalid inside Field" />
          </Field>
        </div>
      </Showcase>

      <Showcase
        title="Compound parts"
        hint="Groups, group labels and custom item content via Select.* parts. items on the root keeps the trigger label in sync."
      >
        <div className="max-w-sm">
          <Select
            items={[
              { value: "fingerboard", label: "Fingerboard" },
              { value: "campus", label: "Campus board" },
              { value: "deadlift", label: "Deadlift" },
              { value: "squat", label: "Back squat" },
            ]}
            defaultValue="deadlift"
          >
            <SelectTrigger aria-label="Exercise">
              <SelectValue />
            </SelectTrigger>
            <SelectPopup>
              <SelectGroup>
                <SelectGroupLabel>Climbing</SelectGroupLabel>
                <SelectItem trailing="12 plans" value="fingerboard">Fingerboard</SelectItem>
                <SelectItem trailing="4 plans" value="campus">Campus board</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectGroupLabel>Strength</SelectGroupLabel>
                <SelectItem value="deadlift">Deadlift</SelectItem>
                <SelectItem value="squat">Back squat</SelectItem>
              </SelectGroup>
            </SelectPopup>
          </Select>
        </div>
      </Showcase>

      <ExampleBlock
        title="Session defaults"
        description="Plan builder settings row: two SimpleSelects inside Fields, labelled and wired automatically."
      >
        <div className="grid max-w-md gap-4 sm:grid-cols-2">
          <Field label="Discipline" hint="Applied to new sessions.">
            <SimpleSelect options={DISCIPLINES} defaultValue="bouldering" />
          </Field>
          <Field label="Default duration">
            <SimpleSelect options={DURATIONS} defaultValue="90" />
          </Field>
        </div>
      </ExampleBlock>

      <CodeBlock
        code={`
import { Field, SimpleSelect } from "@pinchblock/ui"

<Field label="Main discipline">
  <SimpleSelect
    options={[
      { value: "bouldering", label: "Bouldering" },
      { value: "sport", label: "Sport climbing" },
    ]}
    placeholder="Pick a discipline"
    onValueChange={setDiscipline}
  />
</Field>

// Groups need the compound parts:
// Select, SelectTrigger, SelectValue, SelectPopup,
// SelectGroup, SelectGroupLabel, SelectItem
`}
      />
    </div>
  )
}
