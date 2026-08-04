import {
  CalendarDots,
  CaretRight,
  Chat,
  DownloadSimple,
  Flame,
  Heartbeat,
  Plus,
  Trophy,
} from "@phosphor-icons/react"
import { useState } from "react"

import { Button } from "../../../../src/components/ui/button.tsx"
import { Card, CardContent, CardFooter } from "../../../../src/components/ui/card.tsx"
import { Pagination } from "../../../../src/components/ui/pagination.tsx"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../src/components/ui/table.tsx"
import { EmptyState } from "../../../../src/components/empty-state.tsx"
import { PageHeader } from "../../../../src/components/page-header.tsx"
import { SectionHeader } from "../../../../src/components/section-header.tsx"
import { StatTile } from "../../../../src/components/stat-tile.tsx"
import { ToggleRow } from "../../../../src/components/toggle-row.tsx"
import { CodeBlock, ExampleBlock, PageIntro } from "../../sink/showcase.tsx"

const TODAY = [
  { time: "07:30", athlete: "Mari Tamm", session: "Deadlift 5x3", status: "Checked in" },
  { time: "12:00", athlete: "Joosep Kask", session: "Conditioning intervals", status: "Booked" },
  { time: "17:00", athlete: "Liis Vaher", session: "Bench + accessories", status: "Booked" },
  { time: "18:30", athlete: "Anton Roos", session: "Squat 4x6", status: "At risk" },
]

export default function ExampleDashboardPage() {
  const [page, setPage] = useState(1)

  return (
    <div>
      <PageIntro
        title="Example: coach dashboard"
        description="A composed dashboard slice built only from library parts: PageHeader, StatTile grid, SectionHeader, Card with Table and compact Pagination, EmptyState and ToggleRow settings."
        use="Copy this shape for any authenticated overview page: header with actions, KPI row, then labelled sections of cards. No local one-off components should be needed."
      />

      <ExampleBlock
        title="Coach dashboard"
        description="Resize the window: tiles reflow, the table scrolls inside its card, actions wrap under the title."
      >
        <div className="space-y-6">
          <PageHeader
            size="lg"
            title="Good morning, Coach Kadri"
            description="4 sessions today. Two athletes hit PRs since yesterday."
            actions={
              <>
                <Button variant="secondary" size="sm">
                  <DownloadSimple aria-hidden />
                  Export
                </Button>
                <Button size="sm">
                  <Plus aria-hidden />
                  New session
                </Button>
              </>
            }
          />

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <StatTile
              label="Sessions this week"
              value="18"
              icon={<CalendarDots aria-hidden />}
              trend={{ value: "+12%", direction: "up" }}
              footnote="vs last week"
            />
            <StatTile
              label="Active streak"
              value="21 days"
              icon={<Flame aria-hidden />}
              trend={{ value: "+3", direction: "up" }}
              footnote="squad best: 34 days"
            />
            <StatTile
              label="Resting HR"
              value="52 bpm"
              icon={<Heartbeat aria-hidden />}
              trend={{ value: "-2 bpm", direction: "down", positive: true }}
              footnote="rolling 7-day average"
            />
            <StatTile
              label="PRs this month"
              value="9"
              icon={<Trophy aria-hidden />}
              trend={{ value: "+4", direction: "up" }}
              footnote="3 athletes involved"
            />
          </div>

          <div className="space-y-2">
            <SectionHeader
              icon={<CalendarDots aria-hidden />}
              title="Today's sessions"
              action={
                <Button variant="ghost" size="sm">
                  Full schedule
                  <CaretRight aria-hidden />
                </Button>
              }
            />
            <Card>
              <CardContent className="p-0">
                <TableContainer>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead numeric>Time</TableHead>
                        <TableHead>Athlete</TableHead>
                        <TableHead>Session</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {TODAY.map((row) => (
                        <TableRow key={row.time}>
                          <TableCell numeric mono>
                            {row.time}
                          </TableCell>
                          <TableCell className="font-medium text-foreground">
                            {row.athlete}
                          </TableCell>
                          <TableCell className="text-muted-foreground">{row.session}</TableCell>
                          <TableCell
                            className={
                              row.status === "At risk" ? "text-warning" : "text-muted-foreground"
                            }
                          >
                            {row.status}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
              <CardFooter className="justify-between border-t border-border p-4">
                <p className="text-xs text-muted-foreground">4 of 12 sessions</p>
                <Pagination variant="compact" page={page} pageCount={3} onPageChange={setPage} />
              </CardFooter>
            </Card>
          </div>

          <div className="space-y-2">
            <SectionHeader icon={<Chat aria-hidden />} title="Unread messages" />
            <Card>
              <EmptyState
                icon={<Chat aria-hidden />}
                title="Inbox zero"
                description="No unread athlete messages. Check back after this evening's sessions."
                action={
                  <Button variant="soft" size="sm">
                    Message the squad
                  </Button>
                }
              />
            </Card>
          </div>

          <div className="space-y-2">
            <SectionHeader title="Notifications" />
            <Card className="divide-y divide-border">
              <ToggleRow
                label="Session reminders"
                description="Push notification 30 minutes before every booked session"
                defaultChecked
              />
              <ToggleRow
                label="PR celebrations"
                description="Notify the squad feed when an athlete sets a personal record"
                defaultChecked
              />
              <ToggleRow
                label="Streak warnings"
                description="Warn athletes the evening before a streak would break"
              />
            </Card>
          </div>
        </div>
      </ExampleBlock>

      <CodeBlock
        title="Composition sketch"
        code={`
import { PageHeader, StatTile, SectionHeader, Card, CardContent, CardFooter,
  Table, Pagination, EmptyState, ToggleRow } from "@pinchblock/ui"

<PageHeader size="lg" title="Good morning, Coach Kadri" actions={...} />

<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
  <StatTile label="Sessions this week" value="18" trend={{ value: "+12%", direction: "up" }} />
  ...
</div>

<SectionHeader title="Today's sessions" action={...} />
<Card>
  <CardContent className="p-0">{/* TableContainer > Table */}</CardContent>
  <CardFooter>{/* compact Pagination */}</CardFooter>
</Card>
`}
      />
    </div>
  )
}
