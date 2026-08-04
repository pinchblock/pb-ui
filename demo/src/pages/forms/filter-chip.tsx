import { useState } from "react"

import { ChipGroup, FilterChip } from "@pinchblock/ui"
import { CodeBlock, ExampleBlock, PageIntro, Showcase, VariantRow } from "../../sink/showcase.tsx"

const PLAN_COUNTS: Record<string, number> = {
  bouldering: 41,
  sport: 35,
  strength: 22,
  endurance: 14,
}

function PlanLibraryFilters() {
  const [selected, setSelected] = useState<string[]>(["bouldering"])
  const total = Object.values(PLAN_COUNTS).reduce((sum, n) => sum + n, 0)
  const shown =
    selected.length === 0
      ? total
      : selected.reduce((sum, key) => sum + (PLAN_COUNTS[key] ?? 0), 0)
  return (
    <div className="max-w-md space-y-3">
      <ChipGroup multiple value={selected} onValueChange={setSelected} aria-label="Plan filters">
        <FilterChip value="bouldering" count={PLAN_COUNTS.bouldering}>
          Bouldering
        </FilterChip>
        <FilterChip value="sport" count={PLAN_COUNTS.sport}>
          Sport climbing
        </FilterChip>
        <FilterChip value="strength" count={PLAN_COUNTS.strength}>
          Strength
        </FilterChip>
        <FilterChip value="endurance" count={PLAN_COUNTS.endurance}>
          Endurance
        </FilterChip>
      </ChipGroup>
      <p className="text-xs text-muted-foreground">
        Showing {shown} of {total} plans
        {selected.length === 0 ? " (no filter)" : ""}
      </p>
    </div>
  )
}

export default function FilterChipPage() {
  const [sports, setSports] = useState<string[]>(["bouldering", "strength"])
  return (
    <div>
      <PageIntro
        title="FilterChip"
        description="Rounded-full pressable chips (Base UI Toggle, aria-pressed) with an optional result count. ChipGroup coordinates several chips in single or multi select mode; standalone chips work via pressed/onPressedChange. This page covers both."
        use="Use for filtering lists and picking tags (explore filters, waitlist sports). One chip must stay selectable at a glance; for mutually exclusive views use SegmentedControl, and for form choices use Radio or Checkbox."
      />

      <Showcase title="Single select" hint="ChipGroup default: pressing a chip releases the previous one.">
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
      </Showcase>

      <Showcase title="Multi select" hint="multiple lets several chips stay pressed at once.">
        <div className="space-y-2">
          <ChipGroup multiple value={sports} onValueChange={setSports} aria-label="Your sports">
            <FilterChip value="bouldering">Bouldering</FilterChip>
            <FilterChip value="sport">Sport climbing</FilterChip>
            <FilterChip value="strength">Strength</FilterChip>
            <FilterChip value="endurance">Endurance</FilterChip>
            <FilterChip value="mobility" disabled>
              Mobility
            </FilterChip>
          </ChipGroup>
          <p className="text-xs text-muted-foreground">
            Selected: {sports.length > 0 ? sports.join(", ") : "none"}
          </p>
        </div>
      </Showcase>

      <Showcase title="Sizes and standalone" hint="sm and md; standalone chips manage their own pressed state.">
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
      </Showcase>

      <ExampleBlock
        title="Plan library filters"
        description="Multi-select discipline filter over the plan library; counts on each chip, running total under the row."
      >
        <PlanLibraryFilters />
      </ExampleBlock>

      <CodeBlock
        code={`
import { ChipGroup, FilterChip } from "@pinchblock/ui"

<ChipGroup multiple value={sports} onValueChange={setSports} aria-label="Your sports">
  <FilterChip value="bouldering">Bouldering</FilterChip>
  <FilterChip value="sport" count={35}>Sport climbing</FilterChip>
</ChipGroup>

// Standalone chip:
<FilterChip pressed={showPRs} onPressedChange={setShowPRs}>
  PRs only
</FilterChip>
`}
      />
    </div>
  )
}
