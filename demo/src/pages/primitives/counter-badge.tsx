import { Barbell, ChartLine, Chat, House } from "@phosphor-icons/react"

import { Avatar, CounterBadge, NotificationDot } from "@pinchblock/ui"
import { CodeBlock, ExampleBlock, PageIntro, Showcase, VariantRow } from "../../sink/showcase.tsx"

const NAV = [
  { icon: <House />, label: "Home", badge: null },
  { icon: <Barbell />, label: "Training", badge: <NotificationDot tone="primary" label="Plan updated" /> },
  { icon: <Chat />, label: "Messages", badge: <CounterBadge count={12} max={9} /> },
  { icon: <ChartLine />, label: "Progress", badge: null },
]

/** Covers CounterBadge and NotificationDot (one file, one unread-signal pair). */
export default function CounterBadgePage() {
  return (
    <div>
      <PageIntro
        title="CounterBadge"
        description="Unread-count pill and its quieter sibling NotificationDot. Both overlay avatars and icon buttons via surfaceRing, or sit inline in nav items and lists."
        use="CounterBadge when the number matters (unread messages), NotificationDot when it would be noise (something new exists). Destructive is the default attention tone; use primary for positive counts and neutral for passive ones."
      />

      <Showcase title="CounterBadge" hint="Counts above max render as max+ (default max 9).">
        <VariantRow>
          <CounterBadge count={3} />
          <CounterBadge count={42} max={9} />
          <CounterBadge count={120} max={99} />
          <CounterBadge count={7} tone="primary" />
          <CounterBadge count={2} tone="neutral" />
        </VariantRow>
      </Showcase>

      <Showcase
        title="NotificationDot"
        hint="Pass label for screen readers when the dot carries meaning; omit it for purely decorative dots."
      >
        <VariantRow>
          <NotificationDot />
          <NotificationDot tone="success" label="Online" />
          <NotificationDot tone="warning" />
          <NotificationDot tone="primary" />
        </VariantRow>
      </Showcase>

      <Showcase
        title="Overlaid with surfaceRing"
        hint="surfaceRing cuts a card-colored ring so the badge reads cleanly on top of avatars and buttons."
      >
        <VariantRow>
          <span className="relative inline-flex">
            <Avatar size="lg" name="Maria Kask" />
            <NotificationDot
              tone="success"
              surfaceRing
              label="Online"
              className="absolute right-0.5 bottom-0.5"
            />
          </span>
          <span className="relative inline-flex">
            <Avatar size="lg" name="Jorge Vidal" />
            <CounterBadge count={4} surfaceRing className="absolute -top-1 -right-1" />
          </span>
        </VariantRow>
      </Showcase>

      <ExampleBlock
        title="Tab bar signals"
        description="Inline in nav items: a count where the number matters, a dot where it does not."
      >
        <nav className="flex max-w-md items-center justify-between rounded-xl border border-border bg-card px-2 py-1.5">
          {NAV.map(({ icon, label, badge }) => (
            <button
              key={label}
              type="button"
              className="relative flex flex-col items-center gap-0.5 rounded-md px-4 py-1.5 text-muted-foreground transition-colors duration-(--duration-fast) hover:bg-muted hover:text-foreground [&_svg]:size-5"
            >
              {icon}
              <span className="text-xs">{label}</span>
              {badge ? <span className="absolute top-0.5 right-2.5">{badge}</span> : null}
            </button>
          ))}
        </nav>
      </ExampleBlock>

      <CodeBlock
        code={`
import { CounterBadge, NotificationDot } from "@pinchblock/ui"

<CounterBadge count={unread} max={9} />
<NotificationDot tone="success" label="Online" />

// Overlaid on an avatar:
<span className="relative inline-flex">
  <Avatar name={coach.name} />
  <CounterBadge count={4} surfaceRing className="absolute -top-1 -right-1" />
</span>
`}
      />
    </div>
  )
}
