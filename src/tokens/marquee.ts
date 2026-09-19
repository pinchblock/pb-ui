import type { ModeTokens } from "./types.ts"

/**
 * Marquee: the always-dark, theme-invariant surface set for the public
 * landing page. Same mechanism and guarantee as stage (src/tokens/
 * stage.ts): `npm run gen` emits one .marquee block that sets every
 * token variable on the element itself, so a wrapped subtree renders
 * identically in every theme and mode. Where stage is a neutral
 * instrument surface, marquee carries the brand: near-black ground,
 * warm off-white ink, the app icon's accent as primary, and a display
 * face of its own (Archivo, see marqueeDisplayFont).
 *
 * Palette from the landing design (apps.parik.ee/pinchblock): ground
 * #0A0C0E, ink #F2F1EC, borders at 14% ink, the accent used only for
 * the primary action, the headline kicker and quiet emphasis. Status
 * and chart hues reuse stage's near-black tuning so the AI treatment
 * and status semantics stay recognizable and stay off the brand hue.
 */

/**
 * THE swap point. The app icon's accent, icon `c` from the hue picker
 * used at #16C8F2 on near-black, between the icon gradient's two stops.
 * Every primary-family value below derives from it, and the landing's
 * mesh reads --primary at mount, so trying the yellow icons (a14, c14)
 * later is: change this line, `npm run gen`, bump the tag.
 */
const BRAND = "#16c8f2"
const INK = "#f2f1ec"
const NIGHT = "#0a0c0e"
/* The lifted surface every raised panel and its glass derive from. */
const RAISED = "#0f1216"

/** The three constants the turquoise theme builds its light mode from. */
export const marqueePalette = { brand: BRAND, ink: INK, night: NIGHT } as const

function channels(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}
const alpha = (hex: string, a: number) => {
  const [r, g, b] = channels(hex)
  return `rgba(${r}, ${g}, ${b}, ${a})`
}
/** Darken toward black by `amount` (0..1); hover convention for dark surfaces. */
const shade = (hex: string, amount: number) =>
  `#${channels(hex)
    .map((c) => Math.round(c * (1 - amount)).toString(16).padStart(2, "0"))
    .join("")}`

/**
 * Display face for marquee. The app supplies the loaded font through
 * --font-marquee-display (next/font's `variable` on the wrapper, or a
 * plain @font-face named Archivo); the stack falls back to the shared
 * sans so an unloaded face never means an unstyled headline.
 */
export const marqueeDisplayFont =
  "var(--font-marquee-display, Archivo, InterVariable, Inter, system-ui, sans-serif)"

export const marquee: ModeTokens = {
  background: NIGHT,
  backgroundRaised: RAISED,
  backgroundSunken: "#050607",
  /* Cards on the landing are outlined, not filled: barely lifted. */
  card: "#0f1317",
  cardForeground: INK,
  popover: "#161b21",
  popoverForeground: INK,
  muted: "#13181d",

  foreground: INK,
  mutedForeground: alpha(INK, 0.72) /* the design's ink-2 */,
  faintForeground: alpha(INK, 0.5) /* the design's ink-3: labels, captions */,

  /* Brand accent: primary action, kicker, active caption. Nothing else. */
  primary: BRAND,
  primaryHover: shade(BRAND, 0.1),
  primaryForeground: "#052426" /* deep teal-black on the cyan fill */,
  primarySoft: alpha(BRAND, 0.14),
  primaryBorder: alpha(BRAND, 0.32),
  secondary: "#1a1f25",
  secondaryForeground: INK,
  secondarySoft: alpha(INK, 0.07),
  accent: alpha(BRAND, 0.12),
  accentForeground: INK,

  /* Status: stage's near-black tuning; foregrounds sit on the fills. */
  success: "#4ade80",
  successForeground: NIGHT,
  successSoft: "rgba(74, 222, 128, 0.14)",
  warning: "#fbbf24",
  warningForeground: NIGHT,
  warningSoft: "rgba(251, 191, 36, 0.14)",
  destructive: "#f87171",
  destructiveForeground: "#250607",
  destructiveSoft: "rgba(248, 113, 113, 0.14)",
  info: "#60a5fa",
  infoForeground: NIGHT,
  infoSoft: "rgba(96, 165, 250, 0.14)",

  /* AI treatment stays steel, as on stage: it must never read as brand. */
  ai: "rgba(174, 191, 209, 0.1)",
  aiForeground: "#c8d5e2",
  aiBorder: "rgba(174, 191, 209, 0.3)",

  border: alpha(INK, 0.14),
  borderStrong: alpha(INK, 0.28) /* ghost buttons */,
  input: alpha(INK, 0.2),
  inputBackground: "rgba(255, 255, 255, 0.06)",
  ring: BRAND,
  overlay: "rgba(0, 0, 0, 0.7)",

  /* Glass: the header over video. */
  glassBg: alpha(NIGHT, 0.6),
  glassBgRaised: alpha(RAISED, 0.72) /* same family as the raised surface, no blue cast */,
  glassBorder: alpha(INK, 0.1),
  glassFilter: "blur(12px) saturate(120%)",

  shadowCard: "0 12px 32px -20px rgba(0, 0, 0, 0.8)",
  shadowRaised:
    "0 24px 64px -28px rgba(0, 0, 0, 0.9), 0 1px 0 rgba(255, 255, 255, 0.06) inset",
  shadowOverlay:
    "0 32px 96px -32px rgba(0, 0, 0, 0.95), 0 1px 0 rgba(255, 255, 255, 0.08) inset",

  /* Charts: brand first, then hues kept clear of it. */
  chart1: BRAND,
  chart2: "#fcd34d" /* gold */,
  chart3: "#a5b4fc" /* indigo */,
  chart4: "#f0abfc" /* fuchsia */,
  chart5: "#bef264" /* lime */,
  chart6: "#fda4af" /* rose */,
  chart7: "#5eead4" /* teal */,
  chart8: "#aebfd1" /* steel */,
  chartTrack: alpha(INK, 0.12),
  chartPositive: "#4ade80",
  chartNegative: "#f87171",
  chartTarget: alpha(INK, 0.5),

  feel1: "#f87171",
  feel2: "#fb923c",
  feel3: "#fbbf24",
  feel4: "#a3e635",
  feel5: "#4ade80",
}
