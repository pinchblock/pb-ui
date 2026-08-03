import { Dialog as BaseDialog } from "@base-ui/react/dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"
import type * as React from "react"

import { cn } from "../../lib/cn.ts"

/**
 * Dialog. Modal surface for focused tasks and confirmations.
 * Responsive presentation: bottom sheet on small screens (slides up,
 * rounded top), centered card on sm+ (fade + zoom). Replaces the
 * hand-rolled pb-app modals.
 *
 * <Dialog>
 *   <DialogTrigger render={<Button />}>Open</DialogTrigger>
 *   <DialogPopup>
 *     <DialogHeader>
 *       <DialogTitle>Title</DialogTitle>
 *       <DialogDescription>Supporting copy.</DialogDescription>
 *     </DialogHeader>
 *     ...body...
 *     <DialogFooter>
 *       <DialogClose render={<Button variant="secondary" />}>Cancel</DialogClose>
 *     </DialogFooter>
 *   </DialogPopup>
 * </Dialog>
 */
export function Dialog(props: BaseDialog.Root.Props) {
  return <BaseDialog.Root {...props} />
}

/** Opens the dialog. Use `render={<Button />}` to style it. */
export function DialogTrigger(props: BaseDialog.Trigger.Props) {
  return <BaseDialog.Trigger {...props} />
}

/** Closes the dialog. Use `render={<Button variant="..." />}` in footers. */
export function DialogClose(props: BaseDialog.Close.Props) {
  return <BaseDialog.Close {...props} />
}

/** Shared by DialogPopup and ConfirmDialog (AlertDialog reuses Dialog parts). */
export const dialogBackdropClassName = cn(
  "fixed inset-0 z-50 bg-overlay backdrop-blur-sm",
  "data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
  "duration-(--duration-base) ease-(--ease-out)",
)

export const dialogViewportClassName = cn(
  "fixed inset-0 z-50 flex flex-col items-center justify-end pt-12 sm:justify-center sm:p-6",
)

export const dialogPopupVariants = cva(
  cn(
    "relative flex w-full max-h-full flex-col gap-4 overflow-y-auto overscroll-contain",
    "rounded-t-2xl bg-popover p-6 text-popover-foreground shadow-overlay outline-none",
    "sm:rounded-2xl sm:border sm:border-border",
    /* Mobile: slide up from the bottom edge. sm+: fade + subtle zoom. */
    "data-open:animate-in data-open:fade-in-0 data-open:slide-in-from-bottom",
    "data-closed:animate-out data-closed:fade-out-0 data-closed:slide-out-to-bottom",
    "sm:data-open:slide-in-from-bottom-0 sm:data-open:zoom-in-95",
    "sm:data-closed:slide-out-to-bottom-0 sm:data-closed:zoom-out-95",
    "duration-(--duration-base) ease-(--ease-out)",
  ),
  {
    variants: {
      size: {
        sm: "sm:max-w-sm",
        md: "sm:max-w-lg",
        lg: "sm:max-w-2xl",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

export interface DialogPopupProps
  extends Omit<BaseDialog.Popup.Props, "className">,
    VariantProps<typeof dialogPopupVariants> {
  className?: string
  /** Renders an X button in the top-right corner. Default true. */
  showClose?: boolean
}

/**
 * Dialog surface. Renders its own Portal, Backdrop and centering Viewport,
 * so consumers only compose header/body/footer inside.
 */
export function DialogPopup({
  className,
  size,
  showClose = true,
  children,
  ...props
}: DialogPopupProps) {
  return (
    <BaseDialog.Portal>
      <BaseDialog.Backdrop className={dialogBackdropClassName} />
      <BaseDialog.Viewport className={dialogViewportClassName}>
        <BaseDialog.Popup
          className={cn(dialogPopupVariants({ size }), className)}
          {...props}
        >
          {children}
          {showClose && (
            <BaseDialog.Close
              aria-label="Close"
              className={cn(
                "absolute top-4 right-4 rounded-md p-1.5 text-muted-foreground",
                "transition-colors duration-(--duration-fast) ease-(--ease-out)",
                "hover:bg-muted hover:text-foreground",
              )}
            >
              <X aria-hidden className="size-4" />
            </BaseDialog.Close>
          )}
        </BaseDialog.Popup>
      </BaseDialog.Viewport>
    </BaseDialog.Portal>
  )
}

export function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col gap-1.5 text-center sm:text-left", className)}
      {...props}
    />
  )
}

export interface DialogTitleProps extends Omit<BaseDialog.Title.Props, "className"> {
  className?: string
}

export function DialogTitle({ className, ...props }: DialogTitleProps) {
  return (
    <BaseDialog.Title
      className={cn("text-lg leading-none font-semibold", className)}
      {...props}
    />
  )
}

export interface DialogDescriptionProps
  extends Omit<BaseDialog.Description.Props, "className"> {
  className?: string
}

export function DialogDescription({ className, ...props }: DialogDescriptionProps) {
  return (
    <BaseDialog.Description
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    />
  )
}
