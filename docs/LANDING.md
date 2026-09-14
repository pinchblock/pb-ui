# Pinchblock landing: from demo to the real site

Status (2026-09-09): M1 built and M2 plus most of M3 built locally, all
uncommitted; see "Progress" under Milestones and "Resume" at the end.
This file is the canonical plan and status for the landing revamp. It
lives in pb-ui because this is where the landing's token set, theme
and display face are built; pb-app gets a one-paragraph pointer in its
docs with the first landing commit. Machine-specific notes (local
paths, links, accounts) stay in a private appendix beside the design
source, outside this public repo.

Companion: the design itself (apps.parik.ee/pinchblock, private) and
the record of its one-page demo stay as the design reference. This
file is about turning that demo into the production landing at
pinchblock.app.

## 1. What exists today

**The design** (`/pinchblock`, this repo). Two screens: a full-bleed
climbing video under a live wireframe mesh, Archivo headline, IBM Plex
reading text, near-black `#0A0C0E` with the icon's cyan `#1EEFFA` as the
only accent; then How it works and two audience cards. Static, `noindex`,
not wired to anything. The local copy differs from the committed one only
by a Prettier reformat.

**The mesh lab** (a single HTML file kept beside the design). Twelve shapes:
sphere, torus, knot, Möbius, cube, dumbbell, bag, pinch, fins, stopwatch,
kettlebell, barbell. The site ships two (dumbbell, bag). `PinchMesh(canvas,
opts)` is the port: seeded RNG, per-shape poses captured with the lab's
Copy pose button, quaternion slerp morphs, O(n²) edge building, pointer
tilt and drag.

**The icon.** Decided: `c`, the current cyan (`#4dfefd` to `#0ff1fd`).
`a14` and `c14` (yellows) may be tried later, so the accent is built to
swap (see 3A).

**The current site** (`pb-app/web`). `src/features/landing.tsx` plus four
`landing-*` components: hero with a fake macrocycle chart and a stock
quote, Problem, ForEveryone, AppShowcase, Community, ForCoaches,
Destination, Belief, Waitlist, footer. Ocean theme, glass cards, gradient
text. Every one of those files sits on the guardrail test's frozen
legacy-debt list. Around it, the parts that are real and localized: the
public header (`PublicSiteHeader`, labels through lingui, signed-in
visitors get Open app), the footer legal links, the waitlist form posting
to `/api/waitlist`, `/explore`, `/apply`, `/auth`.

**The rules the new page has to live under**, all from `pb-app`:

- Product UI uses `@pinchblock/ui` tokens. `src/lib/design-system-guardrails.test.ts`
  scans `src/app`, `src/components`, `src/features` and `src/lib` and fails
  on raw colour literals and off-scale type; the exemption list carries a
  reason per file and the legacy list may shrink, never grow. A pre-push
  hook runs it.
- Glass is permitted on public marketing surfaces, headers and overlays.
- All copy goes through lingui with semantic IDs (`publicHeaderExploreV1`
  is the existing pattern), `en-GB` is the source locale, the page lives
  under `[locale]`, and `generateMetadata` with alternates must be kept.
- The landing has a bundle budget: 313,344 B raw / 88,064 B brotli JS in
  at most 9 chunks, 158,720 B raw CSS. Ceilings, not targets; never raised
  to pass CI.
- Performance doc: nothing speculative on the first-paint path, Save-Data
  and reduced-motion respected, poor networks are a first-class
  acceptance condition. Public routes must not inherit authenticated
  providers.
- `beta` deploys to beta.pinchblock.app, `master` to www.pinchblock.app,
  promotion by branch. Feature work happens in a worktree off local `beta`
  with a workboard card.
- There is no `web/public` directory today (nothing ignores it; it simply
  isn't there). Static assets currently ship as app routes (`icon.svg`,
  `robots.ts`). User media lives in Cloudflare R2; the media doc allows
  public CDN URLs for public media.

## 2. Decisions taken (2026-09-08)

| # | Decision | Outcome |
|---|----------|---------|
| D1 | Icon and accent | `c` cyan now. Yellow may follow, so the accent lives in exactly one place and the swap is one line (3A). |
| D2 | Sports | Extend the catalogue to what the mesh set and the demo copy already imply: add **Boxing** (bag), **Running** (stopwatch), **Swimming** (fins) to the existing Bouldering, Climbing, Strength, Hypertrophy, Endurance, Mobility. Further sports and their meshes come from a separate thread. Copy is written against the extended catalogue, never beyond it. |
| D3 | Investor content | None. The page sells to athletes and coaches; a site that looks excellent is the investor pitch. |
| D4 | Video | Keep the climbing footage through beta. Replace it before promotion to `master`; that is a release gate, not a wish. |
| D5 | Real coaches on the landing | Yes, from Explore data. |
| D6 | Where it ships | The `/` route of `pb-app`, which is what beta.pinchblock.app serves before sign-in. Behind a flag, flipped on beta, promoted to www with `master`. Explained in 3B. |
| D7 | Old sections | Dropped. Only features that exist in the app today are promoted; nothing from the roadmap. |

## 3. Architecture: getting the design in without breaking the system

### A. pb-ui: a fixed token set for the landing, with one swappable brand value

The design wants a fixed near-black palette regardless of the visitor's
theme or light/dark preference. pb-ui already has the mechanism: `stage`,
an always-dark `ModeTokens` set emitted by `npm run gen` as one class block
that wins by inheritance. The landing gets its own set, working name
`marquee`, with the same guarantee: identical in every theme and mode.
Values from the design: background `#0A0C0E`, foreground `#F2F1EC`,
primary-foreground `#052426`, borders at 14% foreground, glass tokens for
the header. Status and chart slots keep the stage values so the type stays
complete and the compiler stays happy.

**The brand swap.** `marquee.ts` opens with one constant, `BRAND`, holding
the icon accent. `primary`, `primaryHover`, `primarySoft`, `primaryBorder`
and `ring` all derive from it. The mesh reads `--primary` off its element
at mount, and the video shade uses only the neutral tokens. Switching to a
yellow icon is therefore one hex change, `npm run gen`, a tag bump, and a
look at the poster grade. There is deliberately no new token called
`brand`: `primary` is already the semantic brand slot in every theme, and
a second name for the same thing is exactly what the design system rules
forbid. The swap point is the constant, not a new token.

Type: the design's identity is Archivo, wide and heavy, for display only.
Font families are shared tokens, and changing the shared family would
restyle the whole app. So: add one shared token, `--font-display`, whose
default is the existing sans (no visible change anywhere), and let the
`.marquee` block override it to Archivo. The landing loads Archivo with
`next/font` in its own route, self-hosted, the way `layout.tsx` already
loads Inter, with `wdth` and `wght` axes subset to what the headline uses.

Deliverables: `src/tokens/marquee.ts`, the `fontDisplay` shared token,
`npm run gen`, a sink page for the marquee block, `npm test`, tag `v0.4.0`.
`pb-app` bumps the pin. This is the only cross-repo dependency and it goes
first.

### B. pb-app: the page, and what "replace `/`" means

There is no separate marketing site. beta.pinchblock.app is one Next.js
app that serves the pre-login pages (`/`, `/explore`, `/apply`, `/auth`,
`/waitlist`, the legal pages) and the signed-in app from the same deploy.
The demo on apps.parik.ee is a static mock outside it. So the new landing
is a rewrite of the `/` route inside `pb-app`, nothing more exotic. While
it sits behind the `landing-revamp` local feature flag (boolean, web, off
by default, per the feature-flag skill), beta keeps showing the old page.
Flipping the flag makes beta.pinchblock.app show the new one. Promoting
`beta` to `master` puts it on www.pinchblock.app. The header, footer,
Explore and the forms are already the same app, so every CTA is a real
route with no cross-domain hop.

The alternative, keeping a separate static site, would split the deploy
path, lose localization and the real coach data, and need every CTA to
link across domains back into the app. Not recommended, and not planned.

`[locale]/page.tsx` stays as the route (signed-in redirect, metadata,
alternates). `LandingPage` becomes a server component composing sections
inside `<div className="marquee">`, so every colour and type decision is a
token utility and the guardrail test passes without a new exemption.
Client islands only where interaction exists: the mesh, the video
controller, the waitlist form. No authenticated providers.

The other pre-login routes (Explore, profiles, apply, auth, legal) share
`PublicSiteHeader` and inherit the restyled header. Their bodies stay on
the app theme for now: Explore and profiles are the product, and they are
where the primary CTA lands. Whether they also get the marquee ground is a
decision to take after seeing the landing next to them; it is a token
scope change, not a rewrite.

### C. Copy

Every string is a lingui message with a semantic ID
(`landing.hero.headline.v1`, `landing.proof.seeAll.v1`, and so on), source
`en-GB`. The existing header labels are reused. The three new sports need
labels in the catalogue too. The localization report gate will catch
anything hardcoded, so the copy deck is written first and catalogued once.

### D. Media

- Video: two encodes (1080p desktop, 720p phone) and a poster, hosted in
  the public R2 bucket behind its CDN URL, which is what the media doc
  allows for public media and keeps 3.6 MB out of the repo. `preload="none"`,
  poster first; the `<video>` gets its `src` only after first paint and
  only when `prefers-reduced-motion` is off and `navigator.connection.saveData`
  is false; paused when the fold leaves the viewport. The demo's pause
  control was removed on 2026-09-11 by decision; reduced-motion visitors
  never receive the stream. The current footage is a placeholder until D4's
  replacement lands.
- Poster: the LCP candidate. Under 100 KB, priority-loaded, real dimensions.
- Icon and OG image: introduce `web/public` for these small static files
  (nothing prevents it) or continue the app-route pattern; either is fine,
  `web/public` is simpler. The OG image is a real render of the fold, not
  a generated card.

### E. Performance against the budget

The mesh is ~22 KB raw, ~7 KB brotli: it fits inside the 88 KB budget with
room, but it is loaded as a lazy island after first paint so the fold's
critical path is HTML, CSS, the poster and the font. Edge building is
O(n²), so 1,728 points on desktop, 864 on phones, edges for the next shape
built on idle, exactly as the demo already does. Six shapes instead of two
means six edge sets; only the first is built before first frame, the rest
on idle in cycle order. Reduced motion: one static frame in the captured
pose, no spin, no auto-morph. Measure the chunk count at M2; the cap is 9
and the mesh island adds one.

### F. Reuse from the current site

Keep and rewire, don't rewrite: `PublicSiteHeader` (localized, signed-in
aware) restyled by the marquee tokens; `publicResourceLinks` for the
footer; `LandingWaitlist` and `/api/waitlist`; `getExploreCoaches` for the
proof band; `routes.explore` and `routes.apply` as the real CTA targets.

### G. The sport catalogue change

`coachApplicationSports` in `packages/schemas` gains Boxing, Running and
Swimming. It is an additive enum change: the coach application form and
the Explore chips derive from the enum, existing coach data is untouched,
and the three labels are catalogued for localization. It ships in M2 so
the landing's copy and mesh captions can point at real filters.

## 4. The page, top to bottom

The brief: sell to athletes and coaches without reading as a template.
The design's look is strong; what makes it not slop is what sits in it.
Every section below is either real product data, a real product screen,
or a claim the product can back today. Nothing from the roadmap.

1. **Nav.** New icon, wordmark, Explore coaches (real route), How it
   works, For coaches, Sign in, Get early access. Signed-in visitors get
   Open app. Glass header from the tokens.
2. **The fold.** Video ground, mesh, headline. Keep the demo's headline,
   it is specific and it is ours: "Real pro coaches for athletes who
   aren't pro. Yet." Lede written against the extended catalogue:
   climbers, boxers, lifters, runners and swimmers, all true after D2.
   Primary CTA "Find your coach" goes to `/explore`, a real grid of real
   coaches, which is a far stronger promise than a waitlist and it already
   exists. Secondary "Apply as a coach" goes to `/apply`. Trust line
   carries only claims the product backs: credentials checked by us;
   plans that live with you. "Every sport, every level" goes, it isn't
   true.
3. **Proof band.** Three to six real coaches from `getExploreCoaches`,
   server-rendered: name, sport, verified mark, lowest published plan
   price, then "See all N coaches". Real data or nothing: if beta has
   fewer than three discoverable coaches the band collapses to one honest
   sentence and the CTA. This is the section that makes the page
   un-fakeable.
4. **How it works.** Three steps mapped to real flows: browse and filter
   on Explore, open a profile and preview the plan, buy and train on a
   plan that adapts. Numbered, because it is a sequence.
5. **The product, shown.** Two or three framed screenshots from the beta
   app: an athlete's week, a coach's client view, the feed. Captions of
   one line. Screenshots, not illustrations; the app is the source of
   truth for what the product is.
6. **For coaches.** Set your rates; get paid on time (Stripe Connect is
   live); bring your athletes or find new ones; coach from anywhere. CTA
   Apply. Every clause here is something the product does now.
7. **Waitlist.** The existing form and barriers, restyled.
8. **Footer.** Legal links, company line, nothing else.

Removed from the demo: the `01/02/03` numbering on the pillars (they are
not a sequence) and the "Landing page concept" footer line. Removed from
the current site: gradient text, glass cards in the hero, the macrocycle
chart, the stock testimonial, Community, Belief, Destination, AppShowcase.

## 5. The mesh

Ship six shapes, each tied to a sport the app lists after D2, and make
them mean something:

| Shape | Sport filter |
|-------|--------------|
| pinch | Bouldering, Climbing (and it is the brand name made literal) |
| dumbbell, kettlebell, barbell | Strength, Hypertrophy |
| stopwatch | Running, Endurance |
| fins | Swimming |
| bag | Boxing |

Each caption is a real link to Explore filtered by that sport, so the
ornament becomes a control. Auto-cycle every 7 s, click to switch, drag to
tilt, as now. Mobility has no shape yet; it gets one in the mesh thread,
along with any further sports.

Port from the lab: RNG, generators, `buildEdges`, rotation, slerp, batched
`Path2D` drawing, pointer handling. Capture a pose per shape with Copy
pose. Colours come from the marquee tokens read off CSS variables at
mount, never literals in the file, so the guardrail test never has a
reason to look at it and the brand swap reaches the mesh for free. Pause
when offscreen; static frame under reduced motion.

Reuse in the apps is a separate piece of work: this is 2D canvas code and
React Native won't run it as-is, it would be a Skia port. Note it, don't
scope it here.

## 6. Milestones

| M | Work | Size | Gate |
|---|------|------|------|
| M0 | Decisions D1 to D7: done. Remaining: copy deck in `en-GB`, freeze the demo, move this plan to `pb-app/docs`, workboard card. | S | Copy signed off |
| M1 | pb-ui: `marquee` token set with the `BRAND` constant, `fontDisplay` shared token, gen, sink page, tag `v0.4.0`. | S | `npm test`, sink in all themes |
| M2 | pb-app scaffold behind `landing-revamp`: route, server composition, lingui IDs, header/footer/waitlist reuse, proof band on Explore data, pb-ui bump. Additive schema change: Boxing, Running, Swimming in `coachApplicationSports`, labels catalogued. | M | Guardrail test, localization check, bundle gate for `/page` |
| M3 | Media and mesh: R2 assets, video controller, poster, mesh island with six shapes and captured poses, reduced motion, offscreen pause. | M | Lighthouse on throttled network; chunk count |
| M4 | Product screens, coach section, OG image, metadata. | S | Content review |
| M5 | Full pass at 390, 768, 1440 in light and dark host settings; keyboard and screen-reader pass; `make check`. Flip the flag, integrate to `beta`, verify beta.pinchblock.app. | S | Beta live and checked |
| M6 | Before `master`: replace the climbing footage (D4), re-check the fold, promote per the deployment doc. | S | Rights on file, www live |

M1 blocks M2. M3 and M4 can run in parallel after M2. Sizes are relative
effort, not dates.

### Progress (2026-09-08)

- M1: done on the pb-ui branch `landing-marquee` (in a worktree): `marquee` set, `BRAND` constant, Archivo hook,
  sink page, `npm test` green. Added beyond the plan: theme `turquoise`,
  the fold palette as a selectable app theme (dark IS marquee, light is
  the same ink on paper with a teal primary), registered in the sink and
  in pb-app's palette picker. Not committed, not tagged.
- M2: scaffold done in `pb-app/.worktrees/landing-revamp` behind the
  local flag `landing-revamp`: route swap in `[locale]/page.tsx`, server
  composition, lingui IDs (landing.*), proof band on Explore data. Open:
  sports catalogue change (Boxing, Running, Swimming), lede rewording,
  bundle gate for `/page`.
- M3: video controller with poster-first and reduced-motion gating,
  mesh island with seven shapes (dumbbell, pinch, kettlebell, barbell,
  stopwatch, fins, bag) at 3000 points desktop and 1200 phone, barbell
  points rebalanced to the plates and posed on a 48 degree turntable,
  header compacts to an 80% ground tint on scroll. Open: R2 hosting for
  the two mp4s (recommend gitignore and serve from beta R2), nicer
  captured poses for pinch, kettlebell, stopwatch and fins, Lighthouse.
- Gates at the time of writing: typecheck, guardrails (3/3) and
  localization check all green; the hardcoded-copy baseline was
  ratcheted down by five (theme names and the boot script exempted).
- Data truth still open: no verified beta coaches behind "Verified pros
  only"; the Apple review account is discoverable on the proof band.

### Progress (2026-09-09)

- M2 leftovers done: Boxing, Running and Swimming added to
  `coachApplicationSports` with a migration that widens the check
  constraint; all ten application sports now have catalogued labels
  (`common.sport.*`) rendered through one helper on the apply form, coach
  onboarding and the Explore chips; Explore search aliases for the three
  new sports; the lede rewritten against the extended catalogue; the
  waitlist intro catalogued (no em dash, catalogue sports only) and passed
  from the server because the landing has no client localization provider.
- New rule applied: no caps anywhere. The trust line, section eyebrows,
  footer and the waitlist eyebrow lost their `uppercase`; the sink page too.
- Header no longer clips the wordmark at 390 (flex on phones, grid from md).
- Bundle gate measured: the new landing alone is JS 185,139 B raw /
  51,858 B brotli / 7 chunks and CSS 157,923 B raw / 21,082 B brotli / 3
  chunks, inside every ceiling (CSS raw sits at 99.5% of its ceiling).
  With the old landing still compiled into the same route the route
  measures about 318.9 KiB raw / 90.4 KiB brotli and fails the check.
  Decision pending: a time-bounded exception until the flip, or a
  separate route for the coexistence period.
- Gates: typecheck, guardrails, localization check green. The migration
  suite fails on the baseline too (a coach-note concurrency smoke assert
  unrelated to this change); the new migration applies cleanly.
- Companion plan for pre-sign-in intent lives in pb-app
  `docs/visitor-intent-plan.md`.
- Video hosting decided and done (option 1, the existing public R2
  bucket): the two encodes live under versioned immutable keys
  (`landing/bg-1080-v1.mp4`, `landing/bg-720-v1.mp4`) on the beta media
  host, uploaded and verified by `scripts/upload-landing-media.mjs`. The
  page reads the CDN origin from the server-only
  `PINCHBLOCK_PUBLIC_MEDIA_BASE_URL`; unset means poster only. The mp4s
  are gitignored; poster and icons stay in git. Production needs the same
  variable on the web project and the same upload to the production
  bucket at promotion. Lesson: verify uploads through a cache-busting
  query, the CDN caches a 404 on the bare URL for four hours.
- Footage replaced (D4 resolved early, rights: Jaak's own clips): one
  24.9 s loop of three clips, the bouldering wall (mirrored), the gym
  ball and the gym floor, joined by one-second crossfades and a
  crossfade back into the start so the loop point is invisible. Keys
  `landing/bg-1080-v2.mp4` (6.6 MB) and `landing/bg-720-v2.mp4`
  (2.9 MB) on the media host; poster is now `poster.webp`, 1600 wide,
  94 KB. The fold weight more than doubled against the old placeholder;
  trimming each clip to its best 5 to 6 s is the lever if phones need it.
  The candidate flag used for the comparison was promoted and removed.
- Site defaults changed in pb-app (2026-09-09, from the sink's control
  bar): turquoise is the default palette for visitors without a saved
  preference (dark stays the default mode), `--radius` 24px,
  `--font-scale` 1.15 (the sink's L step), density 1, and every
  Phosphor icon site-wide renders duotone through an IconContext
  provider in the root layout. Lucide icons, still used across most of
  the app, have no weights and are unaffected.
- Brand colour rule applied (2026-09-09): cyan only on primary buttons
  and links; the landing kicker, trust dot, step numbers, eyebrows and
  waitlist chips moved to foreground, pb-ui controls likewise (see
  DECISIONS.md). The app's own screens still use `text-primary` for
  emphasis in about 80 files; that sweep is a follow-up.
- Brand mark and badge (2026-09-09): the "PB" monogram is replaced by
  the app icon everywhere on web (public header, app shell, onboarding,
  auth, the old landing and waitlist pages) from `web/public/brand/`,
  the favicon and apple icon are the same image, and the Beta badge is
  gone along with its message. The auth screen lost its caps divider and
  its cyan dumbbell circles. Sign-in and the signed-in shell read the
  theme from the root like every other route, so turquoise applies there
  with no per-route work; the mobile app icon is untouched.
- App ground flattened (2026-09-09): the dark body no longer applies the
  ambient glow (it mixed primary and success into the background, which
  read as a teal swamp under turquoise). pb-ui's `pb-backdrop` is now a
  neutral foreground vignette. The `eyebrow` utility, table headers and
  the remaining `uppercase` utilities across the app are sentence case.
- Theme surfaces revamped (2026-09-09): turquoise dark now has its own
  ground, panel and hairline values (cool charcoal, panels one step
  lighter, visible borders) instead of being the marquee object. The
  landing keeps marquee. Tab underlines use the brand again.
- Corners (2026-09-09): the shared radius token is 6px (0.375rem) and
  Button and IconButton are fully rounded by default; the app's 24px
  override is gone and its legacy raw buttons were swept to
  `rounded-full`. The brand mark's squircle (the design's Android clip
  path) is baked into the PNGs under `web/public/brand/` and the favicon,
  so no mark uses a rounded utility and none follows `--radius` any more.
  The Apple touch icon stays the full square because iOS masks it.
- Cookie consent (2026-09-11): a first-party consent cookie
  (`pb-cookie-consent-v1`, compact versioned value, 180 days), a bottom
  banner on first visit with Accept all / Necessary only / Manage, a
  preferences dialog with Necessary (locked), Analytics and Marketing
  toggles, a footer "Cookie settings" link that reopens it, a privacy
  policy sentence, and `AnalyticsScripts`, the single gate where optional
  scripts may mount once `analytics` is allowed. The Google pixel is not
  wired: Erik adds it inside that gate when the tag id exists. Rendered
  from the root layout with server-resolved copy, so it needs no
  provider on public routes.
- Radius audit (2026-09-11): the corner scale is collapsed at the
  generator, rounded-sm through rounded-3xl all resolve to the 6px
  token and rounded-xs is a fixed 2px for checkbox and kbd; PhoneFrame
  keeps literal device corners. The app's re-emitted scale matches and
  its one literal (10px on the AI panel) is gone. The old landing's
  phone mock-up literals stay with the old landing.
- Mesh grows with the viewport above 1400 px: the canvas is capped by
  `max(42rem, min(46vw, 64rem, 70svh))`, so 1440 keeps today's 672 px,
  1920x1080 gets 756 px (bounded by height so the pillars stay in the
  fold), 2560x1440 gets 1008 px.

## 7. Risks, stated plainly

- **The look is a known AI cluster.** Near-black with a single neon
  accent is the most templated web look of the moment, and the yellow
  candidates would push it to acid green if tried later. What keeps this
  page out of that bucket is everything a template cannot have: real
  footage, a hand-built mesh, real coaches with real prices, real product
  screens, and type set with intent. If any of those get cut for time,
  the risk goes up sharply. Keep them.
- **Sports.** Resolved by D2 in the right direction: the catalogue is
  extended to match the copy, the copy is not loosened to match nothing.
  Any sport named on the page must exist as an Explore filter.
- **Video on phones.** 1.1 MB on a metered connection is not free. The
  gating in 3D is the mitigation; measure it, and be ready to ship the
  poster only on save-data and slow connections.
- **Guardrail test.** Any literal colour in the mesh or a section fails
  the pre-push hook. Everything reads tokens; the test is run at M2
  before anything else is layered on.
- **Budget.** The current landing already spends part of the 9-chunk cap.
  Measure before adding the mesh island; if it doesn't fit, the island
  merges into the page chunk rather than the ceiling moving.
- **Archivo weight.** Variable font with two axes can be large. Subset to
  the axis ranges the headline uses and verify the woff2 size at M2.
- **Real-coach section depends on real data.** If beta has too few
  discoverable coaches, the band degrades by design rather than showing
  placeholders.
- **Footage is a placeholder.** The current climbing video ships to beta
  only. M6 gates `master` on its replacement and the rights being on file.

## 8. Not in this plan

Investor content, analytics, a blog, a pricing page, the native app mesh
port, meshes for sports beyond the six above, the old site's Community
and Q&A section, and any second locale beyond `en-GB` source.

## 9. Resume (state on 2026-09-09)

Nothing is committed or pushed. The work sits on two feature branches;
the shared checkouts of both repos carry unrelated uncommitted work
that must be left alone (stage by file name, never with a glob).

### Branches

- pb-ui `landing-marquee`, on main b618d36: the marquee surface set
  (`src/tokens/marquee.ts`), the turquoise theme
  (`src/tokens/themes/turquoise.ts`), the generator's `surfaces` loop,
  the sink page `demo/src/pages/stage/marquee-tokens.tsx`, docs, the
  contrast script, version 0.4.0 in `package.json`, no tag. `npm test`
  green.
- pb-app `landing-revamp`, on beta e0e3c30b: the page behind the local
  flag `landing-revamp` (`web/src/app/[locale]/page.tsx` routes to
  `web/src/features/landing-revamp.tsx`), the client islands
  `web/src/components/landing-mesh.tsx`, `landing-nav.tsx` and
  `landing-video.tsx`, the mesh kernel
  `web/src/features/landing-mesh-core.js` with its `.d.ts`, the
  landing.* message IDs and the compiled en-GB catalog, additions to
  `web/src/app/globals.css`, `web/src/proxy.ts` (mp4 passthrough),
  `web/src/lib/theme.ts` (turquoise selectable) and assets under
  `web/public/landing/`. Gates green: typecheck, guardrails,
  localization check (the hardcoded-copy baseline ratcheted down by
  five: theme names and the boot script exempted).
- pb-app `beta` working copy: one small fix of ours in
  `scripts/dev-service-manager.mjs` (localhost probed on IPv4 and
  IPv6, which stops the dashboard's Metro start from timing out).

### Wiring that is easy to break

- The pb-app worktree consumes pb-ui as a plain copy under
  `node_modules/@pinchblock/ui`, because Turbopack refuses symlinks
  outside its root. After any pb-ui change, copy `src/` and
  `package.json` over again.
- In the pb-ui worktree the root `node_modules` is a symlink to the
  main checkout's, and `demo/node_modules` is a real directory of
  per-package links so the sink resolves `@pinchblock/ui` to the
  worktree. Never stage `node_modules`.
- The `landing-revamp` flag is declared in
  `devtools/local-feature-flags.json` and switched on in the primary
  checkout's gitignored `.env.feature-flags.local`. Beta keeps the old
  landing until M5 flips it there.
- The brand swap is one line, `BRAND` in `src/tokens/marquee.ts`, then
  `npm run gen` and the copy step. The mesh reads `--primary` at mount
  and turquoise dark spreads marquee (own surfaces, same brand family), so both follow.

### Running and checking

- Web: from the pb-app worktree, run `scripts/dev-web-beta.mjs` with
  the managed environment and the flag on (the dev dashboard does
  this; the private appendix has a one-line detached starter). First
  compile takes about 40 s; then http://localhost:3000/.
- Sink: `npm run dev` in the pb-ui worktree (pick another port if the
  main checkout's sink holds 5190); theme matrix at
  `/c/foundations/themes`, tokens at `/c/stage/marquee-tokens`.
- pb-app gates: `npm run typecheck --workspace=@pinchblock/web`,
  `npm run test:guardrails --workspace=@pinchblock/web`,
  `npm run localization:check`; after message changes
  `npm run localization:extract && npm run localization:compile`.
- pb-ui gates: `npm test`, `node scripts/contrast-check.mjs`.
- The mesh cycles every 7 s in the order dumbbell, pinch, kettlebell,
  barbell, stopwatch, fins, bag. The barbell is on screen roughly 22
  to 29 s after load; screenshots of it need that wait.

### Commits waiting for a go

1. pb-ui `landing-marquee`: "feat(tokens): add marquee, the landing's
   fixed surface set, and the turquoise theme". Merge to main and tag
   v0.4.0 once the main checkout's unrelated WIP is resolved; expect
   conflicts in `scripts/generate-css.ts`, `src/styles/tokens.css` and
   `src/tokens/index.ts`; keep the `surfaces` loop and regenerate.
2. pb-app `landing-revamp`: "feat(web): landing revamp behind the
   landing-revamp flag". The mp4s are gitignored and served from the
   public media bucket; poster and icons are in git.
3. pb-app `beta`: "fix(devtools): probe both IPv4 and IPv6 when a
   localhost service starts".

### Open items, in the order to take them

1. The three commits (pb-app's now includes the CDN wiring and the
   upload script; the mp4s stay out of git).
2. Bundle gate during coexistence: decide between a time-bounded
   exception for `/page` and a separate route until the old landing is
   deleted at M5.
3. Proof band data truth: no verified beta coaches behind "Verified
   pros only"; the App Review test account is discoverable.
4. M3 leftovers: captured poses for pinch, kettlebell, stopwatch and
   fins (the lab's "Copy pose" button, pasted into `POSES` in
   `landing-mesh-core.js`); Lighthouse on a throttled network.
5. M4: product screens, coach section, OG image, metadata.
6. M5: 390, 768 and 1440 in light and dark host settings, keyboard and
   screen reader, `make check`, flip the flag on beta, verify
   beta.pinchblock.app.
7. M6, before master: footage already replaced with Jaak's own clips;
   confirm the rights note is on file, re-check the fold weight on phones.
8. If the yellow icon wins: change `BRAND`, gen, copy, look.
9. Theme names (`paletteOptions` labels) are exempt from localization
   as proper nouns. If they should be translated instead, catalogue
   message IDs and re-ratchet the baseline.
