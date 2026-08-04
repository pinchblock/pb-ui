import { useState } from "react"

import {
  DragHandle,
  ReorderButtons,
  SortableItem,
  SortableList,
} from "../../../../src/components/sortable-list.tsx"
import { CodeBlock, ExampleBlock, PageIntro, Showcase } from "../../sink/showcase.tsx"

function move<T>(list: T[], from: number, to: number): T[] {
  const next = list.slice()
  const picked = next.splice(from, 1)
  next.splice(to, 0, ...picked)
  return next
}

const itemClass =
  "flex items-center gap-3 rounded-lg border border-border bg-card px-3 py-2"

function HandleList() {
  const [items, setItems] = useState(["Warm-up hangs", "Max hangs", "Repeaters", "Core circuit"])
  return (
    <SortableList
      items={items}
      onReorder={(from, to) => setItems(move(items, from, to))}
      className="max-w-sm"
    >
      {items.map((label) => (
        <SortableItem key={label} id={label} className={itemClass}>
          <DragHandle aria-label={`Reorder ${label}`} />
          <span className="text-sm font-medium text-card-foreground">{label}</span>
        </SortableItem>
      ))}
    </SortableList>
  )
}

function ButtonList() {
  const [items, setItems] = useState(["Boulder session", "Board intervals", "Antagonists"])
  return (
    <SortableList
      items={items}
      onReorder={(from, to) => setItems(move(items, from, to))}
      className="max-w-sm"
    >
      {items.map((label, index) => (
        <SortableItem key={label} id={label} className={itemClass}>
          <span className="flex-1 text-sm font-medium text-card-foreground">{label}</span>
          <ReorderButtons
            upLabel={`Move ${label} up`}
            downLabel={`Move ${label} down`}
            onMoveUp={() => setItems(move(items, index, index - 1))}
            onMoveDown={() => setItems(move(items, index, index + 1))}
            upDisabled={index === 0}
            downDisabled={index === items.length - 1}
          />
        </SortableItem>
      ))}
    </SortableList>
  )
}

const initialWeek = [
  { id: "mon", label: "Monday", blocks: 3 },
  { id: "tue", label: "Tuesday", blocks: 2 },
  { id: "wed", label: "Wednesday", blocks: 0 },
  { id: "thu", label: "Thursday", blocks: 4 },
  { id: "fri", label: "Friday", blocks: 2 },
  { id: "sat", label: "Saturday", blocks: 5 },
  { id: "sun", label: "Sunday", blocks: 0 },
]

function TrainingWeek() {
  const [days, setDays] = useState(initialWeek)
  const [announcement, setAnnouncement] = useState("")

  function reorder(from: number, to: number) {
    const moved = days[from]
    if (!moved) return
    setDays(move(days, from, to))
    setAnnouncement(`${moved.label} moved to position ${to + 1} of ${days.length}`)
  }

  return (
    <div className="max-w-md">
      <SortableList items={days.map((day) => day.id)} onReorder={reorder}>
        {days.map((day, index) => (
          <SortableItem key={day.id} id={day.id} className={itemClass}>
            <DragHandle aria-label={`Reorder ${day.label}`} />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-card-foreground">{day.label}</p>
              <p className="text-xs text-muted-foreground">
                {day.blocks === 0 ? "Rest day" : `${day.blocks} training blocks`}
              </p>
            </div>
            <ReorderButtons
              upLabel={`Move ${day.label} up`}
              downLabel={`Move ${day.label} down`}
              onMoveUp={() => reorder(index, index - 1)}
              onMoveDown={() => reorder(index, index + 1)}
              upDisabled={index === 0}
              downDisabled={index === days.length - 1}
            />
          </SortableItem>
        ))}
      </SortableList>
      <p aria-live="polite" className="mt-3 min-h-4 text-xs text-muted-foreground">
        {announcement}
      </p>
    </div>
  )
}

export default function SortableListPage() {
  return (
    <div>
      <PageIntro
        title="SortableList"
        description="Vertical reorderable list on dnd-kit: SortableList owns the drag context, SortableItem the position, DragHandle the gesture, ReorderButtons the no-drag path. Consumers keep their own arrays and apply onReorder(from, to)."
        use="Use for user-ordered content: session blocks, plan days, playlist-style lists. Ship DragHandle and ReorderButtons together; the buttons are the accessibility parity path, not an optional extra. For sorting by a column value, use Table sorting instead."
      />

      <Showcase
        title="Drag handle"
        hint="Pointer drag on the handle, or keyboard: focus the handle, Space picks up, arrows move, Space drops, Escape cancels."
      >
        <HandleList />
      </Showcase>

      <Showcase
        title="Reorder buttons"
        hint="The parity path: same reorder callback, no drag gesture needed."
      >
        <ButtonList />
      </Showcase>

      <ExampleBlock
        title="Reorder training week"
        description="Plan-builder pattern: day cards with block counts, both interaction modes, and an aria-live region announcing every order change."
      >
        <TrainingWeek />
      </ExampleBlock>

      <CodeBlock
        code={`
import { DragHandle, ReorderButtons, SortableItem, SortableList } from "@pinchblock/ui"

const [days, setDays] = useState(week) // you own the array

<SortableList items={days.map((d) => d.id)} onReorder={applyMove}>
  {days.map((day, index) => (
    <SortableItem key={day.id} id={day.id}>
      <DragHandle aria-label={\`Reorder \${day.label}\`} />
      <span>{day.label}</span>
      <ReorderButtons
        upLabel={\`Move \${day.label} up\`}
        downLabel={\`Move \${day.label} down\`}
        onMoveUp={() => applyMove(index, index - 1)}
        onMoveDown={() => applyMove(index, index + 1)}
        upDisabled={index === 0}
        downDisabled={index === days.length - 1}
      />
    </SortableItem>
  ))}
</SortableList>
`}
      />
    </div>
  )
}
