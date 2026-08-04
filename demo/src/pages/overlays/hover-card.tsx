import { Button } from "../../../../src/components/ui/button.tsx"
import {
  HoverCard,
  HoverCardPopup,
  HoverCardTrigger,
} from "../../../../src/components/ui/hover-card.tsx"
import { Toaster, toast } from "../../../../src/components/ui/toast.tsx"
import { CodeBlock, ExampleBlock, PageIntro, Showcase } from "../../sink/showcase.tsx"

/** Shared demo profile card: one coach preview reused by both demos
 * below, the shape FollowsHoverCard fills from real data. */
function CoachHoverCard({ children }: { children: string }) {
  return (
    <HoverCard>
      <HoverCardTrigger
        href="#hover-card"
        className="font-medium text-primary underline-offset-4 hover:underline"
      >
        {children}
      </HoverCardTrigger>
      <HoverCardPopup>
        <div className="flex items-start gap-3">
          <span
            aria-hidden
            className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary-soft text-base font-semibold text-primary"
          >
            MK
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate font-semibold text-foreground">Maria Kask</p>
            <p className="text-xs text-muted-foreground">
              Strength coach, Tallinn. Powerlifting and GPP.
            </p>
            <div className="mt-2 flex gap-4 text-xs text-muted-foreground">
              <span>
                <strong className="text-foreground">128</strong> athletes
              </span>
              <span>
                <strong className="text-foreground">12</strong> programs
              </span>
              <span>
                <strong className="text-foreground">4.9</strong> rating
              </span>
            </div>
          </div>
        </div>
        <Button
          size="sm"
          className="mt-3 w-full"
          onClick={() => toast.success("Following Maria Kask")}
        >
          Follow
        </Button>
      </HoverCardPopup>
    </HoverCard>
  )
}

export default function HoverCardPage() {
  return (
    <div>
      <PageIntro
        title="HoverCard"
        description="Rich preview that opens on hover (600ms delay) or keyboard focus. On touch screens the first tap opens the preview instead of navigating; a second tap follows the link."
        use="Profile and entity previews in feeds, comments and attributions, like FollowsHoverCard. It is a preview, not a menu: nothing required may live only inside it, because hover surfaces are skippable."
      />

      <Showcase
        title="Inline mention"
        hint="Hover or focus the handle. The trigger is a real link; the card adds context without a navigation."
      >
        <p className="max-w-md text-sm text-foreground">
          Programmed by <CoachHoverCard>@coach_maria</CoachHoverCard> with progression
          based on your last block.
        </p>
      </Showcase>

      <ExampleBlock
        title="Program card attribution"
        description="The same preview attached to a coach credit on a program card; one hover answers who this coach is without leaving the list."
      >
        <div className="max-w-md rounded-xl border border-border bg-card p-4">
          <p className="font-medium text-card-foreground">Hypertrophy Block II</p>
          <p className="text-sm text-muted-foreground">8 weeks, 4 sessions per week</p>
          <p className="mt-3 text-xs text-muted-foreground">
            By <CoachHoverCard>@coach_maria</CoachHoverCard>, 128 athletes coached
          </p>
        </div>
      </ExampleBlock>

      <CodeBlock
        code={`
import { HoverCard, HoverCardTrigger, HoverCardPopup } from "@pinchblock/ui"

<HoverCard>
  <HoverCardTrigger href="/coach/maria">@coach_maria</HoverCardTrigger>
  <HoverCardPopup>
    {/* avatar, name, stats, follow button */}
  </HoverCardPopup>
</HoverCard>
`}
      />

      <Toaster />
    </div>
  )
}
