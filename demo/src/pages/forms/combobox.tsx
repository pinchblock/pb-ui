import { useState } from "react"

import { AsyncCombobox } from "../../../../src/components/async-combobox.tsx"
import {
  Combobox,
  ComboboxCollection,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
} from "../../../../src/components/ui/combobox.tsx"
import { Field } from "../../../../src/components/ui/field.tsx"
import { CodeBlock, ExampleBlock, PageIntro, Showcase } from "../../sink/showcase.tsx"

interface Exercise {
  value: string
  label: string
  disabled?: boolean
}

const EXERCISES: Exercise[] = [
  { value: "max-hangs", label: "Max hangs" },
  { value: "repeaters", label: "Repeaters" },
  { value: "campus-ladders", label: "Campus ladders" },
  { value: "4x4s", label: "Boulder 4x4s" },
  { value: "arc", label: "ARC traverse" },
  { value: "one-arm-hangs", label: "One-arm hangs", disabled: true },
]

const EXERCISE_GROUPS: { label: string; items: Exercise[] }[] = [
  {
    label: "Fingerboard",
    items: [
      { value: "max-hangs", label: "Max hangs" },
      { value: "repeaters", label: "Repeaters" },
      { value: "min-edge", label: "Minimum edge" },
      { value: "one-arm-hangs", label: "One-arm hangs", disabled: true },
    ],
  },
  {
    label: "Campus",
    items: [
      { value: "campus-ladders", label: "Ladders" },
      { value: "campus-touches", label: "Touches" },
      { value: "campus-doubles", label: "Doubles" },
    ],
  },
  {
    label: "Endurance",
    items: [
      { value: "4x4s", label: "Boulder 4x4s" },
      { value: "arc", label: "ARC traverse" },
      { value: "route-circuits", label: "Route circuits" },
    ],
  },
]

interface Coach {
  id: string
  name: string
  specialty: string
}

const COACHES: Coach[] = [
  { id: "c1", name: "Mari Tamm", specialty: "Fingerboard and strength" },
  { id: "c2", name: "Karl Oja", specialty: "Competition bouldering" },
  { id: "c3", name: "Liis Kask", specialty: "Endurance and route pacing" },
  { id: "c4", name: "Anders Berg", specialty: "Youth development" },
  { id: "c5", name: "Nora Lind", specialty: "Injury rehab" },
  { id: "c6", name: "Tomas Vik", specialty: "Campus and power" },
]

/** Local fake backend: filters coaches after a randomized delay. */
function searchCoaches(query: string): Promise<Coach[]> {
  const q = query.trim().toLowerCase()
  const hits = COACHES.filter(
    (coach) =>
      coach.name.toLowerCase().includes(q) || coach.specialty.toLowerCase().includes(q),
  )
  const latency = 300 + Math.random() * 500
  return new Promise((resolve) => setTimeout(() => resolve(hits), latency))
}

/** Grouped exercise picker, reused by two blocks below. */
function ExercisePicker({ label }: { label: string }) {
  return (
    <Field label={label}>
      <Combobox items={EXERCISE_GROUPS}>
        <ComboboxInput clearable placeholder="Search exercises" />
        <ComboboxPopup>
          <ComboboxEmpty>No exercises found</ComboboxEmpty>
          <ComboboxList>
            {(group: (typeof EXERCISE_GROUPS)[number]) => (
              <ComboboxGroup key={group.label} items={group.items}>
                <ComboboxGroupLabel>{group.label}</ComboboxGroupLabel>
                <ComboboxCollection>
                  {(item: Exercise) => (
                    <ComboboxItem key={item.value} value={item} disabled={item.disabled}>
                      {item.label}
                    </ComboboxItem>
                  )}
                </ComboboxCollection>
              </ComboboxGroup>
            )}
          </ComboboxList>
        </ComboboxPopup>
      </Combobox>
    </Field>
  )
}

export default function ComboboxPage() {
  const [coach, setCoach] = useState<Coach | null>(null)

  return (
    <div>
      <PageIntro
        title="Combobox"
        description="Typeahead select on Base UI Combobox: the input is the trigger, the list filters as you type, the popup matches Select. AsyncCombobox adds the server-backed flavor: debounced onSearch, loading row, stale-response guard."
        use="Reach for Combobox when a Select would hold more than roughly ten options, or when users know the option name and typing beats scrolling. For short always-visible lists stay with Select or RadioGroup; for free-text queries without a selected value use SearchInput."
      />

      <Showcase
        title="Basic"
        hint="Flat items on the root; typing filters by label. Clearable shows an X while a value is selected."
      >
        <div className="max-w-sm space-y-3">
          <Combobox items={EXERCISES}>
            <ComboboxInput clearable aria-label="Exercise" placeholder="Search exercises" />
            <ComboboxPopup>
              <ComboboxEmpty>No exercises found</ComboboxEmpty>
              <ComboboxList>
                {(item: Exercise) => (
                  <ComboboxItem key={item.value} value={item} disabled={item.disabled}>
                    {item.label}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxPopup>
          </Combobox>
        </div>
      </Showcase>

      <Showcase title="Sizes" hint="Same height scale as Input: sm h-8, md h-9, lg h-10.">
        <div className="max-w-sm space-y-3">
          {(["sm", "md", "lg"] as const).map((size) => (
            <Combobox key={size} items={EXERCISES}>
              <ComboboxInput size={size} aria-label={`Exercise (${size})`} placeholder={size} />
              <ComboboxPopup>
                <ComboboxEmpty>No exercises found</ComboboxEmpty>
                <ComboboxList>
                  {(item: Exercise) => (
                    <ComboboxItem key={item.value} value={item}>
                      {item.label}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxPopup>
            </Combobox>
          ))}
        </div>
      </Showcase>

      <Showcase
        title="Grouped options"
        hint="Groups on the root via { label, items }; ComboboxGroup + ComboboxCollection render them. One-arm hangs is disabled."
      >
        <div className="max-w-sm">
          <ExercisePicker label="Exercise" />
        </div>
      </Showcase>

      <Showcase title="States" hint="Disabled control, and invalid styling inherited from a Field error.">
        <div className="max-w-sm space-y-3">
          <Combobox items={EXERCISES} disabled>
            <ComboboxInput aria-label="Exercise (disabled)" placeholder="Disabled" />
            <ComboboxPopup>
              <ComboboxList>
                {(item: Exercise) => (
                  <ComboboxItem key={item.value} value={item}>
                    {item.label}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxPopup>
          </Combobox>
          <Field label="Main exercise" error="Pick an exercise to continue.">
            <Combobox items={EXERCISES}>
              <ComboboxInput placeholder="Invalid inside Field" />
              <ComboboxPopup>
                <ComboboxList>
                  {(item: Exercise) => (
                    <ComboboxItem key={item.value} value={item}>
                      {item.label}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxPopup>
            </Combobox>
          </Field>
        </div>
      </Showcase>

      <ExampleBlock
        title="Assign a session"
        description="Grouped exercise picker next to an async coach search (fake backend with 300-800 ms latency). Slow early responses never overwrite newer ones."
      >
        <div className="grid max-w-2xl gap-4 sm:grid-cols-2">
          <ExercisePicker label="Exercise" />
          <Field label="Coach" hint={coach ? `Assigned: ${coach.name}` : "Search by name or specialty."}>
            <AsyncCombobox
              onSearch={searchCoaches}
              getKey={(c) => c.id}
              getLabel={(c) => c.name}
              renderItem={(c) => (
                <span className="flex min-w-0 flex-col">
                  <span className="truncate">{c.name}</span>
                  <span className="truncate text-xs text-muted-foreground">{c.specialty}</span>
                </span>
              )}
              value={coach}
              onValueChange={setCoach}
              placeholder="Search coaches"
              emptyMessage="No coaches found"
              loadingMessage="Searching coaches…"
            />
          </Field>
        </div>
      </ExampleBlock>

      <CodeBlock
        code={`
import { AsyncCombobox, Combobox, ComboboxEmpty, ComboboxInput,
  ComboboxItem, ComboboxList, ComboboxPopup } from "@pinchblock/ui"

// Local list: items on the root, function child renders the rows.
<Combobox items={exercises}>
  <ComboboxInput clearable placeholder="Search exercises" />
  <ComboboxPopup>
    <ComboboxEmpty>No exercises found</ComboboxEmpty>
    <ComboboxList>
      {(item) => <ComboboxItem key={item.value} value={item}>{item.label}</ComboboxItem>}
    </ComboboxList>
  </ComboboxPopup>
</Combobox>

// Server-backed list: debounce, loading row and stale-response
// handling are built in. Controlled value.
<AsyncCombobox
  onSearch={(query) => api.searchCoaches(query)}
  getKey={(coach) => coach.id}
  getLabel={(coach) => coach.name}
  value={coach}
  onValueChange={setCoach}
  placeholder="Search coaches"
/>
`}
      />
    </div>
  )
}
