import { Barbell, MagnifyingGlass, Plus, Trophy } from "@phosphor-icons/react"

import { Button } from "../../../../src/components/ui/button.tsx"
import { Card } from "../../../../src/components/ui/card.tsx"
import { SearchInput } from "../../../../src/components/ui/search-input.tsx"
import { EmptyState } from "../../../../src/components/empty-state.tsx"
import { CodeBlock, ExampleBlock, PageIntro, Showcase } from "../../sink/showcase.tsx"

export default function EmptyStatePage() {
  return (
    <div>
      <PageIntro
        title="EmptyState"
        description="Centered icon-in-soft-circle, title, body copy and a CTA slot for empty lists, no-results views and first-run screens."
        use="Default is chromeless: drop it inside an existing Card. Dashed is the standalone add-something pattern for empty regions of a page. Every list in the product needs one; specs name the copy."
      />

      <Showcase
        title="Variants"
        hint="Left: default inside a Card. Right: dashed standing on its own."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <EmptyState
              icon={<Trophy aria-hidden />}
              title="No PRs yet"
              description="Personal records show up here the moment an athlete beats a lift."
            />
          </Card>
          <EmptyState
            variant="dashed"
            icon={<Barbell aria-hidden />}
            title="No sessions planned"
            description="Build the first session of this training block to get the week started."
            action={
              <Button size="sm">
                <Plus aria-hidden />
                Plan a session
              </Button>
            }
          />
        </div>
      </Showcase>

      <ExampleBlock
        title="No search results"
        description="The no-results case keeps the query visible and offers the obvious next step."
      >
        <div className="max-w-md space-y-3">
          <SearchInput defaultValue="karl" aria-label="Search athletes" />
          <Card>
            <EmptyState
              icon={<MagnifyingGlass aria-hidden />}
              title={'No athletes match "karl"'}
              description="Check the spelling or invite them to the squad."
              action={
                <Button variant="soft" size="sm">
                  <Plus aria-hidden />
                  Invite athlete
                </Button>
              }
            />
          </Card>
        </div>
      </ExampleBlock>

      <CodeBlock
        code={`
import { EmptyState } from "@pinchblock/ui"

<EmptyState
  icon={<Trophy />}
  title="No PRs yet"
  description="Personal records show up here the moment an athlete beats a lift."
/>

// Standalone add-something region:
<EmptyState
  variant="dashed"
  icon={<Barbell />}
  title="No sessions planned"
  action={<Button size="sm"><Plus /> Plan a session</Button>}
/>
`}
      />
    </div>
  )
}
