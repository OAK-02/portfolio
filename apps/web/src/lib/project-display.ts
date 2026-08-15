import type { ProjectStatus } from "@/types"

// Shared display data for anything rendering a Project — the small grid
// card (ProjectCard) and the Projects page's full-width row (ProjectRow).
// Kept out of either component file so both can import it: mixing a
// component export with plain-data exports in the same file breaks Fast
// Refresh (React can only hot-reload files that export components only).

// Simple "no screenshot yet" placeholder — a framed image glyph on a flat
// muted background. Swap `project.image` in for a real screenshot later
// and it takes over automatically.
export const PLACEHOLDER_IMAGE =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 133'>
      <rect width='400' height='133' fill='#e5e7eb'/>
      <g fill='none' stroke='#9ca3af' stroke-width='6' stroke-linejoin='round' stroke-linecap='round'>
        <rect x='60' y='24' width='280' height='88' rx='4'/>
        <circle cx='124' cy='56' r='10'/>
        <path d='M60 96l60-40 45 32 35-22 100 55'/>
      </g>
    </svg>`
  )

// Status → label / dot color / hover ring. Two tones only: neutral for
// finished work, the site's one accent color for anything still live. That
// keeps status meaningful (done vs. active) without turning the grid into a
// rainbow of unrelated hues. Add a new status here and it's wired up
// everywhere a project card is used.
export const STATUS_STYLES: Record<
  ProjectStatus,
  { label: string; dot: string; hoverRing: string }
> = {
  completed: {
    label: "Completed",
    dot: "bg-muted-foreground",
    hoverRing: "hover:ring-1 hover:ring-foreground/25",
  },
  "in-progress": {
    label: "In progress",
    dot: "bg-signal",
    hoverRing: "hover:ring-1 hover:ring-signal/50",
  },
  ongoing: {
    label: "Ongoing",
    dot: "bg-signal",
    hoverRing: "hover:ring-1 hover:ring-signal/50",
  },
}
