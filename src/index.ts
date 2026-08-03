/**
 * @pinchblock/ui public barrel. Every component MUST be exported here;
 * this package is consumed as raw source and unexported code does not
 * exist for consumers. Keep groups alphabetical within their section.
 */

/* Lib */
export { cn } from "./lib/cn.ts"
export {
  applyMode,
  applyTheme,
  MODE_STORAGE_KEY,
  setDensity,
  setFontScale,
  setRadius,
  THEME_STORAGE_KEY,
  type ModeSetting,
} from "./lib/theme.ts"
export { themeBootScript } from "./lib/theme-boot.ts"

/* Tokens (also available as @pinchblock/ui/tokens for React Native) */
export { defaultTheme, ocean, shared, themes } from "./tokens/index.ts"
export type { Mode, ModeTokens, SharedTokens, ThemeDefinition } from "./tokens/index.ts"

/* Primitives */
export { Button, buttonVariants, type ButtonProps } from "./components/ui/button.tsx"
