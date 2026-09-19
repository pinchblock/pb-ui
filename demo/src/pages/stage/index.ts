import type { SinkGroup } from "../types.ts"

/* Pages are added by the sink v2 migration; one line per page. */
export const group: SinkGroup = {
  slug: "stage",
  label: "Stage",
  pages: [
    { id: "stage-tokens", label: "Stage tokens", description: "The always-dark, theme-invariant token set for immersive surfaces; palette plus an every-theme invariance matrix.", load: () => import("./stage-tokens.tsx") },
    { id: "full-screen-timer", label: "FullScreenTimer", description: "Immersive workout countdown on stage tokens: phase-colored ring, rolling mm:ss numerals, large touch controls.", load: () => import("./full-screen-timer.tsx") },
    { id: "call-kit", label: "Call kit", description: "Presentational call shells on stage tokens: CallStage, CallControls, PreCallPanel, IncomingCallBanner.", load: () => import("./call-kit.tsx") },
    { id: "marquee-tokens", label: "Marquee tokens", description: "The always-dark, theme-invariant token set for the public landing: brand accent from one constant, Archivo display face, every-theme invariance matrix.", load: () => import("./marquee-tokens.tsx") },
  ],
}
