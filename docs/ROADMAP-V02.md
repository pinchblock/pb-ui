# v0.2 component roadmap

The deliberate gaps from docs/COMPONENT-MAP.md, 15 of 17 sequenced into
three build waves by product need; AnnualTimeline and DangerZone are
consciously deferred (see the deferred list, which supersedes the older
"formalize in v0.2" note in COMPONENT-MAP for DangerZone). Same process as v0.1: parallel build
agents on disjoint files, every component lands with barrel export,
kitchen sink section, all four themes in both modes, keyboard + screen
reader support, reduced-motion handling; adversarial review wave after
each build wave; minor version tag when a wave lands.

Prerequisite before any wave: the icon swap (Phosphor, confirmed by
Jaak 2026-08-04, superseding PLAN.md's earlier Lucide lean) and Wave 0
below, then v0.1.0 tags, so waves land as v0.2.x tags consumers can
pin.

## Wave 0: kitchen sink v2 (v0.1.x, before Wave A)

The current sink is one continuous page. Before the component set
grows, it becomes a multi-page app: every component gets its own page,
because component-by-component example work is how the system will be
developed and reviewed from here on.

- react-router v7 in demo/ only (the library gains no dependency). A
  layout route owns the persistent control bar and sidebar; pages
  render inside it, so theme/mode/radius/density/font URL params keep
  working on every page.
- One page per component at /c/<group>/<component>, lazy-loaded so the
  app stays fast as it grows. demo/src/pages/<group>/<component>.tsx,
  one file each.
- Per-group manifest (demo/src/pages/<group>/index.ts) lists that
  group's pages; the top-level registry only composes manifests.
  Parallel agents each own one page file plus one manifest line.
- Page anatomy: what it is and when to use it, variant/state
  showcases, at least one real Pinchblock use-case example, a usage
  code snippet. Room to grow prop playgrounds later.
- Group overview pages with mini-preview cards; the Foundations pages
  (colors, type, motion, theme matrix) migrate as-is.
- Sink helper kit grows: Showcase and VariantRow stay, ExampleBlock
  (framed use-case) and CodeBlock (usage snippet) join.
- Per-component URLs become the visual-regression surface: one
  screenshot per component page per theme/mode instead of full-page
  captures.

Exit: no sink content left in the old sections/ files; every barrel
export reachable at its own URL; docs/GUARDRAILS.md code-shape rules
hold (no page file over ~300 lines).

## Wave A: plan editor and commerce unblockers (target v0.2.0)

These block coach plan authoring and checkout surfaces in pb-app.

| Component | Foundation | Notes |
| --- | --- | --- |
| DatePicker + Calendar | react-day-picker v10 on our Popover | Base UI ships no calendar. Single + range; month picker variant for plan scheduling; tokens-styled like trf-ui2's proven port. |
| NumberField | Base UI number-field | Sets/reps/weight/price inputs; stepper buttons sized for touch; pairs with Field. |
| Combobox + AsyncCombobox | Base UI combobox and autocomplete | Client search now, generic getKey/getLabel server-search variant for rosters; replaces PeopleSearch's hand-rolled ARIA. |
| SortableList kit | dnd-kit wrappers | Pin the classic packages knowingly (@dnd-kit/core 6.3.1 + sortable 10.0.0: dormant since 2024-12 but stable and already used by pb-app); the successor @dnd-kit/react is still 0.x, re-evaluate at its 1.0. SortableList, SortableItem, DragHandle (cursor-grab, keyboard reorder via arrow buttons for a11y parity); replaces the four divergent dnd blocks in plan/intake editors. |
| DataTable | @tanstack/react-table pinned ^8.21.3 on our Table | v9.0.0 went npm latest 2026-08-04; evaluate it before Wave A starts, else pin v8 explicitly (a bare install now yields v9). Client-side sort/filter/pagination first; server-driven mode deferred until admin needs it. |

Exit criteria: a sink section composing all five into a believable
"edit training week" demo (drag days, pick dates, set reps, choose
exercises from a combobox).

## Wave B: workout execution and calls (target v0.3.0)

The flagship athlete surfaces. Needs one token addition first.

Token work: a "stage" sub-theme, a .stage class overriding surface and
status tokens with an always-dark, high-contrast set that is identical
across all four themes (guarded like status colors). This replaces the
~40 hardcoded hex values in pb-app's calls and interval-timer surfaces
and is shared by web and mobile token exports.

| Component | Foundation | Notes |
| --- | --- | --- |
| FullScreenTimer | owned + motion | Work/rest states on stage tokens, huge AnimatedNumber countdown, effort capture on exit; reduced-motion swaps pulses for plain state changes. |
| Call kit | @livekit/components-react wrappers | PreCall, CallStage, CallControls (mute/camera/end on stage tokens); LiveKit Agents UI registry components as owned-source starting points. Caveat: pb-app still owes background/system-call product decisions, so build the in-call cluster only; the surface set is not final. |
| OTPInput | Base UI otp-field | Invite/redemption codes (REF-009 flow when it unblocks). |

HomeProgressRow-style progress needs are covered by the existing
ActivityRing and StreakHeatmap; extend those if gaps appear, do not
build parallel primitives.

Exit criteria: sink "guided session" flow demo: timer running on stage
tokens inside a PhoneFrame, call controls demo, all themes identical on
stage surfaces.

## Wave C: engagement and oomph (target v0.4.0)

| Component | Foundation | Notes |
| --- | --- | --- |
| NotificationPanel | Popover + ListRow | Actor avatar rows, unread dots, inline accept/decline actions, mark-all-read. Blocked-by note: pb-app's push/realtime notification design pass has not happened; build the shell, expect the row taxonomy to move. |
| OnboardingCarousel | CSS scroll-snap + motion | No new dependency; progress dots, swipe, autoplay-off by default. The mobile2 handoff defers onboarding designs, so this ships as a pattern, not a finished flow. |
| CelebrationOverlay | owned surface + motion | PR/streak/milestone moments. Rive stays app-level per PLAN.md: the overlay exposes an animation slot the app fills with its Rive canvas; the springPop motion-variant fallback (src/lib/motion.ts) plays when no asset is supplied. |
| MarkdownRenderer | react-markdown + remark-gfm | Coach notes and AI drafts; token prose styles, no highlight.js until code blocks are a real need. |
| ReactionPicker | Popover + product icons | The six custom reaction SVGs move into the library as the brand icon layer. |
| SyncStatusIndicator | owned | Dot + label + attention action; shared vocabulary with mobile outbox states. |
| Format utilities | Intl-based lib/format.ts | formatMoney (EUR default; kills the three competing formats), timeAgo (kills three copies), formatDate presets. |

Deferred beyond v0.4 deliberately: server-driven DataTable, DangerZone
(compose Card + ConfirmDialog inline until repetition proves it),
AnnualTimeline (pb-app's existing implementation is decent; it
graduates during web adoption W4 with a token audit instead of a
rebuild), admin-specific organisms, Ladle/Storybook (only if the sink
stops being enough), visual-regression CI (needs the GitHub remote
first).

## Standing rules for every wave

- Additions to ModeTokens require values in all four themes and a
  contrast check against the pairs they will carry (run
  scripts/contrast-check.mjs, committed from the v0.1 review).
- New dependencies need the same justification bar as v0.1: Base UI
  first, then the proven pick from the research (react-day-picker,
  TanStack, dnd-kit), never a novel library without a written reason.
- Every wave ends with the 6-dimension adversarial review before its
  tag.
