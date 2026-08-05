/**
 * Generates demo/src/icon-manifest.json: every Phosphor icon imported
 * anywhere in the library (src/) and the sink (demo/src/), with usage
 * counts. Surfaced on the sink's Foundations > Icons page.
 *
 *   npm run gen           regenerates it (alongside tokens.css)
 *   npm run gen:check     fails when stale (CI guard)
 *
 * Deterministic output (no timestamps) so the check is byte-stable.
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..")
const OUT = join(ROOT, "demo", "src", "icon-manifest.json")

function walk(dir: string, files: string[] = []): string[] {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name.startsWith(".")) continue
    const full = join(dir, entry.name)
    if (entry.isDirectory()) walk(full, files)
    else if (/\.(ts|tsx)$/.test(entry.name)) files.push(full)
  }
  return files
}

const IMPORT_RE = /import\s*(?:type\s*)?\{([^}]+)\}\s*from\s*"@phosphor-icons\/react"/g
const NOT_ICONS = new Set(["IconContext", "Icon", "IconProps", "IconWeight"])

function collect(area: string, dir: string, counts: Map<string, Record<string, number>>) {
  for (const file of walk(dir)) {
    const source = readFileSync(file, "utf8")
    for (const match of source.matchAll(IMPORT_RE)) {
      const names = (match[1] ?? "").split(",")
      for (let raw of names) {
        raw = raw.trim()
        if (!raw) continue
        if (raw.startsWith("type ")) raw = raw.slice(5).trim()
        const name = (raw.split(/\s+as\s+/)[0] ?? "").trim()
        if (!name || NOT_ICONS.has(name)) continue
        const entry = counts.get(name) ?? { library: 0, sink: 0 }
        entry[area] = (entry[area] ?? 0) + 1
        counts.set(name, entry)
      }
    }
  }
}

const counts = new Map<string, Record<string, number>>()
collect("library", join(ROOT, "src"), counts)
collect("sink", join(ROOT, "demo", "src"), counts)

const icons = [...counts.entries()]
  .map(([name, c]) => ({ name, library: c.library ?? 0, sink: c.sink ?? 0 }))
  .sort((a, b) => b.library + b.sink - (a.library + a.sink) || a.name.localeCompare(b.name))

const json = JSON.stringify({ icons }, null, 2) + "\n"

if (process.argv.includes("--check")) {
  let current = ""
  try {
    current = readFileSync(OUT, "utf8")
  } catch {
    /* missing counts as stale */
  }
  if (current !== json) {
    console.error("demo/src/icon-manifest.json is stale. Run: npm run gen")
    process.exit(1)
  }
  console.log(`icon manifest is up to date (${icons.length} icons)`)
} else {
  writeFileSync(OUT, json)
  console.log(`Wrote ${OUT} (${icons.length} icons)`)
}
