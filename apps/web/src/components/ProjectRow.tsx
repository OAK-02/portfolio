import { ArrowSquareOut } from "@phosphor-icons/react"

import { Card } from "@workspace/ui/components/card"
import { cn } from "@workspace/ui/lib/utils"

import {
  DemoButton,
  PLACEHOLDER_IMAGE,
  STATUS_STYLES,
} from "@/components/ProjectCard"
import type { Project } from "@/types"

// The Projects page's one-per-row layout: image on one side, contribution
// bullets on the other, alternating sides down the page. Reuses the small
// grid card's placeholder image / status styling / demo button so the two
// layouts never drift out of sync — only the arrangement differs.
export function ProjectRow({
  project,
  reverse = false,
}: {
  project: Project
  reverse?: boolean
}) {
  const status = STATUS_STYLES[project.status]

  return (
    <Card
      className={cn(
        "relative flex-col gap-0 p-0 ring-0 transition-all hover:bg-muted/40 md:flex-row",
        reverse && "md:flex-row-reverse",
        status.hoverRing
      )}
    >
      {/* Stretched link — see ProjectCard for why this sits below the demo
          button's own stacking context instead of wrapping everything. */}
      <a
        href={project.githubUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open ${project.title} on GitHub`}
        className="absolute inset-0"
      />

      {/* The row's height should come from the text column, not from
          whatever aspect ratio the source screenshot happens to have — a
          tall portrait image would otherwise inflate the whole row (flex
          sizes a row to its tallest item, and a plain `<img>` carries its
          *file's* aspect ratio into that calculation even past
          `aspect-auto`). Taking the img out of flow via `absolute` removes
          it from that sizing math entirely; it then just fills whatever
          height the stretched wrapper ends up with. */}
      <div className="relative aspect-[3/2] w-full shrink-0 overflow-hidden md:aspect-auto md:w-2/5">
        <img
          src={project.image ?? PLACEHOLDER_IMAGE}
          alt={project.image ? project.title : ""}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col justify-center gap-4 p-6 sm:p-8">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-heading text-lg font-medium">
            {project.title}
          </h3>
          <ArrowSquareOut className="size-4 shrink-0 text-muted-foreground" />
        </div>

        <div className="flex items-center gap-2 font-heading text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className={cn("size-1.5 rounded-full", status.dot)} />
            {status.label}
          </span>
          {project.demoUrl && <DemoButton url={project.demoUrl} />}
        </div>

        {project.highlights && project.highlights.length > 0 ? (
          <ul className="list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-muted-foreground marker:text-foreground/40">
            {project.highlights.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>
        )}

        {project.tags && project.tags.length > 0 && (
          <ul className="flex flex-wrap gap-2 font-heading text-xs text-muted-foreground">
            {project.tags.map((tag) => (
              <li key={tag}>#{tag}</li>
            ))}
          </ul>
        )}
      </div>
    </Card>
  )
}
