# Backlog

Open items with a known owner-decision or a known next step. Findings
that are already fixed live in docs/DECISIONS.md; this file is only
what is still open. Keep it current: an item leaves this file when it
ships or is consciously dropped.

## Decisions waiting on Jaak

| Item | Where | Note |
| --- | --- | --- |
| Which theme wins | sink + both apps | All four are live on web (`?skin=`) and mobile (Settings, dev builds). Nothing locks until a default is chosen. |
| Mobile primaryForeground | mobile/src/theme/tokens.ts | White on lilac fails WCAG; Nocturne corrects it. Withheld for zero-diff M0. One-line flip, marked FLAGGED in source. |
| Mobile light accent | mobile/src/theme/tokens.ts | Same story: `#796cbf` kept, Nocturne corrects to `#695ab7`. |
| Merge `design-system` to beta | pb-app | 12 commits, all gated. Big surface, so it is a judgment call. |
| Cherry-pick the iOS storage fix | pb-app | Unrelated to the design system and currently blocks every iOS user; worth landing on beta on its own. |
| Display font | pb-ui shared.ts | `--font-display` is still Inter. One token if a brand face is wanted. |
| Feel-scale colors | pb-ui themes | feel-1..5 are provisional defaults, tune by eye. |

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

- Mobile M3 screen adoption: the twelve `mobile/src/ui` primitives are
  built but not yet imported by any screen. Measured targets: ~340 raw
  `fontSize`, ~171 `fontWeight`, 21 duplicated back headers, 15
  `Alert.alert` sites, ~14 avatar implementations.
- Mobile calls screens still carry ~40 hardcoded hex values; they move
  onto the stage theme the way the web calls screens did in W6.
- pb-app's own change checklist expects `docs/mobile-parity-matrix.md`
  and `docs/mobile-development-plan.md` to be updated when architecture
  changes; the design-system adoption qualifies.
- `bridge.css` is deleted, but `--surface` remains an app token (see
  above) and the temporary `?skin=` / Settings theme pickers are
  evaluation aids to remove once the theme is chosen.
