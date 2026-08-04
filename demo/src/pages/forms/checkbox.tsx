import { useState } from "react"

import { Checkbox } from "../../../../src/components/ui/checkbox.tsx"
import { Label } from "../../../../src/components/ui/label.tsx"
import { CodeBlock, ExampleBlock, PageIntro, Showcase } from "../../sink/showcase.tsx"

const DRILLS = ["Hangboard pulls", "Shoulder circles", "Easy traverses"]

function WarmupChecklist() {
  const [done, setDone] = useState<string[]>(DRILLS.slice(0, 1))
  const allDone = done.length === DRILLS.length
  return (
    <div className="max-w-sm space-y-3 rounded-xl border border-border bg-card p-4">
      <div className="flex items-center gap-2 border-b border-border pb-3">
        <Checkbox
          id="cb-warmup-all"
          checked={allDone}
          indeterminate={done.length > 0 && !allDone}
          onCheckedChange={(checked) => setDone(checked ? [...DRILLS] : [])}
        />
        <Label htmlFor="cb-warmup-all" className="font-semibold">
          Warm-up ({done.length}/{DRILLS.length})
        </Label>
      </div>
      {DRILLS.map((drill, index) => (
        <span key={drill} className="flex items-center gap-2">
          <Checkbox
            id={`cb-drill-${index}`}
            checked={done.includes(drill)}
            onCheckedChange={(checked) =>
              setDone(checked ? [...done, drill] : done.filter((d) => d !== drill))
            }
          />
          <Label htmlFor={`cb-drill-${index}`}>{drill}</Label>
        </span>
      ))}
    </div>
  )
}

export default function CheckboxPage() {
  return (
    <div>
      <PageIntro
        title="Checkbox"
        description="Base UI Checkbox: role=checkbox, hidden input for forms, keyboard operable. Supports indeterminate for parent rows over partially complete lists."
        use="Use for independent yes/no choices and checklists. For mutually exclusive options use Radio; for instant on/off settings use Switch. Always label via Field, Label htmlFor or aria-label."
      />

      <Showcase title="States" hint="Checked, indeterminate and disabled; label association via htmlFor.">
        <div className="flex flex-wrap items-center gap-6">
          <span className="flex items-center gap-2">
            <Checkbox id="cb-off" />
            <Label htmlFor="cb-off">Warm-up done</Label>
          </span>
          <span className="flex items-center gap-2">
            <Checkbox id="cb-on" defaultChecked />
            <Label htmlFor="cb-on">Cool-down done</Label>
          </span>
          <span className="flex items-center gap-2">
            <Checkbox id="cb-ind" indeterminate />
            <Label htmlFor="cb-ind">Some drills done</Label>
          </span>
          <span className="flex items-center gap-2">
            <Checkbox id="cb-dis" disabled />
            <Label htmlFor="cb-dis">Disabled</Label>
          </span>
          <span className="flex items-center gap-2">
            <Checkbox id="cb-dis-on" disabled defaultChecked />
            <Label htmlFor="cb-dis-on">Disabled checked</Label>
          </span>
        </div>
      </Showcase>

      <ExampleBlock
        title="Warm-up checklist"
        description="Parent checkbox goes indeterminate while drills are partially done and checks itself when the list is complete."
      >
        <WarmupChecklist />
      </ExampleBlock>

      <CodeBlock
        code={`
import { Checkbox, Label } from "@pinchblock/ui"

<Checkbox id="warmup" checked={done} onCheckedChange={setDone} />
<Label htmlFor="warmup">Warm-up done</Label>

// Parent over a partially complete list:
<Checkbox
  checked={allDone}
  indeterminate={someDone && !allDone}
  onCheckedChange={toggleAll}
/>
`}
      />
    </div>
  )
}
