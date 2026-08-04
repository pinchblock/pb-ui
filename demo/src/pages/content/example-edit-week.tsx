import { Plus } from "@phosphor-icons/react"
import { useState } from "react"

import {
  Button,
  type ColumnDef,
  Combobox,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
  cn,
  DataTable,
  type DateRange,
  DateRangePicker,
  DragHandle,
  Field,
  NumberField,
  ReorderButtons,
  SortableItem,
  SortableList,
} from "@pinchblock/ui"
import { CodeBlock, ExampleBlock, PageIntro } from "../../sink/showcase.tsx"

interface Exercise { value: string; label: string }
interface Block { exercise: string; sets: number; reps: number }
interface Day { id: string; label: string; blocks: Block[] }

const block = (exercise: string, sets: number, reps: number): Block => ({ exercise, sets, reps })
const blockCount = (n: number) => (n === 0 ? "Rest day" : n === 1 ? "1 block" : `${n} blocks`)

const EXERCISES: Exercise[] = [
  { value: "max-hangs", label: "Max hangs" },
  { value: "repeaters", label: "Repeaters" },
  { value: "min-edge", label: "Minimum edge" },
  { value: "campus-ladders", label: "Campus ladders" },
  { value: "4x4s", label: "Boulder 4x4s" },
  { value: "arc", label: "ARC traverse" },
  { value: "limit-boulders", label: "Limit boulders" },
  { value: "weighted-pullups", label: "Weighted pull-ups" },
  { value: "core-circuit", label: "Core circuit" },
  { value: "antagonist-press", label: "Antagonist press" },
]

const INITIAL_DAYS: Day[] = [
  { id: "mon", label: "Monday", blocks: [block("Max hangs", 5, 5), block("Boulder 4x4s", 4, 4)] },
  { id: "tue", label: "Tuesday", blocks: [block("Repeaters", 6, 7)] },
  { id: "wed", label: "Wednesday", blocks: [] },
  { id: "thu", label: "Thursday", blocks: [block("Campus ladders", 5, 3), block("ARC traverse", 2, 20)] },
  { id: "fri", label: "Friday", blocks: [block("Limit boulders", 6, 2)] },
]

const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n)

function move<T>(list: T[], from: number, to: number): T[] {
  const next = list.slice()
  const picked = next.splice(from, 1)
  next.splice(to, 0, ...picked)
  return next
}

interface WeekRow { id: string; day: string; blocks: string; volume: number }

const summaryColumns: ColumnDef<WeekRow>[] = [
  { accessorKey: "day", header: "Day" },
  { accessorKey: "blocks", header: "Blocks" },
  { accessorKey: "volume", header: "Volume (reps)", meta: { numeric: true } },
]

function BlockRow({
  block,
  onChange,
  onRemove,
}: {
  block: Block
  onChange: (patch: Partial<Block>) => void
  onRemove: () => void
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-medium text-card-foreground">{block.exercise}</span>
        <Button size="sm" variant="ghost" onClick={onRemove}>
          Remove
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <NumberField
          size="sm"
          className="w-28"
          min={1}
          max={12}
          value={block.sets}
          onValueChange={(value) => value !== null && onChange({ sets: value })}
          aria-label={`Sets for ${block.exercise}`}
        />
        <span className="text-xs text-muted-foreground">sets of</span>
        <NumberField
          size="sm"
          className="w-28"
          min={1}
          max={30}
          value={block.reps}
          onValueChange={(value) => value !== null && onChange({ reps: value })}
          aria-label={`Reps for ${block.exercise}`}
        />
        <span className="text-xs text-muted-foreground">reps</span>
      </div>
    </div>
  )
}

function DayEditor({ day, onBlocksChange }: { day: Day; onBlocksChange: (blocks: Block[]) => void }) {
  const [pending, setPending] = useState<Exercise | null>(null)
  const available = EXERCISES.filter(
    (option) => !day.blocks.some((block) => block.exercise === option.label),
  )

  function addBlock() {
    if (!pending) return
    onBlocksChange([...day.blocks, { exercise: pending.label, sets: 3, reps: 5 }])
    setPending(null)
  }

  return (
    <div className="space-y-4 rounded-xl border border-border bg-card p-4">
      <p className="text-sm font-semibold text-card-foreground">Edit {day.label}</p>
      {day.blocks.length === 0 && (
        <p className="text-sm text-muted-foreground">
          Rest day so far. Add an exercise below to make it a session.
        </p>
      )}
      {day.blocks.map((block, index) => (
        <BlockRow
          key={block.exercise}
          block={block}
          onChange={(patch) =>
            onBlocksChange(day.blocks.map((b, i) => (i === index ? { ...b, ...patch } : b)))
          }
          onRemove={() => onBlocksChange(day.blocks.filter((_, i) => i !== index))}
        />
      ))}
      <div className="flex items-end gap-2">
        <Field label="Add exercise" className="flex-1">
          <Combobox items={available} value={pending} onValueChange={setPending}>
            <ComboboxInput placeholder="Search exercises" />
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
        </Field>
        <Button onClick={addBlock} disabled={!pending}>
          <Plus /> Add
        </Button>
      </div>
    </div>
  )
}

function EditWeek() {
  const [days, setDays] = useState(INITIAL_DAYS)
  const [selectedId, setSelectedId] = useState("mon")
  const [range, setRange] = useState<DateRange | undefined>(() => ({
    from: addDays(new Date(), 7),
    to: addDays(new Date(), 34),
  }))
  const [announcement, setAnnouncement] = useState("")

  const selected = days.find((day) => day.id === selectedId) ?? days[0]
  if (!selected) return null

  function reorder(from: number, to: number, announce = false) {
    const day = days[from]
    if (!day || to < 0 || to >= days.length) return
    setDays(move(days, from, to))
    if (announce) setAnnouncement(`${day.label} moved to position ${to + 1} of ${days.length}`)
  }

  const summary: WeekRow[] = days.map((day) => ({
    id: day.id,
    day: day.label,
    blocks: day.blocks.length ? day.blocks.map((block) => block.exercise).join(", ") : "Rest",
    volume: day.blocks.reduce((total, block) => total + block.sets * block.reps, 0),
  }))

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-foreground">Spring power block</p>
          <p className="text-xs text-muted-foreground">
            Drag days into order, schedule the block, tune each session.
          </p>
        </div>
        <Field label="Block dates" className="w-64">
          <DateRangePicker value={range} onValueChange={setRange} numberOfMonths={2} />
        </Field>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SortableList
          items={days.map((day) => day.id)}
          onReorder={(from, to) => reorder(from, to)}
          aria-label="Training days"
        >
          {days.map((day, index) => (
            <SortableItem
              key={day.id}
              id={day.id}
              className={cn(
                "flex items-center gap-3 rounded-lg border border-border bg-card px-3 py-2",
                day.id === selected.id && "border-primary",
              )}
            >
              <DragHandle aria-label={`Reorder ${day.label}`} />
              <button
                type="button"
                onClick={() => setSelectedId(day.id)}
                aria-pressed={day.id === selected.id}
                className="flex flex-1 flex-col items-start text-start"
              >
                <span className="text-sm font-medium text-card-foreground">{day.label}</span>
                <span className="text-xs text-muted-foreground">{blockCount(day.blocks.length)}</span>
              </button>
              <ReorderButtons
                upLabel={`Move ${day.label} up`}
                downLabel={`Move ${day.label} down`}
                onMoveUp={() => reorder(index, index - 1, true)}
                onMoveDown={() => reorder(index, index + 1, true)}
                upDisabled={index === 0}
                downDisabled={index === days.length - 1}
              />
            </SortableItem>
          ))}
        </SortableList>
        <p aria-live="polite" className="sr-only">{announcement}</p>

        <DayEditor
          day={selected}
          onBlocksChange={(blocks) =>
            setDays(days.map((day) => (day.id === selected.id ? { ...day, blocks } : day)))
          }
        />
      </div>

      <DataTable
        label="Week summary"
        columns={summaryColumns}
        data={summary}
        searchable={false}
        pageSize={7}
        getRowId={(row) => row.id}
        getRowLabel={(row) => row.day}
      />
    </div>
  )
}

export default function ExampleEditWeekPage() {
  return (
    <div>
      <PageIntro
        title="Edit training week"
        description="The Wave A integration demo: SortableList orders the days, DateRangePicker schedules the block, Combobox adds exercises, NumberField tunes sets and reps, and DataTable totals the week."
        use="This page is the Wave A exit criterion: five components composing one coach flow with no glue components in between. Copy the wiring, not the fake data."
      />

      <ExampleBlock
        title="Edit a training week"
        description="Reorder days by drag or arrow buttons, pick a day to edit its session, and watch the summary table follow."
      >
        <EditWeek />
      </ExampleBlock>

      <CodeBlock
        code={`
import { Combobox, DataTable, DateRangePicker, NumberField,
  SortableItem, SortableList } from "@pinchblock/ui"

<DateRangePicker value={range} onValueChange={setRange} />
<SortableList items={dayIds} onReorder={applyMove}>
  {days.map((day) => <SortableItem key={day.id} id={day.id}>...</SortableItem>)}
</SortableList>

<NumberField min={1} max={12} value={block.sets} onValueChange={setSets} />
<DataTable columns={summaryColumns} data={weekSummary} searchable={false} />
        `}
      />
    </div>
  )
}
