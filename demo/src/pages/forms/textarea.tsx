import { useState } from "react"

import { Button } from "../../../../src/components/ui/button.tsx"
import { Field } from "../../../../src/components/ui/field.tsx"
import { Textarea } from "../../../../src/components/ui/textarea.tsx"
import { CodeBlock, ExampleBlock, PageIntro, Showcase } from "../../sink/showcase.tsx"

export default function TextareaPage() {
  const [feedback, setFeedback] = useState("")
  return (
    <div>
      <PageIntro
        title="Textarea"
        description="Multi-line text entry. Rendered through Base UI Field.Control so it participates in Field (label, error wiring) while staying usable standalone. autoGrow uses field-sizing: content where supported, with a JS fallback elsewhere."
        use="Use for notes, bios and feedback. Prefer autoGrow for chat-adjacent and note-taking moments; keep the fixed, drag-resizable default for long-form admin text. Pair maxLength with Field count/max for the counter."
      />

      <Showcase title="Resize behavior" hint="Fixed height scrolls and drags to resize; autoGrow follows content.">
        <div className="max-w-sm space-y-3">
          <Textarea placeholder="Fixed height, drag to resize" aria-label="Fixed height example" />
          <Textarea autoGrow placeholder="Auto-growing: keep typing" aria-label="Auto-grow example" />
          <Textarea disabled placeholder="Disabled" aria-label="Disabled example" />
        </div>
      </Showcase>

      <Showcase
        title="With Field counter"
        hint="maxLength hard-stops the input; Field count/max shows progress and turns destructive past the limit."
      >
        <div className="max-w-sm">
          <Field
            label="Coach bio"
            hint="Shown on your public profile."
            count={feedback.length}
            max={160}
          >
            <Textarea
              autoGrow
              maxLength={160}
              value={feedback}
              onChange={(event) => setFeedback(event.target.value)}
              placeholder="Coaching finger strength since 2019."
            />
          </Field>
        </div>
      </Showcase>

      <ExampleBlock
        title="Session review"
        description="A coach leaves feedback on a logged session; autoGrow keeps the card compact until there is something to say."
      >
        <div className="max-w-md space-y-4 rounded-xl border border-border bg-card p-4">
          <div>
            <p className="text-sm font-semibold text-card-foreground">Riko: Tuesday limit bouldering</p>
            <p className="text-xs text-muted-foreground">
              Effort 8/10. Sent the red overhang project on attempt 3.
            </p>
          </div>
          <Field label="Feedback" hint="Riko sees this in the session recap.">
            <Textarea autoGrow placeholder="Strong session. Next week we add a fourth limit problem." />
          </Field>
          <Button size="sm">Send feedback</Button>
        </div>
      </ExampleBlock>

      <CodeBlock
        code={`
import { Field, Textarea } from "@pinchblock/ui"

const [bio, setBio] = useState("")

<Field label="Coach bio" count={bio.length} max={160}>
  <Textarea
    autoGrow
    maxLength={160}
    value={bio}
    onChange={(e) => setBio(e.target.value)}
  />
</Field>
`}
      />
    </div>
  )
}
