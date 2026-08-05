import type { ModeTokens } from "./types.ts"

/**
 * Stage: the always-dark, theme-invariant surface set for immersive
 * full-screen moments (workout timers, call screens). Replaces the
 * ~40 hardcoded hex values pb-app's calls/timer screens carried.
 *
 * Guarantee: a subtree wrapped in class "stage" renders identically in
 * every theme and in light or dark mode, the same way status colors
 * stay fixed across themes. Mechanism: `npm run gen` emits one .stage
 * block that sets every token variable on the .stage element ITSELF.
 * Custom properties inherit from the nearest ancestor that defines
 * them, so the .stage element's values always beat whatever a
 * .theme-x / .dark combination set on <html>. No specificity fight,
 * no !important.
 *
 * Palette intent: OLED near-black (#07090c family), cards barely
 * lifted, high-contrast text for arm's-length and big-screen
 * legibility. Status hues run brighter than the app themes because
 * they sit on near-black: success green is the work state, destructive
 * red is end-call and rest-warning, warning amber is caution. The
 * primary is a neutral-cool steel, deliberately not any theme's brand
 * hue (ocean teal, nocturne lilac, ember orange, glacier blue), so
 * stage never leaks a brand identity. Reuses ModeTokens so the
 * compiler enforces completeness exactly like a theme mode.
 */
export const stage: ModeTokens = {
  background: "#07090c",
  backgroundRaised: "#0d1117",
  backgroundSunken: "#030405",
  /* Barely lifted off the near-black: stage cards read as zones, not
     panels; borders and text do the separating. */
  card: "#0e1319",
  cardForeground: "#f2f5f8",
  popover: "#151b23",
  popoverForeground: "#f2f5f8",
  muted: "#131920",

  foreground: "#f2f5f8",
  mutedForeground: "#9aa7b4" /* 7.2:1 on muted, 8:1+ on background */,
  faintForeground: "#7a8695" /* kept at 4.5:1+ on card: big-surface text */,

  /* Neutral-cool steel accent. Not a brand color by design. */
  primary: "#aebfd1",
  primaryHover: "#9db0c4" /* darkens on hover, matching dark-mode convention */,
  primaryForeground: "#07090c",
  primarySoft: "rgba(174, 191, 209, 0.14)",
  primaryBorder: "rgba(174, 191, 209, 0.32)",
  secondary: "#1a222c",
  secondaryForeground: "#f2f5f8",
  secondarySoft: "rgba(242, 245, 248, 0.07)",
  accent: "rgba(174, 191, 209, 0.12)",
  accentForeground: "#f2f5f8",

  /* Status, tuned bright for near-black. Work / rest-warning / caution. */
  success: "#4ade80",
  successForeground: "#07090c",
  successSoft: "rgba(74, 222, 128, 0.14)",
  warning: "#fbbf24",
  warningForeground: "#07090c",
  warningSoft: "rgba(251, 191, 36, 0.14)",
  destructive: "#f87171",
  destructiveForeground: "#250607" /* deep red-black, 6.9:1 on the fill */,
  destructiveSoft: "rgba(248, 113, 113, 0.14)",
  info: "#60a5fa",
  infoForeground: "#07090c",
  infoSoft: "rgba(96, 165, 250, 0.14)",

  /* AI treatment stays neutral-cool here for the same invariance reason. */
  ai: "rgba(174, 191, 209, 0.1)",
  aiForeground: "#c8d5e2",
  aiBorder: "rgba(174, 191, 209, 0.3)",

  border: "rgba(242, 245, 248, 0.1)",
  borderStrong: "rgba(242, 245, 248, 0.2)",
  input: "rgba(242, 245, 248, 0.16)",
  inputBackground: "rgba(255, 255, 255, 0.06)",
  ring: "#aebfd1",
  overlay: "rgba(0, 0, 0, 0.7)",

  /* Glass: subtle blur only; stage overlays sit on live video/timers. */
  glassBg: "rgba(14, 19, 25, 0.6)",
  glassBgRaised: "rgba(21, 27, 35, 0.72)",
  glassBorder: "rgba(242, 245, 248, 0.08)",
  glassFilter: "blur(12px) saturate(120%)",

  /* Strong elevation: on near-black only deep, wide shadows still read. */
  shadowCard: "0 12px 32px -20px rgba(0, 0, 0, 0.8)",
  shadowRaised:
    "0 24px 64px -28px rgba(0, 0, 0, 0.9), 0 1px 0 rgba(255, 255, 255, 0.06) inset",
  shadowOverlay:
    "0 32px 96px -32px rgba(0, 0, 0, 0.95), 0 1px 0 rgba(255, 255, 255, 0.08) inset",

  /* Charts: bright 300-weight hues so series stay legible on near-black. */
  chart1: "#aebfd1" /* steel, matches primary */,
  chart2: "#5eead4" /* teal */,
  chart3: "#fcd34d" /* gold */,
  chart4: "#a5b4fc" /* indigo */,
  chart5: "#f0abfc" /* fuchsia */,
  chart6: "#bef264" /* lime */,
  chart7: "#67e8f9" /* cyan */,
  chart8: "#fda4af" /* rose */,
  chartTrack: "rgba(242, 245, 248, 0.12)",
  chartPositive: "#4ade80",
  chartNegative: "#f87171",
  chartTarget: "rgba(242, 245, 248, 0.5)",

  /* Session feel 1 (rough) to 5 (great), brightened for near-black. */
  feel1: "#f87171",
  feel2: "#fb923c",
  feel3: "#fbbf24",
  feel4: "#a3e635",
  feel5: "#4ade80",
}
