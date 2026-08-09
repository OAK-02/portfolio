import { Outlet } from "react-router-dom"
import {
  DownloadSimple,
  EnvelopeSimple,
  GithubLogo,
  LinkedinLogo,
} from "@phosphor-icons/react"

import { Nav } from "@/components/Nav"
import { site } from "@/lib/site"

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="w-full flex-1 px-8 py-10 pb-28 sm:px-16 lg:px-28">
        <Outlet />
      </main>
      <footer className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/80 px-8 py-6 backdrop-blur sm:px-16 lg:px-28">
        <div className="flex justify-center">
          <ul className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground">
            <li>
              <a
                href={site.resumeUrl}
                download
                aria-label="Download resume"
                className="inline-flex items-center gap-1.5 text-xs transition-opacity hover:opacity-70"
              >
                <DownloadSimple className="size-5 text-orange-500" />
                Resume
              </a>
            </li>
            <li>
              <a
                href={site.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="inline-flex transition-opacity hover:opacity-70"
              >
                <GithubLogo className="size-5 text-green-500" />
              </a>
            </li>
            <li>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="inline-flex transition-opacity hover:opacity-70"
              >
                <LinkedinLogo className="size-5 text-blue-500" />
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.email}`}
                aria-label="Email"
                className="inline-flex transition-opacity hover:opacity-70"
              >
                <EnvelopeSimple className="size-5 text-red-500" />
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  )
}
