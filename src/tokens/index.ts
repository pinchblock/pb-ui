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

/** Every theme. Add new ones here and in src/styles via `npm run gen`. */
export const themes: ThemeDefinition[] = [ocean, nocturne, ember, glacier, turquoise]

/**
 * What a surface renders when nobody has chosen: the product moved to
 * turquoise on 9 September 2026, so the system says so too. Order in
 * `themes` is the catalogue order, not a statement about the default.
 */
export const defaultTheme: ThemeDefinition = turquoise
