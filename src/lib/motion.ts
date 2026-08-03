"use client"

import { createElement } from "react"
import type { ReactNode } from "react"
import { motion, useReducedMotion } from "motion/react"
import type { HTMLMotionProps, Transition, Variants } from "motion/react"

import { shared } from "../tokens/shared.ts"

/**
 * Motion vocabulary for Motion for React ("motion" package).
 *
 * Every duration and easing here is derived at module load from the
 * token source of truth (src/tokens/shared.ts), so JS-driven animation
 * can never drift from the CSS custom properties. Use these presets
 * instead of ad-hoc { duration: 0.2 } literals.
 *
 * Rules (docs/GUARDRAILS.md): CSS transitions for micro-interactions;
 * Motion for springs, layout moves, exits and gestures. Playful
 * overshoot (spring easing) is for B2C reward moments only (streaks,
 * PRs, reactions), never navigation.
 */

function toSeconds(duration: string): number {
  return Number.parseFloat(duration) / 1000
}

function toBezier(ease: string): [number, number, number, number] {
  const parts = ease.match(/-?\d*\.?\d+/g)?.map(Number) ?? []
  return [parts[0] ?? 0, parts[1] ?? 0, parts[2] ?? 1, parts[3] ?? 1]
}

/** Token durations in seconds (Motion's unit). */
export const durations = {
  fast: toSeconds(shared.motion.duration.fast),
  base: toSeconds(shared.motion.duration.base),
  slow: toSeconds(shared.motion.duration.slow),
  slower: toSeconds(shared.motion.duration.slower),
}

/** Token easings as cubic-bezier tuples (Motion's format). */
export const easings = {
  out: toBezier(shared.motion.ease.out),
  inOut: toBezier(shared.motion.ease.inOut),
  spring: toBezier(shared.motion.ease.spring),
}

/** Ready-made transitions pairing token durations with token easings. */
export const transitions = {
  fast: { duration: durations.fast, ease: easings.out },
  base: { duration: durations.base, ease: easings.out },
  slow: { duration: durations.slow, ease: easings.inOut },
  /** Overshoot for reward moments (streaks, PRs, reactions). */
  spring: { duration: durations.slow, ease: easings.spring },
} satisfies Record<string, Transition>

/** Plain opacity entrance. */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transitions.base },
}

/** Default content entrance: fade while rising slightly. */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: transitions.base },
}

/** Entrance for popovers, cards, thumbnails. */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: transitions.base },
}

/**
 * Reward-moment pop (new PR, streak milestone, reaction). Uses the
 * spring easing token; do not use for navigation or routine content.
 */
export const springPop: Variants = {
  hidden: { opacity: 0, scale: 0.4 },
  visible: { opacity: 1, scale: 1, transition: transitions.spring },
}

/**
 * Parent variants that cascade `hidden`/`visible` to children with a
 * stagger. Children declare their own variants (fadeInUp, springPop...).
 */
export function staggerChildren(
  interval: number = durations.fast,
  delay = 0,
): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: interval, delayChildren: delay },
    },
  }
}

/** Route/page-level enter and exit, for AnimatePresence around views. */
export const pageTransition = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: transitions.base },
  exit: { opacity: 0, y: -8, transition: transitions.fast },
}

export interface RevealProps extends Omit<HTMLMotionProps<"div">, "children"> {
  /** Fraction of the element that must be visible before revealing. */
  amount?: number
  children?: ReactNode
}

/**
 * Scroll-into-view reveal: fades up once when the element enters the
 * viewport. Under prefers-reduced-motion it falls back to a pure
 * opacity fade (no movement).
 *
 * (This file stays .ts, so the element is built with createElement.)
 */
export function Reveal({ amount = 0.3, children, ...props }: RevealProps) {
  const reducedMotion = useReducedMotion()
  return createElement(
    motion.div,
    {
      initial: "hidden",
      whileInView: "visible",
      viewport: { once: true, amount },
      variants: reducedMotion ? fadeIn : fadeInUp,
      ...props,
    },
    children,
  )
}
