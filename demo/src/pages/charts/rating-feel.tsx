import { Trophy } from "@phosphor-icons/react"
import { useState } from "react"

import {
  FEEL_LABELS,
  FeelBadge,
  FeelDot,
  FeelPicker,
  type FeelValue,
} from "../../../../src/components/rating-feel.tsx"
import { Badge } from "../../../../src/components/ui/badge.tsx"
import { CodeBlock, ExampleBlock, PageIntro, Showcase, VariantRow } from "../../sink/showcase.tsx"

const SESSIONS = [
  { day: "Thu, May 15", title: "Lower body strength", load: "8.0 RPE", feel: 4 as const, pr: false },
  { day: "Mon, May 12", title: "Squat day, top single", load: "8.5 RPE", feel: 5 as const, pr: true },
  { day: "Thu, May 8", title: "Upper body volume", load: "7.0 RPE", feel: 4 as const, pr: false },
  { day: "Mon, May 5", title: "Intervals 6x800m", load: "8.0 RPE", feel: 5 as const, pr: false },
]

function FeelPickerLive() {
  const [feel, setFeel] = useState<FeelValue>(4)
  return (
    <div className="flex flex-wrap items-center gap-6">
      <FeelPicker value={feel} onValueChange={setFeel} aria-label="How did the session feel?" />
      <p className="text-sm text-muted-foreground">
        Session felt <span className="font-medium text-foreground">{FEEL_LABELS[feel]}</span> (
        {feel}/5)
      </p>
    </div>
  )
}

export default function RatingFeelPage() {
  return (
    <div>
      <PageIntro
        title="Rating feel"
        description="The 1-5 session feel family: FeelPicker (input), FeelDot and FeelBadge (display), plus FEEL_LABELS and the FeelValue type. All four ride the feel-1..5 tokens, so the scale reads identically in every theme."
        use="FeelPicker is the post-session check-in input; FeelDot marks rows and chart points; FeelBadge summarizes a session or week in words. They ship together because a feel captured by one is always displayed by the others; never rebuild the scale with stars or emoji."
      />

      <Showcase
        title="FeelPicker"
        hint="Radiogroup semantics (arrow keys work), five circles tinted feel-1..5, selection pops with ease-spring."
      >
        <div className="space-y-4">
          <FeelPickerLive />
          <VariantRow>
            <FeelPicker size="sm" defaultValue={3} aria-label="Feel, small" />
            <FeelPicker size="lg" defaultValue={5} aria-label="Feel, large" />
            <FeelPicker defaultValue={2} disabled aria-label="Feel, disabled" />
          </VariantRow>
        </div>
      </Showcase>

      <Showcase title="FeelDot and FeelBadge" hint="Display atoms for lists and session cards.">
        <div className="space-y-4">
          <VariantRow>
            {([1, 2, 3, 4, 5] as const).map((feel) => (
              <FeelDot key={feel} feel={feel} />
            ))}
            <FeelDot feel={4} size="sm" />
            <FeelDot feel={4} size="lg" />
          </VariantRow>
          <VariantRow>
            {([1, 2, 3, 4, 5] as const).map((feel) => (
              <FeelBadge key={feel} feel={feel} />
            ))}
            <FeelBadge feel={5}>Felt unstoppable</FeelBadge>
          </VariantRow>
        </div>
      </Showcase>

      <ExampleBlock
        title="Session log"
        description="Recent sessions with feel, load and a PR moment: dot up front for scanning, badge at the end for the word."
      >
        <div className="divide-y divide-border">
          {SESSIONS.map((session) => (
            <div key={session.day} className="flex items-center gap-4 py-3">
              <FeelDot feel={session.feel} />
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-2 truncate text-sm font-medium text-foreground">
                  {session.title}
                  {session.pr && (
                    <Badge tone="warning" icon={<Trophy aria-hidden />}>
                      PR
                    </Badge>
                  )}
                </p>
                <p className="text-xs text-muted-foreground">{session.day}</p>
              </div>
              <span className="text-xs text-muted-foreground tabular-nums">{session.load}</span>
              <FeelBadge feel={session.feel} />
            </div>
          ))}
        </div>
      </ExampleBlock>

      <CodeBlock
        code={`
import { FEEL_LABELS, FeelBadge, FeelDot, FeelPicker, type FeelValue } from "@pinchblock/ui"

// Post-session check-in (controlled):
const [feel, setFeel] = useState<FeelValue>(4)
<FeelPicker value={feel} onValueChange={setFeel} aria-label="How did the session feel?" />

// Display the captured feel elsewhere; colors are the feel-1..5 tokens.
<FeelDot feel={feel} />
<FeelBadge feel={feel} />           // labeled from FEEL_LABELS
<FeelBadge feel={5}>Felt unstoppable</FeelBadge>
`}
      />
    </div>
  )
}
