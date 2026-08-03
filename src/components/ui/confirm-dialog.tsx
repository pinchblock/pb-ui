import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog"
import * as React from "react"

import { Button } from "./button.tsx"
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogTitle,
} from "./dialog.tsx"

/**
 * ConfirmDialog. Alert-dialog replacement for window.confirm (and later
 * RN Alert.alert parity). Cannot be dismissed by clicking outside; Escape
 * cancels. Prefer the useConfirm() hook for one-off confirmations:
 *
 * const { confirm, confirmDialog } = useConfirm()
 * ...
 * if (await confirm({ title: "Unenroll?", destructive: true })) { ... }
 * ...
 * return <>{page}{confirmDialog}</>
 */
export interface ConfirmOptions {
  title: React.ReactNode
  description?: React.ReactNode
  /** Default "Confirm". */
  confirmLabel?: React.ReactNode
  /** Default "Cancel". */
  cancelLabel?: React.ReactNode
  /** Styles the confirm action as destructive (red). */
  destructive?: boolean
}

export interface ConfirmDialogProps extends ConfirmOptions {
  open: boolean
  onOpenChange?: (open: boolean) => void
  /**
   * Called when the user confirms. Returning a promise keeps the dialog
   * open with the confirm button in a loading state until it settles.
   */
  onConfirm?: () => void | Promise<void>
  /** Called when the user presses the cancel button specifically. */
  onCancel?: () => void
  /** External loading override for controlled flows. */
  loading?: boolean
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  destructive = false,
  onConfirm,
  onCancel,
  loading,
}: ConfirmDialogProps) {
  const [pending, setPending] = React.useState(false)

  async function handleConfirm() {
    const result = onConfirm?.()
    if (result instanceof Promise) {
      setPending(true)
      try {
        await result
      } finally {
        setPending(false)
      }
    }
    onOpenChange?.(false)
  }

  return (
    <BaseAlertDialog.Root open={open} onOpenChange={onOpenChange}>
      {/* AlertDialog reuses Dialog parts, so the styled DialogPopup works
          here and picks up role="alertdialog" from the alert root. */}
      <DialogPopup size="sm" showClose={false}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description != null && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <DialogFooter>
          <DialogClose
            render={<Button variant="secondary" />}
            onClick={onCancel}
          >
            {cancelLabel}
          </DialogClose>
          <Button
            variant={destructive ? "destructive" : "primary"}
            loading={loading ?? pending}
            onClick={handleConfirm}
          >
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogPopup>
    </BaseAlertDialog.Root>
  )
}

/**
 * Promise-based confirmation. Render `confirmDialog` once near the root of
 * the tree that calls `confirm`.
 */
export function useConfirm() {
  const [options, setOptions] = React.useState<ConfirmOptions | null>(null)
  const [open, setOpen] = React.useState(false)
  const resolveRef = React.useRef<((value: boolean) => void) | null>(null)

  const settle = React.useCallback((value: boolean) => {
    resolveRef.current?.(value)
    resolveRef.current = null
    setOpen(false)
  }, [])

  const confirm = React.useCallback(
    (nextOptions: ConfirmOptions) =>
      new Promise<boolean>((resolve) => {
        /* A second confirm() while one is pending cancels the first. */
        resolveRef.current?.(false)
        resolveRef.current = resolve
        setOptions(nextOptions)
        setOpen(true)
      }),
    [],
  )

  /* Options stay mounted while closing so the exit animation keeps its content. */
  const confirmDialog = options ? (
    <ConfirmDialog
      {...options}
      open={open}
      onOpenChange={(next) => {
        if (!next) settle(false)
      }}
      onConfirm={() => settle(true)}
    />
  ) : null

  return { confirm, confirmDialog }
}
