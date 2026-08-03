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
import { ocean } from "./themes/ocean.ts"

export { ocean }

/** All themes, default first. Add new themes here and in src/styles via `npm run gen`. */
export const themes: ThemeDefinition[] = [ocean]

export const defaultTheme: ThemeDefinition = ocean
