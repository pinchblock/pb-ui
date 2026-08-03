import type { ThemeDefinition } from "../types.ts"

/**
 * Glacier: exploratory candidate, "clean cold". Near-monochrome cool
 * neutrals with an electric blue primary and very quiet soft tints.
 * Crisp borders, generous shadows in light mode, true-black-ish dark
 * mode for OLED punch.
 */
export const glacier: ThemeDefinition = {
  id: "glacier",
  label: "Glacier",
  description:
    "Exploratory candidate: clean cold. Cool near-monochrome neutrals, electric blue primary, crisp borders, OLED-black dark.",
  dark: {
    background: "#06070a",
    backgroundRaised: "#0d0f14",
    backgroundSunken: "#030405",
    card: "#0c0e13",
    cardForeground: "#e6eaf2",
    popover: "#14171f",
    popoverForeground: "#e6eaf2",
    muted: "#171a22",

    foreground: "#e6eaf2",
    mutedForeground: "rgba(230, 234, 242, 0.62)",
    faintForeground:
      "rgba(230, 234, 242, 0.4)" /* 3.3:1 on background, 3.4:1 on card */,

    primary: "#5c9bff",
    primaryHover: "#7fb1ff",
    primaryForeground: "#04122b",
    primarySoft: "rgba(92, 155, 255, 0.14)",
    primaryBorder: "rgba(92, 155, 255, 0.32)",
    secondary: "#171a22",
    secondaryForeground: "#e6eaf2",
    secondarySoft: "rgba(230, 234, 242, 0.07)",
    accent: "rgba(92, 155, 255, 0.2)",
    accentForeground: "#e6eaf2",

    success: "#3ecf8e",
    successForeground: "#06070a",
    successSoft: "rgba(62, 207, 142, 0.14)",
    warning: "#f5b64e",
    warningForeground: "#06070a",
    warningSoft: "rgba(245, 182, 78, 0.14)",
    destructive: "#f2555a",
    /* Deep red-black, 5.5:1 on the fill. Follows the theme's dark
       foreground-on-light-fill status pattern (was #fff4f4 at 3.1:1). */
    destructiveForeground: "#2b0708",
    destructiveSoft: "rgba(242, 85, 90, 0.14)",
    info: "#4cc9f0",
    infoForeground: "#06070a",
    infoSoft: "rgba(76, 201, 240, 0.14)",

    ai: "rgba(92, 155, 255, 0.1)",
    aiForeground: "#9cc0ff",
    aiBorder: "rgba(92, 155, 255, 0.3)",

    border: "rgba(230, 234, 242, 0.12)",
    borderStrong: "rgba(230, 234, 242, 0.22)",
    input: "rgba(230, 234, 242, 0.18)",
    inputBackground: "rgba(255, 255, 255, 0.04)",
    ring: "#5c9bff",
    overlay: "rgba(0, 0, 0, 0.65)",

    glassBg: "rgba(12, 14, 19, 0.55)",
    glassBgRaised: "rgba(20, 23, 31, 0.68)",
    glassBorder: "rgba(255, 255, 255, 0.1)",
    glassFilter: "blur(24px) saturate(160%)",

    shadowCard: "none",
    shadowRaised: "0 16px 48px -24px rgba(0, 0, 0, 0.8)",
    shadowOverlay: "0 32px 80px -32px rgba(0, 0, 0, 0.9)",

    chart1: "#5c9bff" /* electric blue */,
    chart2: "#3ecf8e" /* mint */,
    chart3: "#f5b64e" /* amber */,
    chart4: "#a78bfa" /* violet */,
    chart5: "#ef7bad" /* pink */,
    chart6: "#53d3e0" /* ice cyan */,
    chart7: "#a3cf5b" /* lime */,
    chart8: "#f0836b" /* coral */,
    chartTrack: "rgba(230, 234, 242, 0.1)",
    chartPositive: "#3ecf8e",
    chartNegative: "#f2555a",
    chartTarget: "rgba(230, 234, 242, 0.45)",

    feel1: "#f2555a",
    feel2: "#f5884e",
    feel3: "#f5b64e",
    feel4: "#a3cf5b",
    feel5: "#3ecf8e",
  },
  light: {
    background: "#f6f8fb",
    backgroundRaised: "#fbfcfe",
    backgroundSunken: "#eceff5",
    card: "#ffffff",
    cardForeground: "#10141c",
    popover: "#ffffff",
    popoverForeground: "#10141c",
    muted: "#eef1f6",

    foreground: "#10141c",
    mutedForeground: "#5a6372",
    faintForeground: "#8590a2" /* 3.0:1 on background, 3.2:1 on card */,

    primary: "#155ee0",
    primaryHover: "#1150c4",
    primaryForeground: "#ffffff",
    primarySoft: "#e7eefc",
    primaryBorder: "#bcd2f7",
    secondary: "#eef1f6",
    secondaryForeground: "#333b49",
    secondarySoft: "#f2f4f8",
    accent: "#dbe7fa",
    accentForeground: "#10141c",

    success: "#16864d" /* deepened from #178a50 for 4.5:1 with white */,
    successForeground: "#ffffff",
    successSoft: "#e0f2e9",
    warning: "#aa6604" /* deepened from #b16a04 for 4.5:1 with white */,
    warningForeground: "#ffffff",
    warningSoft: "#f7eed7",
    destructive: "#d92d33",
    destructiveForeground: "#ffffff",
    destructiveSoft: "#fbe5e6",
    info: "#0e7c9e",
    infoForeground: "#ffffff",
    infoSoft: "#dff2f8",

    ai: "#e7eefc",
    aiForeground: "#155ee0",
    aiBorder: "#bcd2f7",

    border: "#dde2ea",
    borderStrong: "#c3cbd8",
    input: "#cdd5e0",
    inputBackground: "#ffffff",
    ring: "#155ee0",
    overlay: "rgba(10, 14, 22, 0.45)",

    glassBg: "#ffffff",
    glassBgRaised: "#ffffff",
    glassBorder: "#dde2ea",
    glassFilter: "none",

    shadowCard: "0 2px 8px rgba(16, 20, 28, 0.06), 0 1px 2px rgba(16, 20, 28, 0.04)",
    shadowRaised: "0 12px 40px -8px rgba(16, 20, 28, 0.14)",
    shadowOverlay: "0 32px 80px -24px rgba(16, 20, 28, 0.25)",

    chart1: "#155ee0" /* electric blue */,
    chart2: "#178a50" /* mint-green */,
    chart3: "#b16a04" /* amber */,
    chart4: "#6d4bd0" /* violet */,
    chart5: "#bd3d7f" /* pink */,
    chart6: "#0e7c9e" /* ice cyan */,
    chart7: "#6b8514" /* lime */,
    chart8: "#c65440" /* coral */,
    chartTrack: "rgba(16, 20, 28, 0.08)",
    chartPositive: "#178a50",
    chartNegative: "#d92d33",
    chartTarget: "rgba(16, 20, 28, 0.45)",

    feel1: "#d92d33",
    feel2: "#c25a12",
    feel3: "#b16a04",
    feel4: "#5f9231",
    feel5: "#178a50",
  },
}
