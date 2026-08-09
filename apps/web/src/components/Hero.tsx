import { useEffect, useState } from "react"
import portraitPhoto from "@/assets/my_image.jpeg"

import { site } from "@/lib/site"

const COMMAND = "whoami"
const COMMAND_INTERVAL_MS = 130
const OUTPUT_DELAY_MS = 350
const LABEL_INTERVAL_MS = 40
const BIO_INTERVAL_MS = 12

type Phase = "command" | "name" | "bio" | "done"

// Session-scoped, not persisted forever: replays on a fresh visit (new tab
// / browser restart) but not when navigating between pages within the same
// visit — Home unmounts/remounts on every route change via react-router.
const INTRO_PLAYED_KEY = "hero-intro-played"

function hasPlayedIntro() {
  return (
    typeof window !== "undefined" && false
    // window.sessionStorage.getItem(INTRO_PLAYED_KEY) === "true"
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
  const [phase, setPhase] = useState<Phase>(() =>
    shouldSkipIntro() ? "done" : "command"
  )
  const [typedCommand, setTypedCommand] = useState(() =>
    shouldSkipIntro() ? COMMAND : ""
  )
  const [typedName, setTypedName] = useState(() =>
    shouldSkipIntro() ? site.name : ""
  )
  const [typedBio, setTypedBio] = useState(() =>
    shouldSkipIntro() ? site.bio : ""
  )

  // Runs once on mount: types "whoami" at the prompt, then streams the
  // output the same way a terminal would print it — name/bio typed
  // out in sequence. Anyone who's asked for reduced motion, or who already
  // sat through the intro once this visit, already starts in the finished
  // state via the initializers above.
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

    typeInto(COMMAND, setTypedCommand, COMMAND_INTERVAL_MS, () => {
      track(
        window.setTimeout(() => {
          setPhase("name")
          typeInto(site.name, setTypedName, LABEL_INTERVAL_MS, () => {
            setPhase("bio")
            typeInto(site.bio, setTypedBio, BIO_INTERVAL_MS, () => {
              setPhase("done")
              window.sessionStorage.setItem(INTRO_PLAYED_KEY, "true")
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

  const cursor = <span className="ml-0.5 animate-blink text-primary">▌</span>

  return (
    <section className="space-y-8 sm:space-y-10">
      <div className="flex justify-center">
        <div className="flex w-full max-w-4xl flex-col-reverse items-center gap-10 md:flex-row md:items-center md:justify-between md:gap-16">
          <div className="w-full space-y-4 font-mono md:max-w-md">
            <p className="text-sm">
              <span className="text-muted-foreground">$</span> {typedCommand}
              {phase === "command" && cursor}
            </p>

            {phase !== "command" && (
              <div className="space-y-1">
                <h1 className="font-heading text-xl font-medium text-foreground">
                  {typedName}
                  {phase === "name" && cursor}
                </h1>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {typedBio}
                  {(phase === "bio" || phase === "done") && cursor}
                </p>
              </div>
            )}
          </div>

          <img
            src={portraitPhoto}
            alt={site.name}
            className="size-40 shrink-0 rounded-full bg-muted object-contain object-center ring-1 ring-border md:size-56"
          />
        </div>
      </div>

      <p className="mx-auto max-w-xl text-center text-sm text-muted-foreground">
        {site.tagline}
      </p>
    </section>
  )
}
