import { Users } from "@phosphor-icons/react"
import { useState } from "react"

import { DataTable, type ColumnDef } from "../../../../src/components/data-table.tsx"
import { EmptyState } from "../../../../src/components/empty-state.tsx"
import { Avatar } from "../../../../src/components/ui/avatar.tsx"
import { Button } from "../../../../src/components/ui/button.tsx"
import { Progress } from "../../../../src/components/ui/progress.tsx"
import { CodeBlock, ExampleBlock, PageIntro, Showcase } from "../../sink/showcase.tsx"

interface Athlete {
  id: string
  name: string
  sessions: number
  volumeKg: number
  lastPr: string
  compliance: number
}

const NAMES = [
  "Mari Tamm", "Jakob Kask", "Liis Lepik", "Oskar Saar", "Anna Kivi",
  "Karl Vaher", "Eva Mets", "Tanel Kuusk", "Nora Laine", "Mattias Org",
  "Helena Paju", "Rasmus Ilves", "Katrin Loo", "Jaan Rebane", "Laura Sepp",
  "Andres Kallas", "Piret Nurm", "Siim Talvik", "Kadi Aas", "Martin Pold",
  "Triin Kase", "Erik Mand", "Maarja Sild", "Priit Koppel", "Liina Varik",
]

const PR_LIFTS = ["Back squat", "Deadlift", "Bench press", "Weighted pull-up", "Front squat"]

/* Deterministic fake roster so sorting and search are reproducible. */
const ATHLETES: Athlete[] = NAMES.map((name, i) => ({
  id: `athlete-${i + 1}`,
  name,
  sessions: 6 + ((i * 5) % 17),
  volumeKg: 4200 + ((i * 811) % 9200),
  lastPr: `${PR_LIFTS[i % PR_LIFTS.length]} ${60 + ((i * 13) % 120)} kg`,
  compliance: 48 + ((i * 17) % 53),
}))

const columns: ColumnDef<Athlete>[] = [
  {
    accessorKey: "name",
    header: "Athlete",
    cell: ({ row }) => (
      <span className="flex items-center gap-3">
        <Avatar size="sm" name={row.original.name} />
        <span className="font-medium text-foreground">{row.original.name}</span>
      </span>
    ),
  },
  { accessorKey: "sessions", header: "Sessions", meta: { numeric: true } },
  {
    accessorKey: "volumeKg",
    header: "Volume (kg)",
    meta: { numeric: true },
    cell: ({ row }) => row.original.volumeKg.toLocaleString(),
  },
  { accessorKey: "lastPr", header: "Last PR" },
  {
    accessorKey: "compliance",
    header: "Compliance",
    cell: ({ row }) => (
      <span className="flex items-center gap-2">
        <Progress
          size="sm"
          value={row.original.compliance}
          aria-label={`Compliance ${row.original.compliance} percent`}
          className="w-24"
        />
        <span className="text-xs text-muted-foreground tabular-nums">
          {row.original.compliance}%
        </span>
      </span>
    ),
  },
]

export default function DataTablePage() {
  const [selected, setSelected] = useState<Athlete[]>([])
  const [opened, setOpened] = useState<Athlete | null>(null)

  return (
    <div>
      <PageIntro
        title="DataTable"
        description="TanStack Table rendered with our Table primitives: click-to-sort headers, global search, pagination, optional row selection, skeleton loading and an EmptyState slot."
        use="Reach for it when a table needs sorting, search or pagination. Client-side only for now: fine up to a few thousand rows; beyond that, paginate at the API and compose the Table primitives directly. For static tabular data, use Table straight."
      />

      <Showcase title="Loading" hint="Skeleton rows mirror the column count so nothing jumps when data lands.">
        <DataTable columns={columns} data={[]} loading loadingRows={4} searchable={false} />
      </Showcase>

      <Showcase title="Empty" hint="No rows renders the emptyState slot; the default is a no-results EmptyState.">
        <DataTable
          columns={columns}
          data={[]}
          searchable={false}
          emptyState={
            <EmptyState
              icon={<Users />}
              title="No athletes yet"
              description="Invite your first athlete and their training data will show up here."
              action={<Button size="sm">Invite athlete</Button>}
            />
          }
        />
      </Showcase>

      <ExampleBlock
        title="Athlete roster"
        description="Coach view over 25 athletes: sort any column, search by name or PR, select rows for a bulk nudge, click a row to open the profile."
      >
        <DataTable
          label="Athlete roster"
          columns={columns}
          data={ATHLETES}
          pageSize={8}
          selectable
          onSelectionChange={setSelected}
          onRowClick={setOpened}
          getRowId={(athlete) => athlete.id}
        />
        <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-border pt-4">
          <Button size="sm" disabled={selected.length === 0}>
            Nudge {selected.length > 0 ? `${selected.length} selected` : "selected"}
          </Button>
          <p className="text-sm text-muted-foreground">
            {opened ? `Row clicked: ${opened.name}` : "Click a row to open a profile."}
          </p>
        </div>
      </ExampleBlock>

      <CodeBlock
        code={`
import { DataTable, type ColumnDef } from "@pinchblock/ui"

const columns: ColumnDef<Athlete>[] = [
  { accessorKey: "name", header: "Athlete" },
  { accessorKey: "sessions", header: "Sessions", meta: { numeric: true } },
  { accessorKey: "lastPr", header: "Last PR" },
]

<DataTable
  label="Athlete roster"
  columns={columns}
  data={athletes}
  selectable
  onSelectionChange={setSelected}
  onRowClick={(athlete) => openProfile(athlete)}
  getRowId={(athlete) => athlete.id}
/>
`}
      />
    </div>
  )
}
