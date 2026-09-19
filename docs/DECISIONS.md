# Decision log

Autonomous calls made while Jaak is away, newest first. Read this
after a gap; challenge anything, everything here is reversible.

## 2026-09-09 (the landing plan lives here)

- docs/LANDING.md is the canonical plan and status for the landing
  revamp. It moved here from the design folder because pb-ui is where
  the landing's token set, theme and display face are built, and
  because pb-ui is public: the copy here is public-safe (no local
  paths, links or account handles), while a private appendix with
  those details stays beside the design source. Change LANDING.md
  first; the appendix mirrors it.

## 2026-09-08 (v0.4.0: marquee, the landing's token set)

- New fixed surface set `marquee` (src/tokens/marquee.ts), sibling of
  stage: always-dark, theme-invariant, but brand-carrying. Ground
  #0A0C0E, ink #F2F1EC, primary = the app icon's cyan. Built for the
  landing revamp planned in apps.parik.ee/pinchblock/SITE-PLAN.md.
- The brand accent is a single constant (`BRAND`) that the whole
  primary family derives from, because the icon colour is still open
  (cyan now, yellow candidates later). No `brand` token was added:
  primary is already the semantic slot, and a second name for it is
  what GUARDRAILS forbids. The swap point is the constant.
- Display face: marquee overrides --font-display through a consumer
  hook (--font-marquee-display) instead of changing the shared token,
  so Archivo reaches only the landing and Inter stays the app face.
- Generator: stage and marquee are emitted from one `surfaces` loop.
  Found while doing this: origin/main's committed tokens.css carried
  the .stage block but the committed generator did not emit it, so
  `npm test` was red on a clean checkout and any regeneration would
  have dropped stage. The loop fixes both. The same fix exists in
  uncommitted work on the shared checkout; expect a small conflict in
  generate-css.ts when that lands, resolve by keeping the loop.
- New theme `turquoise` (src/tokens/themes/turquoise.ts): the fold's
  palette as a selectable app theme. Its dark mode is the marquee
  object itself rather than a copy, so the brand swap and any marquee
  tuning reach the theme automatically. Light mode derives from the
  same three constants (exported as `marqueePalette`), with the brand
  hue darkened to a teal that passes for text on paper. Contrast rows
  match ocean light exactly (same status and feel values), so no new
  debt; the faint text row is better (4.0 vs 3.4 on card).
- Version 0.4.0: a new public token set, a new theme and new exports
  is a minor.

## 2026-08-05 (late: merged to beta, pb-ui made public, CI lesson)

- design-system merged into beta and PUSHED. Rebased onto the 12
  commits others landed today (push notifications, incoming-call
  actions, Play updates, composer keyboard fix, Google chooser). Four
  conflicts, all resolved keeping their functionality and our
  presentation; the Play-updates section in mobile Settings was
  re-expressed on the system components rather than left mixed.
- THE LESSON OF THE DAY: every local gate passed while every CI build
  failed, since W1. The lockfile resolved @pinchblock/ui over
  git+ssh to a PRIVATE repo; this machine has GitHub credentials and
  Vercel does not. Check the deployment status after the first push of
  any new dependency, not just local builds. Vercel posts commit
  statuses, so `gh api repos/<org>/<repo>/commits/<sha>/status` is the
  cheap check that would have caught it hours earlier.
- pb-ui is now PUBLIC (github.com/pinchblock/pb-ui), chosen over
  putting a GitHub token in Vercel because Erik was offline. Scanned
  the full history first: no credentials anywhere, only ordinary
  product prose. Reversible, though forks and caches can persist.
  Follow-up worth doing: move DECISIONS/BACKLOG/ADOPTION-* into pb-app
  so the public front page is a design system, not an internal audit.
- v0.3.2: the web-only peers (react-dom, the icon set, tailwindcss)
  are optional now. They were required, which made the package
  unresolvable in the React Native workspace the moment a lockfile had
  to be rebuilt from scratch. Mobile imports only /tokens, which is
  pure TS.
- pb-app pins over explicit https and declares @phosphor-icons/react
  in web, where a peer belongs. Verified by installing in a
  credential-less environment, the way the builder does.
- Result: pb-app-web and pb-app-api deployments both green;
  beta.pinchblock.app serves the design system.
- Both withheld WCAG corrections adopted (dark primaryForeground
  5.45:1, light accent 5.60:1 and 4.55:1 as text).
- iOS dev client rebuilt for the simulator (their push module needs
  native compilation) and a device build for Jaak's iPhone 15 Pro Max
  compiled cleanly; installation waits on the phone.

## 2026-08-05 (evening: iOS runs, two real bugs found and fixed)

- iOS simulator now runs the app (iPhone 17 / iOS 26.4, dev client built
  from the branch). Running iOS for the first time surfaced a
  PRE-EXISTING blocker, unrelated to the design system: every
  signed-out iOS start dead-ended on "Session needs attention". Cause:
  clearing the three encrypted stores calls deleteDatabaseAsync on
  databases that were never created; iOS throws a Swift
  FunctionCallException (DatabaseNotFoundException) while only the
  Android message shape was recognized, so a benign no-op became a
  fatal cleanup failure. Fixed with one shared platform-aware guard
  plus tests; genuine deletion failures deliberately stay fatal
  (sign-out cleanup is a security guarantee). Worth cherry-picking to
  beta on its own; it has nothing to do with pb-ui.
- Jaak reported the sidebar jumping and the background changing between
  Feed and Settings. Measured, root-caused, fixed in pb-ui v0.3.1:
  (1) centered layouts shifted 2.5px because scrollbar-gutter reserves
  nothing under macOS overlay scrollbars, so a short route and a tall
  route differed by the 5px track; the track is now unconditional.
  (2) pb-backdrop's percentage-positioned gradients scaled to document
  height (862px on Feed vs 2245px on Settings), painting a visibly
  different wash per route; the backdrop is now viewport-sized and
  non-repeating. Verified live: aside x-position identical on both
  routes, jump = 0px.
- Kitchen sink is deliberately NOT in pb-app's make-start dashboard
  (its scripts live on beta, outside the branch). Options when wanted:
  a make target in pb-ui, or deploy the sink to a URL.

## 2026-08-05 (W6 landed: the adoption plan is fully executed)

- W6 survived a mid-flight usage-credit outage: all three agents died
  but most work had landed on disk; I completed the remainder inline
  (waitlist glass-input retirement, nativeButton console errors, two
  decorative hexes in landing-community). Lesson: the workflow gates
  (grep + tsc + tests) made the partial state diagnosable in minutes.
- Final state on branch design-system (9 commits ahead of beta):
  W1-W6 web + M0-M2 mobile. Zero raw hex in web/src except the
  sanctioned Google brand mark; bridge.css gone; calls/timer on the
  stage kit; landing on display/glass/motion; both workspaces pinned
  to pb-ui v0.3.0.
- --surface stayed an app-level token in pb-app globals.css (documented
  as a pb-ui candidate): the old token meant different things per mode
  and forcing a rename across 110+ call sites was judged churn without
  design benefit. Decide at leisure.
- Sink is NOT in pb-app's make-start dashboard (deliberate: dashboard
  scripts live on beta, outside the branch). Options if wanted: a
  make target in pb-ui, or deploy the sink to a URL.

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

## 2026-09-09: brand colour only on primary buttons and links

The turquoise cyan is the site default and it is loud. Decision (Jaak):
it appears only on the primary Button and on links. Every other use in
the components (checked checkbox, radio and switch, pressed chip, active
tab and segment, selected calendar day, stepper, progress, slider,
counters, nav-rail and tab-bar active states, dropzone drag state, chat
bubble, empty-state and stat-tile icon bubbles, item indicators) moved
to foreground on secondary or border-strong. Focus rings keep the ring
token. Badge tone "primary" solid keeps the brand because choosing that
tone is explicit; its soft appearance is now foreground on secondary.

## 2026-09-09: turquoise dark gets its own surfaces

Until now turquoise dark was the marquee object token for token. The
app needed a calmer ground than the landing's pure near-black under
video, so turquoise dark now spreads marquee and overrides the surface
and border slots: ground #0f181d, panels #131e24, popover #172329,
hairline #243741, strong border #33474f, input border #2b3f48, neutral
selected fill #1f2d35 and hover fill #243740, inset-highlight shadows.
Ink, the brand family, status, AI, chart and feel tokens stay marquee's,
so the brand swap still reaches the app. Inspiration: a desktop chat
client whose panels are separated by hairlines rather than glow. The
active tab underline is back on the brand colour by decision; pressed
chips and segments stay neutral.
