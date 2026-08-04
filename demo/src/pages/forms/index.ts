import type { SinkGroup } from "../types.ts"

/* Pages are added by the sink v2 migration; one line per page. */
export const group: SinkGroup = {
  slug: "forms",
  label: "Forms",
  pages: [
    { id: "field", label: "Field", description: "THE form-row molecule: label, hint, error, counter. Covers Label.", load: () => import("./field.tsx") },
    { id: "input", label: "Input", description: "Single-line text primitive: sizes, adornments, invalid, native types.", load: () => import("./input.tsx") },
    { id: "textarea", label: "Textarea", description: "Multi-line entry with autoGrow and Field character counter.", load: () => import("./textarea.tsx") },
    { id: "select", label: "Select", description: "Dropdown family: SimpleSelect for flat options, compound parts for groups.", load: () => import("./select.tsx") },
    { id: "checkbox", label: "Checkbox", description: "Yes/no and checklist control with indeterminate parent rows.", load: () => import("./checkbox.tsx") },
    { id: "switch", label: "Switch", description: "Instant on/off setting toggle, md and sm.", load: () => import("./switch.tsx") },
    { id: "radio", label: "Radio", description: "One choice family: RadioGroup with Radio dots and card-styled RadioCard.", load: () => import("./radio.tsx") },
    { id: "slider", label: "Slider", description: "Bounded scale control: effort 1-10 and range values.", load: () => import("./slider.tsx") },
    { id: "segmented-control", label: "SegmentedControl", description: "Single-select segment bar for 2-5 always-visible modes.", load: () => import("./segmented-control.tsx") },
    { id: "search-input", label: "SearchInput", description: "Query input with search icon, clear button and debounced change.", load: () => import("./search-input.tsx") },
    { id: "filter-chip", label: "FilterChip", description: "Pressable filter chips with counts; ChipGroup for single/multi select.", load: () => import("./filter-chip.tsx") },
    { id: "example-log-session", label: "Example: Log session", description: "Composed logging moment: Slider, SegmentedControl, Field, Textarea.", load: () => import("./example-log-session.tsx") },
  ],
}
