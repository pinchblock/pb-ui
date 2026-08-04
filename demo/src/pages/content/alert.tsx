import { Alert, Button } from "@pinchblock/ui"
import { CodeBlock, ExampleBlock, PageIntro, Showcase } from "../../sink/showcase.tsx"

export default function AlertPage() {
  return (
    <div>
      <PageIntro
        title="Alert"
        description="Inline banner for contextual feedback: tone icon, bold title, optional body, action slot and dismiss button. role=status by default, role=alert for destructive."
        use="For messages that belong to the page content, like a deload notice above the plan. Use Toast for transient confirmations instead. The ai tone marks AI-assisted moments only, never plain product messaging."
      />

      <Showcase
        title="Tones"
        hint="Status semantics are fixed across themes: destructive reads red, success green, warning amber."
      >
        <div className="space-y-3">
          <Alert tone="info" title="Deload week starts Monday">
            Volume drops to 60% across all programs. Athletes were notified.
          </Alert>
          <Alert tone="success" title="PR logged">
            Mari Tamm pulled 140 kg. That is a 5 kg personal record.
          </Alert>
          <Alert tone="warning" title="3 athletes have not checked in">
            Check-ins were due yesterday evening. Streaks break at midnight.
          </Alert>
          <Alert tone="destructive" title="Payment failed">
            The squad subscription could not be renewed. Update the card to keep bookings open.
          </Alert>
          <Alert tone="ai" title="Suggested progression">
            Based on the last 4 sessions, raise squat working weight by 2.5 kg and keep reps.
          </Alert>
        </div>
      </Showcase>

      <Showcase
        title="Action and dismiss"
        hint="The action slot renders under the body; dismissible adds a close button and the alert removes itself."
      >
        <div className="space-y-3">
          <Alert
            tone="warning"
            title="3 athletes have not checked in"
            action={
              <Button variant="secondary" size="sm">
                Send reminder
              </Button>
            }
          >
            Check-ins were due yesterday evening. Streaks break at midnight.
          </Alert>
          <Alert tone="info" title="New technique review ready" dismissible>
            Coach Kadri annotated your snatch video from Tuesday. Dismiss me to test the close button.
          </Alert>
        </div>
      </Showcase>

      <ExampleBlock
        title="Billing warning on the squad settings page"
        description="A destructive alert with a recovery action, placed where the problem gets fixed."
      >
        <div className="max-w-xl">
          <Alert
            tone="destructive"
            title="Payment failed"
            action={
              <Button variant="destructive" size="sm">
                Update payment method
              </Button>
            }
          >
            The squad subscription could not be renewed. Bookings pause in 5 days unless the
            card on file is updated.
          </Alert>
        </div>
      </ExampleBlock>

      <CodeBlock
        code={`
import { Alert } from "@pinchblock/ui"

<Alert tone="success" title="PR logged">
  Mari Tamm pulled 140 kg. That is a 5 kg personal record.
</Alert>

<Alert
  tone="warning"
  title="3 athletes have not checked in"
  action={<Button variant="secondary" size="sm">Send reminder</Button>}
  dismissible
  onDismiss={trackDismiss}
>
  Streaks break at midnight.
</Alert>
`}
      />
    </div>
  )
}
