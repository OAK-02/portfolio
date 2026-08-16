import { Link } from "react-router-dom"

import { Certifications } from "@/components/Certifications"
import { Experience } from "@/components/Experience"
import Hero from "@/components/Hero"
import { ProjectCarousel } from "@/components/ProjectCarousel"
import { Skills } from "@/components/Skills"
import projects from "@/data/projects.json"
import type { Project } from "@/types"

export default function Home() {
  return (
    <div className="space-y-16">
      <Hero />

      <section className="space-y-4">
        <h2 className="font-heading text-sm font-medium tracking-wide text-muted-foreground uppercase">
          ./skills
        </h2>
        <Skills />
      </section>

      <section className="space-y-4">
        <div className="flex items-baseline justify-between">
          <h2 className="font-heading text-sm font-medium tracking-wide text-muted-foreground uppercase">
            ./projects
          </h2>
          <Link
            to="/projects"
            className="font-heading text-xs text-muted-foreground transition-colors hover:text-signal"
          >
            view all
          </Link>
        </div>
        <ProjectCarousel projects={projects as Project[]} />
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-sm font-medium tracking-wide text-muted-foreground uppercase">
          ./experience
        </h2>
        <Experience />
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-sm font-medium tracking-wide text-muted-foreground uppercase">
          ./certifications
        </h2>
        <Certifications />
      </section>
    </div>
  )
}
