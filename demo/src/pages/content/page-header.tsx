import { DownloadSimple, Plus } from "@phosphor-icons/react"

import { Button } from "../../../../src/components/ui/button.tsx"
import { TagPill } from "../../../../src/components/ui/tag-pill.tsx"
import { PageHeader } from "../../../../src/components/page-header.tsx"
import { CodeBlock, ExampleBlock, PageIntro, Showcase } from "../../sink/showcase.tsx"

export default function PageHeaderPage() {
  return (
    <div>
      <PageIntro
        title="PageHeader"
        description="Page title, description and actions row with an optional back link above. Replaces AppPageHeader in pb-app."
        use="size lg for top-level pages (Dashboard, Athletes), the md default for detail pages. Actions wrap under the title on narrow screens; keep them to two buttons."
      />

      <Showcase title="Large, for top-level pages" hint="One primary action, optionally one quiet secondary.">
        <PageHeader
          size="lg"
          title="Dashboard"
          description="Everything your squad did this week, in one place."
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
      </Showcase>

      <Showcase
        title="Default, with back link"
        hint="Detail pages get the md title and a back link above it."
      >
        <PageHeader
          title="Mari Tamm"
          description="Powerlifting block 3, week 2 of 6"
          back={{ label: "Back to athletes", onClick: (e) => e.preventDefault() }}
          actions={
            <>
              <Button variant="secondary" size="sm">
                Message
              </Button>
              <Button variant="soft" size="sm">
                Edit plan
              </Button>
            </>
          }
        />
      </Showcase>

      <ExampleBlock
        title="Session detail header"
        description="Back link, rich title area and actions; the description slot takes any node, here a pill next to text."
      >
        <PageHeader
          title="Fingerboard: max hangs"
          description={
            <span className="inline-flex items-center gap-2">
              <TagPill>Week 3</TagPill>
              Tomorrow 07:30 with Coach Kadri
            </span>
          }
          back={{ label: "Back to plan", onClick: (e) => e.preventDefault() }}
          actions={<Button size="sm">Start session</Button>}
        />
      </ExampleBlock>

      <CodeBlock
        code={`
import { PageHeader } from "@pinchblock/ui"

<PageHeader
  size="lg"
  title="Dashboard"
  description="Everything your squad did this week, in one place."
  actions={<Button size="sm"><Plus /> New session</Button>}
/>

// Detail page with a back link:
<PageHeader
  title="Mari Tamm"
  back={{ label: "Back to athletes", href: "/athletes" }}
/>
`}
      />
    </div>
  )
}
