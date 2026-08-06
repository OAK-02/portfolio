import { useEffect, useState } from "react"
import { Image, TerminalWindow } from "@phosphor-icons/react"
import asciiArt from "@/assets/ascii-art.txt?raw"
import portraitPhoto from "@/assets/my_image.jpeg"

import { site } from "@/lib/site"

// Placeholder ASCII portrait. Swap for something better (or generate one
// from the real photo below) later — this is just wiring the toggle up.
const ASCII_LINES = asciiArt.trimEnd().split("\n")

const COMMAND = "whoami"
const COMMAND_INTERVAL_MS = 130
const OUTPUT_DELAY_MS = 350
const ART_LINE_INTERVAL_MS = 10
const LABEL_INTERVAL_MS = 40
const BIO_INTERVAL_MS = 12

type Phase = "command" | "art" | "name" | "role" | "bio" | "done"

// Session-scoped, not persisted forever: replays on a fresh visit (new tab
// / browser restart) but not when navigating between pages within the same
// visit — Home unmounts/remounts on every route change via react-router.
const INTRO_PLAYED_KEY = "hero-intro-played"

function hasPlayedIntro() {
  return (
    typeof window !== "undefined" &&
    window.sessionStorage.getItem(INTRO_PLAYED_KEY) === "true"
  )
}

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )
}

function shouldSkipIntro() {
  return prefersReducedMotion() || hasPlayedIntro()
}

export default function Hero() {
  const [showPhoto, setShowPhoto] = useState(false)
  const [phase, setPhase] = useState<Phase>(() =>
    shouldSkipIntro() ? "done" : "command"
  )
  const [typedCommand, setTypedCommand] = useState(() =>
    shouldSkipIntro() ? COMMAND : ""
  )
  const [artLineCount, setArtLineCount] = useState(() =>
    shouldSkipIntro() ? ASCII_LINES.length : 0
  )
  const [typedName, setTypedName] = useState(() =>
    shouldSkipIntro() ? site.name : ""
  )
  const [typedRole, setTypedRole] = useState(() =>
    shouldSkipIntro() ? site.role : ""
  )
  const [typedBio, setTypedBio] = useState(() =>
    shouldSkipIntro() ? site.bio : ""
  )

  // Runs once on mount: types "whoami" at the prompt, then streams the
  // output the same way a terminal would print it — the ascii art line by
  // line, then the name/role/bio typed out. Anyone who's asked for reduced
  // motion, or who already sat through the intro once this visit, already
  // starts in the finished state via the initializers above.
  useEffect(() => {
    if (shouldSkipIntro()) {
      return
    }

    const timers: number[] = []
    const track = (id: number) => {
      timers.push(id)
      return id
    }

    function typeInto(
      text: string,
      setter: (value: string) => void,
      intervalMs: number,
      onDone: () => void
    ) {
      let index = 0
      const id = track(
        window.setInterval(() => {
          index += 1
          setter(text.slice(0, index))
          if (index === text.length) {
            window.clearInterval(id)
            onDone()
          }
        }, intervalMs)
      )
    }

    function revealLines(onDone: () => void) {
      let count = 0
      const id = track(
        window.setInterval(() => {
          count += 1
          setArtLineCount(count)
          if (count === ASCII_LINES.length) {
            window.clearInterval(id)
            onDone()
          }
        }, ART_LINE_INTERVAL_MS)
      )
    }

    typeInto(COMMAND, setTypedCommand, COMMAND_INTERVAL_MS, () => {
      track(
        window.setTimeout(() => {
          setPhase("art")
          revealLines(() => {
            setPhase("name")
            typeInto(site.name, setTypedName, LABEL_INTERVAL_MS, () => {
              setPhase("role")
              typeInto(site.role, setTypedRole, LABEL_INTERVAL_MS, () => {
                setPhase("bio")
                typeInto(site.bio, setTypedBio, BIO_INTERVAL_MS, () => {
                  setPhase("done")
                  window.sessionStorage.setItem(INTRO_PLAYED_KEY, "true")
                })
              })
            })
          })
        }, OUTPUT_DELAY_MS)
      )
    })

    return () => {
      timers.forEach((id) => {
        window.clearInterval(id)
        window.clearTimeout(id)
      })
    }
  }, [])

  const cursor = <span className="ml-0.5 animate-pulse text-primary">▌</span>

  return (
    <section className="flex justify-center">
      <div className="w-full max-w-2xl border border-border bg-card">
        <div className="flex items-center gap-1.5 border-b border-border px-3 py-2 text-muted-foreground">
          <TerminalWindow className="size-3.5" />
          <span className="text-xs">guest@portfolio</span>
        </div>

        <div className="space-y-6 p-6 font-mono">
          <p className="text-sm">
            <span className="text-muted-foreground">$</span> {typedCommand}
            {phase === "command" && cursor}
          </p>

          {phase !== "command" && (
            <div className="space-y-4">
              <div className="flex flex-col items-center gap-2">
                {/* Fixed-width by design: 80ch at this font size, so it
                    always matches the ascii art's natural line length. */}
                <div className="flex w-[80ch] items-center justify-center text-[7px] leading-none text-primary">
                  {showPhoto ? (
                    <img
                      src={portraitPhoto}
                      alt={site.name}
                      className="size-110 rounded-full object-cover object-top font-sans ring-1 ring-border"
                    />
                  ) : (
                    <pre className="whitespace-pre">
                      {ASCII_LINES.slice(0, artLineCount).join("\n")}
                    </pre>
                  )}
                </div>
                {phase === "done" && (
                  <button
                    type="button"
                    onClick={() => setShowPhoto((value) => !value)}
                    className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Image className="size-3.5" />
                    {showPhoto ? "--ascii" : "--photo"}
                  </button>
                )}
              </div>

              <div className="space-y-1 text-center">
                <h1 className="font-heading text-xl font-medium text-foreground">
                  {typedName}
                  {phase === "name" && cursor}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {typedRole}
                  {phase === "role" && cursor}
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {typedBio}
                  {phase === "bio" && cursor}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
