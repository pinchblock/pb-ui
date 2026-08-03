import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    // The library is a file:.. symlink; without dedupe Vite would bundle
    // two copies of context-holding packages and hooks/contexts break.
    dedupe: [
      "react",
      "react-dom",
      "lucide-react",
      "recharts",
      "motion",
      "@base-ui/react",
      "media-chrome",
      "@number-flow/react",
    ],
  },
  server: {
    fs: {
      allow: [".."],
    },
  },
})
