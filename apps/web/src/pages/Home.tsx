import { Link } from "react-router-dom"

import Hero from "@/components/Hero"
import { ProjectCard } from "@/components/ProjectCard"
import { Skills } from "@/components/Skills"
import projects from "@/data/projects.json"
import type { Project } from "@/types"

export default function Home() {
  return (
    <div className="space-y-6">
      <Hero />
      <section className="space-y-4">
        <div className="flex items-baseline justify-between">
          <h2 className="font-heading text-sm font-medium tracking-wide text-muted-foreground uppercase">
            ./projects
          </h2>
          <Link
            to="/projects"
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            view all
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(projects as Project[]).map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-sm font-medium tracking-wide text-muted-foreground uppercase">
          ./skills
        </h2>
        <Skills />
      </section>
    </div>
  )
}
