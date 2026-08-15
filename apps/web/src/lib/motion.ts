// Shared by Hero (typing intro), Experience (scroll reveal), and
// ProjectCarousel (auto-scroll) — every hand-rolled animation on the site
// checks this before it starts.
export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )
}
