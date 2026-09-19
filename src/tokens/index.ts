/**
 * Token entry point. Web consumes the generated CSS instead
 * (styles/tokens.css); this module is the source of truth and the
 * direct import path for React Native (Expo bundles TS natively):
 *
 *   import { themes, shared, defaultTheme } from "@pinchblock/ui/tokens"
 */
export type { Color, Mode, ModeTokens, MotionTokens, Shadow, SharedTokens, ThemeDefinition } from "./types.ts"
export { displayScale, shared, textScale } from "./shared.ts"

import type { ThemeDefinition } from "./types.ts"
import { ember } from "./themes/ember.ts"
import { glacier } from "./themes/glacier.ts"
import { nocturne } from "./themes/nocturne.ts"
import { turquoise } from "./themes/turquoise.ts"
import { ocean } from "./themes/ocean.ts"

export { ember, glacier, nocturne, turquoise, ocean }

/** Stage: always-dark, theme-invariant surface set (wrap in class "stage"). */
export { stage } from "./stage.ts"
/** Marquee: always-dark, theme-invariant marketing surface set (wrap in class "marquee"). */
export { marquee, marqueeDisplayFont, marqueePalette } from "./marquee.ts"

/** All themes, default first. Add new themes here and in src/styles via `npm run gen`. */
export const themes: ThemeDefinition[] = [ocean, nocturne, ember, glacier, turquoise]

export const defaultTheme: ThemeDefinition = ocean
