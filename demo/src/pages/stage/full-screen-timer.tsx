import { ArrowsClockwise } from "@phosphor-icons/react"
import { useEffect, useRef, useState } from "react"

import { Button, FeelPicker, FullScreenTimer, PhoneFrame, type FullScreenTimerPhase } from "@pinchblock/ui"
import { CodeBlock, PageIntro, Showcase } from "../../sink/showcase.tsx"

/* Fake 30-second cycle: 20s work, 10s rest, looping exercises. */
const WORK_SECONDS = 20
const REST_SECONDS = 10
const EXERCISES = ["Max hangs", "Weighted pull-ups", "Core circuit"]

const exerciseAt = (round: number): string =>
  EXERCISES[round % EXERCISES.length] ?? "Max hangs"

interface CycleState {
  phase: FullScreenTimerPhase
  secondsLeft: number
  round: number
}

const INITIAL: CycleState = { phase: "work", secondsLeft: WORK_SECONDS, round: 0 }

function tick(s: CycleState): CycleState {
  if (s.secondsLeft > 1) return { ...s, secondsLeft: s.secondsLeft - 1 }
  return s.phase === "work"
    ? { ...s, phase: "rest", secondsLeft: REST_SECONDS }
    : { phase: "work", secondsLeft: WORK_SECONDS, round: s.round + 1 }
}

function LiveCycleDemo() {
  const [state, setState] = useState<CycleState>(INITIAL)
  const resumeRef = useRef<"work" | "rest">("work")
  const running = state.phase === "work" || state.phase === "rest"

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => setState(tick), 1000)
    return () => clearInterval(id)
  }, [running])

  /* The phase the clock is (or was) counting, for labels and totals. */
  const activePhase = state.phase === "paused" ? resumeRef.current : state.phase
  const totalSeconds = activePhase === "rest" ? REST_SECONDS : WORK_SECONDS
  const label =
    state.phase === "done"
      ? "Session complete"
      : activePhase === "work"
        ? exerciseAt(state.round)
        : "Shake it out"
  const nextLabel = activePhase === "work" ? "Rest" : exerciseAt(state.round + 1)

  return (
    <div className="flex flex-col items-center gap-4">
      <PhoneFrame>
        <div className="absolute inset-0">
          <FullScreenTimer
            phase={state.phase}
            secondsLeft={state.secondsLeft}
            totalSeconds={totalSeconds}
            label={label}
            nextLabel={nextLabel}
            onPause={() =>
              setState((s) => {
                if (s.phase === "work" || s.phase === "rest") resumeRef.current = s.phase
                return { ...s, phase: "paused" }
              })
            }
            onResume={() => setState((s) => ({ ...s, phase: resumeRef.current }))}
            onSkip={() =>
              setState((s) => {
                const from = s.phase === "paused" ? resumeRef.current : s.phase
                return from === "work"
                  ? { ...s, phase: "rest", secondsLeft: REST_SECONDS }
                  : { phase: "work", secondsLeft: WORK_SECONDS, round: s.round + 1 }
              })
            }
            onExit={() => setState((s) => ({ ...s, phase: "done", secondsLeft: 0 }))}
          >
            {state.phase === "done" ? (
              <div className="flex flex-col items-center gap-2">
                <p className="text-sm text-muted-foreground">How did it feel?</p>
                <FeelPicker aria-label="Session effort" size="sm" />
              </div>
            ) : null}
          </FullScreenTimer>
        </div>
      </PhoneFrame>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => {
          resumeRef.current = "work"
          setState(INITIAL)
        }}
      >
        <ArrowsClockwise aria-hidden /> Restart cycle
      </Button>
    </div>
  )
}

const noop = () => {}

export default function FullScreenTimerPage() {
  return (
    <div>
      <PageIntro
        title="FullScreenTimer"
        description="The immersive countdown surface on stage tokens: phase-colored ring (work = success, rest = info), rolling mm:ss numerals and large touch controls, identical in every theme and mode."
        use="Purely presentational: the app owns the interval clock and passes phase plus secondsLeft down; callbacks report intent back up. Render it full-screen in the app; the done phase pairs with FeelPicker in the children slot for effort capture."
      />

      <Showcase
        title="Live 20s work / 10s rest cycle"
        hint="Phase flips pop with springPop and re-color the ring. Space pauses or resumes, Escape exits (this interactive demo only). Reduced motion swaps states without the spring."
      >
        <LiveCycleDemo />
      </Showcase>

      <Showcase
        title="Paused and done"
        hint="Paused mutes the ring and numerals and swaps the center control to Resume. Done closes the ring and frees the children slot for effort capture."
      >
        <div className="flex flex-wrap items-start justify-center gap-8">
          <PhoneFrame>
            <div className="absolute inset-0">
              <FullScreenTimer
                phase="paused"
                secondsLeft={73}
                totalSeconds={120}
                label="Weighted pull-ups"
                nextLabel="Core circuit"
                keyboardShortcuts={false}
                onResume={noop}
                onSkip={noop}
                onExit={noop}
              />
            </div>
          </PhoneFrame>
          <PhoneFrame>
            <div className="absolute inset-0">
              <FullScreenTimer
                phase="done"
                secondsLeft={0}
                totalSeconds={120}
                label="Session complete"
                keyboardShortcuts={false}
                onExit={noop}
              >
                <div className="flex flex-col items-center gap-2">
                  <p className="text-sm text-muted-foreground">How did it feel?</p>
                  <FeelPicker aria-label="Session effort" size="sm" />
                </div>
              </FullScreenTimer>
            </div>
          </PhoneFrame>
        </div>
      </Showcase>

      <CodeBlock
        code={`
import { FeelPicker, FullScreenTimer } from "@pinchblock/ui"

// The app owns the clock; the timer is a pure projection of it.
<FullScreenTimer
  phase={phase}            // "work" | "rest" | "paused" | "done"
  secondsLeft={secondsLeft}
  totalSeconds={phaseLength}
  label="Max hangs"
  nextLabel="Rest"
  onPause={pause}
  onResume={resume}
  onSkip={skip}
  onExit={exit}
>
  {phase === "done" ? (
    <FeelPicker aria-label="Session effort" onValueChange={saveEffort} />
  ) : null}
</FullScreenTimer>

// Space = pause/resume, Escape = exit; keyboardShortcuts={false} opts out.
`}
      />
    </div>
  )
}
