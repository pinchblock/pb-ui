import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
} from "@pinchblock/ui"
import { CodeBlock, ExampleBlock, PageIntro, Showcase } from "../../sink/showcase.tsx"

const LEADERBOARD = [
  { athlete: "Mari Tamm", sessions: 14, volume: "24,300 kg", pr: "Deadlift 140 kg" },
  { athlete: "Joosep Kask", sessions: 12, volume: "21,850 kg", pr: "Squat 152.5 kg" },
  { athlete: "Liis Vaher", sessions: 11, volume: "18,400 kg", pr: "Bench 72.5 kg" },
  { athlete: "Anton Roos", sessions: 9, volume: "15,900 kg", pr: "Clean 95 kg" },
]

const SESSION_LOG = [
  { date: "Mon 28 Jul", block: "Squat 4x6", top: "132.5 kg", duration: "58:24" },
  { date: "Wed 30 Jul", block: "Pause bench 3x5", top: "70 kg", duration: "44:10" },
  { date: "Fri 01 Aug", block: "Deadlift 5x3", top: "140 kg", duration: "51:47" },
]

export default function TablePage() {
  return (
    <div>
      <PageIntro
        title="Table"
        description="Dependency-free table primitives with the app look: uppercase text-xs header row, quiet row hover, roomy cells, caption support."
        use="For comparable rows of data: leaderboards, session logs, billing history. Wrap in TableContainer (usually inside a Card with p-0 content) so wide tables scroll horizontally instead of breaking mobile. For rows that are primarily tappable items, use ListRow instead."
      />

      <Showcase
        title="Anatomy and cell helpers"
        hint="numeric right-aligns with tabular figures; add mono for identifiers and precise values. Caption renders below."
      >
        <TableContainer>
          <Table>
            <TableCaption>Squad volume leaderboard, last 30 days.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Athlete</TableHead>
                <TableHead numeric>Sessions</TableHead>
                <TableHead numeric>Volume</TableHead>
                <TableHead>Latest PR</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {LEADERBOARD.map((row) => (
                <TableRow key={row.athlete}>
                  <TableCell className="font-medium text-foreground">{row.athlete}</TableCell>
                  <TableCell numeric>{row.sessions}</TableCell>
                  <TableCell numeric mono>
                    {row.volume}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{row.pr}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Showcase>

      <ExampleBlock
        title="Session log in a Card"
        description="The standard placement: CardHeader for the title, CardContent with p-0 so the table runs edge to edge."
      >
        <Card className="max-w-xl">
          <CardHeader>
            <CardTitle>Recent sessions</CardTitle>
            <CardDescription>Mari Tamm, powerlifting block 3</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <TableContainer>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Main block</TableHead>
                    <TableHead numeric>Top set</TableHead>
                    <TableHead numeric>Duration</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {SESSION_LOG.map((row) => (
                    <TableRow key={row.date}>
                      <TableCell className="text-muted-foreground">{row.date}</TableCell>
                      <TableCell className="font-medium text-foreground">{row.block}</TableCell>
                      <TableCell numeric>{row.top}</TableCell>
                      <TableCell numeric mono>
                        {row.duration}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </ExampleBlock>

      <CodeBlock
        code={`
import { Table, TableContainer, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@pinchblock/ui"

<TableContainer>
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Athlete</TableHead>
        <TableHead numeric>Volume</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell>Mari Tamm</TableCell>
        <TableCell numeric mono>24,300 kg</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</TableContainer>
`}
      />
    </div>
  )
}
