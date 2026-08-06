import { ArrowSquareOut } from "@phosphor-icons/react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { cn } from "@workspace/ui/lib/utils"

import type { Project } from "@/types"

export function ProjectCard({ project }: { project: Project }) {
  const inProgress = !project.completed

  return (
    <a
      href={project.githubUrl}
      target="_blank"
      rel="noreferrer"
      className="block h-full"
    >
      <Card
        className={cn(
          "h-full ring-0 transition-all hover:bg-muted/40",
          inProgress
            ? "hover:ring-2 hover:ring-emerald-500 hover:shadow-[0_0_22px_2px_rgba(16,185,129,0.6)]"
            : "hover:ring-2 hover:ring-white hover:shadow-[0_0_22px_2px_rgba(255,255,255,0.6)]"
        )}
      >
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <CardTitle>{project.title}</CardTitle>
            <ArrowSquareOut className="size-3.5 shrink-0 text-muted-foreground" />
          </div>
          <CardDescription className="flex items-center gap-1.5">
            <span
              className={cn(
                "size-1.5 rounded-full",
                inProgress ? "bg-emerald-500" : "bg-muted-foreground"
              )}
            />
            {inProgress ? "In progress" : "Completed"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>{project.description}</p>
          {project.tags && project.tags.length > 0 && (
            <ul className="flex flex-wrap gap-2 text-muted-foreground">
              {project.tags.map((tag) => (
                <li key={tag}>#{tag}</li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </a>
  )
}
