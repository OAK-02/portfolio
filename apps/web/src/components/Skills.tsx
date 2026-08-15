import { Code, Graph, HardDrives, Stack, Wrench } from "@phosphor-icons/react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { cn } from "@workspace/ui/lib/utils"

import skillGroups from "@/data/skills.json"
import type { SkillGroup, SkillSubgroup } from "@/types"

// One icon per card, keyed off the same category slug the path-style
// sub-labels use inside each card (see SkillCard). Muted by default; the
// two specialized cards recolor it via the `specialized` prop instead of
// hardcoding a second icon set.
const ICONS: Record<string, typeof Graph> = {
  "ai-ml": Graph,
  backend: HardDrives,
  languages: Code,
  frameworks: Stack,
  "dev-tools": Wrench,
}

function SkillChip({ skill }: { skill: string }) {
  return (
    <span className="inline-flex items-center rounded-md border border-border px-2 py-0.5 font-heading text-xs text-foreground/80 transition-colors hover:border-signal/60 hover:text-signal">
      {skill}
    </span>
  )
}

function SkillList({ skills }: { skills: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {skills.map((skill) => (
        <li key={skill}>
          <SkillChip skill={skill} />
        </li>
      ))}
    </ul>
  )
}

// Splits a card's content into labeled sections (e.g. "computer-vision/",
// "nlp/") rather than one flat bag of chips — the ML/DL and Backend cards
// hold enough libraries/concepts that an unsorted list would bury the
// signal. The path-style label reuses the "~/projects", "category/"
// filesystem metaphor already used for the section headers and nav.
function SubgroupList({ subgroups }: { subgroups: SkillSubgroup[] }) {
  return (
    <div className="space-y-3">
      {subgroups.map((sub) => (
        <div key={sub.label} className="space-y-1.5">
          <h4 className="font-heading text-xs text-muted-foreground">
            {sub.label}
            <span className="text-foreground/30">/</span>
          </h4>
          <SkillList skills={sub.skills} />
        </div>
      ))}
    </div>
  )
}

function SkillCard({ group }: { group: SkillGroup }) {
  const Icon = ICONS[group.category] ?? Code

  return (
    <Card className={cn("gap-4", group.specialized && "ring-signal/30")}>
      <CardHeader className="gap-1.5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Icon
              className={cn(
                "size-4",
                group.specialized ? "text-signal" : "text-muted-foreground"
              )}
            />
            <CardTitle>{group.title}</CardTitle>
          </div>
          {group.specialized && (
            <span className="shrink-0 rounded-sm bg-signal/10 px-1.5 py-0.5 font-heading text-xs tracking-wide text-signal uppercase">
              Core focus
            </span>
          )}
        </div>
        {group.description && (
          <CardDescription className="text-sm">
            {group.description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {group.subgroups ? (
          <SubgroupList subgroups={group.subgroups} />
        ) : (
          <SkillList skills={group.skills ?? []} />
        )}
      </CardContent>
    </Card>
  )
}

// The general toolkit (Languages, Frameworks, Dev Tools) sets the scene in
// a compact row, then the specialized cards (Backend, ML/DL) follow full
// width below — room enough for their subgroups to breathe. Positional and
// visual weight (the wider row, the "core focus" tag, the signal ring)
// carries the "what I specialize in" distinction rather than a numeric
// rating.
export function Skills() {
  const groups = skillGroups as SkillGroup[]
  const general = groups.filter((group) => !group.specialized)
  const specialized = groups.filter((group) => group.specialized)

  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-3">
        {general.map((group) => (
          <SkillCard key={group.category} group={group} />
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        {specialized.map((group) => (
          <SkillCard key={group.category} group={group} />
        ))}
      </div>
    </div>
  )
}
