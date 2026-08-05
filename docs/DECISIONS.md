# Decision log

Autonomous calls made while Jaak is away, newest first. Read this
after a gap; challenge anything, everything here is reversible.

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
