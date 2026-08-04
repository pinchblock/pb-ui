# Decision log

Autonomous calls made while Jaak is away, newest first. Read this
after a gap; challenge anything, everything here is reversible.

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
