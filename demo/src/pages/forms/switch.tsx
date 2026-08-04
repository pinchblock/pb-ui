import { Label } from "../../../../src/components/ui/label.tsx"
import { Switch } from "../../../../src/components/ui/switch.tsx"
import { CodeBlock, ExampleBlock, PageIntro, Showcase } from "../../sink/showcase.tsx"

const NOTIFICATION_ROWS = [
  {
    id: "sw-ex-reminders",
    label: "Session reminders",
    hint: "30 minutes before a planned session.",
    defaultChecked: true,
  },
  {
    id: "sw-ex-streaks",
    label: "Streak alerts",
    hint: "When your streak is about to break.",
    defaultChecked: true,
  },
  {
    id: "sw-ex-digest",
    label: "Weekly digest",
    hint: "Monday summary of volume, PRs and coach notes.",
    defaultChecked: false,
  },
]

export default function SwitchPage() {
  return (
    <div>
      <PageIntro
        title="Switch"
        description="Base UI Switch: role=switch with a hidden input, thumb slides with duration-(--duration-fast). Sizes md (default) and sm."
        use="Use for settings that take effect immediately, notifications on, reminders off. If the choice is only submitted with a form, use Checkbox instead."
      />

      <Showcase title="States and sizes" hint="md and sm; label association via htmlFor.">
        <div className="flex flex-wrap items-center gap-6">
          <span className="flex items-center gap-2">
            <Switch id="sw-md" />
            <Label htmlFor="sw-md">Session reminders</Label>
          </span>
          <span className="flex items-center gap-2">
            <Switch id="sw-on" defaultChecked />
            <Label htmlFor="sw-on">Streak alerts</Label>
          </span>
          <span className="flex items-center gap-2">
            <Switch id="sw-sm" size="sm" defaultChecked />
            <Label htmlFor="sw-sm">Small</Label>
          </span>
          <span className="flex items-center gap-2">
            <Switch id="sw-dis" disabled />
            <Label htmlFor="sw-dis">Disabled</Label>
          </span>
          <span className="flex items-center gap-2">
            <Switch id="sw-dis-on" disabled defaultChecked />
            <Label htmlFor="sw-dis-on">Disabled on</Label>
          </span>
        </div>
      </Showcase>

      <ExampleBlock
        title="Notification settings"
        description="The standard settings-row pattern: label and hint on the left, switch on the right, whole row framed."
      >
        <div className="max-w-md divide-y divide-border rounded-xl border border-border bg-card">
          {NOTIFICATION_ROWS.map((row) => (
            <div key={row.id} className="flex items-center justify-between gap-4 px-4 py-3">
              <span className="flex flex-col">
                <Label htmlFor={row.id}>{row.label}</Label>
                <span className="text-xs text-muted-foreground">{row.hint}</span>
              </span>
              <Switch id={row.id} defaultChecked={row.defaultChecked} />
            </div>
          ))}
        </div>
      </ExampleBlock>

      <CodeBlock
        code={`
import { Label, Switch } from "@pinchblock/ui"

<Label htmlFor="reminders">Session reminders</Label>
<Switch
  id="reminders"
  checked={enabled}
  onCheckedChange={setEnabled}
/>
`}
      />
    </div>
  )
}
