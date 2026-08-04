import { CodeBlock, PageIntro, Showcase } from "../../sink/showcase.tsx"

/* Literal classes: Tailwind cannot see dynamically built class names. */
const SIZES: [string, string][] = [
  ["xs", "text-xs"],
  ["sm", "text-sm"],
  ["base", "text-base"],
  ["lg", "text-lg"],
  ["xl", "text-xl"],
  ["2xl", "text-2xl"],
  ["3xl", "text-3xl"],
  ["4xl", "text-4xl"],
]

export default function TypographyPage() {
  return (
    <div>
      <PageIntro
        title="Typography"
        description="One sans family for app and display work, a mono for numbers and code. All sizes multiply by --font-scale at runtime, so the S/M/L text-size knob in the top bar rescales everything below."
        use="App copy stays on text-xs through text-2xl. Display sizes are fluid via clamp() and belong on marketing and hero surfaces only, never in app chrome. The eyebrow utility labels sections in dashboards and marketing alike."
      />

      <Showcase
        title="Type scale"
        hint="Sizes in rem so browser zoom still works; the scale knob multiplies on top."
      >
        <div className="space-y-3">
          {SIZES.map(([name, cls]) => (
            <div key={name} className="flex items-baseline gap-4">
              <span className="w-16 shrink-0 font-mono text-xs text-faint-foreground">
                text-{name}
              </span>
              <span className={`${cls} truncate text-foreground`}>
                Train hard, recover harder
              </span>
            </div>
          ))}
        </div>
      </Showcase>

      <Showcase
        title="Display scale"
        hint="Fluid clamp() sizes for marketing surfaces. Resize the window: they breathe with the viewport."
      >
        <div className="space-y-4">
          <p className="font-display text-display-sm">Coaching that adapts</p>
          <p className="font-display text-display-md">Send your project</p>
          <p className="font-display text-display-lg text-gradient-primary">Pinchblock</p>
        </div>
      </Showcase>

      <Showcase title="Families and labels" hint="Mono keeps tabular data honest; eyebrow is the uppercase section label.">
        <div className="space-y-3">
          <p className="font-sans text-base text-foreground">
            Sans: week 3 of the power endurance block, two sessions left.
          </p>
          <p className="font-mono text-sm text-foreground">mono: 6 x 10s @ 85% BW +12kg</p>
          <p className="eyebrow">Eyebrow: this week</p>
        </div>
      </Showcase>

      <CodeBlock
        code={`
/* Utilities multiply by --font-scale at runtime: */
<h1 className="text-2xl font-semibold text-foreground">Today's session</h1>
<p className="text-sm text-muted-foreground">6 sets, 10s hangs at 85%</p>

/* Fluid display type, marketing surfaces only: */
<h1 className="font-display text-display-lg text-gradient-primary">Pinchblock</h1>

/* Uppercase section label: */
<p className="eyebrow">This week</p>
`}
      />
    </div>
  )
}
