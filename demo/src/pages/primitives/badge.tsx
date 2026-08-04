import { Calendar, Flame, Sparkle, TrendUp } from "@phosphor-icons/react"
import { useState } from "react"

import { Badge, Button, TagPill } from "@pinchblock/ui"
import { CodeBlock, ExampleBlock, PageIntro, Showcase, VariantRow } from "../../sink/showcase.tsx"

const TONES = ["neutral", "primary", "success", "warning", "destructive", "info", "ai"] as const

const SPORT_TAGS = ["Climbing", "Bouldering", "Strength", "Mobility", "Endurance"]

function RemovableTags() {
  const [tags, setTags] = useState(SPORT_TAGS)
  return (
    <div className="flex flex-wrap items-center gap-2">
      {tags.map((tag) => (
        <TagPill
          key={tag}
          onRemove={() => setTags((current) => current.filter((t) => t !== tag))}
          removeLabel={`Remove ${tag}`}
        >
          {tag}
        </TagPill>
      ))}
      {tags.length < SPORT_TAGS.length ? (
        <Button variant="ghost" size="sm" onClick={() => setTags(SPORT_TAGS)}>
          Reset
        </Button>
      ) : null}
    </div>
  )
}

/** Covers Badge and TagPill (always designed and reviewed as a pair). */
export default function BadgePage() {
  return (
    <div>
      <PageIntro
        title="Badge"
        description="Status pills and inline chips, plus TagPill for quieter sport tags and filters. Replaces every hand-rolled chip."
        use="Soft (default) for chips and quiet emphasis; solid only when a status must dominate a row. The ai tone marks AI-assisted moments and nothing else. Reach for TagPill instead of Badge when the label is a tag, not a status."
      />

      <Showcase
        title="Tones"
        hint="Soft on top, solid below. The ai tone always renders the AI surface treatment, regardless of appearance."
      >
        <div className="space-y-3">
          <VariantRow>
            {TONES.map((tone) => (
              <Badge key={tone} tone={tone}>
                {tone}
              </Badge>
            ))}
          </VariantRow>
          <VariantRow>
            {TONES.map((tone) => (
              <Badge key={tone} tone={tone} appearance="solid">
                {tone}
              </Badge>
            ))}
          </VariantRow>
        </div>
      </Showcase>

      <Showcase title="Sizes and leading icons" hint="sm (default) and md; the icon slot sizes itself.">
        <VariantRow>
          <Badge tone="primary" icon={<Flame />}>
            12-week streak
          </Badge>
          <Badge tone="primary" size="md" icon={<Flame />}>
            12-week streak
          </Badge>
          <Badge tone="success" size="md" icon={<TrendUp />}>
            New PR
          </Badge>
          <Badge tone="ai" size="md" icon={<Sparkle />}>
            AI suggested
          </Badge>
          <Badge tone="warning" icon={<Calendar />}>
            Deload week
          </Badge>
        </VariantRow>
      </Showcase>

      <Showcase
        title="TagPill"
        hint="Quieter than Badge: sport tags, interests, filters. The remove button stays keyboard-operable."
      >
        <div className="space-y-3">
          <VariantRow>
            <TagPill size="sm">Bouldering</TagPill>
            <TagPill>Sport climbing</TagPill>
            <TagPill>Trail running</TagPill>
          </VariantRow>
          <RemovableTags />
        </div>
      </Showcase>

      <ExampleBlock
        title="Session statuses"
        description="One badge per row; solid only where the status must dominate (PR day)."
      >
        <div className="max-w-sm divide-y divide-border">
          {(
            [
              ["Tuesday: Limit bouldering", <Badge key="b" tone="success">Completed</Badge>],
              ["Thursday: Fingerboard", <Badge key="b" tone="destructive">Missed</Badge>],
              ["Saturday: Outdoor project", <Badge key="b" tone="info">Upcoming</Badge>],
              ["Sunday: Max hangs test", <Badge key="b" tone="primary" appearance="solid">PR day</Badge>],
            ] as const
          ).map(([session, badge]) => (
            <div key={session} className="flex items-center justify-between gap-3 py-2">
              <span className="truncate text-sm text-foreground">{session}</span>
              {badge}
            </div>
          ))}
        </div>
      </ExampleBlock>

      <CodeBlock
        code={`
import { Badge, TagPill } from "@pinchblock/ui"

<Badge tone="success">Completed</Badge>
<Badge tone="primary" icon={<Flame />}>12-week streak</Badge>
<Badge tone="ai" icon={<Sparkle />}>AI suggested</Badge>

<TagPill onRemove={() => removeTag("Bouldering")} removeLabel="Remove Bouldering">
  Bouldering
</TagPill>
`}
      />
    </div>
  )
}
