import { Outlet } from "react-router-dom"
import { EnvelopeSimple, GithubLogo, LinkedinLogo } from "@phosphor-icons/react"

import { MailLink } from "@/components/MailLink"
import { Nav } from "@/components/Nav"
import { site } from "@/lib/site"

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="mx-auto w-full max-w-6xl flex-1 px-8 py-10 pb-20 sm:px-16 lg:px-28">
        <Outlet />
      </main>
      <footer className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/80 px-8 py-3 backdrop-blur sm:px-16 lg:px-28">
        <div className="flex justify-center">
          <ul className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground">
            {/* <li>
              <a
                href={site.resumeUrl}
                download
                aria-label="Download resume"
                className="inline-flex items-center gap-1.5 font-heading text-xs transition-colors hover:text-signal"
              >
                <DownloadSimple className="size-5" />
                Resume
              </a>
            </li> */}
            {/* p-2 -m-2 on each link grows its tap target to a thumb-friendly
                size without shifting the visible icon or the gap between
                them — the padding pads the tappable area, the matching
                negative margin cancels it back out of the layout. */}
            <li>
              <a
                href={site.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="-m-2 inline-flex p-2 transition-colors hover:text-signal"
              >
                <GithubLogo className="size-5" />
              </a>
            </li>
            <li>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="-m-2 inline-flex p-2 transition-colors hover:text-signal"
              >
                <LinkedinLogo className="size-5" />
              </a>
            </li>
            <li>
              <MailLink
                user={site.emailUser}
                domain={site.emailDomain}
                aria-label="Email"
                className="-m-2 inline-flex p-2 transition-colors hover:text-signal"
              >
                <EnvelopeSimple className="size-5" />
              </MailLink>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  )
}
