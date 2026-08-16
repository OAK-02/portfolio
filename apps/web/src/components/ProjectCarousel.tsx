import { ArrowLeft, ArrowRight } from "@phosphor-icons/react"
import { useEffect, useRef, useState } from "react"

import { ProjectCard } from "@/components/ProjectCard"
import { prefersReducedMotion } from "@/lib/motion"
import type { Project } from "@/types"

// A plain horizontally-scrollable row of project cards — native swipe/
// trackpad scroll works as-is, and the two arrow buttons step exactly one
// card at a time. No auto-play, nothing moves on its own.
export function ProjectCarousel({ projects }: { projects: Project[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const [hasOverflow, setHasOverflow] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    const track = trackRef.current
    if (!container || !track) {
      return
    }

    const updateScrollState = () => {
      const maxScrollLeft = container.scrollWidth - container.clientWidth
      setHasOverflow(maxScrollLeft > 1)
      setCanScrollPrev(container.scrollLeft > 1)
      setCanScrollNext(container.scrollLeft < maxScrollLeft - 1)
    }

    updateScrollState()
    const resizeObserver = new ResizeObserver(updateScrollState)
    resizeObserver.observe(container)
    resizeObserver.observe(track)
    container.addEventListener("scroll", updateScrollState, { passive: true })

    return () => {
      resizeObserver.disconnect()
      container.removeEventListener("scroll", updateScrollState)
    }
  }, [])

  function scrollByCard(direction: 1 | -1) {
    const container = containerRef.current
    const track = trackRef.current
    if (!container || !track) {
      return
    }

    // Distance between two cards' left edges — width plus gap in one
    // measurement, so it stays correct across breakpoints without
    // duplicating the card-width/gap values from the className below.
    const [first, second] = track.children
    const step =
      first instanceof HTMLElement && second instanceof HTMLElement
        ? second.offsetLeft - first.offsetLeft
        : container.clientWidth

    container.scrollBy({
      left: direction * step,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    })
  }

  return (
    <div className="space-y-3">
      {/* overflow-x-auto clips at its padding edge, and the cards' hover
          ring is a box-shadow painted just outside their own border — with
          no padding here it got clipped on whichever sides sat flush
          against the container's edge. p-1 buys the ring room to render;
          -m-1 cancels the padding back out so the row's outer position
          doesn't shift. */}
      <div
        ref={containerRef}
        className="-m-1 flex [scrollbar-width:none] overflow-x-auto p-1 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        <div ref={trackRef} className="flex gap-8">
          {projects.map((project) => (
            <div
              key={project.title}
              // Capped at 85vw on phones (not a flat w-80) so the card
              // always fits inside even a ~340px-wide viewport with a
              // sliver of the next card peeking in as a scroll affordance,
              // instead of a fixed 320px card overflowing past the edge.
              className="w-[85vw] max-w-80 shrink-0 sm:w-96"
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>

      {hasOverflow && (
        <div className="flex justify-end gap-3">
          <button
            type="button"
            aria-label="Previous project"
            disabled={!canScrollPrev}
            onClick={() => scrollByCard(-1)}
            className="text-muted-foreground transition-colors hover:text-signal disabled:pointer-events-none disabled:opacity-30"
          >
            <ArrowLeft className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Next project"
            disabled={!canScrollNext}
            onClick={() => scrollByCard(1)}
            className="text-muted-foreground transition-colors hover:text-signal disabled:pointer-events-none disabled:opacity-30"
          >
            <ArrowRight className="size-4" />
          </button>
        </div>
      )}
    </div>
  )
}
