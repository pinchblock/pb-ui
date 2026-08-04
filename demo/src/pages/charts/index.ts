import type { SinkGroup } from "../types.ts"

/* Pages are added by the sink v2 migration; one line per page. */
export const group: SinkGroup = {
  slug: "charts",
  label: "Charts",
  pages: [
    { id: "chart", label: "Chart", description: "The recharts wrapper kit: ChartContainer, ChartTooltip/Content, ChartLegend/Content, config-to-token colors.", load: () => import("./chart.tsx") },
    { id: "sparkline", label: "Sparkline", description: "Tiny pure-SVG trend line for list rows and stat tiles; auto positive/negative tone.", load: () => import("./sparkline.tsx") },
    { id: "trend-chart", label: "TrendChart", description: "Single-metric line with target line and feel-tinted dots; full and compact sizes.", load: () => import("./trend-chart.tsx") },
    { id: "activity-ring", label: "ActivityRing", description: "Concentric goal rings with animated sweep; up to three rings on chart tokens.", load: () => import("./activity-ring.tsx") },
    { id: "streak-heatmap", label: "StreakHeatmap", description: "GitHub-style consistency grid; intensity via color-mix steps of one chart token.", load: () => import("./streak-heatmap.tsx") },
    { id: "animated-number", label: "AnimatedNumber", description: "Rolling-digit stat counters with tabular numerals; group syncs several onto one clock.", load: () => import("./animated-number.tsx") },
    { id: "rating-feel", label: "Rating feel", description: "The 1-5 feel family: FeelPicker input, FeelDot and FeelBadge display, on feel-1..5 tokens.", load: () => import("./rating-feel.tsx") },
    { id: "example-weekly-report", label: "Example: weekly report", description: "Composed coach-facing report: rings, trend, heatmap and feel on one card.", load: () => import("./example-weekly-report.tsx") },
  ],
}
