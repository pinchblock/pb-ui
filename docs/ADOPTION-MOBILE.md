# pb-app mobile adoption plan

Tokens first, components second, styling engine last. Mobile keeps
idiomatic React Native components; what it shares with web is the
token contract and the design vocabulary. All work follows pb-app's
mobile rules: performance is priority one (docs/mobile-performance-
architecture.md), Android font scale 2.0 must be tested, and dev-client
testing over EAS builds.

## M0: token adapter (zero screens change)

Replace the hand-maintained values inside mobile/src/theme/tokens.ts
with an adapter that imports from @pinchblock/ui/tokens and maps the
system's semantic names onto the role names mobile code already uses.
Verified mapping (nocturne's inline comments document the mobile
carrier for each value):

    bg <- background, surface <- card (and backgroundRaised),
    surfaceSunken <- backgroundSunken, border <- border,
    text <- foreground, textMuted <- mutedForeground,
    textFaint <- faintForeground, accent <- primary,
    accentTint <- primarySoft, accentTintBorder <- primaryBorder,
    onAccentTint <- accentForeground, teal/tealSoft <-
    success/successSoft, amber/amberSoft <- warning/warningSoft,
    destructive/destructiveSoft <- same, scrim <- overlay.

Four roles have NO pb-ui carrier and stay local adapter values until
dedicated tokens are added (candidates for the v0.2 token work):
textSecondary (both modes), accentQuiet (mid-tone foreground accent),
accentText (accent-300 dark / accent-700 light), and hairline (its
nocturne values coincide with backgroundSunken, but borrowing a
surface token for a border role is a smell; keep it local).

One deliberate visual decision, not an accident: mobile hardcodes
primaryForeground #ffffff, which fails WCAG on the lilac primary;
nocturne corrects it to deep indigo. M0 adopts the corrected value as
the single intentional visible diff (design sign-off required), or
keeps a local #ffffff if strict zero-diff wins.

The theme choice is one line (nocturne keeps mobile pixel-faithful;
switching the app to the winning theme later is that same line).
Ramp note: pb-ui tokens are semantic-only, no neutral/accent 100-900
ramps. No feature code reads ramp steps directly (verified); the ramp
table survives only INSIDE the adapter, for palette construction and
interaction.pressedTint. Spacing scale note: mobile's 3/6/8/11/17/22/34
scale stays as-is in M0; converging it with the web 4pt grid is a
design decision to take with the theme decision, not a side effect of
an adapter.

Mechanics: mobile/package.json gains @pinchblock/ui as a git-tag pin
(after v0.1.0 exists); Metro compiles the package's .ts-extension
imports fine, but mobile's tsc typecheck gate needs
allowImportingTsExtensions-compatible settings in mobile/tsconfig for
the imported package types: verify in the M0 spike before committing
to the approach.

Exit: visual diff on key screens is zero apart from the sign-offed
primaryForeground correction, both schemes, Android and iOS.

## M1: one theming API

Finish the migration the mobile codebase already started: the 37 files
on legacy module-level createThemedStyles/colors-Proxy move to
useTheme/useThemeStyles, then the Proxy compatibility layer is
deleted. Mechanical, agent-friendly, no visual change; unblocks
everything after it (the legacy path resolves against a mutable
render-time scheme and cannot support scoped theming).

Exit: grep gate, createThemedStyles has zero call sites.

## M2: the five system primitives

Built in mobile/src/ui, consuming the adapter tokens. They live in
pb-app first and graduate to a pb-ui native/ export once stable
(trf-ui2's graduation model), because iterating inside the app is
faster while the APIs settle.

1. Text: variant-driven (the token type scale), fontFamily-only
   weights; then a codemod sweep of the 328 raw fontSize and 160
   fontWeight literals.
2. Pressable: platform feedback (ripple/opacity), hitSlop, min target,
   busy/disabled a11y; replaces the copy-pasted pair in nearly every
   touchable.
3. Screen scaffold: safe area, gutter, scroll, static-first shell slot.
4. ScreenHeader: back/close, title, trailing actions, Android hardware
   back; replaces ~19 duplicated headers.
5. ListRow: leading/title/meta/trailing; inbox, settings, rosters.

Exit: new screens use only these; the codemod landed; font-scale 2.0
pass on the swept screens.

## M3: parity components and the stage theme

- Badge, Avatar, Card, TextField consolidation (the three parallel
  form-field systems collapse into one Field kit mirroring web's API
  names).
- Alert.alert confirmations -> a ConfirmSheet with the same
  resolve-a-promise contract as web's useConfirm.
- Calls and workout timer move onto the stage sub-theme tokens when
  v0.3.0 ships them (removes the ~40 hardcoded hex values in the call
  stage).
- Icons: if the Phosphor decision stands, mobile is already compliant;
  the curated barrel stays, the hand-copied SVG duplicates in
  vector-icons.tsx get deleted.

Exit: mobile pain-point list from the audit (dual APIs, three form
systems, ~19 headers, 9+ avatar copies which a recount puts at ~14
files, hex-soup calls) is fully closed.

## M4: styling engine, only if needed

Stay on the current provider approach unless profiling shows re-render
cost on theme switches or heavy lists. Then: react-native-unistyles 3
(C++ core, no re-renders, themes/variants/breakpoints) consuming the
same adapter tokens; NativeWind reconsidered only when its v5 line is
npm latest. This is deliberately last: it is an optimization, not a
prerequisite, and the token adapter makes it a swap rather than a
rewrite.

## Ordering against web

M0 and M1 can start immediately after v0.1.0 tags; they do not depend
on any web milestone. M2/M3 benefit from waiting until web W2/W3 have
battle-tested the component APIs (naming and prop conventions carry
over one to one). The stage theme (M3, web calls exemption) lands from
the same v0.3.0 token addition on both platforms simultaneously.
