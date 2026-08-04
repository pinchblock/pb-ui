import { ShieldCheck } from "@phosphor-icons/react"

import { Avatar } from "../../../../src/components/ui/avatar.tsx"
import { AvatarGroup } from "../../../../src/components/ui/avatar-group.tsx"
import { Badge } from "../../../../src/components/ui/badge.tsx"
import { CodeBlock, ExampleBlock, PageIntro, Showcase, VariantRow } from "../../sink/showcase.tsx"

const ROSTER = [
  "Maria Kask",
  "Jorge Vidal",
  "Ana Silva",
  "Tom Erikson",
  "Lin Wei",
  "Sam Ortiz",
  "Petra Novak",
  "Dan Okafor",
]

/** Covers Avatar and AvatarGroup (the stack is just Avatars plus an overflow chip). */
export default function AvatarPage() {
  return (
    <div>
      <PageIntro
        title="Avatar"
        description="Person identity, with AvatarGroup for overlapping rosters. Base UI Avatar underneath: image loading states handled, initials fallback colored deterministically from the chart palette."
        use="Use the person's stable id as colorKey in real apps so the fallback color survives renames. Rings mark presence or attention; the badge slot is for verification marks, not status dots."
      />

      <Showcase title="Sizes" hint="xs 24px, sm 28px, md 36px (default), lg 48px, xl 64px, 2xl 80px (profile).">
        <VariantRow>
          <Avatar size="xs" name="Maria Kask" />
          <Avatar size="sm" name="Maria Kask" />
          <Avatar size="md" name="Maria Kask" />
          <Avatar size="lg" name="Maria Kask" />
          <Avatar size="xl" name="Maria Kask" />
          <Avatar size="2xl" name="Maria Kask" />
        </VariantRow>
      </Showcase>

      <Showcase
        title="Deterministic fallback colors"
        hint="Initials are hashed from colorKey (defaults to name) across the chart palette: the same person is the same color everywhere."
      >
        <VariantRow>
          {ROSTER.map((name) => (
            <div key={name} className="flex flex-col items-center gap-1.5">
              <Avatar size="lg" name={name} />
              <span className="text-xs text-muted-foreground">{name.split(" ")[0]}</span>
            </div>
          ))}
        </VariantRow>
      </Showcase>

      <Showcase
        title="Image, status ring, verified badge"
        hint="The image falls back to initials while loading or on error. Rings mark presence or attention; the badge slot overlays bottom-right."
      >
        <VariantRow>
          <Avatar size="lg" name="Jorge Vidal" src="https://i.pravatar.cc/96?img=12" />
          <Avatar size="lg" name="Ana Silva" ring="success" />
          <Avatar size="lg" name="Tom Erikson" ring="warning" />
          <Avatar size="lg" name="Lin Wei" ring="destructive" />
          <Avatar size="lg" name="Maria Kask" badge={<ShieldCheck aria-hidden className="size-4" />} />
        </VariantRow>
      </Showcase>

      <Showcase title="AvatarGroup" hint="Overlapping stack with a +N overflow chip; pass the same size to both.">
        <div className="space-y-4">
          <AvatarGroup size="md" max={4}>
            {ROSTER.slice(0, 6).map((name) => (
              <Avatar key={name} size="md" name={name} />
            ))}
          </AvatarGroup>
          <AvatarGroup size="sm" max={5}>
            {ROSTER.map((name) => (
              <Avatar key={name} size="sm" name={name} />
            ))}
          </AvatarGroup>
        </div>
      </Showcase>

      <ExampleBlock
        title="Squad header"
        description="Verified coach up front, the training squad collapsed into an AvatarGroup."
      >
        <div className="flex max-w-md items-center gap-3 rounded-xl border border-border bg-card p-4">
          <Avatar
            size="lg"
            name="Maria Kask"
            ring="success"
            badge={<ShieldCheck aria-hidden className="size-4" />}
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <p className="truncate text-sm font-semibold text-foreground">Tallinn Boulder Club</p>
              <Badge tone="success">Active</Badge>
            </div>
            <p className="text-xs text-muted-foreground">Coached by Maria Kask, 8 athletes</p>
          </div>
          <AvatarGroup size="sm" max={3}>
            {ROSTER.slice(1).map((name) => (
              <Avatar key={name} size="sm" name={name} />
            ))}
          </AvatarGroup>
        </div>
      </ExampleBlock>

      <CodeBlock
        code={`
import { Avatar, AvatarGroup } from "@pinchblock/ui"

<Avatar name="Maria Kask" colorKey={user.id} src={user.photoUrl} />
<Avatar name="Ana Silva" ring="success" />

<AvatarGroup size="sm" max={3}>
  {athletes.map((a) => (
    <Avatar key={a.id} size="sm" name={a.name} colorKey={a.id} />
  ))}
</AvatarGroup>
`}
      />
    </div>
  )
}
