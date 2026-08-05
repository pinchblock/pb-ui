import { LockKeyOpen } from "@phosphor-icons/react"
import { useState } from "react"

import { Button, Field, OTPInput } from "@pinchblock/ui"
import { CodeBlock, ExampleBlock, PageIntro, Showcase } from "../../sink/showcase.tsx"

export default function OTPInputPage() {
  const [value, setValue] = useState("")
  const [completed, setCompleted] = useState("")
  const [code, setCode] = useState("")
  const [redeemed, setRedeemed] = useState(false)

  return (
    <div>
      <PageIntro
        title="OTPInput"
        description="Segmented one-time code entry on Base UI OTP Field: per-cell keyboard navigation, paste distribution and one-time-code autofill come free, plus a hidden input so name and autoSubmit work in plain forms."
        use="Use for invite and verification codes, wrapped in a Field for the label and error slot; lg is the phone default. Not for arbitrary short text, that is Input's job."
      />

      <Showcase title="Sizes" hint="md for desktop forms, lg for codes typed on phones.">
        <div className="max-w-sm space-y-4">
          <Field label="Verification code (md)">
            <OTPInput />
          </Field>
          <Field label="Invite code (lg)">
            <OTPInput size="lg" />
          </Field>
        </div>
      </Showcase>

      <Showcase
        title="States"
        hint="A Field error wires data-invalid to every cell; standalone, use the invalid prop. Filled cells strengthen their border."
      >
        <div className="max-w-sm space-y-4">
          <Field label="Expired code" error="That code expired. Ask your coach for a fresh one.">
            <OTPInput defaultValue="815204" />
          </Field>
          <Field label="Standalone invalid">
            <OTPInput invalid defaultValue="000000" />
          </Field>
          <Field label="Disabled">
            <OTPInput disabled defaultValue="42" />
          </Field>
          <Field label="Four digits" hint="length defaults to 6; door PINs can drop to 4.">
            <OTPInput length={4} />
          </Field>
        </div>
      </Showcase>

      <Showcase
        title="Controlled with onComplete"
        hint="Try pasting a 6-digit code anywhere in the row; the primitive distributes it across cells."
      >
        <div className="max-w-sm">
          <Field label="Verification code">
            <OTPInput value={value} onValueChange={setValue} onComplete={setCompleted} />
          </Field>
          <p className="mt-2 text-xs text-muted-foreground">
            value: {value === "" ? "(empty)" : value}
            {completed !== "" && ` · completed with ${completed}`}
          </p>
        </div>
      </Showcase>

      <ExampleBlock
        title="Redeem invite"
        description="Early access is invite-only: a coach shares a 6-digit code and the athlete redeems it, usually on a phone."
      >
        <form
          className="flex max-w-sm flex-col gap-4"
          onSubmit={(event) => {
            event.preventDefault()
            setRedeemed(true)
          }}
        >
          <div>
            <p className="font-medium text-foreground">You are almost in</p>
            <p className="text-sm text-muted-foreground">
              Pinchblock is invite-only while we onboard the first crews. Enter the code from
              your coach to unlock early access.
            </p>
          </div>
          <Field label="Invite code" hint="6 digits, from your coach's invite message.">
            <OTPInput
              size="lg"
              value={code}
              onValueChange={(next) => {
                setCode(next)
                setRedeemed(false)
              }}
            />
          </Field>
          <Button type="submit" size="lg" disabled={code.length < 6}>
            <LockKeyOpen /> Unlock early access
          </Button>
          {redeemed && (
            <p role="status" className="text-sm text-success">
              Code accepted. Welcome to the crew, your first block starts Monday.
            </p>
          )}
        </form>
      </ExampleBlock>

      <CodeBlock
        code={`
import { Field, OTPInput } from "@pinchblock/ui"

<Field label="Invite code" hint="6 digits from your coach.">
  <OTPInput size="lg" onComplete={redeem} />
</Field>

// Inside a <form>: hidden input carries the value under \`name\`,
// and autoSubmit submits the form when the last cell fills.
<OTPInput name="invite" autoSubmit />
`}
      />
    </div>
  )
}
