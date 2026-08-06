import { Progress } from "@workspace/ui/components/progress"

import skillGroups from "@/data/skills.json"
import type { SkillGroup } from "@/types"

export function Skills() {
  return (
    <div className="space-y-6">
      {(skillGroups as SkillGroup[]).map((group) => (
        <div key={group.category} className="space-y-3">
          <h3 className="font-heading text-xs font-medium tracking-wide text-muted-foreground uppercase">
            {group.category}
          </h3>
          <ul className="space-y-2.5">
            {group.skills.map((skill) => (
              <li
                key={skill.name}
                className="grid grid-cols-[6rem_1fr_2.5rem] items-center gap-3 sm:grid-cols-[9rem_1fr_2.5rem]"
              >
                <span className="truncate text-xs">{skill.name}</span>
                <Progress value={skill.level} />
                <span className="text-right text-xs text-muted-foreground">
                  {skill.level}%
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
