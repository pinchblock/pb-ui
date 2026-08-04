// WCAG 2.x relative luminance contrast for theme token pairs.
import { ocean } from '../src/tokens/themes/ocean.ts'
import { nocturne } from '../src/tokens/themes/nocturne.ts'
import { ember } from '../src/tokens/themes/ember.ts'
import { glacier } from '../src/tokens/themes/glacier.ts'

function parse(c) {
  c = c.trim()
  if (c.startsWith('#')) {
    const h = c.slice(1)
    const n = h.length === 3 ? h.split('').map(x => x + x).join('') : h
    return [parseInt(n.slice(0,2),16), parseInt(n.slice(2,4),16), parseInt(n.slice(4,6),16), 1]
  }
  const m = c.match(/rgba?\(([^)]+)\)/)
  if (m) {
    const p = m[1].split(',').map(s => parseFloat(s))
    return [p[0], p[1], p[2], p[3] ?? 1]
  }
  throw new Error('cannot parse ' + c)
}
// composite fg (with alpha) over bg (assumed opaque after compositing over base)
function comp(fg, bg) {
  const a = fg[3]
  return [0,1,2].map(i => fg[i]*a + bg[i]*(1-a)).concat([1])
}
function lum([r,g,b]) {
  const f = v => { v/=255; return v <= 0.04045 ? v/12.92 : ((v+0.055)/1.055)**2.4 }
  return 0.2126*f(r)+0.7152*f(g)+0.0722*f(b)
}
function ratio(fg, bg) {
  const l1 = lum(fg), l2 = lum(bg)
  const [a,b] = l1 > l2 ? [l1,l2] : [l2,l1]
  return (a+0.05)/(b+0.05)
}
// resolve a color that may have alpha over a base
function over(colorStr, ...bases) {
  let c = parse(colorStr)
  for (const b of bases) {
    if (c[3] < 1) c = comp(c, b)
  }
  return c
}

const themes = { ocean, nocturne, ember, glacier }
const fmt = n => n.toFixed(2)

for (const [name, theme] of Object.entries(themes)) {
  for (const mode of ['light','dark']) {
    const t = theme[mode]
    const bg = over(t.background, [255,255,255,1])
    const card = over(t.card, bg)
    const muted = over(t.muted, card)
    const popover = over(t.popover, bg)
    const primary = over(t.primary, card)
    const primarySoft = over(t.primarySoft, card)
    const mutedFg = over(t.mutedForeground, muted)
    const mutedFgOnCard = over(t.mutedForeground, card)
    const mutedFgOnBg = over(t.mutedForeground, bg)
    const faintFg = over(t.faintForeground, card)
    const primaryFg = over(t.primaryForeground, primary)
    const successSoft = over(t.successSoft, card)
    const warningSoft = over(t.warningSoft, card)
    const destructiveSoft = over(t.destructiveSoft, card)
    const infoSoft = over(t.infoSoft, card)
    const ai = over(t.ai, card)

    const rows = [
      ['mutedFg / muted', ratio(mutedFg, muted)],
      ['mutedFg / card', ratio(mutedFgOnCard, card)],
      ['mutedFg / background', ratio(mutedFgOnBg, bg)],
      ['faintFg / card', ratio(faintFg, card)],
      ['primaryFg / primary', ratio(primaryFg, primary)],
      ['primary(text) / card', ratio(over(t.primary, card), card)],
      ['primary(text) / primarySoft', ratio(over(t.primary, primarySoft), primarySoft)],
      ['success / card', ratio(over(t.success, card), card)],
      ['successFg / success', ratio(over(t.successForeground, over(t.success, card)), over(t.success, card))],
      ['warningFg / warning', ratio(over(t.warningForeground, over(t.warning, card)), over(t.warning, card))],
      ['destructiveFg / destructive', ratio(over(t.destructiveForeground, over(t.destructive, card)), over(t.destructive, card))],
      ['infoFg / info', ratio(over(t.infoForeground, over(t.info, card)), over(t.info, card))],
      ['aiFg / ai', ratio(over(t.aiForeground, ai), ai)],
      ['success(text) / successSoft', ratio(over(t.success, successSoft), successSoft)],
      ['warning(text) / warningSoft', ratio(over(t.warning, warningSoft), warningSoft)],
      ['destructive(text) / destructiveSoft', ratio(over(t.destructive, destructiveSoft), destructiveSoft)],
      ['info(text) / infoSoft', ratio(over(t.info, infoSoft), infoSoft)],
      ['popoverFg / popover', ratio(over(t.popoverForeground, popover), popover)],
      ['secondaryFg / secondary', ratio(over(t.secondaryForeground, over(t.secondary, card)), over(t.secondary, card))],
      ['accentFg / accent', ratio(over(t.accentForeground, over(t.accent, card)), over(t.accent, card))],
    ]
    // feel badge: feel color text at 100% on feel color 15% over card
    for (const k of ['feel1','feel2','feel3','feel4','feel5']) {
      const f = parse(t[k]); f[3] = 1
      const badgeBg = comp([f[0],f[1],f[2],0.15], card)
      rows.push([`${k}(text) / ${k}15 badge`, ratio(f, badgeBg)])
    }
    for (const [label, r] of rows) {
      const flag = r < 3 ? '  <3 FAIL-ALL' : r < 4.5 ? '  <4.5 fail-normal-text' : ''
      console.log(`${name}.${mode}  ${label.padEnd(36)} ${fmt(r)}${flag}`)
    }
    console.log('')
  }
}
