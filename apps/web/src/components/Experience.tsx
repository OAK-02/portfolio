import { useEffect, useRef, useState } from "react"

import { cn } from "@workspace/ui/lib/utils"

import experiences from "@/data/experience.json"
import { prefersReducedMotion } from "@/lib/motion"
import type { Experience as ExperienceEntry } from "@/types"

// "Present" in the period string is the one signal this data gives us that
// a role is current — reuse the site's existing "live" color (the same
// signal green a running/ongoing project gets) instead of a second,
// unrelated accent.
function isCurrent(period: string | undefined) {
  return /present/i.test(period ?? "")
}

// Fades + slides an entry up into place the first time it crosses into the
// viewport, then leaves it alone. Reduced-motion visitors just start in the
// resting state — no observer, nothing to fade.
function useRevealOnScroll<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const [isVisible, setIsVisible] = useState(prefersReducedMotion)

  useEffect(() => {
    const node = ref.current
    if (prefersReducedMotion() || !node) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(node)
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return { ref, isVisible }
}

function ExperienceItem({ entry }: { entry: ExperienceEntry }) {
  const { ref, isVisible } = useRevealOnScroll<HTMLLIElement>()
  const current = isCurrent(entry.period)
  // Location and period are both "when/where" context for the role, so
  // they share the trailing slot — joined so a missing one doesn't leave
  // a stray separator.
  const meta = [entry.location, entry.period].filter(Boolean).join(" · ")

  return (
    <li
      ref={ref}
      className={cn(
        "relative transition-all duration-700 ease-out",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      )}
    >
      {/* Node on the timeline rule, centered on the <ol>'s border-l (which
          sits one `pl-6` to this item's left). A halo of background color
          lets it read as a marker sitting on the line rather than a dot
          floating beside it. */}
      <span
        className={cn(
          "absolute top-1.5 -left-7 size-2 rounded-full ring-4 ring-background",
          current ? "bg-signal" : "bg-muted-foreground/50"
        )}
      />

      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <h3 className="font-heading text-sm font-medium text-foreground">
          {entry.role}
          <span className="font-normal text-muted-foreground">
            {" "}
            · {entry.company}
          </span>
        </h3>
        {meta && (
          <span className="font-heading text-xs text-muted-foreground">
            {meta}
          </span>
        )}
      </div>

      <ul className="mt-2 list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-muted-foreground marker:text-foreground/40">
        {entry.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </li>
  )
}

export function Experience() {
  return (
    <ol className="space-y-8 border-l border-border pl-6">
      {(experiences as ExperienceEntry[]).map((entry) => (
        <ExperienceItem key={entry.company} entry={entry} />
      ))}
    </ol>
  )
}
