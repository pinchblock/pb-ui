import {
  cn,
  IconButton,
  Sheet,
  SheetBody,
  SheetDescription,
  SheetHeader,
  SheetPopup,
  SheetTitle,
  SheetTrigger,
} from "@pinchblock/ui"
import { List } from "@phosphor-icons/react"
import { useState } from "react"
import { Link, NavLink } from "react-router"

import { GROUPS } from "../pages/registry.ts"

/** Grouped page links, generated from the registry. Shared between the
 * desktop sidebar and the mobile nav sheet. */
export function NavList({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="space-y-5">
      {GROUPS.filter((g) => g.pages.length > 0).map((group) => (
        <div key={group.slug}>
          <NavLink
            to={`/c/${group.slug}`}
            end
            onClick={onNavigate}
            className="eyebrow mb-1.5 block hover:text-foreground"
          >
            {group.label}
          </NavLink>
          <ul>
            {group.pages.map((p) => (
              <li key={p.id}>
                <NavLink
                  to={`/c/${group.slug}/${p.id}`}
                  onClick={onNavigate}
                  className={({ isActive }) =>
                    cn(
                      "block rounded-md px-2 py-1 text-sm transition-colors duration-(--duration-fast)",
                      isActive
                        ? "bg-primary-soft text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )
                  }
                >
                  {p.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  )
}

/** Desktop sidebar (hidden below md; MobileNav covers small screens). */
export function SidebarNav() {
  return (
    <aside className="sticky top-0 hidden h-screen w-56 shrink-0 overflow-y-auto border-r border-border bg-background-sunken px-4 py-6 md:block">
      <Link to="/" className="block">
        <p className="mb-1 text-sm font-semibold">Pinchblock UI</p>
        <p className="mb-6 text-xs text-muted-foreground">Kitchen sink</p>
      </Link>
      <NavList />
    </aside>
  )
}

/** Below md the sidebar is gone; this menu button in the control bar
 * opens the same nav list in a Sheet. Closes itself on navigation. */
export function MobileNav() {
  const [open, setOpen] = useState(false)
  return (
    <Sheet side="left" open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <IconButton
            aria-label="Open navigation"
            variant="secondary"
            size="sm"
            className="md:hidden"
          />
        }
      >
        <List />
      </SheetTrigger>
      <SheetPopup className="max-w-72">
        <SheetHeader>
          <SheetTitle>Pinchblock UI</SheetTitle>
          <SheetDescription>Kitchen sink</SheetDescription>
        </SheetHeader>
        <SheetBody>
          <NavList onNavigate={() => setOpen(false)} />
        </SheetBody>
      </SheetPopup>
    </Sheet>
  )
}
