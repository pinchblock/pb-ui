import { Alert, Button } from "@pinchblock/ui"
import { Component, type ReactNode } from "react"

/**
 * Catches render errors from lazy page chunks (stale deploy, network
 * drop) so the sink shows an inline alert instead of a blank screen.
 * Mount with key={location.pathname} so navigating away retries.
 */
export class ErrorBoundary extends Component<
  { children: ReactNode },
  { error: Error | null }
> {
  state: { error: Error | null } = { error: null }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <Alert
          tone="destructive"
          title="This page failed to load"
          action={
            <Button variant="secondary" size="sm" onClick={() => window.location.reload()}>
              Reload
            </Button>
          }
        >
          {this.state.error.message || "The page chunk could not be loaded."}
        </Alert>
      )
    }
    return this.props.children
  }
}
