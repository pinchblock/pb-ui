import { useState } from "react"
import {
  Bell,
  Calendar,
  Dumbbell,
  Flame,
  MessageSquare,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react"

import { Avatar } from "../../../src/components/ui/avatar.tsx"
import { AvatarGroup } from "../../../src/components/ui/avatar-group.tsx"
import { Badge } from "../../../src/components/ui/badge.tsx"
import { Button } from "../../../src/components/ui/button.tsx"
import { CounterBadge, NotificationDot } from "../../../src/components/ui/counter-badge.tsx"
import { IconButton } from "../../../src/components/ui/icon-button.tsx"
import { Kbd } from "../../../src/components/ui/kbd.tsx"
import { Progress } from "../../../src/components/ui/progress.tsx"
import { Separator } from "../../../src/components/ui/separator.tsx"
import { Skeleton, SkeletonText } from "../../../src/components/ui/skeleton.tsx"
import { Spinner } from "../../../src/components/ui/spinner.tsx"
import { TagPill } from "../../../src/components/ui/tag-pill.tsx"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../src/components/ui/tooltip.tsx"
import type { SinkSection } from "./types.ts"
import { Showcase, VariantRow } from "./section-shell.tsx"

const TONES = ["neutral", "primary", "success", "warning", "destructive", "info", "ai"] as const

const SPORT_TAGS = ["Climbing", "Bouldering", "Strength", "Mobility", "Endurance"]

function RemovableTags() {
  const [tags, setTags] = useState(SPORT_TAGS)
  return (
    <div className="flex flex-wrap items-center gap-2">
      {tags.map((tag) => (
        <TagPill
          key={tag}
          onRemove={() => setTags((current) => current.filter((t) => t !== tag))}
          removeLabel={`Remove ${tag}`}
        >
          {tag}
        </TagPill>
      ))}
      {tags.length < SPORT_TAGS.length ? (
        <Button variant="ghost" size="sm" onClick={() => setTags(SPORT_TAGS)}>
          Reset
        </Button>
      ) : null}
    </div>
  )
}

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

function CoachCard() {
  return (
    <div className="max-w-md rounded-xl border border-border bg-card p-4 shadow-card">
      <div className="flex items-start gap-3">
        <Avatar
          size="lg"
          name="Maria Kask"
          ring="success"
          badge={<ShieldCheck aria-hidden className="size-4" />}
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="truncate text-sm font-semibold text-foreground">Maria Kask</p>
            <Badge tone="success">On track</Badge>
          </div>
          <p className="text-xs text-muted-foreground">Head coach, Tallinn Boulder Club</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <TagPill size="sm">Bouldering</TagPill>
            <TagPill size="sm">Finger strength</TagPill>
            <TagPill size="sm">Mobility</TagPill>
          </div>
        </div>
        <IconButton
          aria-label="3 unread messages from Maria"
          size="sm"
          badge={<CounterBadge count={3} surfaceRing />}
        >
          <MessageSquare />
        </IconButton>
      </div>
      <div className="mt-4">
        <div className="mb-1.5 flex items-center justify-between">
          <span className="text-xs font-medium text-foreground">Weekly sessions</span>
          <span className="text-xs text-muted-foreground tabular-nums">3 of 4</span>
        </div>
        <Progress size="sm" value={3} max={4} aria-label="Weekly sessions completed" />
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <Badge tone="primary" icon={<Flame />}>
          12-week streak
        </Badge>
        <Badge tone="success" icon={<TrendingUp />}>
          Deadlift PR 180 kg
        </Badge>
        <Badge tone="ai" icon={<Sparkles />}>
          AI insight
        </Badge>
      </div>
    </div>
  )
}

function CoachCardSkeleton() {
  return (
    <div className="max-w-md rounded-xl border border-border bg-card p-4 shadow-card">
      <div className="flex items-start gap-3">
        <Skeleton className="size-12 rounded-full" />
        <div className="min-w-0 flex-1 space-y-2">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-3 w-1/2" />
          <div className="flex gap-1.5 pt-1">
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-20 rounded-full" />
            <Skeleton className="h-5 w-14 rounded-full" />
          </div>
        </div>
        <Skeleton className="size-8" />
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex justify-between">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-10" />
        </div>
        <Skeleton className="h-1.5 w-full rounded-full" />
      </div>
    </div>
  )
}

export const sections: SinkSection[] = [
  {
    id: "badges",
    label: "Badge & TagPill",
    render: () => (
      <>
        <Showcase
          title="Badge tones"
          hint="Soft (default) for chips and quiet emphasis; solid for status pills. The ai tone always renders the AI surface treatment."
        >
          <div className="space-y-3">
            <VariantRow>
              {TONES.map((tone) => (
                <Badge key={tone} tone={tone}>
                  {tone}
                </Badge>
              ))}
            </VariantRow>
            <VariantRow>
              {TONES.map((tone) => (
                <Badge key={tone} tone={tone} appearance="solid">
                  {tone}
                </Badge>
              ))}
            </VariantRow>
          </div>
        </Showcase>
        <Showcase title="Sizes and leading icons" hint="sm (default) and md; the icon slot sizes itself.">
          <VariantRow>
            <Badge tone="primary" icon={<Flame />}>
              12-week streak
            </Badge>
            <Badge tone="primary" size="md" icon={<Flame />}>
              12-week streak
            </Badge>
            <Badge tone="success" size="md" icon={<TrendingUp />}>
              New PR
            </Badge>
            <Badge tone="ai" size="md" icon={<Sparkles />}>
              AI suggested
            </Badge>
            <Badge tone="warning" icon={<Calendar />}>
              Deload week
            </Badge>
          </VariantRow>
        </Showcase>
        <Showcase
          title="Session statuses"
          hint="Real-world usage: one badge per row, solid only when the status must dominate."
        >
          <div className="max-w-sm divide-y divide-border">
            {(
              [
                ["Tuesday: Limit bouldering", <Badge key="b" tone="success">Completed</Badge>],
                ["Thursday: Fingerboard", <Badge key="b" tone="destructive">Missed</Badge>],
                ["Saturday: Outdoor project", <Badge key="b" tone="info">Upcoming</Badge>],
                ["Sunday: Max hangs test", <Badge key="b" tone="primary" appearance="solid">PR day</Badge>],
              ] as const
            ).map(([session, badge]) => (
              <div key={session} className="flex items-center justify-between gap-3 py-2">
                <span className="truncate text-sm text-foreground">{session}</span>
                {badge}
              </div>
            ))}
          </div>
        </Showcase>
        <Showcase
          title="TagPill"
          hint="Quieter than Badge: sport tags and filters. Removable pills keep the X keyboard-operable."
        >
          <div className="space-y-3">
            <VariantRow>
              <TagPill size="sm">Bouldering</TagPill>
              <TagPill>Sport climbing</TagPill>
              <TagPill>Trail running</TagPill>
            </VariantRow>
            <RemovableTags />
          </div>
        </Showcase>
      </>
    ),
  },
  {
    id: "avatars",
    label: "Avatar",
    render: () => (
      <>
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
            <Avatar
              size="lg"
              name="Maria Kask"
              badge={<ShieldCheck aria-hidden className="size-4" />}
            />
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
        <Showcase
          title="Composed: coach card"
          hint="Avatar, Badge, TagPill, Progress, IconButton and CounterBadge working together."
        >
          <CoachCard />
        </Showcase>
      </>
    ),
  },
  {
    id: "icon-buttons",
    label: "IconButton",
    render: () => (
      <>
        <Showcase title="Variants" hint="ghost (default), soft, outline. aria-label is required by the type.">
          <VariantRow>
            <IconButton aria-label="Add session" variant="ghost">
              <Plus />
            </IconButton>
            <IconButton aria-label="Add session" variant="soft">
              <Plus />
            </IconButton>
            <IconButton aria-label="Add session" variant="outline">
              <Plus />
            </IconButton>
            <IconButton aria-label="Add session" variant="soft" pill>
              <Plus />
            </IconButton>
          </VariantRow>
        </Showcase>
        <Showcase title="Sizes" hint="md 36px, sm 32px, xs 24px.">
          <VariantRow>
            <IconButton aria-label="Session settings" variant="outline" size="md">
              <Settings />
            </IconButton>
            <IconButton aria-label="Session settings" variant="outline" size="sm">
              <Settings />
            </IconButton>
            <IconButton aria-label="Session settings" variant="outline" size="xs">
              <Settings />
            </IconButton>
          </VariantRow>
        </Showcase>
        <Showcase
          title="Badge slot"
          hint="CounterBadge and NotificationDot overlay the top-right corner; surfaceRing cuts them free from the button."
        >
          <VariantRow>
            <IconButton
              aria-label="12 notifications"
              variant="outline"
              badge={<CounterBadge count={12} surfaceRing />}
            >
              <Bell />
            </IconButton>
            <IconButton
              aria-label="99 or more notifications"
              variant="outline"
              badge={<CounterBadge count={120} max={99} tone="primary" surfaceRing />}
            >
              <Bell />
            </IconButton>
            <IconButton
              aria-label="New messages"
              variant="outline"
              badge={<NotificationDot surfaceRing label="New messages" />}
            >
              <MessageSquare />
            </IconButton>
            <IconButton aria-label="More actions" disabled variant="outline">
              <MoreHorizontal />
            </IconButton>
          </VariantRow>
        </Showcase>
        <Showcase title="Standalone counters and dots" hint="Also usable inline: unread counts in nav items, presence dots in lists.">
          <VariantRow>
            <CounterBadge count={3} />
            <CounterBadge count={42} max={9} />
            <CounterBadge count={7} tone="primary" />
            <CounterBadge count={2} tone="neutral" />
            <NotificationDot />
            <NotificationDot tone="success" label="Online" />
            <NotificationDot tone="warning" />
            <NotificationDot tone="primary" />
          </VariantRow>
        </Showcase>
      </>
    ),
  },
  {
    id: "spinners-skeletons",
    label: "Spinner & Skeleton",
    render: () => (
      <>
        <Showcase title="Spinner sizes" hint="xs 12px to xl 32px; each announces its label to screen readers.">
          <VariantRow>
            <Spinner size="xs" />
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
            <Spinner size="xl" />
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              <Spinner size="sm" label="Syncing sessions" />
              Syncing sessions
            </span>
          </VariantRow>
        </Showcase>
        <Showcase
          title="Skeleton: coach card loading"
          hint="Compose Skeleton blocks to mirror the loaded layout exactly, so nothing jumps when data lands."
        >
          <CoachCardSkeleton />
        </Showcase>
        <Showcase title="SkeletonText" hint="Prose placeholder; the last line is shortened.">
          <div className="max-w-sm">
            <SkeletonText lines={3} />
          </div>
        </Showcase>
      </>
    ),
  },
  {
    id: "progress-bars",
    label: "Progress",
    render: () => (
      <>
        <Showcase title="Sizes and value display" hint="sm and md heights; label and value slots are optional.">
          <div className="max-w-sm space-y-6">
            <Progress size="sm" value={30} aria-label="Warm-up progress" />
            <Progress size="md" value={65} aria-label="Session progress" />
            <Progress value={65} label="Training block" showValue />
            <Progress value={100} label="Base phase" showValue />
          </div>
        </Showcase>
        <Showcase
          title="Indeterminate"
          hint="value={null} (the default) sweeps until real progress is known. Reduced motion parks it as a static partial bar."
        >
          <div className="max-w-sm">
            <Progress size="sm" label="Syncing with watch" />
          </div>
        </Showcase>
      </>
    ),
  },
  {
    id: "tooltips-kbd",
    label: "Tooltip & Kbd",
    render: () => (
      <TooltipProvider>
        <Showcase
          title="Tooltip"
          hint="300ms delay via the shared provider; moving between adjacent triggers opens instantly. Keyboard focus opens them too."
        >
          <VariantRow>
            <Tooltip defaultOpen>
              <TooltipTrigger render={<IconButton aria-label="Log a session" variant="outline" />}>
                <Dumbbell />
              </TooltipTrigger>
              <TooltipContent>
                Log a session <Kbd className="ml-1">L</Kbd>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger render={<IconButton aria-label="Search" variant="outline" />}>
                <Search />
              </TooltipTrigger>
              <TooltipContent>
                Search <Kbd className="ml-1">⌘</Kbd>
                <Kbd className="ml-0.5">K</Kbd>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger render={<IconButton aria-label="Notifications" variant="outline" />}>
                <Bell />
              </TooltipTrigger>
              <TooltipContent side="bottom">You are all caught up</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger render={<Button variant="secondary" size="sm" />}>
                Right side
              </TooltipTrigger>
              <TooltipContent side="right">Placed to the right</TooltipContent>
            </Tooltip>
          </VariantRow>
        </Showcase>
        <Showcase title="Kbd" hint="Keyboard key caps for shortcut hints, inline or inside tooltips.">
          <VariantRow>
            <span className="flex items-center gap-1">
              <Kbd>⌘</Kbd>
              <Kbd>K</Kbd>
            </span>
            <span className="flex items-center gap-1">
              <Kbd>Shift</Kbd>
              <Kbd>?</Kbd>
            </span>
            <Kbd>Esc</Kbd>
            <span className="text-sm text-muted-foreground">
              Press <Kbd>G</Kbd> <Kbd>T</Kbd> to jump to today's training
            </span>
          </VariantRow>
        </Showcase>
      </TooltipProvider>
    ),
  },
  {
    id: "separators",
    label: "Separator",
    render: () => (
      <Showcase title="Separator" hint="Horizontal between stacked content, vertical inside metadata rows.">
        <div className="max-w-sm space-y-4">
          <div>
            <p className="text-sm font-medium text-foreground">Max hangs, 5x10s at 85%</p>
            <Separator className="my-3" />
            <p className="text-sm text-muted-foreground">Rest 3 minutes between sets.</p>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span>12 sessions</span>
            <Separator orientation="vertical" className="h-4" />
            <span>4 PRs</span>
            <Separator orientation="vertical" className="h-4" />
            <span>6-week streak</span>
          </div>
        </div>
      </Showcase>
    ),
  },
]
