import { NavLink } from "react-router-dom"
import { EnvelopeSimple } from "@phosphor-icons/react"

import { cn } from "@workspace/ui/lib/utils"

import { MailLink } from "@/components/MailLink"
import { site } from "@/lib/site"

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/projects", label: "Projects" },
  // { to: "/blog", label: "Blog" },
]

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      {/* Two equal 1fr side columns keep the link list truly centered
          regardless of the CTA's width — the empty left column mirrors the
          right one instead of the CTA just getting shoved to the edge of a
          flex row. */}
      <nav className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-2 px-8 py-4 sm:gap-4 sm:px-16 lg:px-28">
        {/* min-w-0 lets these side columns actually shrink below their
            content's default min-width — without it a 1fr grid track holds
            out for its content's full intrinsic width, so on a narrow phone
            this column and the contact button fight over space instead of
            yielding it to the (more important) center links. */}
        <span aria-hidden="true" className="min-w-0" />
        <ul className="flex gap-4 font-heading text-sm sm:gap-6">
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
        {/* Icon-only on mobile (with a generous invisible tap area — the
            visible pill is too narrow a target to reliably thumb-tap) so
            the "Contact me" label can't force this row to overflow; the
            full pill returns once there's room for it at `sm:` and up. */}
        <MailLink
          user={site.emailUser}
          domain={site.emailDomain}
          aria-label="Contact me"
          className="ml-auto inline-flex min-w-0 shrink-0 items-center gap-1.5 rounded-full bg-signal p-2 font-heading text-xs font-medium whitespace-nowrap text-signal-foreground transition-colors hover:bg-signal/90 sm:px-3 sm:py-1.5"
        >
          <EnvelopeSimple className="size-3.5" />
          <span className="hidden sm:inline">Contact me</span>
        </MailLink>
      </nav>
    </header>
  )
}
