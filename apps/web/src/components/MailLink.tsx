import { useState, type ReactNode } from "react"

// A mailto link that keeps the actual address out of the static
// markup/JS bundle text — `user` and `domain` are only ever joined inside
// event handlers, never as one literal "x@y.z" string anywhere in source.
// That's enough to stop the two common ways spam bots harvest addresses:
// regexing raw HTML/JS for an email pattern, and reading a static
// `href="mailto:..."` straight out of the rendered DOM without ever
// interacting with the page.
//
// Real visitors see no difference: hovering or focusing the link (which
// always happens before a click or an Enter keypress) fills in the real
// href, so "copy email address" / "open in new tab" work as normal. The
// onClick fallback covers a bare `.click()` that skips those events.
export function MailLink({
  user,
  domain,
  className,
  "aria-label": ariaLabel,
  children,
}: {
  user: string
  domain: string
  className?: string
  "aria-label"?: string
  children: ReactNode
}) {
  const [href, setHref] = useState<string>()
  const reveal = () => setHref(`mailto:${user}@${domain}`)

  return (
    <a
      href={href ?? "#"}
      className={className}
      aria-label={ariaLabel}
      onMouseEnter={reveal}
      onFocus={reveal}
      onClick={(event) => {
        if (!href) {
          event.preventDefault()
          window.location.href = `mailto:${user}@${domain}`
        }
      }}
    >
      {children}
    </a>
  )
}
