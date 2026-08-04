import { useEffect, useRef, useState } from "react"

import {
  UploadDropzone,
  UploadFileChip,
} from "../../../../src/components/upload-dropzone.tsx"
import { CodeBlock, ExampleBlock, PageIntro, Showcase, VariantRow } from "../../sink/showcase.tsx"
import { img } from "./assets.ts"

interface DemoUpload {
  id: number
  name: string
  previewUrl?: string
  progress: number
}

/** Interactive dropzone with simulated per-file progress. */
function UploadDemo() {
  const [uploads, setUploads] = useState<DemoUpload[]>([])
  const nextId = useRef(1)

  /* Fake per-file progress so the chips have something to show. */
  useEffect(() => {
    if (!uploads.some((u) => u.progress < 100)) return
    const timer = setInterval(() => {
      setUploads((prev) =>
        prev.map((u) =>
          u.progress < 100
            ? { ...u, progress: Math.min(100, u.progress + 6 + Math.random() * 12) }
            : u,
        ),
      )
    }, 200)
    return () => clearInterval(timer)
  }, [uploads])

  return (
    <UploadDropzone
      multiple
      accept="video/*,image/*"
      label="Drop training clips or photos"
      hint="MP4, MOV, JPG or PNG. Uploading itself stays app-side."
      onFiles={(files) => {
        setUploads((prev) => [
          ...prev,
          ...files.map((file) => ({
            id: nextId.current++,
            name: file.name,
            previewUrl: file.type.startsWith("image/")
              ? URL.createObjectURL(file)
              : undefined,
            progress: 0,
          })),
        ])
      }}
    >
      {uploads.map((upload) => (
        <UploadFileChip
          key={upload.id}
          name={upload.name}
          previewUrl={upload.previewUrl}
          progress={upload.progress}
          onRemove={() => {
            if (upload.previewUrl) URL.revokeObjectURL(upload.previewUrl)
            setUploads((prev) => prev.filter((u) => u.id !== upload.id))
          }}
        />
      ))}
    </UploadDropzone>
  )
}

export default function UploadDropzonePage() {
  return (
    <div>
      <PageIntro
        title="UploadDropzone"
        description="Drag-and-drop plus click-to-browse file picking. UI only: it emits File[] via onFiles; uploading, retries and object URL lifecycle stay app-side."
        use="The single pattern for attaching clips and photos anywhere in the product: form checks, chat attachments, profile media. Render per-file state with UploadFileChip children."
      />

      <Showcase title="States" hint="accept limits the picker and drop filter; disabled keeps layout but drops interactivity.">
        <div className="grid gap-4 lg:grid-cols-2">
          <UploadDropzone
            label="Single video only"
            hint="accept=video/*"
            accept="video/*"
            onFiles={() => {}}
          />
          <UploadDropzone
            disabled
            label="Disabled"
            hint="Upgrade your plan to attach clips"
            onFiles={() => {}}
          />
        </div>
      </Showcase>

      <Showcase title="File chips" hint="Progress bar while uploading, image preview when available, error state, remove button.">
        <VariantRow>
          <UploadFileChip name="squat-warmup.mp4" progress={62} onRemove={() => {}} />
          <UploadFileChip
            name="finish-line.jpg"
            previewUrl={img("pb-chip", 96, 96)}
            onRemove={() => {}}
          />
          <UploadFileChip name="race-plan.pdf" error onRemove={() => {}} />
        </VariantRow>
      </Showcase>

      <ExampleBlock
        title="Attach clips to a session"
        description="Drag files in or click to browse. Image files get preview chips; progress here is simulated, real uploads stay app-side via onFiles."
      >
        <div className="max-w-xl">
          <UploadDemo />
        </div>
      </ExampleBlock>

      <CodeBlock
        code={`
import { UploadDropzone, UploadFileChip } from "@pinchblock/ui"

<UploadDropzone
  multiple
  accept="video/*,image/*"
  label="Drop training clips or photos"
  hint="MP4, MOV, JPG or PNG up to 200 MB"
  onFiles={startUploads}
>
  {uploads.map((u) => (
    <UploadFileChip
      key={u.id}
      name={u.name}
      previewUrl={u.previewUrl}
      progress={u.progress}
      onRemove={() => cancel(u.id)}
    />
  ))}
</UploadDropzone>
`}
      />
    </div>
  )
}
