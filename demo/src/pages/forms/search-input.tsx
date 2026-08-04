import { useState } from "react"

import { SearchInput } from "../../../../src/components/ui/search-input.tsx"
import { CodeBlock, ExampleBlock, PageIntro, Showcase } from "../../sink/showcase.tsx"

const COACHES = [
  { name: "Maria Kask", focus: "Finger strength, youth squads" },
  { name: "Tom Rebane", focus: "Sport climbing endurance" },
  { name: "Liis Oja", focus: "Bouldering power, comp prep" },
  { name: "Anders Kivi", focus: "Strength base, injury return" },
]

function ExploreSearch() {
  const [query, setQuery] = useState("")
  const results = COACHES.filter((coach) =>
    `${coach.name} ${coach.focus}`.toLowerCase().includes(query.toLowerCase()),
  )
  return (
    <div className="max-w-sm space-y-3">
      <SearchInput placeholder="Search coaches" onDebouncedChange={setQuery} />
      <div className="divide-y divide-border rounded-xl border border-border bg-card">
        {results.length > 0 ? (
          results.map((coach) => (
            <div key={coach.name} className="px-4 py-2.5">
              <p className="text-sm font-medium text-card-foreground">{coach.name}</p>
              <p className="text-xs text-muted-foreground">{coach.focus}</p>
            </div>
          ))
        ) : (
          <p className="px-4 py-6 text-center text-sm text-muted-foreground">
            No coaches match "{query}".
          </p>
        )}
      </div>
    </div>
  )
}

export default function SearchInputPage() {
  const [debounced, setDebounced] = useState("")
  return (
    <div>
      <PageIntro
        title="SearchInput"
        description="Input specialized for queries: leading search icon, clear button once there is text, and an optional onDebouncedChange that fires after typing pauses (250 ms default; clearing fires immediately)."
        use="Use wherever the user filters or searches a list. Wire the list to onDebouncedChange, not onValueChange, so results do not churn on every keystroke."
      />

      <Showcase
        title="Debounce"
        hint="Type to see the debounced value trail the input; the clear button flushes it immediately."
      >
        <div className="max-w-sm space-y-2">
          <SearchInput placeholder="Search coaches, gyms, plans" onDebouncedChange={setDebounced} />
          <p className="text-xs text-muted-foreground">
            Debounced query (250 ms): <span className="font-mono">{debounced || "(empty)"}</span>
          </p>
        </div>
      </Showcase>

      <Showcase title="Sizes and states" hint="Inherits the Input size scale and disabled styling.">
        <div className="max-w-sm space-y-3">
          <SearchInput size="sm" placeholder="Small" />
          <SearchInput defaultValue="fingerboard" aria-label="With a query" />
          <SearchInput disabled placeholder="Disabled" />
        </div>
      </Showcase>

      <ExampleBlock
        title="Explore coaches"
        description="Debounced filtering over the coach directory, with an honest empty state when nothing matches."
      >
        <ExploreSearch />
      </ExampleBlock>

      <CodeBlock
        code={`
import { SearchInput } from "@pinchblock/ui"

<SearchInput
  placeholder="Search coaches"
  onDebouncedChange={setQuery}
/>

// Controlled, custom debounce:
<SearchInput
  value={query}
  onValueChange={setQuery}
  onDebouncedChange={runSearch}
  debounceMs={400}
/>
`}
      />
    </div>
  )
}
