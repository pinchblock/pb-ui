import type { ThemeDefinition } from "../types.ts"

/**
 * Ember: exploratory B2C candidate, "energetic warmth". Coral-orange
 * primary with heat, deep warm charcoal dark mode, warm off-white
 * light mode, lively hue-spread charts. The primary is deliberately
 * pushed toward orange so the destructive red stays unambiguous.
 */
export const ember: ThemeDefinition = {
  id: "ember",
  label: "Ember",
  description:
    "Exploratory B2C candidate: energetic warmth. Coral-orange primary, warm charcoal dark, warm off-white light, lively charts.",
  dark: {
    background: "#1a1512",
    backgroundRaised: "#221c18",
    backgroundSunken: "#120e0c",
    card: "#211a16",
    cardForeground: "#f5ede6",
    popover: "#2c241f",
    popoverForeground: "#f5ede6",
    muted: "#2a221c",

    foreground: "#f5ede6",
    mutedForeground: "rgba(245, 237, 230, 0.65)",
    faintForeground: "rgba(245, 237, 230, 0.4)",

    primary: "#f56b3d",
    primaryHover: "#ff7f4d",
    primaryForeground: "#1f1008",
    primarySoft: "rgba(245, 107, 61, 0.15)",
    primaryBorder: "rgba(245, 107, 61, 0.35)",
    secondary: "#322a24",
    secondaryForeground: "#f5ede6",
    secondarySoft: "rgba(245, 237, 230, 0.08)",
    accent: "rgba(245, 107, 61, 0.22)",
    accentForeground: "#f5ede6",

    success: "#5fc383",
    successForeground: "#1a1512",
    successSoft: "rgba(95, 195, 131, 0.15)",
    warning: "#ecb454",
    warningForeground: "#1a1512",
    warningSoft: "rgba(236, 180, 84, 0.15)",
    destructive: "#e5484d" /* crimson, clearly redder than the coral primary */,
    /* Deep red-black, 4.9:1 on the fill (was #fff5f5 at 3.7:1). Matches
       the dark foregrounds of the other statuses; the crimson fill is
       untouched so destructive stays clearly red. */
    destructiveForeground: "#1f0708",
    destructiveSoft: "rgba(229, 72, 77, 0.15)",
    info: "#6ba6e3",
    infoForeground: "#1a1512",
    infoSoft: "rgba(107, 166, 227, 0.15)",

    ai: "rgba(245, 107, 61, 0.1)",
    aiForeground: "#ffab85",
    aiBorder: "rgba(245, 107, 61, 0.3)",

    border: "rgba(245, 237, 230, 0.1)",
    borderStrong: "rgba(245, 237, 230, 0.2)",
    input: "rgba(245, 237, 230, 0.16)",
    inputBackground: "rgba(255, 255, 255, 0.05)",
    ring: "#f56b3d",
    overlay: "rgba(10, 6, 4, 0.6)",

    glassBg: "rgba(33, 26, 22, 0.55)",
    glassBgRaised: "rgba(44, 36, 31, 0.68)",
    glassBorder: "rgba(255, 255, 255, 0.1)",
    glassFilter: "blur(20px) saturate(150%)",

    shadowCard: "none",
    shadowRaised:
      "0 16px 48px -24px rgba(0, 0, 0, 0.7), 0 1px 0 rgba(255, 255, 255, 0.06) inset",
    shadowOverlay:
      "0 28px 72px -32px rgba(0, 0, 0, 0.8), 0 1px 0 rgba(255, 255, 255, 0.08) inset",

    chart1: "#f56b3d" /* coral */,
    chart2: "#ffc94d" /* golden */,
    chart3: "#5fc383" /* green */,
    chart4: "#64b5e8" /* sky */,
    chart5: "#e879a6" /* pink */,
    chart6: "#b78af5" /* violet */,
    chart7: "#6fd8c2" /* mint */,
    chart8: "#c9d364" /* lime */,
    chartTrack: "rgba(245, 237, 230, 0.1)",
    chartPositive: "#5fc383",
    chartNegative: "#e5484d",
    chartTarget: "rgba(245, 237, 230, 0.45)",

    feel1: "#e5484d",
    feel2: "#e8863f",
    feel3: "#ecb454",
    feel4: "#a9c95f",
    feel5: "#5fc383",
  },
  light: {
    background: "#faf5ef",
    backgroundRaised: "#fdfaf6",
    backgroundSunken: "#f1e9e0",
    card: "#ffffff",
    cardForeground: "#33251c",
    popover: "#ffffff",
    popoverForeground: "#33251c",
    muted: "#f3ebe2",

    foreground: "#33251c",
    mutedForeground: "#6d5c4e",
    faintForeground: "#a08d7c",

    /* Deepened from #d94e1e (4.15:1 with white) so white text on the
       fill and primary-as-text on card and primarySoft pass 4.5:1.
       Same burnt-orange hue, still unmistakably ember. */
    primary: "#b74219",
    primaryHover: "#a33b16" /* darker step of the deepened primary */,
    primaryForeground: "#ffffff",
    primarySoft: "#fde5da",
    primaryBorder: "#f6c1a8",
    secondary: "#f3ebe2",
    secondaryForeground: "#8c3f16",
    secondarySoft: "#f7f1ea",
    accent: "#fbdccb",
    accentForeground: "#33251c",

    success: "#2c8553" /* deepened from #2e8b57 for 4.5:1 with white */,
    successForeground: "#ffffff",
    successSoft: "#dff0e5",
    warning: "#ab6605" /* deepened from #b26a05 for 4.5:1 with white */,
    warningForeground: "#ffffff",
    warningSoft: "#f9ecd4",
    destructive: "#c92c2c",
    destructiveForeground: "#ffffff",
    destructiveSoft: "#fbe3e3",
    info: "#2f6bb2",
    infoForeground: "#ffffff",
    infoSoft: "#e2ecf8",

    ai: "#fde5da",
    aiForeground: "#b8431a",
    aiBorder: "#f6c1a8",

    border: "#e8dcd0",
    borderStrong: "#d5c5b5",
    input: "#ddccbc",
    inputBackground: "#ffffff",
    ring: "#b74219" /* kept equal to primary */,
    overlay: "rgba(51, 37, 28, 0.4)",

    glassBg: "#ffffff",
    glassBgRaised: "#ffffff",
    glassBorder: "#e8dcd0",
    glassFilter: "none",

    shadowCard: "0 1px 4px rgba(51, 37, 28, 0.07)",
    shadowRaised: "0 8px 32px rgba(51, 37, 28, 0.14)",
    shadowOverlay: "0 24px 64px -24px rgba(51, 37, 28, 0.3)",

    chart1: "#d94e1e" /* coral */,
    chart2: "#b07f08" /* golden */,
    chart3: "#2e8b57" /* green */,
    chart4: "#2f6bb2" /* sky */,
    chart5: "#c2447e" /* pink */,
    chart6: "#7d4bc6" /* violet */,
    chart7: "#158577" /* mint-teal */,
    chart8: "#7a8f22" /* lime-olive */,
    chartTrack: "rgba(51, 37, 28, 0.1)",
    chartPositive: "#2e8b57",
    chartNegative: "#c92c2c",
    chartTarget: "rgba(51, 37, 28, 0.45)",

    feel1: "#c92c2c",
    feel2: "#bf5b14",
    feel3: "#b26a05",
    feel4: "#6d9a2e",
    feel5: "#2e8b57",
  },
}
