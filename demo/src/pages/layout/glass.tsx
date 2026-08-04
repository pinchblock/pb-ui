import { ArrowRight, Barbell, Flame, Sparkle, Trophy } from "@phosphor-icons/react"

import { Button, Grow, Row, Stack } from "@pinchblock/ui"
import { CodeBlock, ExampleBlock, PageIntro, Showcase } from "../../sink/showcase.tsx"

/**
 * CSS utility showcase, not a component page: everything here ships in
 * src/styles/utilities.css and becomes plain classes once the
 * stylesheet is imported.
 */

function MarketingHero() {
  const exercises = [
    { name: "Deadlift", sets: "5 x 5 · 175 kg" },
    { name: "Weighted pull-up", sets: "4 x 8 · +20 kg" },
    { name: "Barbell row", sets: "4 x 10 · 90 kg" },
  ]
  return (
    <div className="pb-backdrop relative overflow-hidden rounded-xl border border-border bg-background-sunken">
      <div className="glass-header flex h-12 items-center gap-3 px-4">
        <span className="flex items-center gap-2 text-sm font-semibold">
          <span className="grid size-6 place-items-center rounded-md bg-primary text-primary-foreground">
            <Barbell aria-hidden className="size-3.5" />
          </span>
          Pinchblock
        </span>
        <Grow />
        <a href="#" className="glass-chip px-3 py-1 text-xs font-medium">
          Get the app
        </a>
      </div>
      <div className="px-6 py-10 sm:px-10">
        <Stack gap={6} align="start">
          <Stack gap={3} align="start">
            <span className="eyebrow">The Pinchblock method</span>
            <h2 className="max-w-lg text-display-sm font-display">
              <span className="text-gradient-primary">Coaching that travels</span> with you
            </h2>
            <p className="max-w-md text-sm text-muted-foreground">
              Programs written by real coaches, adjusted to your week. Log a session in
              under a minute and watch the streak grow.
            </p>
          </Stack>
          <Row gap={2} wrap>
            <span className="glass-chip flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium">
              <Flame aria-hidden className="size-3.5 text-warning" />
              21-day streak
            </span>
            <span className="glass-chip flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium">
              <Trophy aria-hidden className="size-3.5 text-success" />3 PRs this month
            </span>
            <span className="ai-surface flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium">
              <Sparkle aria-hidden className="size-3.5" />
              AI session insights
            </span>
          </Row>
          <div className="grid w-full gap-4 sm:grid-cols-2">
            <div className="glass-card p-5">
              <Stack gap={3} align="start">
                <Row gap={2} className="w-full">
                  <span className="text-sm font-semibold">Tuesday · Pull day</span>
                  <Grow />
                  <span className="text-xs text-muted-foreground">45 min</span>
                </Row>
                <Stack gap={2} className="w-full">
                  {exercises.map((exercise) => (
                    <Row key={exercise.name} gap={2} className="text-xs">
                      <span className="font-medium">{exercise.name}</span>
                      <Grow />
                      <span className="text-muted-foreground">{exercise.sets}</span>
                    </Row>
                  ))}
                </Stack>
                <Button size="sm">
                  Start session
                  <ArrowRight aria-hidden />
                </Button>
              </Stack>
            </div>
            <div className="glass-panel p-5">
              <Stack gap={3} align="start">
                <span className="text-sm font-semibold">Bring your coach along</span>
                <p className="text-xs text-muted-foreground">
                  Share your log with a coach, get the next block delivered every Sunday,
                  and celebrate PRs together.
                </p>
                <Row gap={2} wrap>
                  <Button size="sm" pill>
                    Start 14-day trial
                  </Button>
                  <Button size="sm" pill variant="ghost">
                    See pricing
                  </Button>
                </Row>
              </Stack>
            </div>
          </div>
        </Stack>
      </div>
      <div className="glass-footer flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-xs text-muted-foreground">
        <span>Pinchblock · Train with people who care</span>
        <span>iOS · Android · Web</span>
      </div>
    </div>
  )
}

export default function GlassPage() {
  return (
    <div>
      <PageIntro
        title="Glass & marketing"
        description="The marketing utility kit from the stylesheet: glass-card, glass-panel, glass-chip, glass-header, glass-footer, pb-backdrop, text-gradient-primary and eyebrow."
        use="Glass is for PUBLIC marketing surfaces, headers, sheets and overlays only; authenticated app cards stay solid. Light themes set --glass-filter to none, collapsing glass to solid automatically; do not fight it. Gradient headlines are B2C display accents, never body text."
      />

      <Showcase
        title="Glass surfaces"
        hint="Specimens over a pb-backdrop glow so the blur has something to blur. Toggle dark mode and themes above: light themes collapse to solid."
      >
        <div className="pb-backdrop grid gap-4 rounded-xl border border-border bg-background-sunken p-6 sm:grid-cols-2">
          <div className="glass-card p-4">
            <p className="font-mono text-xs text-muted-foreground">glass-card</p>
            <p className="mt-1 text-sm">Primary marketing surface: hero cards, feature tiles.</p>
          </div>
          <div className="glass-panel p-4">
            <p className="font-mono text-xs text-muted-foreground">glass-panel</p>
            <p className="mt-1 text-sm">Raised sibling for secondary panels and side rails.</p>
          </div>
          <Row gap={2} wrap className="sm:col-span-2">
            <span className="glass-chip px-3 py-1.5 font-mono text-xs">glass-chip</span>
            <span className="glass-chip flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium">
              <Flame aria-hidden className="size-3.5 text-warning" />
              21-day streak
            </span>
          </Row>
        </div>
      </Showcase>

      <Showcase
        title="Type accents"
        hint="eyebrow for uppercase section labels (marketing and dashboards); text-gradient-primary for display headlines only."
      >
        <Stack gap={3} align="start">
          <span className="eyebrow">The Pinchblock method</span>
          <h2 className="text-display-sm font-display">
            <span className="text-gradient-primary">Progress you can feel,</span> week after week
          </h2>
        </Stack>
      </Showcase>

      <ExampleBlock
        title="Marketing hero"
        description="The full kit in one surface: glass-header and glass-footer bookending a pb-backdrop hero with gradient headline, glass chips, glass-card session preview and the AI treatment."
      >
        <MarketingHero />
      </ExampleBlock>

      <CodeBlock
        code={`
/* app.css: utilities ship with the stylesheet */
@import "tailwindcss";
@import "@pinchblock/ui/styles/index.css";

/* Then they are plain classes: */
<section className="pb-backdrop">
  <header className="glass-header flex h-12 items-center px-4">…</header>
  <span className="eyebrow">The Pinchblock method</span>
  <h1 className="font-display text-display-lg">
    <span className="text-gradient-primary">Coaching that travels</span> with you
  </h1>
  <div className="glass-card p-5">Session preview</div>
  <span className="glass-chip px-3 py-1.5">21-day streak</span>
</section>
`}
      />
    </div>
  )
}
