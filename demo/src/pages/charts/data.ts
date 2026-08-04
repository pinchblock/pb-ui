import type { StreakDay, TrendPoint } from "@pinchblock/ui"

/**
 * Demo data shared by more than one charts page (trend-chart,
 * streak-heatmap, example-weekly-report). Page-specific data stays in
 * the page file.
 */

/** Session load (RPE) with the athlete's 1-5 feel rating per session. */
export const SESSION_TREND: TrendPoint[] = [
  { label: "Apr 14", value: 6.0, feel: 3 },
  { label: "Apr 17", value: 6.5, feel: 4 },
  { label: "Apr 21", value: 7.0, feel: 4 },
  { label: "Apr 24", value: 5.5, feel: 2 },
  { label: "Apr 28", value: 6.5, feel: 3 },
  { label: "May 1", value: 7.5, feel: 4 },
  { label: "May 5", value: 8.0, feel: 5 },
  { label: "May 8", value: 7.0, feel: 4 },
  { label: "May 12", value: 8.5, feel: 5 },
  { label: "May 15", value: 8.0, feel: 4 },
]

/** 20 weeks of believable consistency: Mon/Tue/Thu/Fri, a deload, a trip. */
function buildStreakDays(): StreakDay[] {
  const days: StreakDay[] = []
  const today = new Date()
  for (let i = 0; i < 140; i += 1) {
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i)
    const weekday = (date.getDay() + 6) % 7 /* Mon=0 */
    const week = Math.floor(i / 7)
    if (week === 6) continue /* vacation week */
    let value = 0
    if (weekday === 0 || weekday === 3) value = 2
    else if (weekday === 1 || weekday === 4) value = 1
    else if (weekday === 5 && week % 3 === 0) value = 1
    if (week === 13) value = Math.min(value, 1) /* deload week */
    if (value > 0 && (i * 7 + 3) % 11 === 0) value = 0 /* the odd missed day */
    if (value > 0) days.push({ date, value: weekday === 0 && week % 4 === 0 ? 3 : value })
  }
  return days
}

export const STREAK_DAYS = buildStreakDays()
