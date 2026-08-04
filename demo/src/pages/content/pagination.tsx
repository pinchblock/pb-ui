import { useState } from "react"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../src/components/ui/card.tsx"
import { ListRow } from "../../../../src/components/list-row.tsx"
import { Pagination } from "../../../../src/components/ui/pagination.tsx"
import { CodeBlock, ExampleBlock, PageIntro, Showcase } from "../../sink/showcase.tsx"

const PAGE_ATHLETES: string[][] = [
  ["Mari Tamm", "Joosep Kask", "Liis Vaher"],
  ["Anton Roos", "Kadi Kuusk", "Rasmus Ilves"],
  ["Eva Lepik", "Martin Sarv", "Tuuli Kroon"],
]

export default function PaginationPage() {
  const [page, setPage] = useState(5)
  const [rosterPage, setRosterPage] = useState(1)

  return (
    <div>
      <PageIntro
        title="Pagination"
        description="Prev/next plus page numbers with ellipsis truncation. The compact variant drops the number strip to a page X of Y readout."
        use="Default on desktop list pages; compact on mobile and inside tight card footers. Prev/next disable at the edges, so no dead clicks."
      />

      <Showcase
        title="Default"
        hint="Ellipsis truncation keeps long ranges short; siblingCount widens the window around the current page."
      >
        <Pagination page={page} pageCount={12} onPageChange={setPage} />
      </Showcase>

      <Showcase title="Compact" hint="Same state, no number strip. For mobile and card footers.">
        <Pagination variant="compact" page={page} pageCount={12} onPageChange={setPage} />
      </Showcase>

      <Showcase
        title="Short lists"
        hint="Below the truncation threshold every page shows; on page 1 the previous arrow is disabled."
      >
        <Pagination page={1} pageCount={3} onPageChange={() => {}} />
      </Showcase>

      <ExampleBlock
        title="Athlete roster with a paged footer"
        description="Compact pagination in a CardFooter, driving which rows the card shows."
      >
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Athletes</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border border-t border-border">
              {(PAGE_ATHLETES[rosterPage - 1] ?? []).map((name) => (
                <ListRow key={name} interactive title={name} meta="View training plan" />
              ))}
            </div>
          </CardContent>
          <CardFooter className="justify-between border-t border-border p-4">
            <p className="text-xs text-muted-foreground">9 athletes</p>
            <Pagination
              variant="compact"
              page={rosterPage}
              pageCount={3}
              onPageChange={setRosterPage}
            />
          </CardFooter>
        </Card>
      </ExampleBlock>

      <CodeBlock
        code={`
import { Pagination } from "@pinchblock/ui"

const [page, setPage] = useState(1)

<Pagination page={page} pageCount={12} onPageChange={setPage} />

// Mobile / card footer:
<Pagination variant="compact" page={page} pageCount={12} onPageChange={setPage} />
`}
      />
    </div>
  )
}
