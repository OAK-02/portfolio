import { ArrowSquareOut, PlayCircle } from "@phosphor-icons/react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { cn } from "@workspace/ui/lib/utils"

import { PLACEHOLDER_IMAGE, STATUS_STYLES } from "@/lib/project-display"
import type { Project } from "@/types"

// A small green play-circle that expands into a "Watch demo" pill on
// hover/focus. Rendered as its own anchor — kept out of the repo link's
// subtree below so the two links never nest.
//
// Sized via a grid-template-columns 0fr → 1fr reveal rather than a guessed
// fixed width: the second column has no width to grow *to* other than
// exactly its content's own size, so the pill always fits the icon + label
// with no leftover space, however long the label ends up being.
export function DemoButton({ url }: { url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      aria-label="Watch demo"
      className="group/demo relative z-10 inline-grid h-6 shrink-0 grid-cols-[auto_0fr] items-center overflow-hidden rounded-full bg-signal px-1.5 text-signal-foreground transition-[grid-template-columns] duration-300 ease-out hover:grid-cols-[auto_1fr] focus-visible:grid-cols-[auto_1fr]"
    >
      <PlayCircle className="size-3.5 shrink-0" weight="fill" />
      <span className="overflow-hidden">
        <span className="block w-max py-px pl-1.5 text-xs font-medium whitespace-nowrap">
          Watch demo
        </span>
      </span>
    </a>
  )
}

export function ProjectCard({ project }: { project: Project }) {
  const status = STATUS_STYLES[project.status]

  return (
    <Card
      className={cn(
        "relative h-full pt-0 ring-0 transition-all hover:bg-muted/40",
        status.hoverRing
      )}
    >
      {/* "Stretched link": an invisible anchor covering the whole card, so
          the entire card is clickable without wrapping everything in one
          real <a> (which would force the demo link below to nest inside
          it — anchors can't nest). It paints above plain content but
          below the demo button, which opts out via its own `relative
          z-10` stacking so clicks on it reach the button, not this. */}
      <a
        href={project.githubUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open ${project.title} on GitHub`}
        className="absolute inset-0"
      />
      <img
        src={project.image ?? PLACEHOLDER_IMAGE}
        alt={project.image ? project.title : ""}
        className="aspect-[2/1] w-full object-cover"
      />
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle>{project.title}</CardTitle>
          <ArrowSquareOut className="size-3.5 shrink-0 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardDescription className="flex items-center gap-2 px-(--card-spacing) font-heading">
        <span className="flex items-center gap-1.5">
          <span className={cn("size-1.5 rounded-full", status.dot)} />
          {status.label}
        </span>
        {project.demoUrl && <DemoButton url={project.demoUrl} />}
      </CardDescription>
      <CardContent className="space-y-2">
        <p className="text-sm leading-relaxed">{project.description}</p>
        {project.tags && project.tags.length > 0 && (
          <ul className="flex flex-wrap gap-2 font-heading text-muted-foreground">
            {project.tags.map((tag) => (
              <li key={tag}>#{tag}</li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
