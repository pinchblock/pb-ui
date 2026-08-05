# Decision log

Autonomous calls made while Jaak is away, newest first. Read this
after a gap; challenge anything, everything here is reversible.

## 2026-08-05 (mobile M0-M2 landed, pb-ui v0.3.0 shipped)

- pb-ui v0.3.0 tagged: stage sub-theme (always-dark, theme-invariant,
  full contrast table passing), FullScreenTimer, presentational call
  kit (NO LiveKit dependency: deliberate deviation from the roadmap
  sketch, pb-app owns call state per AGENTS rule 7), OTPInput,
  TrendChart yDomain. Sink gained nav quick search (/ shortcut) and a
  generated Icons page (86 Phosphor icons with usage counts,
  freshness-checked like tokens.css).
- Mobile M0 parity proof: 80 color roles byte-identical, zero value
  diffs. TWO WCAG corrections deliberately withheld for zero-diff
  (primaryForeground white-on-lilac, light accent #796cbf): both are
  one-line flips in mobile/src/theme/tokens.ts after on-device
  sign-off; the flagged comments mark the exact lines.
- M1 complete: 39 files on the provider API, proxy deleted. M2: twelve
  system primitives in mobile/src/ui with web-parity vocabulary
  (Badge soft|solid, shared avatar color hash, unit-tested). Adoption
  sweeps (fontSize codemod, header dedupe, Alert.alert replacement)
  are the next mobile wave, AFTER on-device validation of the current
  state.
- Mobile Pressable haptic prop is a documented no-op (expo-haptics not
  a dependency; needs the native-dependency decision).

## 2026-08-05 (mobile started, maximum parallel)

- Mobile M0+M1 and the M2 component builds run CONCURRENTLY by
  splitting on territory: M0 owns mobile/src/theme, M1 owns the 39
  legacy feature files, M2 builds new components in mobile/src/ui
  (creation only; adoption sweeps wait for M1 so the codemod never
  races the migration).
- M0 keeps primaryForeground "#ffffff" (mobile's current value) even
  though nocturne corrects it for WCAG: strict zero-diff wins for the
  first on-device comparison; the fix is a one-line flip after Jaak
  sees it live.
- Mobile components consume the frozen theme-provider API, not pb-ui
  directly, so they are immune to the adapter rewrite happening
  underneath; cross-platform parity is enforced where it matters
  (web's avatar color hash is ported exactly and unit-tested so the
  same user gets the same color on both platforms).
- W4+W5 landed on the branch earlier today: five KPI implementations,
  both smoothPath charts and the bespoke admin tables deleted (~256
  lines of duplication gone); feed.tsx passes a zero-raw-color grep;
  messages run on the chat kit; PeopleSearch is AsyncCombobox.
  TrendChart gained yDomain upstream (feel charts pin 1-5 at the
  v0.3.0 pin bump).

## 2026-08-05 (W3 landed; branch ready for Jaak's review)

- W3 on the branch: all six territories landed in one wave. Notable
  judgment calls: route-navigation tabs kept real links styled with
  the system's tab classes (Base UI Tabs owns panel state, wrong
  semantics for navigation); report-bug kept its compact attach flow
  (UploadDropzone was not 1:1); feed composer is now bottom-anchored
  at all widths (was centered card on desktop); log-session panel is
  12px narrower (system max-w-md instead of an arbitrary 460px).
- Menus now close on item click/outside click/Escape everywhere
  (details/summary never did): strictly better, but muscle memory may
  notice.
- HOW TO TEST THE BRANCH: cd pb-app && git worktree list (the
  design-system worktree), run make start against it or
  npm run dev:web:beta from the worktree; walk feed, log session,
  settings, apply, auth, explore, coach dashboard/plans/clients,
  admin. Calls + interval timer intentionally still old-style.
  Everything is on branch design-system (pushed); beta untouched.

## 2026-08-05 (W2 landed, W3 in flight)

- W2 on the branch: ui.tsx/chrome.tsx/app-loading.tsx are wrappers over
  the system (33 importers untouched); Toaster mounted once in the
  shell layout; 5 window.confirm sites now ConfirmDialog with identical
  wording; 4 transient notices now toasts, 4 persistent error surfaces
  deliberately stayed inline.
- Judgment calls to eyeball when testing the branch: avatar sizes
  snapped to system presets (xs 20->24, sm 32->28, md 40->36px); Field
  hint text moved below the control; "Your Stripe link expired..."
  changed from persistent inline text to a 5s info toast (the page CTA
  still offers recovery); sidebar/tab-bar surfaces moved to system
  tokens (raised/card).
- pb-ui v0.2.1 cut mid-adoption: pb-app compiles the raw library under
  exactOptionalPropertyTypes, which v0.2.0 failed. Fixed the 8 files,
  turned the flag ON in pb-ui itself, widened 52 exported className
  props to string | undefined. pb-app pin bumped, no tsconfig override
  left behind. Rule learned: pb-ui must compile under the STRICTEST
  consumer's flags; the flag now lives in pb-ui tsconfig.

## 2026-08-05 (pb-app adoption, design-system branch)

- W1 landed on pb-app branch design-system (pushed). Zero-visual-change
  gate: computed tokens byte-identical in both modes except three
  DELIBERATE deltas riding the system's WCAG fixes: light warning/amber
  fill deepened (#b56f08 -> #a66607), dark destructive button text now
  deep red-black, light faint text slightly darker. Plus: Inter now
  actually loads (was silently Arial), and the radius scale derives
  from the --radius knob, so old rounded-sm/md (4/6px) render 6/8px.
  All four visible only at squint level; flag anything you dislike.
- Theme key stays "pinchblock-theme" with data-theme + .light stamped
  alongside the new .dark class during the bridge (Stripe Connect
  appearance observer and tests depend on the old markers). Full key
  migration deferred to W6 cleanup.
- Old --surface token had no single system equivalent (card-white in
  light, raised-navy in dark): bridged per-mode in bridge.css.
- pb-ui package.json version field said 0.1.0 inside the v0.2.0 tag
  (cosmetic; never bumped). Fixed on main; release rule going forward:
  bump version in the same commit that gets tagged.

## 2026-08-04 (evening, v0.2.0 run)

- Correction: the sink router is react-router 8.3.0 (npm latest), not
  v7 as first logged; API surface used (BrowserRouter, Routes, NavLink,
  lazy routes) is the same.
- Review before v0.2.0 found 27 real issues (1 refuted); all fixed in
  a three-agent wave. Highest-value: ReorderButtons stranded keyboard
  focus at list boundaries (fixed via Base UI focusableWhenDisabled),
  AsyncCombobox had a stale-response hole during the debounce window,
  MonthPicker's keyboard grid could become unreachable, DataTable
  selection had three state bugs.
- Sink pages now import from "@pinchblock/ui" (the package specifier)
  instead of deep relative paths: the barrel is complete, and the sink
  should exercise the real consumer entry point so missing barrel
  exports fail loudly.
- Added the Wave A exit-criterion page: /c/content/example-edit-week
  composes all five Wave A components into one edit-training-week
  flow.
- Sink shell got a mobile nav (Sheet-based) and a no-horizontal-scroll
  control bar at 390px; App.tsx split under the 300-line cap.

## 2026-08-04 (later)

- Sink v2 routing: react-router v7, BrowserRouter, URL scheme
  /c/<group>/<component>. Pages lazy-load; knob URL params work on
  every page, so per-component URLs are the visual regression surface.
- Kit pages: one page per component is the rule, but tightly coupled
  families share a page (chat = bubble+composer+typing, app-shell =
  shell+rail+tabbar+topbar, stack-row). Recorded in each manifest
  description.
- TanStack Table pinned at 8.21.3 for Wave A. v9.0.0 went npm latest
  on 2026-08-04 (yesterday, effectively): zero ecosystem mileage, no
  shadcn patterns yet. Revisit at v9.1+.
- Phosphor glyph deltas accepted from the swap: checkbox check and
  menu radio dot pin bold/fill (control-anatomy carve-out in AGENTS.md
  rule 6); caret/magnifier glyph shapes differ slightly from lucide;
  eyeball them in the sink and flag if any feel wrong.

## 2026-08-04

- Execution order: Phosphor swap runs BEFORE the sink v2 restructure
  (your list had sink first). Reason: sink v2 rewrites every demo
  file; swapping icons first means the new pages are authored with
  Phosphor instead of being touched twice.
- Tag plan: v0.1.0 after the icon swap + sink v2 land (the "starter
  system" milestone), v0.2.0 after Wave A + its adversarial review.
  Both pushed with their commits.
- Icon weight rule (AGENTS.md rule 6): library code never sets per-
  icon weights; the consumer's IconContext owns weight globally. The
  sink gets a weight toggle (thin/light/regular/bold/duotone) so you
  can judge weights across the whole system live.
- System-mode icon: lucide SunMoon has no Phosphor equivalent; chose
  CircleHalf for the light/system/dark toggle. Cheap to change if you
  hate it.
- pb-app port: NOT started. ADOPTION-WEB.md W0 requires your explicit
  sign-off on editing pb-app's root AGENTS.md ("minimal and
  reversible" clause) and web/AGENTS.md (reference visual language).
  Everything up to and including v0.2.0 happens in pb-ui only.

