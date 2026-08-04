import { Barbell, CalendarDots } from "@phosphor-icons/react"

import { Button } from "../../../../src/components/ui/button.tsx"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../src/components/ui/card.tsx"
import { CodeBlock, ExampleBlock, PageIntro, Showcase } from "../../sink/showcase.tsx"

export default function CardPage() {
  return (
    <div>
      <PageIntro
        title="Card"
        description="Compound surface: Card plus CardHeader, CardTitle, CardDescription, CardContent and CardFooter. Compose the parts; no boolean-prop soup."
        use="Default for app surfaces, interactive when the whole card is a click target, glass for PUBLIC marketing pages only (authenticated app cards stay solid), sunken for inset wells nested inside another card."
      />

      <Showcase
        title="Variants"
        hint="Glass collapses to solid automatically in light themes; do not fight it."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Push day</CardTitle>
              <CardDescription>Tomorrow 07:30 with Coach Kadri</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Bench 5x5 at 80%, incline dumbbell press, dips, tricep work. 60 min.
            </CardContent>
            <CardFooter>
              <Button size="sm">Start session</Button>
              <Button variant="ghost" size="sm">
                Reschedule
              </Button>
            </CardFooter>
          </Card>

          <Card variant="interactive" tabIndex={0} role="button" aria-label="Open leg day session">
            <CardHeader>
              <CardTitle>Leg day (interactive)</CardTitle>
              <CardDescription>Hover or focus me: whole card is the click target</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Squat 4x6, Romanian deadlift, walking lunges, calf raises.
            </CardContent>
          </Card>

          <Card variant="glass">
            <CardHeader>
              <CardTitle>Glass (marketing only)</CardTitle>
              <CardDescription>
                For public pages and overlays; authenticated app cards stay solid.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              In light themes glass collapses to solid automatically.
            </CardContent>
          </Card>

          <Card variant="sunken">
            <CardHeader>
              <CardTitle>Sunken</CardTitle>
              <CardDescription>Borderless inset well for nested regions</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Use inside a default Card for logs, code, raw data.
            </CardContent>
          </Card>
        </div>
      </Showcase>

      <ExampleBlock
        title="Session card with a nested well"
        description="A default Card composing header, sunken notes well and footer actions, the standard plan-view shape."
      >
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Fingerboard: max hangs</CardTitle>
            <CardDescription>
              <span className="inline-flex items-center gap-1">
                <CalendarDots aria-hidden className="size-4" />
                Week 3, day 2. 6 sets planned.
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Card variant="sunken" className="p-4 text-sm text-muted-foreground">
              Coach note: half-crimp only, 10 s hangs at 85%. Stop the set if the wrist
              niggle from Tuesday shows up again.
            </Card>
          </CardContent>
          <CardFooter>
            <Button size="sm">
              <Barbell aria-hidden />
              Start session
            </Button>
            <Button variant="ghost" size="sm">
              Skip today
            </Button>
          </CardFooter>
        </Card>
      </ExampleBlock>

      <CodeBlock
        code={`
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@pinchblock/ui"

<Card>
  <CardHeader>
    <CardTitle>Push day</CardTitle>
    <CardDescription>Tomorrow 07:30 with Coach Kadri</CardDescription>
  </CardHeader>
  <CardContent>Bench 5x5 at 80%, then accessories.</CardContent>
  <CardFooter>
    <Button size="sm">Start session</Button>
  </CardFooter>
</Card>

// Clickable card:
<Card variant="interactive" role="button" tabIndex={0} onClick={open} />
`}
      />
    </div>
  )
}
