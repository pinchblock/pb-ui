import { cva, type VariantProps } from "class-variance-authority"
import {
  CircleAlert,
  CircleCheck,
  Info,
  Sparkles,
  TriangleAlert,
  X,
} from "lucide-react"
import * as React from "react"

import { cn } from "../../lib/cn.ts"

/**
 * Alert. Inline banner for contextual feedback: border + soft tint +
 * icon + title + optional description and action slot. Replaces the
 * hand-rolled inline banner patterns in pb-app.
 *
 * role is "status" (polite) by default and "alert" (assertive) for the
 * destructive tone. The ai tone marks AI-assisted moments only
 * (guardrail) and pairs with the sparkle icon automatically.
 */
export const alertVariants = cva(
  "relative flex w-full items-start gap-3 rounded-lg border p-4 text-sm [&>svg]:mt-0.5 [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      tone: {
        info: "border-info/30 bg-info-soft [&>svg]:text-info",
        success: "border-success/30 bg-success-soft [&>svg]:text-success",
        warning: "border-warning/30 bg-warning-soft [&>svg]:text-warning",
        destructive: "border-destructive/30 bg-destructive-soft [&>svg]:text-destructive",
        ai: "border-ai-border bg-ai [&>svg]:text-ai-foreground",
      },
    },
    defaultVariants: {
      tone: "info",
    },
  },
)

type AlertTone = NonNullable<VariantProps<typeof alertVariants>["tone"]>

const TONE_TITLE_CLASS: Record<AlertTone, string> = {
  info: "text-info",
  success: "text-success",
  warning: "text-warning",
  destructive: "text-destructive",
  ai: "text-ai-foreground",
}

const TONE_ICON: Record<AlertTone, React.ComponentType<{ className?: string }>> = {
  info: Info,
  success: CircleCheck,
  warning: TriangleAlert,
  destructive: CircleAlert,
  ai: Sparkles,
}

export interface AlertProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof alertVariants> {
  /** Bold first line, rendered in the tone color. */
  title: React.ReactNode
  /** Replaces the default tone icon. Pass null to hide the icon. */
  icon?: React.ReactNode
  /** Action slot rendered under the description (Button, link...). */
  action?: React.ReactNode
  /** Shows a close button; the alert removes itself when pressed. */
  dismissible?: boolean
  /** Called after the dismiss button is pressed. */
  onDismiss?: () => void
}

export function Alert({
  className,
  tone,
  title,
  icon,
  action,
  dismissible = false,
  onDismiss,
  children,
  ...props
}: AlertProps) {
  const [dismissed, setDismissed] = React.useState(false)
  if (dismissed) return null

  const resolvedTone = tone ?? "info"
  const DefaultIcon = TONE_ICON[resolvedTone]

  return (
    <div
      role={resolvedTone === "destructive" ? "alert" : "status"}
      className={cn(alertVariants({ tone }), className)}
      {...props}
    >
      {icon === null ? null : (icon ?? <DefaultIcon aria-hidden />)}
      <div className="min-w-0 flex-1 space-y-1">
        <p className={cn("font-medium", TONE_TITLE_CLASS[resolvedTone])}>{title}</p>
        {children ? <div className="text-foreground/80">{children}</div> : null}
        {action ? <div className="pt-2">{action}</div> : null}
      </div>
      {dismissible ? (
        <button
          type="button"
          aria-label="Dismiss"
          onClick={() => {
            setDismissed(true)
            onDismiss?.()
          }}
          className={cn(
            "-m-1 shrink-0 rounded-sm p-1 text-muted-foreground",
            "transition-colors duration-(--duration-fast) ease-(--ease-out)",
            "hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          )}
        >
          <X aria-hidden className="size-4" />
        </button>
      ) : null}
    </div>
  )
}
