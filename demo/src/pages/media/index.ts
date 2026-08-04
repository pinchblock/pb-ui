import type { SinkGroup } from "../types.ts"

/* One line per page; append in place. */
export const group: SinkGroup = {
  slug: "media",
  label: "Media & Motion",
  pages: [
    { id: "media-frame", label: "MediaFrame", description: "Aspect-ratio media container owning pending, processing and error states.", load: () => import("./media-frame.tsx") },
    { id: "video-player", label: "VideoPlayer", description: "Token-skinned player: full control bar, muted demo loops, error with retry.", load: () => import("./video-player.tsx") },
    { id: "upload-dropzone", label: "UploadDropzone", description: "Drag-and-drop file picking with per-file progress chips; uploads stay app-side.", load: () => import("./upload-dropzone.tsx") },
    { id: "chat", label: "Chat", description: "The conversational kit: ChatBubble, DateDivider, ChatComposer, TypingIndicator.", load: () => import("./chat.tsx") },
    { id: "motion", label: "Motion presets", description: "Token-derived Motion vocabulary: Reveal, springPop, staggerChildren, fadeInUp.", load: () => import("./motion.tsx") },
  ],
}
