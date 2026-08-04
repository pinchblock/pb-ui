import { motion } from "motion/react"
import { ArrowsClockwise, Barbell, Flame, Trophy } from "@phosphor-icons/react"
import { useState } from "react"

import { Button } from "../../../../src/components/ui/button.tsx"
import {
  Reveal,
  fadeInUp,
  springPop,
  staggerChildren,
} from "../../../../src/lib/motion.ts"
import { CodeBlock, ExampleBlock, PageIntro, Showcase } from "../../sink/showcase.tsx"

function StaggerDemo() {
  const [replay, setReplay] = useState(0)
  const rows = [
    { icon: Flame, label: "Streak", value: "21 days" },
    { icon: Barbell, label: "Sessions this week", value: "4 of 5" },
    { icon: Trophy, label: "PRs this month", value: "3" },
  ]
  return (
    <div className="flex flex-col items-start gap-4">
      <motion.ul
        key={replay}
        initial="hidden"
        animate="visible"
        variants={staggerChildren()}
        className="w-full max-w-sm space-y-2"
      >
        {rows.map(({ icon: Icon, label, value }) => (
          <motion.li
            key={label}
            variants={fadeInUp}
            className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3"
          >
            <Icon aria-hidden className="size-4 text-primary" />
            <span className="flex-1 text-sm text-muted-foreground">{label}</span>
            <span className="text-sm font-semibold text-foreground">{value}</span>
          </motion.li>
        ))}
      </motion.ul>
      <Button variant="secondary" size="sm" onClick={() => setReplay((n) => n + 1)}>
        <ArrowsClockwise aria-hidden /> Replay stagger
      </Button>
    </div>
  )
}

function RevealDemo() {
  const [replay, setReplay] = useState(0)
  return (
    <div className="flex flex-col items-start gap-4">
      <Reveal
        key={replay}
        className="w-full max-w-sm rounded-xl border border-border bg-card p-5"
      >
        <p className="eyebrow mb-1">Session summary</p>
        <p className="text-sm font-semibold text-foreground">
          Lower body strength, 52 min
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Back squat 5x5 at 120 kg, Romanian deadlift 3x8, box jumps. Coach Maria
          left 2 comments on your squat clips.
        </p>
      </Reveal>
      <Button variant="secondary" size="sm" onClick={() => setReplay((n) => n + 1)}>
        <ArrowsClockwise aria-hidden /> Replay Reveal
      </Button>
    </div>
  )
}

function PrCelebration() {
  const [replay, setReplay] = useState(0)
  return (
    <div className="flex flex-col items-start gap-4">
      <motion.div
        key={replay}
        initial="hidden"
        animate="visible"
        variants={springPop}
        className="flex items-center gap-4 rounded-xl border border-primary-border bg-primary-soft p-5"
      >
        <span className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Trophy aria-hidden className="size-6" />
        </span>
        <div>
          <p className="text-sm font-semibold text-primary">New PR!</p>
          <p className="text-lg font-bold text-foreground">Deadlift 180 kg</p>
          <p className="text-xs text-muted-foreground">+5 kg over your March best</p>
        </div>
      </motion.div>
      <Button variant="secondary" size="sm" onClick={() => setReplay((n) => n + 1)}>
        <ArrowsClockwise aria-hidden /> Replay springPop
      </Button>
    </div>
  )
}

export default function MotionPage() {
  return (
    <div>
      <PageIntro
        title="Motion presets"
        description="The Motion for React vocabulary in src/lib/motion.ts. Every duration and easing derives from the token source at module load, so JS animation can never drift from CSS."
        use="Use these presets instead of ad-hoc duration literals. CSS transitions handle micro-interactions; Motion handles springs, layout moves and exits. Overshoot (springPop) is reserved for reward moments: streaks, PRs, reactions, never navigation."
      />

      <Showcase
        title="staggerChildren + fadeInUp"
        hint="Parent cascades hidden/visible to children with a token-fast interval. Children declare their own variants."
      >
        <StaggerDemo />
      </Showcase>

      <Showcase
        title="Reveal"
        hint="whileInView fade-up, fires once. Under prefers-reduced-motion it falls back to a pure opacity fade."
      >
        <RevealDemo />
      </Showcase>

      <ExampleBlock
        title="New PR celebration"
        description="springPop, the reward-moment overshoot: the one place playful easing is allowed."
      >
        <PrCelebration />
      </ExampleBlock>

      <CodeBlock
        code={`
import { motion } from "motion/react"
import { Reveal, fadeInUp, springPop, staggerChildren } from "@pinchblock/ui"

// Reward pop: streaks, PRs, reactions only, never navigation.
<motion.div initial="hidden" animate="visible" variants={springPop}>
  New PR!
</motion.div>

// Staggered list entrance.
<motion.ul initial="hidden" animate="visible" variants={staggerChildren()}>
  {items.map((item) => (
    <motion.li key={item.id} variants={fadeInUp}>{item.label}</motion.li>
  ))}
</motion.ul>

// Scroll-into-view reveal; pure fade under prefers-reduced-motion.
<Reveal>Session summary</Reveal>
`}
      />
    </div>
  )
}
