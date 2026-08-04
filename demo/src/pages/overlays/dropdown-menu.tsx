import {
  BellSlash,
  CalendarPlus,
  DotsThreeVertical,
  LinkSimple,
  PencilSimple,
  ShareNetwork,
  Trash,
} from "@phosphor-icons/react"
import { useState } from "react"

import { Button } from "../../../../src/components/ui/button.tsx"
import { useConfirm } from "../../../../src/components/ui/confirm-dialog.tsx"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuGroup,
  DropdownMenuGroupLabel,
  DropdownMenuItem,
  DropdownMenuPopup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../src/components/ui/dropdown-menu.tsx"
import { Toaster, toast } from "../../../../src/components/ui/toast.tsx"
import { CodeBlock, ExampleBlock, PageIntro, Showcase, VariantRow } from "../../sink/showcase.tsx"

export default function DropdownMenuPage() {
  const [muted, setMuted] = useState(false)
  const [sort, setSort] = useState("newest")
  const { confirm, confirmDialog } = useConfirm()

  async function handleDelete() {
    const remove = await confirm({
      title: "Delete this post?",
      description: "The post and its 14 comments are removed for everyone.",
      confirmLabel: "Delete post",
      destructive: true,
    })
    if (remove) toast.info("Post deleted")
  }

  return (
    <div>
      <PageIntro
        title="DropdownMenu"
        description="Action menu on the Base UI Menu: arrow keys navigate, typeahead jumps to items, checkbox and radio items keep the menu open on selection."
        use="The overflow home for secondary actions on posts, sessions and cards. Destructive items pair with ConfirmDialog before anything is deleted; the primary action of a view never hides in a menu."
      />

      <Showcase
        title="Item types"
        hint="Icons, checkbox and radio items, group labels, separators. The destructive item pairs red text with the destructive-soft highlight."
      >
        <VariantRow>
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="secondary" />}>
              Post actions <DotsThreeVertical aria-hidden />
            </DropdownMenuTrigger>
            <DropdownMenuPopup>
              <DropdownMenuItem onClick={() => toast.info("Editing post")}>
                <PencilSimple aria-hidden /> Edit post
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast.success("Link copied")}>
                <LinkSimple aria-hidden /> Copy link
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ShareNetwork aria-hidden /> Share to feed
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked={muted} onCheckedChange={setMuted}>
                <BellSlash aria-hidden /> Mute notifications
              </DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuGroupLabel>Sort comments</DropdownMenuGroupLabel>
                <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
                  <DropdownMenuRadioItem value="newest">Newest first</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="top">Top voted</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive" onClick={handleDelete}>
                <Trash aria-hidden /> Delete post
              </DropdownMenuItem>
            </DropdownMenuPopup>
          </DropdownMenu>
        </VariantRow>
      </Showcase>

      <ExampleBlock
        title="Session card overflow"
        description="Icon-only trigger aligned to the card edge, with a disabled coach-only item and a destructive action."
      >
        <div className="flex max-w-md items-start justify-between rounded-xl border border-border bg-card p-4">
          <div>
            <p className="font-medium text-card-foreground">Fingerboard: max hangs</p>
            <p className="text-sm text-muted-foreground">Thursday, week 3 of 8</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={<Button variant="ghost" size="icon" aria-label="Session menu" />}
            >
              <DotsThreeVertical aria-hidden />
            </DropdownMenuTrigger>
            <DropdownMenuPopup align="end">
              <DropdownMenuItem onClick={() => toast.info("Pick a new day in the calendar")}>
                <CalendarPlus aria-hidden /> Reschedule
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                <ShareNetwork aria-hidden /> Share (coach only)
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                onClick={() => toast.info("Session removed from this week")}
              >
                <Trash aria-hidden /> Remove session
              </DropdownMenuItem>
            </DropdownMenuPopup>
          </DropdownMenu>
        </div>
      </ExampleBlock>

      <CodeBlock
        code={`
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuPopup,
  DropdownMenuItem, DropdownMenuSeparator,
  Button,
} from "@pinchblock/ui"

<DropdownMenu>
  <DropdownMenuTrigger
    render={<Button variant="ghost" size="icon" aria-label="Session menu" />}
  >
    <DotsThreeVertical />
  </DropdownMenuTrigger>
  <DropdownMenuPopup align="end">
    <DropdownMenuItem onClick={reschedule}>
      <CalendarPlus /> Reschedule
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem variant="destructive" onClick={remove}>
      <Trash /> Remove session
    </DropdownMenuItem>
  </DropdownMenuPopup>
</DropdownMenu>
`}
      />

      {confirmDialog}
      <Toaster />
    </div>
  )
}
