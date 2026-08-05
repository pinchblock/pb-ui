import { Microphone, VideoCamera } from "@phosphor-icons/react"
import { useEffect, useState, type ReactNode } from "react"

import {
  Avatar,
  Button,
  CallCameraToggle,
  CallControls,
  CallEndButton,
  CallFlipCameraButton,
  CallMicToggle,
  CallQualityIndicator,
  CallStage,
  IncomingCallBanner,
  PreCallDeviceRow,
  PreCallPanel,
  Skeleton,
  type CallQualityLevel,
} from "@pinchblock/ui"
import { CodeBlock, ExampleBlock, PageIntro, Showcase, VariantRow } from "../../sink/showcase.tsx"

/** Stage-token canvas for specimens (CallStage brings its own). */
function StageCanvas({ children }: { children: ReactNode }) {
  return (
    <div className="stage flex flex-wrap items-center justify-center gap-6 rounded-xl bg-background p-6">
      {children}
    </div>
  )
}

function FakeTile({ name, caption }: { name: string; caption: string }) {
  return (
    <div className="flex h-20 w-28 flex-col items-center justify-center gap-1 rounded-lg border border-border bg-card">
      <Avatar name={name} size="sm" />
      <span className="text-xs text-muted-foreground">{caption}</span>
    </div>
  )
}

/** Full CallStage with live toggles and a ticking duration. */
function CallStageDemo() {
  const [micMuted, setMicMuted] = useState(false)
  const [cameraOff, setCameraOff] = useState(false)
  const [seconds, setSeconds] = useState(754)

  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, [])
  const duration = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`

  return (
    <div className="h-96 overflow-hidden rounded-xl">
      <CallStage
        title="Coaching call with Maria"
        duration={duration}
        quality={3}
        tiles={[
          <FakeTile key="you" name="Jaak Parik" caption="You" />,
          <FakeTile key="maria" name="Maria Kask" caption="Maria" />,
        ]}
        controls={
          <CallControls>
            <CallMicToggle muted={micMuted} onClick={() => setMicMuted((v) => !v)} />
            <CallCameraToggle off={cameraOff} onClick={() => setCameraOff((v) => !v)} />
            <CallFlipCameraButton onClick={() => {}} />
            <CallEndButton onClick={() => {}} />
          </CallControls>
        }
      >
        {/* Main media slot: the app renders the remote video here. */}
        <div className="flex size-full items-center justify-center bg-background-sunken">
          <div className="flex flex-col items-center gap-3">
            <Avatar name="Maria Kask" size="2xl" />
            <span className="text-sm text-muted-foreground">Connecting camera</span>
          </div>
        </div>
      </CallStage>
    </div>
  )
}

/** Banner over a fake feed; ring again to re-trigger the alert. */
function IncomingDemo() {
  const [ringing, setRinging] = useState(true)
  return (
    <div className="relative h-72 overflow-hidden rounded-xl border border-border bg-background p-4">
      <div aria-hidden className="flex flex-col gap-5">
        {[0, 1, 2].map((row) => (
          <div key={row} className="flex items-center gap-3">
            <Skeleton className="size-9 rounded-full" />
            <div className="flex flex-1 flex-col gap-2">
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-3 w-3/4" />
            </div>
          </div>
        ))}
      </div>
      {ringing ? (
        <div className="absolute inset-x-4 top-4 flex justify-center">
          <IncomingCallBanner
            avatar={<Avatar name="Maria Kask" size="lg" />}
            name="Maria Kask"
            description="Incoming video call"
            onAccept={() => setRinging(false)}
            onDecline={() => setRinging(false)}
          />
        </div>
      ) : (
        <div className="absolute inset-x-0 bottom-4 flex justify-center">
          <Button variant="secondary" onClick={() => setRinging(true)}>
            Ring again
          </Button>
        </div>
      )}
    </div>
  )
}

export default function CallKitPage() {
  const [micMuted, setMicMuted] = useState(true)
  const [cameraOff, setCameraOff] = useState(false)
  const [joining, setJoining] = useState(false)

  return (
    <div>
      <PageIntro
        title="Call kit"
        description="Presentational shells for live coaching calls: CallStage, CallControls, PreCallPanel and IncomingCallBanner. No LiveKit in this library; pb-app's call provider owns the state and passes props and slots."
        use="CallStage, CallControls and PreCallPanel render on stage tokens (always dark, identical in every theme). IncomingCallBanner is the one call surface that floats over the normal app theme."
      />

      <Showcase
        title="Control cluster"
        hint="Toggles flip to destructive-soft when muted/off (data-active + aria-pressed). End call is the prominent destructive pill."
      >
        <StageCanvas>
          <CallControls>
            <CallMicToggle muted={micMuted} onClick={() => setMicMuted((v) => !v)} />
            <CallCameraToggle off={cameraOff} onClick={() => setCameraOff((v) => !v)} />
            <CallFlipCameraButton onClick={() => {}} />
            <CallEndButton onClick={() => {}} />
          </CallControls>
        </StageCanvas>
      </Showcase>

      <Showcase title="Control states" hint="Loading locks the control and swaps the icon for a spinner; sizes sm/md/lg.">
        <StageCanvas>
          <CallMicToggle muted loading />
          <CallCameraToggle off={false} disabled />
          <CallFlipCameraButton size="sm" />
          <CallMicToggle muted={false} size="lg" />
          <CallEndButton size="sm" />
        </StageCanvas>
      </Showcase>

      <Showcase title="Connection quality" hint="0 lost to 3 good; red/amber/green are fixed status semantics.">
        <StageCanvas>
          {([0, 1, 2, 3] as CallQualityLevel[]).map((level) => (
            <span key={level} className="flex items-center gap-2 text-xs text-muted-foreground">
              <CallQualityIndicator quality={level} /> {level}
            </span>
          ))}
        </StageCanvas>
      </Showcase>

      <Showcase
        title="Pre-call check"
        hint="Camera preview slot plus device readiness rows; the app resolves the checks and flips row status."
      >
        <VariantRow>
          <div className="mx-auto w-full max-w-sm">
            <PreCallPanel
              description="Maria is waiting in the session room."
              joining={joining}
              onJoin={() => {
                setJoining(true)
                setTimeout(() => setJoining(false), 1500)
              }}
              onCancel={() => {}}
            >
              <PreCallDeviceRow
                icon={<Microphone />}
                label="Microphone"
                detail="MacBook Pro Microphone"
                status="ready"
              />
              <PreCallDeviceRow
                icon={<VideoCamera />}
                label="Camera"
                detail="FaceTime HD Camera"
                status="checking"
              />
            </PreCallPanel>
          </div>
        </VariantRow>
      </Showcase>

      <ExampleBlock
        title="Live call stage"
        description="Full-surface stage: media slot behind, status bar with ticking duration and quality, tile strip and controls on scrims. Mute and camera toggles are live."
      >
        <CallStageDemo />
      </ExampleBlock>

      <ExampleBlock
        title="Incoming call over the app"
        description="The banner mounts as an assertive alert above the normal app theme. Accept is success, decline is destructive."
      >
        <IncomingDemo />
      </ExampleBlock>

      <CodeBlock
        code={`
import {
  CallCameraToggle, CallControls, CallEndButton,
  CallFlipCameraButton, CallMicToggle, CallStage,
} from "@pinchblock/ui"

// pb-app's call provider owns the state; the kit only renders it.
<CallStage
  title="Coaching call with Maria"
  duration={formatElapsed(elapsed)}
  quality={connectionQuality} // 0-3
  tiles={participants.map((p) => (
    <ParticipantTile key={p.id} participant={p} />
  ))}
  controls={
    <CallControls>
      <CallMicToggle muted={micMuted} onClick={toggleMic} />
      <CallCameraToggle off={cameraOff} onClick={toggleCamera} />
      <CallFlipCameraButton onClick={flipCamera} />
      <CallEndButton onClick={endCall} />
    </CallControls>
  }
>
  <RemoteVideo track={remoteTrack} />
</CallStage>
`}
      />
    </div>
  )
}
