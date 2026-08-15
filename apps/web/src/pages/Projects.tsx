import { ProjectRow } from "@/components/ProjectRow"
import projects from "@/data/projects.json"
import type { Project } from "@/types"

export default function Projects() {
  return (
    <section className="space-y-6">
      <h1 className="font-heading text-2xl font-medium">Projects</h1>
      {/* Negative margins cancel the page's own side padding (set on
          Layout's <main>) so the cards stretch out to its full max-w-6xl
          bound instead of sitting inset within it — bounded by that
          container, so this can't overflow the viewport. */}
      <div className="flex flex-col gap-8 -mx-8 sm:-mx-16 lg:-mx-28">
        {(projects as Project[]).map((project, index) => (
          <ProjectRow
            key={project.title}
            project={project}
            reverse={index % 2 === 1}
          />
        ))}
      </div>
    </section>
  )
}
