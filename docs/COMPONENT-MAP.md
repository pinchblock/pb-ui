# Component map: pb-app inventory to @pinchblock/ui coverage

Every UI pattern found in the pb-app audits (web, mobile, product) mapped to
the v0.1 component set. Use it during adoption (P4): find the screen's
current pattern in the tables, replace it with the "Covered by" component,
apply the migration notes. Anything marked gap stays hand-rolled in the app
until its v0.2+ entry lands. Priorities come straight from the audits'
componentNeeds (must/should/later); rows marked "-" are recurring patterns
the audits did not rank on their own.

Legend for pattern sources: web paths are `web/src/...`, mobile paths are
`mobile/src/...` in the pb-app monorepo.

## Atoms

| Pattern in pb-app today | Covered by | Priority | Notes |
|---|---|---|---|
| ~6 inline button variants copy-pasted with drift (hover:opacity-90 vs hover:bg-primary-hover, rounded-sm vs rounded-full); mobile PrimaryButton + SmallButton, no secondary/destructive | Button | must | Variants: primary/outline/ghost/destructive/destructive-tint/link, loading spinner built in, pill shape for marketing CTAs, asChild for links |
| h-9 w-9 rounded-full icon buttons (topbar bells, dialog closes, thread call buttons, trash triggers); mobile HeaderAction | IconButton | must | aria-label required by the API; unread badge via CounterBadge slot |
| StatusBadge in web/src/components/ui.tsx (4 tones, no icon) plus dozens of inline chip copies; mobile per-screen tone-mapping functions | Badge | must | Adds destructive and ai tones plus icon slot; amber -> warning rename; kills the inline Ready/In review/Lock/Globe/Monthly rebuilds |
| AiBadge (Sparkles + ai-bg/ai-fg) and ai-tinted notes/gates | Badge (ai tone) + ai-surface utility | must | Keep the Sparkles-means-AI brand rule |
| Sport tag pills (bg-secondary/15 on explore, profile, plan preview; mobile plan/marketplace cards) | TagPill | should | Mobile TagGroup overflow rule: use ChipGroup wrapping |
| Universal container: rounded-lg border bg-card p-4..6 on web (with rounded-[10px]/xl/lg drift), surface + 1px border radius 8/14 on mobile; severity left-border rows in coach dashboard | Card (default/interactive/glass/sunken) | must | Interactive variant replaces hover:border-primary/40 hacks; glass variant is the marketing/overlay-only escape hatch; accent-left severity via className on Card |
| UserAvatar in web/src/components/ui.tsx (size presets overridden via className hacks); 9+ duplicated avatar impls on mobile | Avatar (+AvatarGroup) | must | Ring/status variants replace the ring-success and low-feel-dot wrappers; group covers follower stacks |
| Loader2 animate-spin scattered in buttons and inline loads | Spinner | must | Button embeds it; standalone for inline |
| Skeleton atom private inside web/src/components/app-loading.tsx | Skeleton | must | Exported publicly; route loading.tsx variants become compositions |
| divide-y and border-b last:border-0 hairlines in every list-in-card | Separator | - | |
| Avatar/media upload progress bars, guided workout progress | Progress | should | |
| Unread dots with surface-matched ring, 9+ count pills (messages-bell.tsx, mobile header badges) | CounterBadge/NotificationDot | should | Ring color prop matches sidebar vs surface |
| Native title attr on call buttons, copy link, bar charts | Tooltip | should | Hover plus focus, not hover-only |
| inputClass in web/src/components/ui.tsx; mobile has 3 parallel form-field systems (public-form, workout-form, session-form styles) | Input, Textarea | must | Icon-prefix slot, invalid state; char counter lives in Field |
| Native selects (plan editor, settings, sort controls) | Select (+SimpleSelect) | must | SimpleSelect for the plain string-option cases |
| Native checkboxes/radios styled only by accent-color; RN Switch in CheckField | Checkbox, Switch, RadioGroup | must | |
| Range slider (accent-primary native) in LogWorkoutDialog effort input | Slider | should | |
| Dual icon pipelines: lucide (web) vs phosphor barrel plus hand-copied SVGs (mobile vector-icons.tsx) | lucide-react peer dependency (convention) | must (mobile) | One-set decision still open per PLAN; RN Icon component comes with the mobile phase; product icons (reactions, feel faces) stay an owned SVG set |
| Type ramp bypassed: text-[10px]/[11px] micro labels on web, 328 raw fontSize + 160 fontWeight literals on mobile | Token type scale + --font-scale knob | must (mobile) | Web uses utilities off tokens now; RN Text component is the first mobile build (see parity note) |
| Uppercase tracking-wide micro section headers (dashboard, log panel, admin) | SectionHeader | should | Icon + right slot included |

## Molecules

| Pattern in pb-app today | Covered by | Priority | Notes |
|---|---|---|---|
| Two competing Field impls: web/src/components/ui.tsx (no error slot) vs web/src/features/apply.tsx (with error); char counters hand-placed | Field (+Label) | must | Label + hint + error + counter in one anatomy; delete both old Fields |
| Filter pills re-implemented 4+ times on web (explore, coach-clients, coach-plans, waitlist) and 3 chip systems on mobile | FilterChip/ChipGroup | must | Single and multi select, count suffix for roster filters |
| Segmented toggles: ThemeSwitcher, auth role toggle, bug severity, explore segments, coach workspace sections | SegmentedControl | must | Replaces the .theme-switcher global CSS too |
| Icon-prefixed search inputs (explore, coach clients, admin, mobile explore/roster) | SearchInput | should | Debounce + clear; the PeopleSearch dropdown itself waits on Combobox (gap) |
| Three separate underline tab impls (coach-section-tabs.tsx, admin nav, client-detail TabLink) | Tabs (underline/pill) | must | aria-current baked in; icon + overflow-x scroll for admin's 11 tabs |
| Inline alert banners in 4 recurring tones (destructive, success, amber, ai); mobile plans-feedback suite | Alert | must | amber -> warning tone rename; role=status/alert baked in; tap-to-retry action slot |
| EmptyState in ui.tsx plus several inline copies; mobile empty/error cards with support ID | EmptyState | must | Carry the dashed style; add action and support-ID-friendly body slot |
| KPI tile implemented 5x on web (StatTile, Kpi x2, HeaderStat, Metric) plus mobile metric tiles | StatTile (+AnimatedNumber) | must | label/value/icon/trend/valueTone API; AnimatedNumber for count-up polish |
| AppPageHeader + registry (app-page-header.tsx) shared with loading.tsx skeletons | PageHeader | must | Route registry stays app-side; component takes title/icon/description/width |
| Row anatomy everywhere: inbox, buddy/request rows, client roster, follow requests, blocked users, revenue breakdowns; mobile SocialPersonRow, account nav rows, notification rows | ListRow | should (web), must (mobile) | Leading avatar/icon, title, meta, trailing action/chevron |
| PreferenceToggle checkbox rows (settings.tsx); mobile CheckField label + Switch rows | ToggleRow | should | Switch-based, not accent-color checkbox |
| Privacy radio card group in settings | RadioCard | must | Part of the audit's Switch/Checkbox/Radio/RadioCardGroup must |
| details/summary disclosures (past plans, form cues), day-card expansion, log summaries | Accordion | should | Keyboard and ARIA replace ad-hoc details/summary |
| Step 1 of 2 indicators (log session), guided block progress, mobile ItemPager | Stepper | should | Pager controls (prev/next + X of N) compose from Stepper + Button |
| AdminPaginationControl | Pagination | should | |
| FeelIcon 5-point pickers in logger, guided timer, review steps | RatingFeel (FeelPicker/FeelBadge) | should | Colors from feel-1..5 chart tokens, not the hardcoded hexes |
| FollowsHoverCard (hover/focus only, unusable on touch) | HoverCard | should | Click/touch mode fixes the a11y hole |
| Post overflow menu via details/summary (no Escape/outside close), notification dropdown click-outside hacks | DropdownMenu | must | Menu roles, keyboard nav, destructive item style |
| Chat bubbles (mine/theirs/pending) and date divider pills in messages/[id] | ChatBubble (+DateDivider) | later | Audit priority later, shipped early because messaging design debt is flagged |
| Upload flows: bug screenshot, feed media, avatar (progress, preview, remove, cancel/retry) | UploadDropzone (+useFileDrop), MediaFrame | later | Direct-to-R2 wiring stays app-side |

## Organisms

| Pattern in pb-app today | Covered by | Priority | Notes |
|---|---|---|---|
| 10+ hand-rolled modals with 5 different overlay colors and one focus trap total (FeedComposerSheet) | Dialog | must | Responsive sheet-on-mobile, focus trap, Escape/overlay close, sticky header/footer slots, one scrim token |
| LogSessionPanel (right drawer desktop / bottom sheet mobile), FeedComposerSheet | Sheet (right/bottom) | must | Keeps the glass-panel look on overlays per the glass rule |
| window.confirm (block user), window.prompt (admin reasons), ~4 copied confirm dialogs, Alert.alert in 15 mobile files | ConfirmDialog (+useConfirm) | must (web), should (mobile) | Reason-field variant replaces window.prompt; RN version follows in mobile phase |
| No toast system; transient feedback faked with inline banners that persist until navigation | Toast (toast.* API) | must | Saved/exported/Stripe-status messages move here |
| Admin tables, plan-performance table (min-w + overflow-x-auto, uppercase thead, tone-colored cells) | Table primitives (+TableContainer) | must | Style layer only; sorting/filtering is the DataTable gap |
| Two copy-pasted SVG sparkline impls (coach dashboard, clients); mobile FeedJourneyPreview | Sparkline | should | |
| SessionTimelineChart with hardcoded feel hexes (#DC2626...#6C63D4); mobile SessionTimelinePreview | TrendChart (feel dots + target line) | should | Feel colors move to feel-1..5 tokens so Sage/light themes stop breaking |
| Revenue CSS-height bar chart, 12-week client charts, admin breakdowns | Chart (recharts wrapper) | should | Tokenized categorical + semantic palette; tooltips work on touch |
| HomeProgressRow streak + week dots, compliance meters | ActivityRing, StreakHeatmap | should | Covers the mobile progress-indicators need |
| NotificationsBell hand-rolled dropdown (15 type mappings, no keyboard nav) | Popover + ListRow + CounterBadge for now | should | Dedicated notification center panel is a v0.2 gap; waits on the push/realtime design pass |
| PeopleSearch (keyboard nav but no combobox ARIA) | SearchInput shell now | should | Real Combobox is a v0.2 gap on Base UI |
| Message thread composer (Enter-to-send, char counter) | ChatComposer (+TypingIndicator) | later | TypingIndicator is ahead of product (no typing events yet), costs little |
| Instructional video on structured blocks, future exercise demos | VideoPlayer, MediaFrame | later | media-chrome wrapper, R2/HLS ready |
| LiveNotificationBanner call banners (off-token emerald/red/slate) | gap | later | Toast action variant covers generic banners; the call stack itself belongs to the LiveKit call kit (v0.2) |

## Templates

| Pattern in pb-app today | Covered by | Priority | Notes |
|---|---|---|---|
| AppShell in web/src/components/chrome.tsx: 64px side rail, sticky topbar, mobile bottom tabs with center Log FAB | AppShell (NavRail + MobileTabBar + TopBar) | must | FAB is the MobileTabBar center action slot; nav prefetch stays app-side |
| Inline themeInitScript + localStorage theme switching (web); SecureStore appearance pref (mobile) | themeBootScript + ocean/nocturne/ember/glacier themes, .dark class | must | Covers the mobile cross-platform token package must; tokens import from @pinchblock/ui/tokens on RN |
| Ad-hoc max-w containers and flex stacks per page | Page, Stack, Row | - | |
| Marketing glass kit: glass-card/panel/chip/tile utilities, eyebrow labels, gradient text, PhoneFrame mockups | glass-* utilities, eyebrow, text-gradient-primary, PhoneFrame, Card glass variant | later | Glass on public surfaces and overlays only; the rule is now enforced by which variant you can pick |
| Body radial-gradient glow (dark only) | pb-backdrop utility | - | |
| PublicResourceShell / LegalShell prose pages | Page + PageHeader composition | - | No dedicated component; prose styling stays app-side |
| Mobile Screen wrapper (safe area, gutter, static-first shell) | RN Screen scaffold, mobile phase | must (mobile) | See mobile parity note |

## Deliberate gaps (v0.2+ backlog)

Everything the audits surfaced that v0.1 intentionally does not cover.

- Combobox/Command palette: PeopleSearch needs real combobox ARIA; Base UI ships Combobox, port in v0.2, command palette when a use case lands.
- Calendar/DatePicker: schedule days and annual plans use month selects today; build when scheduling UX gets its design pass.
- SortableList wrappers (dnd-kit): plan days (x2), structured blocks, intake questions all need grip/lock handles plus keyboard reorder; dnd-kit stays an app dependency until the wrapper API settles.
- AnnualTimeline/periodization Gantt: already the most reusable organism in pb-app, needs a token audit and phase/event API cleanup before porting.
- Guided workout FullScreenTimer surface + fixed-dark call-stage sub-theme: timer hardcodes #17634d/#8b3d20, calls hardcode slate/emerald/red on both platforms; both wait on an intentional always-dark token block.
- LiveKit call UI kit (pre-call, outgoing, stage, incoming banners, control cluster): builds on the fixed-dark sub-theme; product still owes background/system-call UI, so the surface set is not final.
- DataTable (TanStack sorting/filtering): admin and plan-performance want sortable/filterable tables next; v0.1 Table primitives are the style layer it will sit on.
- MarkdownRenderer: system-text templates and coach notes have no markdown source yet; add when one exists.
- DangerZone: settings account-deletion pattern (destructive card + typed confirmation); composes from Card + Field + ConfirmDialog, formalize in v0.2.
- OTP/invite-code input: waitlist invite codes and the REF-009 invitation flow; Base UI ships otp-field so this is cheap once the invitation policy is decided.
- NumberField: mobile already has a clamped draft/commit NumberField, web uses raw number inputs; Base UI number-field exists, adopt in v0.2 for set/rep/weight editors.
- Notification center panel: NotificationsBell's 15-type dropdown deserves a real panel; waits on the push/realtime notification design pass, compose from Popover + ListRow meanwhile.
- PR/celebration full-screen moment: pbPending hints at PR confirmation flows; Rive at app level per PLAN, the system supplies the surface and motion tokens.
- Onboarding carousel: mobile2 handoff explicitly defers onboarding designs; build alongside the M6 onboarding milestone.
- SyncStatusIndicator: mobile offline/outbox states (synced/waiting/syncing/needs attention plus conflict actions); RN-first, lands with the mobile component phase.
- ReactionPicker: six custom SVG reactions are an owned product icon set; picker waits on the icon-set decision and the RN sheet primitive.
- MoneyText/formatEUR and timeAgo utilities: three EUR formats and three timeAgo copies in web; small lib helpers rather than components, slot into v0.2 utils.

## Product-domain coverage check

Against research-product.json domains, honestly:

- Identity and account: covered. Field/Input/Select, RadioCard privacy, Switch rows, Avatar plus UploadDropzone, ConfirmDialog for deletion. Provider sign-in buttons (Google/Apple/Facebook branding rules) stay app-owned; invite codes wait on the OTP gap.
- Training plans and delivery: core browsing/editing covered (Accordion day trees, Badge stage chips, Tabs, Field grids, Stepper). Waits on SortableList wrappers for reorder, Calendar/DatePicker for schedules, AnnualTimeline for periodization.
- Workout execution and logging: logging flows covered (Sheet, Slider, RatingFeel, Stepper, Progress). The flagship immersive timer waits on FullScreenTimer + fixed-dark sub-theme; mobile sync states wait on SyncStatusIndicator.
- Coach analytics: covered for core screens. StatTile, Sparkline, TrendChart, Chart, FilterChip, SearchInput, ListRow replace all five KPI impls and both sparklines. Sortable rosters and the plan-performance table upgrade wait on DataTable.
- Commerce, billing, payouts: covered at the flagged-as-minimal baseline. Card price tiles, Badge purchase states, Alert requirement banners, StatTile earnings, Chart revenue bars, ToggleRow feature lists. Stripe embeds and checkout polling logic stay app-side.
- Feed: mostly covered. PostCard composes from Card, Badge, Avatar, Sparkline journey strips, DropdownMenu, Sheet composer, UploadDropzone, EmptyState. Waits on ReactionPicker and the PR celebration moment.
- Social graph and profiles: covered. Avatar/AvatarGroup, HoverCard follower popovers, ListRow requests/blocked lists, ConfirmDialog for block.
- Messaging and calls: messaging covered (ChatBubble, ChatComposer, ListRow inbox, CounterBadge unread). Calls not covered: the whole call surface waits on the fixed-dark sub-theme and LiveKit kit, which is honest, that UI is off-token on both platforms today.
- Media: covered for current purposes (avatar, bug screenshot, feed image) via UploadDropzone, MediaFrame, Skeleton placeholders, VideoPlayer for block videos. Derivatives/transcoding are app infra, not component work.
- AI: covered. Badge ai tone, ai-surface, motion presets for reveal; suggestion diff cards are app compositions of Card + Button. Background-generation status (REF-023) will use Toast + Progress when built.
- Admin: covered for core (Table, Pagination, Badge, Tabs, SearchInput, ConfirmDialog with reason field replacing window.prompt). Wants DataTable later; admin stays web-only by product decision.
- Marketing: covered. Glass utilities, PhoneFrame, eyebrow, text-gradient-primary, pill Button, plus adoption finally loads Inter. Mobile onboarding carousel is a listed gap.

## Mobile parity note

v0.1 is web-first. Mobile consumes tokens now (import { themes, shared }
from "@pinchblock/ui/tokens"), which alone retires the Nocturne/Ocean fork,
the dual theming APIs, and the off-ramp status colors. Components are
parallel RN implementations later, idiomatic RN, same tokens, no NativeWind
until 5.x is npm latest.

Per the mobile audit, build these five RN components first:

1. Text/typography: kills 328 fontSize and 160 fontWeight literals and the Android fontWeight fallback bug.
2. Pressable: one primitive for the copy-pasted android_ripple + iOS pressed-opacity pair, hitSlop, min target, busy a11y state.
3. Screen scaffold: safe area, platform gutter, static-first shell slot, extends the existing Screen component.
4. ListRow: account nav rows, SocialPersonRow, conversation and notification rows.
5. ScreenHeader: replaces ~19 duplicated back headers plus modal X headers, with Android hardware-back handling.

Then Button, Badge, Avatar, Card, Sheet, ConfirmDialog (to retire
Alert.alert in 15 files) in the same tokens-first order the web set proved.
