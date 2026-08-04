import { Bell, Chat, DotsThree, Gear, MagnifyingGlass, Plus } from "@phosphor-icons/react"

import { CounterBadge, NotificationDot } from "../../../../src/components/ui/counter-badge.tsx"
import { IconButton } from "../../../../src/components/ui/icon-button.tsx"
import { CodeBlock, ExampleBlock, PageIntro, Showcase, VariantRow } from "../../sink/showcase.tsx"

export default function IconButtonPage() {
  return (
    <div>
      <PageIntro
        title="IconButton"
        description="Square icon-only button. aria-label is required by the type because there is no visible text; the badge slot overlays a CounterBadge or NotificationDot at the top-right."
        use="Toolbars, card corners and top bars where a labelled Button would be noise. If the action is primary or unfamiliar, use a Button with text instead; an icon alone must be obvious."
      />

      <Showcase title="Variants" hint="ghost (default), soft, secondary; pill for circular floating actions.">
        <VariantRow>
          <IconButton aria-label="Add session" variant="ghost">
            <Plus />
          </IconButton>
          <IconButton aria-label="Add session" variant="soft">
            <Plus />
          </IconButton>
          <IconButton aria-label="Add session" variant="secondary">
            <Plus />
          </IconButton>
          <IconButton aria-label="Add session" variant="soft" pill>
            <Plus />
          </IconButton>
        </VariantRow>
      </Showcase>

      <Showcase title="Sizes and disabled" hint="md 36px, sm 32px, xs 24px.">
        <VariantRow>
          <IconButton aria-label="Session settings" variant="secondary" size="md">
            <Gear />
          </IconButton>
          <IconButton aria-label="Session settings" variant="secondary" size="sm">
            <Gear />
          </IconButton>
          <IconButton aria-label="Session settings" variant="secondary" size="xs">
            <Gear />
          </IconButton>
          <IconButton aria-label="More actions" disabled variant="secondary">
            <DotsThree />
          </IconButton>
        </VariantRow>
      </Showcase>

      <Showcase
        title="Badge slot"
        hint="CounterBadge and NotificationDot overlay the top-right corner; surfaceRing cuts them free from the button. Fold the count into the aria-label."
      >
        <VariantRow>
          <IconButton
            aria-label="12 notifications"
            variant="secondary"
            badge={<CounterBadge count={12} surfaceRing />}
          >
            <Bell />
          </IconButton>
          <IconButton
            aria-label="99 or more notifications"
            variant="secondary"
            badge={<CounterBadge count={120} max={99} tone="primary" surfaceRing />}
          >
            <Bell />
          </IconButton>
          <IconButton
            aria-label="New messages"
            variant="secondary"
            badge={<NotificationDot surfaceRing label="New messages" />}
          >
            <Chat />
          </IconButton>
        </VariantRow>
      </Showcase>

      <ExampleBlock
        title="Top bar actions"
        description="The standard app-chrome cluster: search, unread messages, notifications, settings."
      >
        <div className="flex max-w-md items-center justify-between rounded-xl border border-border bg-card px-4 py-2">
          <p className="text-sm font-semibold text-foreground">Today's training</p>
          <div className="flex items-center gap-1">
            <IconButton aria-label="Search">
              <MagnifyingGlass />
            </IconButton>
            <IconButton aria-label="3 unread messages" badge={<CounterBadge count={3} surfaceRing />}>
              <Chat />
            </IconButton>
            <IconButton aria-label="New notifications" badge={<NotificationDot surfaceRing label="New notifications" />}>
              <Bell />
            </IconButton>
            <IconButton aria-label="Settings">
              <Gear />
            </IconButton>
          </div>
        </div>
      </ExampleBlock>

      <CodeBlock
        code={`
import { CounterBadge, IconButton } from "@pinchblock/ui"

<IconButton aria-label="Session settings" variant="secondary">
  <Gear />
</IconButton>

<IconButton
  aria-label={\`\${unread} unread messages\`}
  badge={<CounterBadge count={unread} surfaceRing />}
>
  <Chat />
</IconButton>
`}
      />
    </div>
  )
}
