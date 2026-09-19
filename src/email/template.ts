/**
 * Transactional email layout. One template for every message Pinchblock
 * sends: a message digest, a password reset, a receipt, an invitation.
 *
 * Email clients are not browsers. There is no bundler, no external CSS,
 * no custom properties in Outlook, and no flex or grid worth trusting,
 * so this module emits one self-contained HTML document built from
 * tables and inline styles. It is deliberately framework-free (no React,
 * no DOM) so a backend worker can import it without pulling a renderer.
 *
 * The values are the system's, not new ones: the header is the marquee
 * brand surface (near-black ground, warm off-white ink), the sheet below
 * is the turquoise light surface set the landing's palette produces, the
 * type comes from the shared font stack and scale, corners are the one
 * 6px radius, and the action is a fully rounded button sized to its own
 * label. The brand colour appears only where it means "act", per
 * docs/GUARDRAILS.md.
 *
 *   import { renderEmail } from "@pinchblock/ui/email"
 *
 *   const { html, text } = renderEmail({
 *     origin: "https://pinchblock.app",
 *     title: "Maya Rivera sent you a message",
 *     paragraphs: ["She wrote while you were away."],
 *     action: { href: threadUrl, label: "Open the conversation" },
 *     footerLinks: [{ href: settingsUrl, label: "Email settings" }],
 *     info: ["You get this because message emails are on."],
 *   })
 */
import { marquee, marqueePalette } from "../tokens/marquee.ts"
import { shared, textScale } from "../tokens/shared.ts"
import { turquoise } from "../tokens/themes/turquoise.ts"

const light = turquoise.light

/** Every colour the template paints, resolved from tokens once. */
const palette = {
  /** Header: the brand's always-dark surface. */
  headerBackground: marqueePalette.night,
  headerInk: marqueePalette.ink,
  headerInkDim: marquee.mutedForeground,
  headerBorder: marquee.border,
  /** Sheet: the light surface set built from the same three constants. */
  ground: light.background,
  sheet: light.card,
  ink: light.foreground,
  inkMuted: light.mutedForeground,
  inkFaint: light.faintForeground,
  border: light.border,
  borderStrong: light.borderStrong,
  quote: light.secondarySoft,
  /** Action: the one place the brand colour is spent. */
  action: light.primary,
  actionInk: light.primaryForeground,
  /** Dark-mode client overrides, from the same two sets. */
  darkGround: marquee.backgroundSunken,
  darkSheet: marquee.card,
  darkInk: marquee.foreground,
  darkInkMuted: marquee.mutedForeground,
  darkInkFaint: marquee.faintForeground,
  darkBorder: marquee.border,
  darkBorderStrong: marquee.borderStrong,
  darkQuote: marquee.muted,
  darkAction: marquee.primary,
  darkActionInk: marquee.primaryForeground,
} as const

/** rem in the scale, px in the mail. Clients are unreliable with rem. */
function px(rem: string): number {
  return Math.round(Number.parseFloat(rem) * 16)
}
const type = {
  title: px(textScale["2xl"]!.size),
  titleLine: px(textScale["2xl"]!.lineHeight),
  body: px(textScale.base!.size),
  bodyLine: px(textScale.base!.lineHeight),
  small: px(textScale.sm!.size),
  smallLine: px(textScale.sm!.lineHeight),
  fine: px(textScale.xs!.size),
  fineLine: px(textScale.xs!.lineHeight),
  figure: px(textScale["3xl"]!.size),
  figureLine: px(textScale["3xl"]!.lineHeight),
} as const

/** The one general radius; buttons are fully rounded. See GUARDRAILS. */
const radius = `${px(shared.radius)}px`
const pill = "999px"
/**
 * The stack lives inside a style attribute, so its quoted family names
 * have to be single quoted or the attribute ends early and the mail
 * falls back to the client's serif.
 */
const font = shared.fontSans.replace(/"/gu, "'")
/** The base layer gives every heading this tracking; keep it here too. */
const headingTracking = "-0.015em"
const sheetWidth = 600

export type EmailLink = {
  href: string
  label: string
}

/** One row of the detail panel: a label, its value, and how loud it is. */
export type EmailDetail = {
  label: string
  value: string
  /** The one figure the mail is about, set large. At most one row. */
  emphasis?: boolean
}

export type EmailInput = {
  /** Absolute origin of the app this mail points at, no trailing slash. */
  origin: string
  /** Big line at the top of the sheet. Sentence case, no full stop. */
  title: string
  /** Short line above the title. Sentence case; the no-caps rule holds. */
  eyebrow?: string
  /** Document language. Mail is localised per recipient. */
  locale?: string
  /** Body copy, one string per paragraph. */
  paragraphs?: string[]
  /** Inbox preview line. Falls back to the first paragraph. */
  preheader?: string
  /** Quoted lines, for message previews and excerpts. */
  quote?: string[]
  /** Label and value rows in a panel: what was bought, how much, when. */
  details?: EmailDetail[]
  /** Small print under the body: transaction and document identifiers. */
  fine?: EmailDetail[]
  /** The one call to action. Rendered as a button sized to its label. */
  action?: EmailLink
  /** Quiet line under the action, for a fallback URL or a caveat. */
  actionNote?: string
  /** Footer links area. */
  footerLinks?: EmailLink[]
  /** Footer info area: why this arrived, who sent it. */
  info?: string[]
  /** Product name in the header. */
  productName?: string
  /** Square brand mark. Defaults to the app's own icon. */
  logoUrl?: string
  /** Line beside or under the wordmark, when a mail wants one. */
  headerNote?: string
}

export type RenderedEmail = {
  html: string
  text: string
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/gu, "&amp;")
    .replace(/</gu, "&lt;")
    .replace(/>/gu, "&gt;")
    .replace(/"/gu, "&quot;")
    .replace(/'/gu, "&#39;")
}

/** Only absolute http(s) links are ever painted as links. */
function safeHref(href: string): string | null {
  return /^https?:\/\/[^\s"'<>]+$/u.test(href) ? href : null
}

function paragraph(content: string, options: { color: string; size: number; line: number; top: number; className: string }): string {
  return (
    `<p class="${options.className}" style="margin:${options.top}px 0 0;` +
    `font-family:${font};font-size:${options.size}px;line-height:${options.line}px;` +
    `color:${options.color};">${escapeHtml(content)}</p>`
  )
}

function actionButton(action: EmailLink): string {
  const href = safeHref(action.href)
  const label = escapeHtml(action.label)
  if (!href) return ""
  // A button is as wide as its label, so the cell shrinks to the text.
  return (
    `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:24px 0 0;">` +
    `<tr><td class="pb-action" style="border-radius:${pill};background:${palette.action};">` +
    `<a class="pb-action-link" href="${escapeHtml(href)}" ` +
    `style="display:inline-block;padding:12px 24px;border-radius:${pill};` +
    `font-family:${font};font-size:${type.body}px;line-height:${type.bodyLine}px;font-weight:600;` +
    `color:${palette.actionInk};text-decoration:none;">${label}</a>` +
    `</td></tr></table>`
  )
}

function quoteBlock(lines: string[]): string {
  const rows = lines
    .filter((line) => line.trim().length > 0)
    .map((line, index) =>
      paragraph(line, {
        className: "pb-quote-line",
        color: palette.inkMuted,
        line: type.bodyLine,
        size: type.body,
        top: index === 0 ? 0 : 12,
      }),
    )
    .join("")
  if (!rows) return ""
  return (
    `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:24px 0 0;">` +
    `<tr><td class="pb-quote" style="padding:16px 20px;border-radius:${radius};` +
    `background:${palette.quote};border-left:3px solid ${palette.borderStrong};">${rows}</td></tr></table>`
  )
}

function detailPanel(rows: EmailDetail[]): string {
  const painted = rows
    .filter((row) => row.label.trim().length > 0 || row.value.trim().length > 0)
    .map((row, index) => {
      const top = index === 0 ? 0 : 16
      if (row.emphasis) {
        // The figure the mail is about: its own block, set large.
        return (
          `<div style="margin:${top}px 0 0;font-family:${font};font-size:${type.small}px;` +
          `line-height:${type.smallLine}px;color:${palette.inkFaint};" class="pb-detail-label">${escapeHtml(row.label)}</div>` +
          `<div style="margin:4px 0 0;font-family:${font};font-size:${type.figure}px;` +
          `line-height:${type.figureLine}px;font-weight:600;letter-spacing:${headingTracking};` +
          `color:${palette.ink};" class="pb-detail-figure">${escapeHtml(row.value)}</div>`
        )
      }
      // Two columns that collapse on a narrow client, so nothing is clipped.
      return (
        `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" ` +
        `style="margin:${top}px 0 0;table-layout:fixed;"><tr>` +
        `<td width="45%" valign="top" style="font-family:${font};font-size:${type.small}px;` +
        `line-height:${type.smallLine}px;color:${palette.inkFaint};" class="pb-detail-label">${escapeHtml(row.label)}</td>` +
        `<td valign="top" align="right" style="font-family:${font};font-size:${type.small}px;` +
        `line-height:${type.smallLine}px;font-weight:500;color:${palette.ink};` +
        `overflow-wrap:anywhere;" class="pb-detail-value">${escapeHtml(row.value)}</td>` +
        `</tr></table>`
      )
    })
    .join("")
  if (!painted) return ""
  return (
    `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:24px 0 0;">` +
    `<tr><td class="pb-detail" style="padding:20px;border-radius:${radius};` +
    `background:${palette.quote};border:1px solid ${palette.border};">${painted}</td></tr></table>`
  )
}

function finePrint(rows: EmailDetail[]): string {
  const painted = rows
    .filter((row) => row.value.trim().length > 0)
    .map(
      (row, index) =>
        `<p class="pb-fine" style="margin:${index === 0 ? 24 : 10}px 0 0;font-family:${font};` +
        `font-size:${type.fine}px;line-height:${type.fineLine}px;color:${palette.inkFaint};">` +
        `${escapeHtml(row.label)}<br><span style="overflow-wrap:anywhere;word-break:break-all;">` +
        `${escapeHtml(row.value)}</span></p>`,
    )
    .join("")
  return painted
}

function footerLinkRow(links: EmailLink[]): string {
  const painted = links
    .map((link) => {
      const href = safeHref(link.href)
      if (!href) return null
      return (
        `<a class="pb-footer-link" href="${escapeHtml(href)}" ` +
        `style="color:${palette.action};text-decoration:none;font-weight:500;">${escapeHtml(link.label)}</a>`
      )
    })
    .filter((value): value is string => value !== null)
  if (!painted.length) return ""
  const separator = `<span class="pb-footer-dot" style="color:${palette.inkFaint};"> &middot; </span>`
  return (
    `<p class="pb-footer-links" style="margin:0;font-family:${font};` +
    `font-size:${type.small}px;line-height:${type.smallLine}px;">${painted.join(separator)}</p>`
  )
}

function header(input: EmailInput): string {
  const name = escapeHtml(input.productName ?? "Pinchblock")
  const logo = safeHref(input.logoUrl ?? `${input.origin}/brand/icon-192.png`)
  const mark = logo
    ? `<img src="${escapeHtml(logo)}" width="36" height="36" alt="" ` +
      `style="display:block;width:36px;height:36px;border:0;border-radius:${radius};">`
    : ""
  const note = input.headerNote
    ? `<div style="margin:2px 0 0;font-family:${font};font-size:${type.small}px;` +
      `line-height:${type.smallLine}px;color:${palette.headerInkDim};">${escapeHtml(input.headerNote)}</div>`
    : ""
  // The wordmark carries the header, so a blocked image costs nothing.
  return (
    `<tr><td class="pb-header" style="padding:24px 32px;background:${palette.headerBackground};` +
    `border-radius:${radius} ${radius} 0 0;">` +
    `<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>` +
    (mark ? `<td style="padding-right:12px;vertical-align:middle;">${mark}</td>` : "") +
    `<td style="vertical-align:middle;">` +
    `<div style="font-family:${font};font-size:${type.body}px;line-height:${type.bodyLine}px;` +
    `font-weight:600;letter-spacing:${headingTracking};color:${palette.headerInk};">${name}</div>${note}` +
    `</td></tr></table></td></tr>`
  )
}

function body(input: EmailInput): string {
  const paragraphs = (input.paragraphs ?? [])
    .map((line, index) =>
      paragraph(line, {
        className: "pb-body",
        color: palette.inkMuted,
        line: type.bodyLine,
        size: type.body,
        top: index === 0 ? 16 : 12,
      }),
    )
    .join("")
  const note = input.actionNote
    ? paragraph(input.actionNote, {
        className: "pb-note",
        color: palette.inkFaint,
        line: type.smallLine,
        size: type.small,
        top: 16,
      })
    : ""
  const eyebrow = input.eyebrow
    ? `<p class="pb-eyebrow" style="margin:0 0 8px;font-family:${font};font-size:${type.small}px;` +
      `line-height:${type.smallLine}px;font-weight:500;letter-spacing:0.01em;` +
      `color:${palette.inkFaint};">${escapeHtml(input.eyebrow)}</p>`
    : ""
  return (
    `<tr><td class="pb-body-cell" style="padding:32px;">` +
    eyebrow +
    `<h1 class="pb-title" style="margin:0;font-family:${font};font-size:${type.title}px;` +
    `line-height:${type.titleLine}px;font-weight:600;letter-spacing:${headingTracking};` +
    `color:${palette.ink};">${escapeHtml(input.title)}</h1>` +
    paragraphs +
    (input.quote?.length ? quoteBlock(input.quote) : "") +
    (input.details?.length ? detailPanel(input.details) : "") +
    (input.action ? actionButton(input.action) : "") +
    note +
    (input.fine?.length ? finePrint(input.fine) : "") +
    `</td></tr>`
  )
}

function footer(input: EmailInput): string {
  const links = input.footerLinks?.length ? footerLinkRow(input.footerLinks) : ""
  const info = (input.info ?? [])
    .map((line, index) =>
      paragraph(line, {
        className: "pb-info",
        color: palette.inkFaint,
        line: type.fineLine,
        size: type.fine,
        top: index === 0 ? (links ? 12 : 0) : 6,
      }),
    )
    .join("")
  if (!links && !info) return ""
  return (
    `<tr><td class="pb-footer" style="padding:20px 32px 24px;background:${palette.quote};` +
    `border-top:1px solid ${palette.border};border-radius:0 0 ${radius} ${radius};">${links}${info}</td></tr>`
  )
}

/**
 * Client overrides live in a style block because inline styles cannot be
 * re-targeted. Gmail, Apple Mail and Outlook.com honour it; Outlook
 * desktop ignores both the media queries and the radius, and gets the
 * same mail with square corners, which is fine.
 */
function styleBlock(): string {
  return (
    `<style>` +
    `@media (max-width:620px){` +
    `.pb-sheet{width:100%!important;}` +
    `.pb-header{padding:20px!important;}` +
    `.pb-body-cell{padding:24px 20px!important;}` +
    `.pb-footer{padding:16px 20px 20px!important;}` +
    `.pb-title{font-size:${type.title - 2}px!important;line-height:${type.titleLine - 2}px!important;}` +
    `}` +
    `@media (prefers-color-scheme:dark){` +
    `.pb-ground{background:${palette.darkGround}!important;}` +
    `.pb-sheet{background:${palette.darkSheet}!important;border-color:${palette.darkBorder}!important;}` +
    `.pb-title{color:${palette.darkInk}!important;}` +
    `.pb-body,.pb-quote-line{color:${palette.darkInkMuted}!important;}` +
    `.pb-note,.pb-info,.pb-footer-dot{color:${palette.darkInkFaint}!important;}` +
    `.pb-eyebrow,.pb-detail-label,.pb-fine{color:${palette.darkInkFaint}!important;}` +
    `.pb-detail-value,.pb-detail-figure{color:${palette.darkInk}!important;}` +
    `.pb-detail{background:${palette.darkQuote}!important;border-color:${palette.darkBorder}!important;}` +
    `.pb-quote{background:${palette.darkQuote}!important;border-left-color:${palette.darkBorderStrong}!important;}` +
    `.pb-footer{background:${palette.darkQuote}!important;border-top-color:${palette.darkBorder}!important;}` +
    `.pb-action{background:${palette.darkAction}!important;}` +
    `.pb-action-link{color:${palette.darkActionInk}!important;}` +
    `.pb-footer-link{color:${palette.darkAction}!important;}` +
    `}` +
    `</style>`
  )
}

function plainText(input: EmailInput): string {
  const blocks: string[] = []
  if (input.eyebrow) blocks.push(input.eyebrow)
  blocks.push(input.title)
  for (const line of input.paragraphs ?? []) blocks.push(line)
  for (const line of input.quote ?? []) {
    if (line.trim().length > 0) blocks.push(`> ${line}`)
  }
  for (const row of input.details ?? []) blocks.push(`${row.label}: ${row.value}`)
  if (input.action && safeHref(input.action.href)) {
    blocks.push(`${input.action.label}: ${input.action.href}`)
  }
  if (input.actionNote) blocks.push(input.actionNote)
  for (const row of input.fine ?? []) blocks.push(`${row.label}: ${row.value}`)
  for (const line of input.info ?? []) blocks.push(line)
  for (const link of input.footerLinks ?? []) {
    if (safeHref(link.href)) blocks.push(`${link.label}: ${link.href}`)
  }
  return blocks.join("\n\n")
}

/** Builds the HTML document and its plain text alternative from one input. */
export function renderEmail(input: EmailInput): RenderedEmail {
  const preheader = input.preheader ?? input.paragraphs?.[0] ?? input.title
  return {
    html:
      `<!doctype html><html lang="${escapeHtml(input.locale ?? "en")}"><head>` +
      `<meta charset="utf-8">` +
      `<meta name="viewport" content="width=device-width,initial-scale=1">` +
      `<meta name="color-scheme" content="light dark">` +
      `<meta name="supported-color-schemes" content="light dark">` +
      `<title>${escapeHtml(input.title)}</title>` +
      styleBlock() +
      `</head>` +
      `<body class="pb-ground" style="margin:0;padding:0;width:100%;background:${palette.ground};">` +
      // Hidden line the inbox shows beside the subject.
      `<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>` +
      `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" ` +
      `class="pb-ground" style="background:${palette.ground};"><tr><td style="padding:32px 16px;">` +
      `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="${sheetWidth}" ` +
      `class="pb-sheet" style="width:${sheetWidth}px;max-width:100%;margin:0 auto;` +
      `background:${palette.sheet};border:1px solid ${palette.border};border-radius:${radius};">` +
      header(input) +
      body(input) +
      footer(input) +
      `</table></td></tr></table></body></html>`,
    text: plainText(input),
  }
}
