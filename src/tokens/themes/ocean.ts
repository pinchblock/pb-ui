import type { ThemeDefinition } from "../types.ts"

/**
 * Ocean: the current Pinchblock web language, transcribed from
 * pb-app web/src/app/globals.css ("Pinchblock design system v2").
 * Dark = Ocean Deep (navy + teal). Light = Sage (warm green).
 * Values are kept verbatim where they existed; tokens the old system
 * lacked (sunken, info, charts 4-8, feel scale) are new and marked.
 */
export const ocean: ThemeDefinition = {
  id: "ocean",
  label: "Ocean",
  description: "Current web language: Ocean Deep dark, Sage light. Teal primary, green success, amber warnings.",
  dark: {
    background: "#061826",
    backgroundRaised: "#0a2235",
    backgroundSunken: "#04101b",
    card: "rgba(13, 43, 64, 0.88)",
    cardForeground: "#eaf4f6",
    popover: "#0d2b40",
    popoverForeground: "#eaf4f6",
    muted: "#112f45",

    foreground: "#eaf4f6",
    mutedForeground: "rgba(234, 244, 246, 0.65)",
    faintForeground: "rgba(234, 244, 246, 0.38)",

    primary: "#5cbdb9",
    primaryHover: "#4daaa6",
    primaryForeground: "#061826",
    primarySoft: "rgba(92, 189, 185, 0.15)",
    primaryBorder: "rgba(92, 189, 185, 0.3)",
    secondary: "#112f45",
    secondaryForeground: "#eaf4f6",
    secondarySoft: "rgba(234, 244, 246, 0.08)",
    accent: "rgba(92, 189, 185, 0.12)",
    accentForeground: "#eaf4f6",

    success: "#57b88e",
    successForeground: "#061826",
    successSoft: "rgba(87, 184, 142, 0.15)",
    warning: "#e8b65c",
    warningForeground: "#061826",
    warningSoft: "rgba(232, 182, 92, 0.15)",
    destructive: "#e66d6d",
    /* Deep red-black, 5.9:1 on the fill. Follows the theme's dark
       foreground-on-light-fill status pattern (was #fff4f4 at 2.9:1). */
    destructiveForeground: "#2b0a0a",
    destructiveSoft: "rgba(230, 109, 109, 0.14)",
    info: "#6aa9e0",
    infoForeground: "#061826",
    infoSoft: "rgba(106, 169, 224, 0.15)",

    ai: "rgba(92, 189, 185, 0.1)",
    aiForeground: "#7ed4d0",
    aiBorder: "rgba(92, 189, 185, 0.28)",

    border: "rgba(92, 189, 185, 0.14)",
    borderStrong: "rgba(92, 189, 185, 0.26)",
    input: "rgba(92, 189, 185, 0.22)",
    inputBackground: "rgba(255, 255, 255, 0.06)",
    ring: "#5cbdb9",
    overlay: "rgba(2, 10, 16, 0.55)",

    glassBg: "rgba(13, 43, 64, 0.5)",
    glassBgRaised: "rgba(17, 47, 69, 0.66)",
    glassBorder: "rgba(255, 255, 255, 0.12)",
    glassFilter: "blur(24px) saturate(150%)",

    shadowCard: "none",
    shadowRaised:
      "0 20px 60px -30px rgba(0, 0, 0, 0.7), 0 1px 0 rgba(255, 255, 255, 0.08) inset",
    shadowOverlay:
      "0 30px 80px -40px rgba(0, 0, 0, 0.8), 0 1px 0 rgba(255, 255, 255, 0.1) inset",

    chart1: "#5cbdb9",
    chart2: "#57b88e",
    chart3: "#e8b65c",
    chart4: "#9184d9",
    chart5: "#6aa9e0",
    chart6: "#d98fb6",
    chart7: "#7ed4d0",
    chart8: "#b0c47f",
    chartTrack: "rgba(234, 244, 246, 0.1)",
    chartPositive: "#57b88e",
    chartNegative: "#e66d6d",
    chartTarget: "rgba(234, 244, 246, 0.45)",

    feel1: "#e66d6d",
    feel2: "#e8965c",
    feel3: "#e8b65c",
    feel4: "#9fca7f",
    feel5: "#57b88e",
  },
  light: {
    background: "#eef5f1",
    backgroundRaised: "#f4f9f6",
    backgroundSunken: "#e4efe9",
    card: "#ffffff",
    cardForeground: "#1a3028",
    popover: "#ffffff",
    popoverForeground: "#1a3028",
    muted: "#e7f1ec",

    foreground: "#1a3028",
    mutedForeground: "#4a6658",
    faintForeground: "#7b9188" /* 3.0:1 on background, 3.4:1 on card */,

    primary: "#2e7d5e",
    primaryHover: "#236b4f",
    primaryForeground: "#ffffff",
    primarySoft: "#e2f0eb",
    primaryBorder: "#b8d8cb",
    secondary: "#e7f1ec",
    secondaryForeground: "#265f49",
    secondarySoft: "#eef3f0",
    accent: "#e2f0eb",
    accentForeground: "#1a3028",

    success: "#2e7d5e",
    successForeground: "#ffffff",
    successSoft: "#e2f0eb",
    warning: "#a66607" /* deepened from #b56f08 for 4.5:1 with white */,
    warningForeground: "#ffffff",
    warningSoft: "#fef3e2",
    destructive: "#dc2626",
    destructiveForeground: "#ffffff",
    destructiveSoft: "#fdecec",
    info: "#2563a8",
    infoForeground: "#ffffff",
    infoSoft: "#e3edf8",

    ai: "#e2f0eb",
    aiForeground: "#2e7d5e",
    aiBorder: "#b8d8cb",

    border: "#d4e4dc",
    borderStrong: "#b8d0c4",
    input: "#c8ddd4",
    inputBackground: "#ffffff",
    ring: "#2e7d5e",
    overlay: "rgba(16, 34, 28, 0.4)",

    glassBg: "#ffffff",
    glassBgRaised: "#ffffff",
    glassBorder: "#d4e4dc",
    glassFilter: "none",

    shadowCard: "0 1px 4px rgba(26, 48, 40, 0.06)",
    shadowRaised: "0 8px 32px rgba(26, 48, 40, 0.12)",
    shadowOverlay: "0 24px 64px -24px rgba(26, 48, 40, 0.28)",

    chart1: "#2e7d5e",
    chart2: "#5cbdb9",
    chart3: "#b56f08",
    chart4: "#6C63D4",
    chart5: "#2563a8",
    chart6: "#b0508a",
    chart7: "#1f8f88",
    chart8: "#6f8f2f",
    chartTrack: "rgba(26, 48, 40, 0.1)",
    chartPositive: "#2e7d5e",
    chartNegative: "#dc2626",
    chartTarget: "rgba(26, 48, 40, 0.45)",

    feel1: "#dc2626",
    feel2: "#d97b2f",
    feel3: "#b56f08",
    feel4: "#5f9c3f",
    feel5: "#2e7d5e",
  },
}
