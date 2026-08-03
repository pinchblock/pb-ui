import type { ThemeDefinition } from "../types.ts"

/**
 * Nocturne: faithful port of the current Pinchblock mobile design
 * language (pb-app mobile/src/theme/tokens.ts). Lilac accent (#9184d9)
 * over an indigo night background in dark, periwinkle-tinted neutrals
 * in light. Flat and restrained: 1px borders, minimal shadows, no
 * glass in light, subtle blur in dark.
 *
 * Value provenance: every color is taken from the mobile neutral or
 * accent ramp, its status set (teal/amber/destructive), or is a
 * documented small derivation (popover, muted, info, charts). Role
 * mapping: bg -> background, surface -> card + backgroundRaised,
 * surfaceSunken -> backgroundSunken, accent -> primary, accentTint ->
 * primarySoft, accentTintBorder -> primaryBorder, teal -> success,
 * amber -> warning, scrim -> overlay.
 */
export const nocturne: ThemeDefinition = {
  id: "nocturne",
  label: "Nocturne",
  description:
    "Mobile design language: indigo night dark, periwinkle light, lilac primary. Flat surfaces, hairline borders, minimal shadows.",
  dark: {
    background: "#161826",
    backgroundRaised: "#232532",
    /* Mobile surfaceSunken (neutral-900); mobile keeps it near surface
       lightness rather than below background. Kept for fidelity. */
    backgroundSunken: "#292b31",
    card: "#232532",
    cardForeground: "#e9e9ed",
    /* One step above surface so menus sit visibly on cards. */
    popover: "#2c2e3e",
    popoverForeground: "#e9e9ed",
    muted: "#282a38",

    foreground: "#e9e9ed",
    mutedForeground: "#9397ab" /* neutral-500, mobile textMuted */,
    faintForeground: "#75798c" /* neutral-600, mobile textFaint */,

    primary: "#9184d9",
    /* accent-600: matches the mobile pressed-state darkening. */
    primaryHover: "#796cbf",
    /* Deep indigo (the night background), matching the other status
       foregrounds, 5.5:1 on the lilac. Corrects a known mobile bug:
       mobile hardcodes #ffffff here, which is only 3.2:1. */
    primaryForeground: "#161826",
    primarySoft: "#2b2741" /* accent-900, mobile accentTint */,
    primaryBorder: "#5d5294" /* accent-700, mobile accentTintBorder */,
    secondary: "#3f424d" /* neutral-800 */,
    secondaryForeground: "#e9e9ed",
    secondarySoft: "rgba(233, 233, 237, 0.08)",
    accent: "#423a6a" /* accent-800: hover step above primarySoft */,
    accentForeground: "#e7e5fe" /* accent-200, mobile onAccentTint */,

    success: "#76cdb2" /* mobile teal */,
    successForeground: "#161826",
    successSoft: "#203a37" /* mobile tealSoft */,
    warning: "#e8b76f" /* mobile amber */,
    warningForeground: "#161826",
    warningSoft: "#3b3027" /* mobile amberSoft */,
    destructive: "#f2a29a",
    destructiveForeground: "#161826",
    destructiveSoft: "#422a2d",
    info: "#85a3e6" /* indigo-blue, kept clear of the lilac primary */,
    infoForeground: "#161826",
    infoSoft: "#262e46",

    ai: "#2b2741" /* accentTint */,
    aiForeground: "#d2cefd" /* accent-300, mobile accentText */,
    aiBorder: "#5d5294",

    border: "#3f424d" /* neutral-800, mobile border */,
    borderStrong: "#595d6c" /* neutral-700 */,
    input: "#4c4f5c" /* neutral-700/800 midpoint */,
    inputBackground: "#1d1f2c",
    ring: "#9184d9",
    overlay: "rgba(0, 0, 0, 0.55)" /* mobile scrim */,

    glassBg: "rgba(35, 37, 50, 0.6)",
    glassBgRaised: "rgba(44, 46, 62, 0.72)",
    glassBorder: "rgba(233, 233, 237, 0.08)",
    glassFilter: "blur(16px) saturate(140%)",

    shadowCard: "none",
    shadowRaised: "0 12px 32px -16px rgba(0, 0, 0, 0.5)",
    shadowOverlay: "0 24px 56px -24px rgba(0, 0, 0, 0.65)",

    chart1: "#9184d9" /* lilac */,
    chart2: "#76cdb2" /* teal */,
    chart3: "#e8b76f" /* amber */,
    chart4: "#7da7e8" /* indigo-blue */,
    chart5: "#d990c7" /* orchid */,
    chart6: "#adc47f" /* sage */,
    chart7: "#6fc7d6" /* cyan */,
    chart8: "#e08a7d" /* coral */,
    chartTrack: "rgba(233, 233, 237, 0.1)",
    chartPositive: "#76cdb2",
    chartNegative: "#f2a29a",
    chartTarget: "rgba(233, 233, 237, 0.45)",

    feel1: "#f2a29a",
    feel2: "#eda27e",
    feel3: "#e8b76f",
    feel4: "#b9c77e",
    feel5: "#76cdb2",
  },
  light: {
    background: "#f3f5fe" /* neutral-100, mobile bg */,
    /* Mobile surface (neutral-200): the light mode deliberately tints
       raised surfaces darker than the page, not white-on-gray. */
    backgroundRaised: "#e4e7f5",
    backgroundSunken: "#cfd3e5" /* neutral-300, mobile surfaceSunken */,
    card: "#e4e7f5" /* neutral-200, mobile surface */,
    cardForeground: "#292b31",
    popover: "#ffffff" /* highest elevation stays crisp */,
    popoverForeground: "#292b31",
    muted: "#d9ddee" /* neutral-200/300 midpoint */,

    foreground: "#292b31" /* neutral-900, mobile text */,
    mutedForeground: "#595d6c" /* neutral-700, mobile textMuted */,
    faintForeground: "#75798c" /* neutral-600, mobile textFaint */,

    /* Darkened from mobile accent-600 #796cbf (3.6:1 as text on card)
       so primary-as-text passes 4.5:1 on card, primarySoft and
       background. Hue and character kept. */
    primary: "#695ab7",
    primaryHover: "#5d5294" /* accent-700, still darker than primary */,
    primaryForeground: "#ffffff",
    primarySoft: "#e7e5fe" /* accent-200, mobile accentTint */,
    primaryBorder: "#b5abfc" /* accent-400, mobile accentTintBorder */,
    secondary: "#e4e7f5",
    secondaryForeground: "#3f424d",
    secondarySoft: "#eceef8",
    accent: "#dcd8fd" /* accent-200/300 midpoint: hover step */,
    accentForeground: "#5d5294" /* accent-700, mobile onAccentTint */,

    success: "#147054" /* mobile teal */,
    successForeground: "#ffffff",
    successSoft: "#d6eee6" /* mobile tealSoft */,
    warning: "#8b5712" /* mobile amber */,
    warningForeground: "#ffffff",
    warningSoft: "#f5e6c8" /* mobile amberSoft */,
    destructive: "#a7352c",
    destructiveForeground: "#ffffff",
    destructiveSoft: "#f6dcda",
    info: "#3e5ba9",
    infoForeground: "#ffffff",
    infoSoft: "#dfe5f8",

    ai: "#e7e5fe",
    aiForeground: "#5d5294" /* accent-700, mobile accentText */,
    aiBorder: "#b5abfc",

    border: "#b2b6ca" /* neutral-400, mobile border */,
    borderStrong: "#9397ab" /* neutral-500 */,
    input: "#b2b6ca",
    inputBackground: "#ffffff",
    ring: "#695ab7" /* kept equal to primary */,
    overlay: "rgba(41, 43, 49, 0.35)" /* mobile scrim */,

    glassBg: "#f3f5fe",
    glassBgRaised: "#e4e7f5",
    glassBorder: "#cfd3e5",
    glassFilter: "none",

    shadowCard: "0 1px 2px rgba(41, 43, 49, 0.05)",
    shadowRaised: "0 6px 24px rgba(41, 43, 49, 0.12)",
    shadowOverlay: "0 20px 48px -20px rgba(41, 43, 49, 0.28)",

    chart1: "#796cbf" /* lilac */,
    chart2: "#147054" /* teal */,
    chart3: "#8b5712" /* amber */,
    chart4: "#3e5ba9" /* indigo-blue */,
    chart5: "#a34d8f" /* orchid */,
    chart6: "#667a2f" /* sage */,
    chart7: "#2b7d8f" /* cyan */,
    chart8: "#b0503f" /* coral */,
    chartTrack: "rgba(41, 43, 49, 0.1)",
    chartPositive: "#147054",
    chartNegative: "#a7352c",
    chartTarget: "rgba(41, 43, 49, 0.45)",

    feel1: "#a7352c",
    feel2: "#a84b20",
    feel3: "#8b5712",
    feel4: "#5c8a3c",
    feel5: "#147054",
  },
}
