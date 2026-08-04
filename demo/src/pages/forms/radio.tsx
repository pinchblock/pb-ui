import { Mountains, User, Users } from "@phosphor-icons/react"

import { Button } from "../../../../src/components/ui/button.tsx"
import { Label } from "../../../../src/components/ui/label.tsx"
import { RadioCard } from "../../../../src/components/ui/radio-card.tsx"
import { Radio, RadioGroup } from "../../../../src/components/ui/radio-group.tsx"
import { CodeBlock, ExampleBlock, PageIntro, Showcase } from "../../sink/showcase.tsx"

export default function RadioPage() {
  return (
    <div>
      <PageIntro
        title="Radio"
        description="One choice family, one Base UI radio underneath: RadioGroup coordinates roving focus and arrow-key selection; Radio renders the compact dot, RadioCard the card-styled option with free-form content and a check when selected."
        use="Dots for compact option lists inside forms; cards for role pickers, plan choices and onboarding steps where each option needs a description. Never mix a lone Radio outside a RadioGroup."
      />

      <Showcase
        title="RadioGroup with Radio dots"
        hint="Arrow keys move selection; disabled options are skipped."
      >
        <RadioGroup defaultValue="4x" aria-label="Training frequency">
          <span className="flex items-center gap-2">
            <Radio id="r-3x" value="3x" />
            <Label htmlFor="r-3x">3 sessions / week</Label>
          </span>
          <span className="flex items-center gap-2">
            <Radio id="r-4x" value="4x" />
            <Label htmlFor="r-4x">4 sessions / week</Label>
          </span>
          <span className="flex items-center gap-2">
            <Radio id="r-5x" value="5x" disabled />
            <Label htmlFor="r-5x">5 sessions / week (coach plan only)</Label>
          </span>
        </RadioGroup>
      </Showcase>

      <Showcase
        title="RadioCard"
        hint="Same group semantics, card styling: icon + title + description is the usual shape, check appears top-right when selected."
      >
        <RadioGroup defaultValue="coach" aria-label="Account role" className="max-w-sm gap-3">
          <RadioCard value="athlete">
            <span className="flex items-center gap-2 font-medium">
              <User aria-hidden className="size-4" /> Athlete
            </span>
            <span className="mt-1 block text-xs text-muted-foreground">
              Follow plans, log sessions, track streaks and PRs.
            </span>
          </RadioCard>
          <RadioCard value="coach">
            <span className="flex items-center gap-2 font-medium">
              <Users aria-hidden className="size-4" /> Coach
            </span>
            <span className="mt-1 block text-xs text-muted-foreground">
              Build plans, manage a roster, review athlete sessions.
            </span>
          </RadioCard>
          <RadioCard value="gym" disabled>
            <span className="flex items-center gap-2 font-medium">
              <Mountains aria-hidden className="size-4" /> Gym (coming soon)
            </span>
            <span className="mt-1 block text-xs text-muted-foreground">
              Manage walls, setters and community events.
            </span>
          </RadioCard>
        </RadioGroup>
      </Showcase>

      <ExampleBlock
        title="Onboarding: pick a plan focus"
        description="RadioCards as an onboarding step; the continue button acts on the selected value."
      >
        <div className="max-w-sm space-y-4">
          <p className="text-sm font-semibold text-foreground">What should this cycle focus on?</p>
          <RadioGroup defaultValue="power" aria-label="Plan focus" className="gap-3">
            <RadioCard value="power">
              <span className="font-medium">Power</span>
              <span className="mt-1 block text-xs text-muted-foreground">
                Limit boulders and campus work. 3 hard days a week.
              </span>
            </RadioCard>
            <RadioCard value="endurance">
              <span className="font-medium">Endurance</span>
              <span className="mt-1 block text-xs text-muted-foreground">
                Circuits and long routes. Higher volume, lower intensity.
              </span>
            </RadioCard>
          </RadioGroup>
          <Button className="w-full">Continue</Button>
        </div>
      </ExampleBlock>

      <CodeBlock
        code={`
import { Label, Radio, RadioCard, RadioGroup } from "@pinchblock/ui"

<RadioGroup value={freq} onValueChange={setFreq} aria-label="Frequency">
  <Radio id="f3" value="3x" />
  <Label htmlFor="f3">3 sessions / week</Label>
</RadioGroup>

// Card-styled options in the same group system:
<RadioGroup defaultValue="coach" aria-label="Role">
  <RadioCard value="athlete">Athlete</RadioCard>
  <RadioCard value="coach">Coach</RadioCard>
</RadioGroup>
`}
      />
    </div>
  )
}
