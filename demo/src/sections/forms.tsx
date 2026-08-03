import { useState } from "react"
import {
  Bike,
  CalendarDays,
  Dumbbell,
  Mail,
  Mountain,
  User,
  Users,
} from "lucide-react"

import { Button } from "../../../src/components/ui/button.tsx"
import { Checkbox } from "../../../src/components/ui/checkbox.tsx"
import { Field } from "../../../src/components/ui/field.tsx"
import { ChipGroup, FilterChip } from "../../../src/components/ui/filter-chip.tsx"
import { Input } from "../../../src/components/ui/input.tsx"
import { Label } from "../../../src/components/ui/label.tsx"
import { RadioCard } from "../../../src/components/ui/radio-card.tsx"
import { Radio, RadioGroup } from "../../../src/components/ui/radio-group.tsx"
import { SearchInput } from "../../../src/components/ui/search-input.tsx"
import {
  SegmentedControl,
  SegmentedControlItem,
} from "../../../src/components/ui/segmented-control.tsx"
import {
  Select,
  SelectGroup,
  SelectGroupLabel,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
  SimpleSelect,
} from "../../../src/components/ui/select.tsx"
import { Slider } from "../../../src/components/ui/slider.tsx"
import { Switch } from "../../../src/components/ui/switch.tsx"
import { Textarea } from "../../../src/components/ui/textarea.tsx"
import type { SinkSection } from "./types.ts"
import { Showcase, VariantRow } from "./section-shell.tsx"

const DISCIPLINES = [
  { value: "bouldering", label: "Bouldering" },
  { value: "sport", label: "Sport climbing" },
  { value: "strength", label: "Strength" },
  { value: "endurance", label: "Endurance" },
  { value: "mobility", label: "Mobility", disabled: true },
]

function FieldAnatomy() {
  const [bio, setBio] = useState("Coaching finger strength since 2019.")
  return (
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
  )
}

function SearchDemo() {
  const [debounced, setDebounced] = useState("")
  return (
    <div className="max-w-sm space-y-2">
      <SearchInput placeholder="Search coaches, gyms, plans" onDebouncedChange={setDebounced} />
      <p className="text-xs text-muted-foreground">
        Debounced query (250 ms): <span className="font-mono">{debounced || "(empty)"}</span>
      </p>
    </div>
  )
}

function CheckboxRow() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <span className="flex items-center gap-2">
        <Checkbox id="fx-cb-off" />
        <Label htmlFor="fx-cb-off">Warm-up done</Label>
      </span>
      <span className="flex items-center gap-2">
        <Checkbox id="fx-cb-on" defaultChecked />
        <Label htmlFor="fx-cb-on">Cool-down done</Label>
      </span>
      <span className="flex items-center gap-2">
        <Checkbox id="fx-cb-ind" indeterminate />
        <Label htmlFor="fx-cb-ind">Some drills done</Label>
      </span>
      <span className="flex items-center gap-2">
        <Checkbox id="fx-cb-dis" disabled />
        <Label htmlFor="fx-cb-dis">Disabled</Label>
      </span>
      <span className="flex items-center gap-2">
        <Checkbox id="fx-cb-dis-on" disabled defaultChecked />
        <Label htmlFor="fx-cb-dis-on">Disabled checked</Label>
      </span>
    </div>
  )
}

function SwitchRow() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <span className="flex items-center gap-2">
        <Switch id="fx-sw-md" />
        <Label htmlFor="fx-sw-md">Session reminders</Label>
      </span>
      <span className="flex items-center gap-2">
        <Switch id="fx-sw-on" defaultChecked />
        <Label htmlFor="fx-sw-on">Streak alerts</Label>
      </span>
      <span className="flex items-center gap-2">
        <Switch id="fx-sw-sm" size="sm" defaultChecked />
        <Label htmlFor="fx-sw-sm">Small</Label>
      </span>
      <span className="flex items-center gap-2">
        <Switch id="fx-sw-dis" disabled />
        <Label htmlFor="fx-sw-dis">Disabled</Label>
      </span>
      <span className="flex items-center gap-2">
        <Switch id="fx-sw-dis-on" disabled defaultChecked />
        <Label htmlFor="fx-sw-dis-on">Disabled on</Label>
      </span>
    </div>
  )
}

function RadioRows() {
  return (
    <div className="grid gap-8 sm:grid-cols-2">
      <RadioGroup defaultValue="4x" aria-label="Training frequency">
        <span className="flex items-center gap-2">
          <Radio id="fx-r-3x" value="3x" />
          <Label htmlFor="fx-r-3x">3 sessions / week</Label>
        </span>
        <span className="flex items-center gap-2">
          <Radio id="fx-r-4x" value="4x" />
          <Label htmlFor="fx-r-4x">4 sessions / week</Label>
        </span>
        <span className="flex items-center gap-2">
          <Radio id="fx-r-5x" value="5x" disabled />
          <Label htmlFor="fx-r-5x">5 sessions / week (coach plan only)</Label>
        </span>
      </RadioGroup>
      <RadioGroup
        defaultValue="coach"
        aria-label="Account role"
        className="gap-3"
      >
        <RadioCard value="athlete">
          <span className="flex items-center gap-2 font-medium">
            <User aria-hidden className="size-4" /> Athlete
          </span>
          <span className="mt-1 block text-xs text-muted-foreground">
            Follow plans, log sessions, track streaks and PRs.
          </span>
        </RadioCard>
        <RadioCard value="coach">
          <span className="flex items-center gap-2 font-medium">
            <Users aria-hidden className="size-4" /> Coach
          </span>
          <span className="mt-1 block text-xs text-muted-foreground">
            Build plans, manage a roster, review athlete sessions.
          </span>
        </RadioCard>
        <RadioCard value="gym" disabled>
          <span className="flex items-center gap-2 font-medium">
            <Mountain aria-hidden className="size-4" /> Gym (coming soon)
          </span>
          <span className="mt-1 block text-xs text-muted-foreground">
            Manage walls, setters and community events.
          </span>
        </RadioCard>
      </RadioGroup>
    </div>
  )
}

function SliderDemo() {
  const [effort, setEffort] = useState(7)
  const [zone, setZone] = useState<readonly number[]>([120, 155])
  return (
    <div className="max-w-md space-y-8">
      <div>
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
      <div>
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
      <div>
        <Label className="mb-1">Disabled</Label>
        <Slider aria-label="Disabled example" defaultValue={4} min={1} max={10} disabled />
      </div>
    </div>
  )
}

function SegmentedDemo() {
  const [period, setPeriod] = useState("week")
  return (
    <div className="space-y-4">
      <VariantRow>
        <SegmentedControl value={period} onValueChange={setPeriod} aria-label="Stats period">
          <SegmentedControlItem value="week">Week</SegmentedControlItem>
          <SegmentedControlItem value="month">Month</SegmentedControlItem>
          <SegmentedControlItem value="year">Year</SegmentedControlItem>
        </SegmentedControl>
        <SegmentedControl size="sm" defaultValue="athlete" aria-label="Sign up as">
          <SegmentedControlItem value="athlete">Athlete</SegmentedControlItem>
          <SegmentedControlItem value="coach">Coach</SegmentedControlItem>
        </SegmentedControl>
      </VariantRow>
      <VariantRow>
        <SegmentedControl defaultValue="climb" aria-label="Discipline">
          <SegmentedControlItem value="climb">
            <Mountain aria-hidden /> Climb
          </SegmentedControlItem>
          <SegmentedControlItem value="lift">
            <Dumbbell aria-hidden /> Lift
          </SegmentedControlItem>
          <SegmentedControlItem value="ride" disabled>
            <Bike aria-hidden /> Ride
          </SegmentedControlItem>
        </SegmentedControl>
      </VariantRow>
    </div>
  )
}

function ChipsDemo() {
  const [sports, setSports] = useState<string[]>(["bouldering", "strength"])
  return (
    <div className="space-y-5">
      <div>
        <p className="eyebrow mb-2">Single select (explore filter)</p>
        <ChipGroup defaultValue={["all"]} aria-label="Explore filter">
          <FilterChip value="all">All</FilterChip>
          <FilterChip value="coaches" count={24}>
            Coaches
          </FilterChip>
          <FilterChip value="plans" count={112}>
            Plans
          </FilterChip>
          <FilterChip value="gyms" count={8}>
            Gyms
          </FilterChip>
        </ChipGroup>
      </div>
      <div>
        <p className="eyebrow mb-2">Multi select (waitlist sports)</p>
        <ChipGroup
          multiple
          value={sports}
          onValueChange={setSports}
          aria-label="Your sports"
        >
          <FilterChip value="bouldering">Bouldering</FilterChip>
          <FilterChip value="sport">Sport climbing</FilterChip>
          <FilterChip value="strength">Strength</FilterChip>
          <FilterChip value="endurance">Endurance</FilterChip>
          <FilterChip value="mobility" disabled>
            Mobility
          </FilterChip>
        </ChipGroup>
        <p className="mt-2 text-xs text-muted-foreground">
          Selected: {sports.length > 0 ? sports.join(", ") : "none"}
        </p>
      </div>
      <div>
        <p className="eyebrow mb-2">Sizes and standalone</p>
        <VariantRow>
          <FilterChip size="sm" defaultPressed>
            Small pressed
          </FilterChip>
          <FilterChip size="sm">Small</FilterChip>
          <FilterChip defaultPressed count={31}>
            Medium pressed
          </FilterChip>
          <FilterChip disabled>Disabled</FilterChip>
        </VariantRow>
      </div>
    </div>
  )
}

function CoachApplication() {
  const [pitch, setPitch] = useState("")
  return (
    <form
      className="max-w-md space-y-5"
      onSubmit={(event) => event.preventDefault()}
    >
      <Field label="Full name" required>
        <Input leading={<User aria-hidden />} placeholder="Maria Kask" autoComplete="name" />
      </Field>
      <Field label="Email" required hint="We only use this for your application.">
        <Input type="email" leading={<Mail aria-hidden />} placeholder="maria@example.com" />
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
        <Checkbox id="fx-app-terms" required />
        <Label htmlFor="fx-app-terms">I hold a current coaching certification</Label>
      </span>
      <div className="flex items-center justify-between rounded-lg border border-border bg-background-raised px-3 py-2.5">
        <Label htmlFor="fx-app-updates">Email me about my application</Label>
        <Switch id="fx-app-updates" defaultChecked />
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

const FEELS = [
  { value: "1", label: "Rough" },
  { value: "2", label: "Meh" },
  { value: "3", label: "OK" },
  { value: "4", label: "Good" },
  { value: "5", label: "Great" },
]

function LogSession() {
  const [effort, setEffort] = useState(6)
  const [feel, setFeel] = useState("4")
  return (
    <div className="max-w-md space-y-5 rounded-xl border border-border bg-background-raised p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-foreground">Tuesday: Limit bouldering</p>
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <CalendarDays aria-hidden className="size-3.5" /> Today
        </span>
      </div>
      <div>
        <div className="mb-1 flex items-center justify-between">
          <Label>How hard was it?</Label>
          <span className="text-sm font-semibold text-primary tabular-nums">{effort}/10</span>
        </div>
        <Slider
          aria-label="Session effort"
          min={1}
          max={10}
          value={effort}
          onValueChange={(value) => setEffort(value as number)}
        />
      </div>
      <div className="space-y-1.5">
        <Label>How did it feel?</Label>
        <SegmentedControl
          size="sm"
          value={feel}
          onValueChange={setFeel}
          aria-label="Session feel"
          className="w-full"
        >
          {FEELS.map((option) => (
            <SegmentedControlItem key={option.value} value={option.value} className="flex-1">
              {option.label}
            </SegmentedControlItem>
          ))}
        </SegmentedControl>
      </div>
      <Field label="Notes" hint="Optional. Your coach sees these.">
        <Textarea autoGrow placeholder="Sent the red overhang project on attempt 3." />
      </Field>
      <Button className="w-full">Log session</Button>
    </div>
  )
}

export const sections: SinkSection[] = [
  {
    id: "forms-field",
    label: "Field",
    render: () => (
      <Showcase
        title="Field anatomy"
        hint="Label + control + hint + error (role=alert) + character counter. One Field molecule for every form row; Base UI wires ids and aria automatically."
      >
        <FieldAnatomy />
      </Showcase>
    ),
  },
  {
    id: "forms-inputs",
    label: "Input & Textarea",
    render: () => (
      <>
        <Showcase title="Input sizes" hint="sm h-8, md h-9 (default), lg h-10.">
          <div className="max-w-sm space-y-3">
            <Input size="sm" placeholder="Small" />
            <Input placeholder="Medium (default)" />
            <Input size="lg" placeholder="Large" />
          </div>
        </Showcase>
        <Showcase
          title="Adornments and states"
          hint="leading is non-interactive; trailing may hold a button. Invalid via aria-invalid or a Field error."
        >
          <div className="max-w-sm space-y-3">
            <Input leading={<Mail aria-hidden />} placeholder="With leading icon" />
            <Input
              leading={<Dumbbell aria-hidden />}
              trailing={<span className="text-xs">kg</span>}
              type="number"
              placeholder="Working weight"
            />
            <Input aria-invalid defaultValue="not-an-email" aria-label="Invalid example" />
            <Input disabled placeholder="Disabled" />
            <Input type="date" aria-label="Session date" />
            <Input type="file" aria-label="Proof of certification" />
          </div>
        </Showcase>
        <Showcase
          title="Textarea"
          hint="autoGrow uses field-sizing: content where supported, JS fallback elsewhere. Pair maxLength with Field count/max."
        >
          <div className="max-w-sm space-y-3">
            <Textarea placeholder="Fixed height, drag to resize" />
            <Textarea autoGrow placeholder="Auto-growing: keep typing" />
            <Textarea disabled placeholder="Disabled" />
          </div>
        </Showcase>
        <Showcase
          title="SearchInput"
          hint="Leading search icon, clear button once there is a query, optional onDebouncedChange."
        >
          <SearchDemo />
        </Showcase>
      </>
    ),
  },
  {
    id: "forms-select",
    label: "Select",
    render: () => (
      <>
        <Showcase
          title="SimpleSelect"
          hint="One-prop options wrapper. Trigger reads like an Input; popup on bg-popover with shadow-overlay."
        >
          <div className="max-w-sm space-y-3">
            <SimpleSelect size="sm" options={DISCIPLINES} placeholder="Small" />
            <SimpleSelect options={DISCIPLINES} placeholder="Medium (default)" />
            <SimpleSelect size="lg" options={DISCIPLINES} placeholder="Large" />
            <SimpleSelect options={DISCIPLINES} placeholder="Disabled" disabled />
            <Field label="Main discipline" error="Pick a discipline to continue.">
              <SimpleSelect options={DISCIPLINES} placeholder="Invalid inside Field" />
            </Field>
          </div>
        </Showcase>
        <Showcase title="Compound parts" hint="Groups, group labels and custom item content via Select.* parts.">
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
                  <SelectItem value="fingerboard">Fingerboard</SelectItem>
                  <SelectItem value="campus">Campus board</SelectItem>
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
      </>
    ),
  },
  {
    id: "forms-selection-controls",
    label: "Checkbox, Switch, Radio",
    render: () => (
      <>
        <Showcase title="Checkbox" hint="Checked, indeterminate and disabled states; label association via htmlFor.">
          <CheckboxRow />
        </Showcase>
        <Showcase title="Switch" hint="Thumb slides with duration-(--duration-fast). md and sm sizes.">
          <SwitchRow />
        </Showcase>
        <Showcase
          title="RadioGroup and RadioCard"
          hint="Same Base UI radio underneath: dots for compact lists, cards for role pickers and mode choices."
        >
          <RadioRows />
        </Showcase>
      </>
    ),
  },
  {
    id: "forms-slider",
    label: "Slider",
    render: () => (
      <Showcase
        title="Slider"
        hint="Primary track fill; the effort 1-10 control. Array values render a range slider."
      >
        <SliderDemo />
      </Showcase>
    ),
  },
  {
    id: "forms-segmented-control",
    label: "SegmentedControl",
    render: () => (
      <Showcase
        title="SegmentedControl"
        hint="Single-select segment bar (bg-muted shell, active segment bg-card + shadow-card). Always keeps one segment selected. md and sm."
      >
        <SegmentedDemo />
      </Showcase>
    ),
  },
  {
    id: "forms-chips",
    label: "FilterChip",
    render: () => (
      <Showcase
        title="FilterChip and ChipGroup"
        hint="aria-pressed chips, single or multi select, optional count suffix. Replaces the explore and waitlist sport chips."
      >
        <ChipsDemo />
      </Showcase>
    ),
  },
  {
    id: "forms-examples",
    label: "Composed examples",
    render: () => (
      <>
        <Showcase
          title="Coach application"
          hint="Every form primitive composed through Field: inputs, select, textarea with counter, checkbox, switch."
        >
          <CoachApplication />
        </Showcase>
        <Showcase
          title="Log session"
          hint="B2C logging moment: effort slider plus feel segmented row."
        >
          <LogSession />
        </Showcase>
      </>
    ),
  },
]
