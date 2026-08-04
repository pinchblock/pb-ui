import { useState } from "react"

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Stepper,
} from "@pinchblock/ui"
import { CodeBlock, ExampleBlock, PageIntro, Showcase, VariantRow } from "../../sink/showcase.tsx"

export default function StepperPage() {
  const [step, setStep] = useState(1)

  return (
    <div>
      <PageIntro
        title="Stepper"
        description="Horizontal step indicator: dots (numbered circles with connectors, completed steps show a check) or bars (flat segments). Presentational, not interactive."
        use="Dots for onboarding wizards and plan builders, paired with Back/Continue buttons. Bars for in-workout progress and quick multi-step sheets. Screen readers get step N of M plus per-step state."
      />

      <Showcase title="Dots, wired to buttons" hint="activeStep is 0-based; steps before it render as completed.">
        <div className="space-y-4">
          <Stepper steps={["Goals", "Schedule", "Equipment", "Review"]} activeStep={step} />
          <VariantRow>
            <Button
              variant="secondary"
              size="sm"
              disabled={step === 0}
              onClick={() => setStep((s) => Math.max(0, s - 1))}
            >
              Back
            </Button>
            <Button size="sm" disabled={step === 3} onClick={() => setStep((s) => Math.min(3, s + 1))}>
              Continue
            </Button>
          </VariantRow>
        </div>
      </Showcase>

      <Showcase title="Bars" hint="Labels are optional; empty strings keep the slot without text.">
        <div className="space-y-8">
          <Stepper
            variant="bars"
            steps={["Warm-up", "Strength", "Conditioning", "Cool-down"]}
            activeStep={2}
          />
          <Stepper variant="bars" steps={["", "", "", "", ""]} activeStep={3} />
        </div>
      </Showcase>

      <ExampleBlock
        title="In-workout progress"
        description="Unlabeled bars at the top of the active session card; one segment per exercise."
      >
        <Card className="max-w-md">
          <CardHeader>
            <Stepper variant="bars" steps={["", "", "", "", ""]} activeStep={2} aria-label="Exercise 3 of 5" />
            <CardTitle className="pt-2">Romanian deadlift</CardTitle>
            <CardDescription>Exercise 3 of 5, set 2 of 4 at 90 kg</CardDescription>
          </CardHeader>
          <CardContent className="flex gap-2">
            <Button size="sm">Log set</Button>
            <Button variant="ghost" size="sm">
              Skip exercise
            </Button>
          </CardContent>
        </Card>
      </ExampleBlock>

      <CodeBlock
        code={`
import { Stepper } from "@pinchblock/ui"

// Wizard (pair with Back/Continue buttons):
<Stepper steps={["Goals", "Schedule", "Equipment", "Review"]} activeStep={step} />

// In-workout progress, one bar per exercise:
<Stepper variant="bars" steps={["", "", "", "", ""]} activeStep={2} />
`}
      />
    </div>
  )
}
