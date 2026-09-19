/**
 * The template catalogue. Every kind of mail the product sends has an
 * entry here, so the kitchen sink can show them all and a future one
 * appears by adding a single record rather than a page.
 *
 * These are shapes, not the live copy: the product builds the real
 * thing from its own localised catalogue. What belongs here is one
 * representative example per kind, so a designer can see how the layout
 * holds under short copy, long copy, a quoted block, a detail panel and
 * no action at all.
 */
import type { EmailInput } from "./template.ts"

export type EmailSample = {
  /** Stable id, used as the selector value. */
  id: string
  /** Short name for the picker. */
  label: string
  /** What this mail is for and when it goes out. */
  description: string
  /** Where the live version is built, so a reader can find it. */
  builtIn: string
  /** Subject line the product sends, for the envelope preview. */
  subject: string
  input: EmailInput
}

const ORIGIN = "https://pinchblock.app"

export const emailSamples: EmailSample[] = [
  {
    builtIn: "pb-app backend/api/src/lib/messages/message-email-worker.ts",
    description:
      "One per unread conversation, fifteen minutes after the first unread message, cancelled if the thread is read first.",
    id: "message-digest",
    input: {
      action: { href: `${ORIGIN}/messages/abc`, label: "Open the conversation" },
      footerLinks: [
        { href: `${ORIGIN}/settings?tab=notifications`, label: "Email settings" },
        { href: `${ORIGIN}/email-preferences/unsubscribe?token=x`, label: "Turn off message emails" },
      ],
      info: ["You get this email because message emails are on in your Pinchblock settings."],
      origin: ORIGIN,
      quote: [
        "Saturday session moved to seven, the gym opens late",
        "Bring the crash pad if you still have it",
        "Also, how did the deadlift set feel on Tuesday?",
      ],
      title: "3 new messages from Maya Rivera",
    },
    label: "Message digest",
    subject: "3 new messages from Maya Rivera",
  },
  {
    builtIn: "pb-app backend/api/src/lib/accounting/purchase-email-template.ts (not moved yet)",
    description:
      "Sent to the athlete and to the coach once a card payment reconciles. Carries the figure, the detail rows and the reference identifiers.",
    id: "purchase-payment",
    input: {
      action: { href: `${ORIGIN}/settings?tab=billing`, label: "View the transaction" },
      details: [
        { label: "Offering", value: "Twelve week strength block" },
        { emphasis: true, label: "Amount", value: "149.00 EUR" },
        { label: "Kind", value: "One-time purchase" },
        { label: "Date", value: "19 September 2026, 14:22" },
        { label: "Seller", value: "Maya Rivera" },
      ],
      eyebrow: "Payment received",
      fine: [
        { label: "Transaction", value: "txn_3PqL9rK2m8XcVb7Y1aZd4Nf6" },
        { label: "Document", value: "doc_01J8ZK4QF7R2M9T0X5C3H6B8W" },
      ],
      footerLinks: [{ href: `${ORIGIN}/settings?tab=billing`, label: "Payments and purchases" }],
      info: ["Pinchblock sends this whenever a payment on your account settles."],
      origin: ORIGIN,
      paragraphs: ["Your coaching purchase is confirmed. The plan appears in the app as soon as Maya builds it."],
      title: "Your payment went through",
    },
    label: "Purchase payment",
    subject: "Payment received for Twelve week strength block",
  },
  {
    builtIn: "pb-app backend/api/src/lib/accounting/purchase-email-template.ts (not moved yet)",
    description: "Delivers the immutable invoice PDF for a coaching purchase. The attachment is not part of the layout.",
    id: "purchase-invoice",
    input: {
      details: [
        { label: "Invoice", value: "PB-2026-0184" },
        { emphasis: true, label: "Total", value: "149.00 EUR" },
        { label: "Issued", value: "19 September 2026" },
      ],
      eyebrow: "Invoice attached",
      footerLinks: [{ href: `${ORIGIN}/settings?tab=billing`, label: "Payments and purchases" }],
      info: ["The PDF is attached to this email and stays available in your account."],
      origin: ORIGIN,
      paragraphs: ["Your invoice for the coaching purchase is attached as a PDF."],
      title: "Your invoice is ready",
    },
    label: "Purchase invoice",
    subject: "Your Pinchblock invoice PB-2026-0184",
  },
  {
    builtIn: "pb-app backend/api/src/lib/account/athlete-invitation-worker.ts (text only today)",
    description: "A coach invites an athlete who has no account yet. The link carries a signup token.",
    id: "athlete-invitation",
    input: {
      action: { href: `${ORIGIN}/i/abc123`, label: "Accept the invitation" },
      actionNote: "The link works once and belongs to this address.",
      footerLinks: [{ href: `${ORIGIN}/about`, label: "About Pinchblock" }],
      info: ["You got this because a coach entered your address on Pinchblock."],
      origin: ORIGIN,
      paragraphs: [
        "Maya Rivera wants to coach you on Pinchblock. Accept the invitation to set up your account and see the plan she is building.",
      ],
      title: "Maya Rivera invited you to train together",
    },
    label: "Athlete invitation",
    subject: "Maya Rivera invited you to Pinchblock",
  },
  {
    builtIn: "Supabase Auth templates (not moved yet)",
    description: "Password reset, rendered by Supabase today. Shown here as the shape it would take on this layout.",
    id: "password-reset",
    input: {
      action: { href: `${ORIGIN}/auth/reset?token=x`, label: "Choose a new password" },
      actionNote: "The link expires in 60 minutes and can be used once.",
      eyebrow: "Account security",
      footerLinks: [{ href: `${ORIGIN}/help`, label: "Help" }],
      info: ["Sent because a password reset was requested for this address."],
      origin: ORIGIN,
      paragraphs: [
        "Somebody asked to reset the password for this account. Use the button below within the next hour.",
        "If it was not you, nothing has changed and you can close this email.",
      ],
      title: "Reset your password",
    },
    label: "Password reset",
    subject: "Reset your Pinchblock password",
  },
  {
    builtIn: "Nothing yet: the shape a quiet notice takes",
    description: "A mail with no action at all, to check the layout holds when the button is gone.",
    id: "plan-ready",
    input: {
      footerLinks: [{ href: `${ORIGIN}/settings?tab=notifications`, label: "Email settings" }],
      info: ["You get this email because plan updates are on."],
      origin: ORIGIN,
      paragraphs: ["Maya finished building your twelve week block. It is waiting in the app whenever you are."],
      title: "Your plan is ready",
    },
    label: "Notice, no action",
    subject: "Your plan is ready",
  },
]
