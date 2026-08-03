/**
 * Pinchblock design tokens: type contracts.
 *
 * A theme provides every semantic token for both light and dark mode.
 * The TypeScript compiler enforces completeness: a theme that misses a
 * token does not compile. `npm run gen` turns these objects into
 * src/styles/tokens.css; React Native imports them directly.
 */

/** Any valid CSS color value (hex, rgb(a), oklch, color-mix). */
export type Color = string

/** A full CSS box-shadow value, or "none". */
export type Shadow = string

export type Mode = "light" | "dark"

export interface ModeTokens {
  /* Surfaces */
  background: Color
  backgroundRaised: Color
  backgroundSunken: Color
  card: Color
  cardForeground: Color
  popover: Color
  popoverForeground: Color
  muted: Color

  /* Text */
  foreground: Color
  mutedForeground: Color
  faintForeground: Color

  /* Brand and interaction */
  primary: Color
  primaryHover: Color
  primaryForeground: Color
  primarySoft: Color
  primaryBorder: Color
  secondary: Color
  secondaryForeground: Color
  secondarySoft: Color
  accent: Color
  accentForeground: Color

  /* Status. Guardrail: themes keep these recognizable; destructive must
     always read as danger in every theme. */
  success: Color
  successForeground: Color
  successSoft: Color
  warning: Color
  warningForeground: Color
  warningSoft: Color
  destructive: Color
  destructiveForeground: Color
  destructiveSoft: Color
  info: Color
  infoForeground: Color
  infoSoft: Color

  /* AI treatment (Pinchblock brand signature: sparkles + these tokens) */
  ai: Color
  aiForeground: Color
  aiBorder: Color

  /* Chrome */
  border: Color
  borderStrong: Color
  input: Color
  inputBackground: Color
  ring: Color
  overlay: Color

  /* Glass (public marketing surfaces and overlays only) */
  glassBg: Color
  glassBgRaised: Color
  glassBorder: Color
  /** Full backdrop-filter value; "none" collapses glass to solid (Sage rule). */
  glassFilter: string

  /* Elevation */
  shadowCard: Shadow
  shadowRaised: Shadow
  shadowOverlay: Shadow

  /* Charts: categorical series, hue-spread, kept clear of status hues */
  chart1: Color
  chart2: Color
  chart3: Color
  chart4: Color
  chart5: Color
  chart6: Color
  chart7: Color
  chart8: Color
  chartTrack: Color
  chartPositive: Color
  chartNegative: Color
  chartTarget: Color

  /* Product scale: session feel rating 1 (rough) to 5 (great) */
  feel1: Color
  feel2: Color
  feel3: Color
  feel4: Color
  feel5: Color
}

export interface ThemeDefinition {
  /** Kebab-case id; becomes the .theme-<id> class. */
  id: string
  label: string
  description: string
  light: ModeTokens
  dark: ModeTokens
}

export interface MotionTokens {
  duration: {
    fast: string
    base: string
    slow: string
    slower: string
  }
  ease: {
    /** Default deceleration for entrances and hovers. */
    out: string
    /** Symmetric moves (layout shifts, reorders). */
    inOut: string
    /** Playful overshoot for B2C moments (badges, counters, FAB). */
    spring: string
  }
}

export interface SharedTokens {
  /** The ONE corner knob. The whole rounded-* scale derives from it. */
  radius: string
  /** Global type multiplier; composes with browser zoom (rem-based). */
  fontScale: number
  /** Global spacing multiplier; scales paddings, gaps, control heights. */
  density: number
  fontSans: string
  fontDisplay: string
  fontMono: string
  motion: MotionTokens
}
