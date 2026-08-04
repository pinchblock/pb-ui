import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "../../../../src/components/ui/accordion.tsx"
import { Card, CardContent } from "../../../../src/components/ui/card.tsx"
import { CodeBlock, ExampleBlock, PageIntro, Showcase } from "../../sink/showcase.tsx"

export default function AccordionPage() {
  return (
    <div>
      <PageIntro
        title="Accordion"
        description="Base UI Accordion styled for Pinchblock; replaces details/summary disclosures. The chevron rotates and panel height animates with motion tokens, both respecting prefers-reduced-motion."
        use="For FAQ blocks, optional detail sections and progressive disclosure inside settings. Single-open by default; pass multiple when sections are independent reference material."
      />

      <Showcase
        title="Single open (default)"
        hint="Opening one panel closes the previous one. defaultValue preselects a panel."
      >
        <Accordion defaultValue={["technique"]}>
          <AccordionItem value="technique">
            <AccordionTrigger>How are technique videos reviewed?</AccordionTrigger>
            <AccordionPanel>
              Upload a set from any angle. Your coach annotates bar path and depth frame by
              frame and replies within 24 hours on training days.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem value="streaks">
            <AccordionTrigger>What counts towards my streak?</AccordionTrigger>
            <AccordionPanel>
              Any completed session, logged recovery day or mobility block counts. Rest days
              planned by your coach never break a streak.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem value="pause">
            <AccordionTrigger>Can I pause my plan during holidays?</AccordionTrigger>
            <AccordionPanel>
              Yes, up to 4 weeks per year. Your program picks up with a ramp-in week so the
              first session back does not wreck you.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Showcase>

      <Showcase
        title="Multiple open"
        hint="Pass multiple when panels are independent and comparing them side by side helps."
      >
        <Accordion multiple defaultValue={["warmup", "strength"]}>
          <AccordionItem value="warmup">
            <AccordionTrigger>Warm-up protocol</AccordionTrigger>
            <AccordionPanel>
              5 minutes easy rowing, banded shoulder circuit, two ramp-up sets per lift.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem value="strength">
            <AccordionTrigger>Strength block</AccordionTrigger>
            <AccordionPanel>
              Squat 4x6 at RPE 7, pause bench 3x5, keep 2 minutes rest between sets.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem value="cooldown">
            <AccordionTrigger>Cool-down</AccordionTrigger>
            <AccordionPanel>Hip flexor stretch, thoracic rotations, log how the session felt.</AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Showcase>

      <ExampleBlock
        title="Membership FAQ inside a Card"
        description="The standard help-page shape: an Accordion in CardContent, borders provided by the items."
      >
        <Card className="max-w-xl">
          <CardContent className="pt-6">
            <Accordion>
              <AccordionItem value="coach">
                <AccordionTrigger>Can I switch coaches mid-block?</AccordionTrigger>
                <AccordionPanel>
                  Yes. Your training history, PRs and open check-ins move with you; the new
                  coach sees everything from day one.
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem value="refund">
                <AccordionTrigger>What is the refund policy?</AccordionTrigger>
                <AccordionPanel>
                  Full refund within 14 days of the first paid session, no questions asked.
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </ExampleBlock>

      <CodeBlock
        code={`
import { Accordion, AccordionItem, AccordionTrigger, AccordionPanel } from "@pinchblock/ui"

<Accordion defaultValue={["technique"]}>   {/* add \`multiple\` for independent panels */}
  <AccordionItem value="technique">
    <AccordionTrigger>How are technique videos reviewed?</AccordionTrigger>
    <AccordionPanel>Your coach annotates bar path frame by frame.</AccordionPanel>
  </AccordionItem>
</Accordion>
`}
      />
    </div>
  )
}
