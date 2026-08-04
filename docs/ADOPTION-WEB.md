# pb-app web adoption plan

How @pinchblock/ui replaces the hand-rolled UI in pb-app/web, milestone
by milestone. Each milestone is one feature worktree off beta following
pb-app's own workflow rules (worktree at .worktrees/<task>, rebase,
fast-forward beta, validate the combined state, no pushes without
explicit ask). Every milestone must hold pb-app's performance budgets:
no new fetch waterfalls, no route made fully dynamic, warm navigation
still instant.

Verification loop for every milestone: shot-rig screenshots of the
touched routes before and after (both modes), plus the app's normal
typecheck/test/build gates.

## W0: prerequisites (in pb-ui, not pb-app)

- Icon decision executed; v0.1.0 tagged.
- GitHub repo created (pinchblock/pb-ui) and pushed so pb-app can pin
  `github:pinchblock/pb-ui#v0.1.0`. Until then, file:../pb-ui works for
  spikes only.
- Agree the AGENTS.md flip: pb-app's root and web AGENTS.md currently
  bind agents to "keep UI changes minimal and reversible" and to the
  old reference visual language. Adoption IS the design finalization
  those docs anticipate, so W1's scope includes updating web/AGENTS.md
  (reference language section, glass rule pointer, "UI comes from
  @pinchblock/ui" snippet from CONSUMING.md). This needs Jaak's
  explicit sign-off before W1 starts.

## W1: wiring and token bridge (no visual change intended)

Scope:
- Install by tag; add transpilePackages: ["@pinchblock/ui"].
- Load InterVariable via next/font (fixes the audit finding that Inter
  is declared but never loaded, so users silently get Arial).
- Replace globals.css's token blocks (:root, .light, @theme inline)
  with the pb-ui style imports; keep pb-app's app-specific CSS
  (app-topbar, landing helpers, keyframes) in a slimmed globals.css.
- Add a temporary bridge.css aliasing removed names so untouched
  screens keep rendering: --amber -> var(--warning) family, --text-
  secondary -> var(--muted-foreground), --text-muted -> var(--faint-
  foreground), --surface -> var(--background-raised), --input-bg ->
  var(--input-background), --ai-bg/--ai-fg -> var(--ai)/var(--ai-
  foreground), --sidebar* -> sensible core-token fallbacks, plus
  legacy radius vars mapped onto the derived scale. Tailwind theme
  mapping for the aliases so bg-amber-soft etc. still compile.
- Theme boot: swap the inline themeInitScript for themeBootScript,
  with a one-time migration read of the old "pinchblock-theme"
  localStorage key into pb-ui.theme/pb-ui.mode.
- RSC audit: marketing routes stay server components; system
  components used there become client islands. Check bundle and
  streaming behavior on / and /waitlist.

Exit: app renders visually unchanged (screenshot diff within
tolerance) in Ocean light and dark; theme switcher works; fonts
actually render Inter; npm test green.

## W2: shared chrome and feedback primitives

Scope: web/src/components/ui.tsx and chrome.tsx consumers.
- Buttons, badges, avatars, spinners, skeletons, EmptyState, Field ->
  system components; delete inputClass and the duplicated Field.
- Mount Toaster in the authenticated shell; replace transient inline
  banners ("Stripe status updated", save confirmations) with toast.*.
- Replace window.confirm call sites with ConfirmDialog/useConfirm.
- SiteHeader/AppShell chrome moves to NavRail/MobileTabBar/TopBar.

Exit: web/src/components/ui.tsx reduced to product-specific pieces
(AiBadge composition, product icons); no raw window.confirm remains.

## W3: overlays and forms

- The 10+ hand-rolled modals -> Dialog (responsive) and Sheet
  (LogSessionPanel right drawer, FeedComposerSheet bottom sheet).
- Settings, apply, auth, plan/intake editor forms -> Field kit,
  Select, Switch, RadioCard, SegmentedControl.
- The three tab implementations -> Tabs; the four filter-pill
  implementations -> FilterChip/ChipGroup.

Exit: zero fixed-inset hand-rolled overlays left (grep gate:
"fixed inset-0" outside system components).

## W4: data surfaces

- Coach dashboard, clients, revenue, plan performance, admin: StatTile
  (replaces 5 KPI implementations), Table + Pagination, Sparkline,
  TrendChart (replaces both smoothPath copies), Chart for revenue
  bars, feel components for ratings.
- Adopt format utilities when Wave C ships them; until then leave the
  local formatters in place rather than adding a fourth variant.

Exit: no copy-pasted sparkline/smoothPath/KPI-tile code remains.

## W5: feed and social polish

- PostCard on Card/Badge with kind accents from tokens (the hardcoded
  #D4860F PR banner becomes warning tokens), reactions via the
  product-icon layer, comments on ChatBubble patterns, composer on
  Sheet, motion presets for reveal/spring moments, AnimatedNumber on
  profile stats.

Exit: feed.tsx no longer contains raw hex or bespoke modal code.

## W6: marketing landing and cleanup

- Landing/waitlist/apply on the glass kit, display type scale,
  pb-backdrop, Reveal; PhoneFrame for showcases.
- Delete bridge.css; grep gates go strict: no --amber, no
  --text-secondary, no glass-input, no rounded-[ in web/src.
- Update docs and close the loop: web/AGENTS.md final language.

## Sequencing notes

- W2 before W3 because overlays compose the primitives.
- Calls and the interval timer are exempt until the stage sub-theme
  ships (v0.3.0); they keep their current fixed-dark styling behind a
  TODO fence rather than a half-migration.
- Admin can lag one milestone; it is internal.
- Each milestone is independently shippable to beta; nothing spans
  worktrees.
