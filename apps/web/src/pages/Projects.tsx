import { ProjectCard } from "@/components/ProjectCard"
import projects from "@/data/projects.json"
import type { Project } from "@/types"

export default function Projects() {
  return (
    <section className="space-y-6">
      <h1 className="font-heading text-2xl font-medium">Projects</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {(projects as Project[]).map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  )
}
