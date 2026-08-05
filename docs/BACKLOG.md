# Backlog

Open items with a known owner-decision or a known next step. Findings
that are already fixed live in docs/DECISIONS.md; this file is only
what is still open. Keep it current: an item leaves this file when it
ships or is consciously dropped.

## Decisions waiting on Jaak

| Item | Where | Note |
| --- | --- | --- |
| Which theme wins | sink + both apps | Deliberately open, possibly long-term: Jaak may even ship multiple themes. The architecture treats this as cheap, so nothing is blocked. Colors overall are pre-brand and expected to change. |
| Push beta to origin | pb-app | Merged locally (15 commits ahead, all gated). pb-app's own rules require an explicit push instruction naming the branch. |
| Display font | pb-ui shared.ts | Inter stays for now; changing it later is one token. |

Closed 2026-08-05: both mobile WCAG corrections adopted (dark
primaryForeground now 5.45:1, light accent 5.60:1 and 4.55:1 as text);
`design-system` merged into local beta; the iOS storage fix rides in
that merge, so no separate cherry-pick is needed; feel-scale colors
dropped from this list as an ordinary design judgment call.

## pb-ui: token candidates

Roles mobile needs that the system has no carrier for. They live as
local literals in the mobile adapter and collapse onto nearest tokens
for non-Nocturne theme previews.

- `textSecondary` (mobile has 4 text levels, pb-ui has 3)
- `accentQuiet`, `accentText` (mid-tone and text-on-surface accents)
- `hairline` (border role distinct from `border`)
- `chrome.headerHeight` (Android 52dp is currently `minTarget + space.sm`)
- Platform-aware `minTarget` (44 iOS, 48 Android; mobile uses 44 flat)
- `--surface` (pb-app keeps it per-mode in globals.css; it meant
  card-white in light and raised-navy in dark, so no single token fit)
- `interaction.pressedTint` is still Nocturne-ramp-specific; parameterize
  per theme when themes stop being a preview

## pb-ui: known gaps

- Mobile `Pressable` `haptic` prop is API-stable but a no-op:
  expo-haptics is not a dependency (needs the native-dep decision).
- Non-Nocturne theme previews on mobile are approximations (see token
  candidates above). Fine for judging a palette, not for shipping.
- No visual-regression CI. Cheap now that every component has its own
  URL with theme/mode params; needs a runner.
- Sink is not deployed to a URL, and not in pb-app's `make start`
  dashboard (its scripts live on beta, outside the branch). Options: a
  make target in pb-ui, or a deployment like trf-ui2's ui.trf.is.

## Component API gaps found during mobile M3 adoption

Real friction hit while adopting the primitives across ~90 screens.
None blocked the sweep (the call sites kept local styles instead), but
each is a component that could not be adopted where it should have
been.

- `ListRow` hardcodes `paddingHorizontal: space.lg` on its inner row and
  `style` lands on the Pressable, so rows that must sit flush with a
  screen gutter cannot adopt it. Needs a padding or inset prop.
- `ListRow` synthesizes its accessible name from title + meta, which
  drops trailing content (timestamps, unread counts) from the
  announcement. Needs an accessibilityLabel escape hatch.
- `Card`'s non-pressable branch sets neither `accessible` nor
  `accessibilityLiveRegion`, so any surface that announces (error
  panels, live status) cannot use it.
- `Card` has no accent or warning variant, so tinted callout containers
  stay hand-rolled; it also uses `border` where several call sites used
  the quieter `hairline` role.
- `Badge` has no `accessibilityLabel` prop (unread counts lose their
  "N unread" announcement) and no outline appearance (soft/solid only).
- `Avatar` cannot be adopted by the ~14 existing mobile avatars: sizes
  are off-preset (32/38/42/46/62/72/88/96), fills are accent tints
  rather than the identity hash, and some paint initials immediately
  then overlay the photo. Unifying them changes rendered initials and
  colors, so it is a design decision, not a sweep.
- `NumberInput` cannot represent an empty "not recorded yet" draft
  (`value: number`), so string-backed numeric fields use TextInput.
- `Field` renders hint text below the control; forms that put help text
  above it cannot adopt without moving copy.
- `ScreenHeader` has no disabled state for its leading control and
  exposes the label only via `leadingLabel`, so screens with a visible
  text close affordance or a disabled-while-saving close kept local
  headers.

Accessibility item this sweep did not fix: the Explore segmented
control keeps a 32dp touch target (pre-existing geometry preserved),
below Android's 48dp guidance.

## pb-ui: Wave C and deferred

Wave C (docs/ROADMAP-V02.md): NotificationPanel, OnboardingCarousel,
CelebrationOverlay, MarkdownRenderer, ReactionPicker,
SyncStatusIndicator, format utilities. Two are design-blocked upstream
(notifications and onboarding both await product design passes), so the
wave is optional until then. The format utilities are the highest-value
piece: they retire pb-app's three competing EUR formatters and three
`timeAgo` copies.

Deferred beyond v0.4 deliberately: server-driven DataTable, DangerZone,
AnnualTimeline (graduates during adoption instead of being rebuilt),
admin-specific organisms, Storybook/Ladle.

## Dependency watch

- `@dnd-kit/core` 6.3.1 / `sortable` 10.0.0: no release since 2024-12.
  Successor `@dnd-kit/react` is 0.x. Revisit at its 1.0.
- `@tanstack/react-table` pinned at 8.21.3; v9.0.0 went latest
  2026-08-04. Evaluate once it has ecosystem mileage.
- NativeWind v5: revisit when 5.x reaches npm latest (mobile is
  tokens-only today, so this is optional).
- Video.js v10 (the Vidstack/Media Chrome/Plyr/Mux merge): re-evaluate
  the player at stable.

## pb-app: adoption follow-ups

- Mobile M3 screen adoption: DONE in two waves (79 files now import
  `@/ui`; ~2,700 net lines removed). Remaining by design: `calls/`
  (15 raw literals) waits for the stage sub-theme, 3 informational
  `Alert.alert` sites stay (single-action notices, not confirmations),
  and CommunicationsHeader is a clean ScreenHeader swap blocked only by
  contract-test assertions that pin its source.
- iOS: confirm() from inside a feature Modal is fixed via the innermost-
  host-wins stack and unit-tested, but needs a physical-device pass when
  iOS acceptance starts.
- Mobile calls screens still carry ~40 hardcoded hex values; they move
  onto the stage theme the way the web calls screens did in W6.
- pb-app's own change checklist expects `docs/mobile-parity-matrix.md`
  and `docs/mobile-development-plan.md` to be updated when architecture
  changes; the design-system adoption qualifies.
- `bridge.css` is deleted, but `--surface` remains an app token (see
  above) and the temporary `?skin=` / Settings theme pickers are
  evaluation aids to remove once the theme is chosen.
