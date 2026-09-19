/**
 * Transactional email. Framework-free string rendering so a backend
 * worker can import it without React:
 *
 *   import { renderEmail } from "@pinchblock/ui/email"
 */
export { escapeHtml, renderEmail } from "./template.ts"
export type { EmailInput, EmailLink, RenderedEmail } from "./template.ts"
