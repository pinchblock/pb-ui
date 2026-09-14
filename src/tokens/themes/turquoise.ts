import type { ThemeDefinition } from "../types.ts"
import { marquee, marqueePalette } from "../marquee.ts"

const { ink: INK, night: NIGHT } = marqueePalette

/**
 * Turquoise: the landing's palette as an app theme. Ink, the brand cyan
 * family, status, AI and chart hues are marquee's (src/tokens/marquee.ts)
 * so the app continues the landing and the brand swap (BRAND) reaches
 * both. The dark surfaces are the app's own: where the landing sits on
 * pure near-black under video, the app ground is a deep cool charcoal
 * with panels one step lighter and visible hairlines between them, so
 * sidebar, list and content read as separate surfaces without glow or
 * gradients. Selected and hover fills are neutral (foreground-tinted),
 * never the brand, which is reserved for primary buttons, links and the
 * active tab underline. Light keeps the same ink on warm paper with the
 * brand pulled down to a deep teal (4.8:1 on paper) because the cyan
 * cannot carry text on white.
 */
export const turquoise: ThemeDefinition = {
  id: "turquoise",
  label: "Turquoise",
  description: "The landing's palette as an app theme: deep cool charcoal ground, panels one step lighter, visible hairlines, warm off-white ink and the icon's cyan on primary actions. Light mode is the same ink on paper with a deep teal primary.",
  dark: {
    ...marquee,
    background: "#0f181d",
    backgroundRaised: "#131e24",
    backgroundSunken: "#0a1115",
    card: "#131e24",
    popover: "#172329",
    muted: "#182428",
    secondary: "#1f2d35" /* selected rows, pressed chips: neutral, never brand */,
    secondarySoft: "rgba(242, 241, 236, 0.06)",
    accent: "#243740" /* hover fill, same family as the hairlines */,
    accentForeground: INK,
    border: "#243741" /* visible hairline between panels */,
    borderStrong: "#33474f",
    input: "#2b3f48",
    inputBackground: "#131e24",
    overlay: "rgba(6, 10, 13, 0.7)",
    glassBg: "rgba(15, 24, 29, 0.72)",
    glassBgRaised: "rgba(19, 30, 36, 0.82)",
    glassBorder: "rgba(242, 241, 236, 0.08)",
    shadowCard: "0 1px 0 rgba(242, 241, 236, 0.03) inset, 0 8px 24px -16px rgba(0, 0, 0, 0.6)",
    shadowRaised: "0 24px 64px -28px rgba(0, 0, 0, 0.7), 0 1px 0 rgba(242, 241, 236, 0.05) inset",
    shadowOverlay: "0 32px 96px -32px rgba(0, 0, 0, 0.85), 0 1px 0 rgba(242, 241, 236, 0.06) inset",
  },
  light: {
    background: "#f3f2ed",
    backgroundRaised: "#f8f7f3",
    backgroundSunken: "#eae9e3",
    card: "#ffffff",
    cardForeground: NIGHT,
    popover: "#ffffff",
    popoverForeground: NIGHT,
    muted: "#ecebe5",

    foreground: NIGHT,
    mutedForeground: "#5a5f64" /* 5.8:1 on paper */,
    faintForeground: "#7a7f84" /* 3.6:1 on paper, 4.0:1 on card */,

    primary: "#077683" /* brand hue at 27% lightness */,
    primaryHover: "#066470",
    primaryForeground: "#ffffff",
    primarySoft: "#dcf3f5",
    primaryBorder: "#a9dde2",
    secondary: "#e9e8e2",
    secondaryForeground: NIGHT,
    secondarySoft: "#f0efe9",
    accent: "#dcf3f5",
    accentForeground: "#053f46",

    success: "#2e7d5e",
    successForeground: "#ffffff",
    successSoft: "#e2f0eb",
    warning: "#a66607",
    warningForeground: "#ffffff",
    warningSoft: "#fef3e2",
    destructive: "#dc2626",
    destructiveForeground: "#ffffff",
    destructiveSoft: "#fdecec",
    info: "#2563a8",
    infoForeground: "#ffffff",
    infoSoft: "#e3edf8",

    /* AI stays steel here too: never the brand hue. */
    ai: "#e6ebf0",
    aiForeground: "#3f5567",
    aiBorder: "#c3cfda",

    border: "#dad9d2",
    borderStrong: "#c2c1ba",
    input: "#cfcec7",
    inputBackground: "#ffffff",
    ring: "#077683",
    overlay: "rgba(10, 12, 14, 0.45)",

    glassBg: "rgba(255, 255, 255, 0.72)",
    glassBgRaised: "rgba(255, 255, 255, 0.86)",
    glassBorder: "rgba(10, 12, 14, 0.08)",
    glassFilter: "blur(12px) saturate(120%)",

    shadowCard: "0 1px 2px rgba(10, 12, 14, 0.06)",
    shadowRaised: "0 12px 32px -12px rgba(10, 12, 14, 0.18)",
    shadowOverlay: "0 24px 64px -24px rgba(10, 12, 14, 0.32)",

    chart1: "#077683",
    chart2: "#b7791f" /* gold */,
    chart3: "#5b5fc7" /* indigo */,
    chart4: "#b03aa8" /* fuchsia */,
    chart5: "#5f8f1f" /* lime */,
    chart6: "#c7455f" /* rose */,
    chart7: "#1f8f88" /* teal */,
    chart8: "#5f7285" /* steel */,
    chartTrack: "rgba(10, 12, 14, 0.1)",
    chartPositive: "#2e7d5e",
    chartNegative: "#dc2626",
    chartTarget: "rgba(10, 12, 14, 0.45)",

    feel1: "#dc2626",
    feel2: "#d97b2f",
    feel3: "#b56f08",
    feel4: "#5f9c3f",
    feel5: "#2e7d5e",
  },
}
