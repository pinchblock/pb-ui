import {
  cn,
  IconButton,
  SearchInput,
  Sheet,
  SheetBody,
  SheetDescription,
  SheetHeader,
  SheetPopup,
  SheetTitle,
  SheetTrigger,
} from "@pinchblock/ui"
import { List } from "@phosphor-icons/react"
import { useEffect, useMemo, useRef, useState } from "react"
import { Link, NavLink } from "react-router"

import { GROUPS } from "../pages/registry.ts"

/** Grouped page links, generated from the registry, filterable by the
 * nav search. Shared between the desktop sidebar and the mobile sheet. */
export function NavList({
  onNavigate,
  query = "",
}: {
  onNavigate?: () => void
  query?: string
}) {
  const q = query.trim().toLowerCase()
  const groups = useMemo(
    () =>
      GROUPS.map((group) => ({
        ...group,
        pages: q
          ? group.pages.filter(
              (p) =>
                p.label.toLowerCase().includes(q) ||
                p.id.includes(q) ||
                p.description.toLowerCase().includes(q),
            )
          : group.pages,
      })).filter((g) => g.pages.length > 0),
    [q],
  )

  if (groups.length === 0) {
    return <p className="px-2 text-sm text-muted-foreground">Nothing matches "{query}"</p>
  }

  return (
    <nav className="space-y-5">
      {groups.map((group) => (
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

/** Desktop sidebar (hidden below md; MobileNav covers small screens).
 * "/" focuses the search from anywhere outside an input. */
export function SidebarNav() {
  const [query, setQuery] = useState("")
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "/" || event.metaKey || event.ctrlKey || event.altKey) return
      const target = event.target as HTMLElement | null
      if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return
      if (target?.isContentEditable) return
      event.preventDefault()
      searchRef.current?.focus()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  return (
    <aside className="sticky top-0 hidden h-screen w-56 shrink-0 overflow-y-auto border-r border-border bg-background-sunken px-4 py-6 md:block">
      <Link to="/" className="block">
        <p className="mb-1 text-sm font-semibold">Pinchblock UI</p>
        <p className="mb-4 text-xs text-muted-foreground">Kitchen sink</p>
      </Link>
      <div className="mb-5">
        <SearchInput
          ref={searchRef}
          size="sm"
          placeholder="Find a component ( / )"
          aria-label="Find a component"
          value={query}
          onValueChange={setQuery}
        />
      </div>
      <NavList query={query} />
    </aside>
  )
}

/** Below md the sidebar is gone; this menu button in the control bar
 * opens the same nav list in a Sheet. Closes itself on navigation. */
export function MobileNav() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
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
          <div className="mb-4">
            <SearchInput
              size="sm"
              placeholder="Find a component"
              aria-label="Find a component"
              value={query}
              onValueChange={setQuery}
            />
          </div>
          <NavList query={query} onNavigate={() => setOpen(false)} />
        </SheetBody>
      </SheetPopup>
    </Sheet>
  )
}
