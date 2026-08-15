import { NavLink } from "react-router-dom"
import { EnvelopeSimple } from "@phosphor-icons/react"

import { cn } from "@workspace/ui/lib/utils"

import { MailLink } from "@/components/MailLink"
import { site } from "@/lib/site"

// Path-style labels echo the "./projects", "./experience" section headers
// used elsewhere on the site, so the nav reads as part of the same
// filesystem metaphor rather than a generic link bar.
const links = [
  { to: "/", label: "~", end: true },
  { to: "/projects", label: "~/projects" },
  // { to: "/blog", label: "~/blog" },
]

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      {/* Two equal 1fr side columns keep the link list truly centered
          regardless of the CTA's width — the empty left column mirrors the
          right one instead of the CTA just getting shoved to the edge of a
          flex row. */}
      <nav className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-4 px-8 py-4 sm:px-16 lg:px-28">
        <span aria-hidden="true" />
        <ul className="flex gap-6 font-heading text-sm">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  cn(
                    "border-b border-transparent pb-0.5 text-muted-foreground transition-colors hover:text-foreground",
                    isActive && "border-signal text-signal"
                  )
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <MailLink
          user={site.emailUser}
          domain={site.emailDomain}
          className="ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-full bg-signal px-3 py-1.5 font-heading text-xs font-medium whitespace-nowrap text-signal-foreground transition-colors hover:bg-signal/90"
        >
          <EnvelopeSimple className="size-3.5" />
          Contact me
        </MailLink>
      </nav>
    </header>
  )
}
