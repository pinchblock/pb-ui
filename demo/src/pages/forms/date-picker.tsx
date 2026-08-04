import { useState } from "react"

import {
  Calendar,
  DatePicker,
  type DateRange,
  DateRangePicker,
  Field,
  MonthPicker,
} from "@pinchblock/ui"
import { CodeBlock, ExampleBlock, PageIntro, Showcase } from "../../sink/showcase.tsx"

const addDays = (date: Date, days: number) => {
  const copy = new Date(date)
  copy.setDate(copy.getDate() + days)
  return copy
}

const DAY_MS = 24 * 60 * 60 * 1000

export default function DatePickerPage() {
  const today = new Date()
  const [single, setSingle] = useState<Date | undefined>(today)
  const [pickerDate, setPickerDate] = useState<Date | undefined>(undefined)
  const [range, setRange] = useState<DateRange | undefined>({
    from: addDays(today, 2),
    to: addDays(today, 9),
  })
  const [month, setMonth] = useState<Date | undefined>(undefined)
  const [block, setBlock] = useState<DateRange | undefined>(undefined)

  const blockDays =
    block?.from && block?.to
      ? Math.round((block.to.getTime() - block.from.getTime()) / DAY_MS) + 1
      : 0

  return (
    <div>
      <PageIntro
        title="Date picking"
        description="Calendar (react-day-picker restyled on tokens), DatePicker and DateRangePicker (input-shaped trigger + Popover), and MonthPicker (year header + 12-month grid). Weeks start Monday, the training-week convention."
        use="DatePicker for one date in a form, DateRangePicker for block start/end, MonthPicker when only the month matters (plan scheduling). Inline Calendar is for surfaces where the calendar IS the content, not for forms."
      />

      <Showcase title="Calendar" hint="Inline month grid. Arrow keys move between days; today wears a quiet ring.">
        <Calendar mode="single" selected={single} onSelect={setSingle} />
      </Showcase>

      <Showcase title="Range selection" hint="Endpoints go solid primary, the days between get the accent band.">
        <Calendar mode="range" selected={range} onSelect={setRange} numberOfMonths={2} />
      </Showcase>

      <Showcase title="DatePicker" hint="Input-shaped trigger; clearable shows an X while a value is set.">
        <div className="flex max-w-md flex-col gap-3">
          <DatePicker value={pickerDate} onValueChange={setPickerDate} clearable />
          <DatePicker placeholder="Assessment day" size="sm" />
          <DatePicker defaultValue={today} disabled />
        </div>
      </Showcase>

      <Showcase title="Under Field" hint="The trigger registers as the Field control: label, hint and error wire up automatically.">
        <div className="flex max-w-md flex-col gap-4">
          <Field label="Start date" hint="First session of the plan.">
            <DatePicker defaultValue={addDays(today, 7)} clearable />
          </Field>
          <Field label="Deload day" error="Pick a rest day inside the block.">
            <DatePicker placeholder="Pick a date" />
          </Field>
        </div>
      </Showcase>

      <Showcase title="MonthPicker" hint="Returns a Date at the first of the month; arrows move through the grid.">
        <div className="flex flex-wrap items-start gap-8">
          <MonthPicker value={month} onValueChange={setMonth} min={today} />
          <p className="text-sm text-muted-foreground">
            {month
              ? `Block starts ${month.toLocaleDateString(undefined, { month: "long", year: "numeric" })}`
              : "Nothing picked yet. Past months are disabled via min."}
          </p>
        </div>
      </Showcase>

      <ExampleBlock
        title="Schedule training block"
        description="Range over the coming weeks; past days are locked with disabledDates."
      >
        <div className="flex max-w-md flex-col gap-4 rounded-xl border border-border bg-card p-4">
          <div>
            <p className="font-medium text-card-foreground">Power endurance block</p>
            <p className="text-sm text-muted-foreground">
              4x per week: campus, 4x4s, circuits. Pick start and end.
            </p>
          </div>
          <Field label="Block dates">
            <DateRangePicker
              value={block}
              onValueChange={setBlock}
              disabledDates={{ before: today }}
              clearable
              placeholder="Start and end date"
            />
          </Field>
          <p className="text-sm text-muted-foreground">
            {blockDays > 0
              ? `${blockDays} days scheduled, about ${Math.max(1, Math.round(blockDays / 7))} training week${blockDays >= 11 ? "s" : ""}.`
              : "No block scheduled yet."}
          </p>
        </div>
      </ExampleBlock>

      <CodeBlock
        code={`
import { Calendar, DatePicker, DateRangePicker, MonthPicker } from "@pinchblock/ui"
import type { DateRange } from "@pinchblock/ui"

// Single date under a Field (label/error wire up automatically):
<Field label="Start date">
  <DatePicker value={date} onValueChange={setDate} clearable />
</Field>

// Block scheduling: range with past days locked:
<DateRangePicker
  value={block}
  onValueChange={setBlock}
  disabledDates={{ before: new Date() }}
/>

// Month-level plans; fires a Date at the first of the month:
<MonthPicker value={month} onValueChange={setMonth} />

// Inline calendar when the grid is the content:
<Calendar mode="single" selected={date} onSelect={setDate} />
`}
      />
    </div>
  )
}
