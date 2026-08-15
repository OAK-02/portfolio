import { ArrowSquareOut, GraduationCap } from "@phosphor-icons/react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { cn } from "@workspace/ui/lib/utils"

import certifications from "@/data/certifications.json"
import type { Certification } from "@/types"

function CertificationCard({
  certification,
}: {
  certification: Certification
}) {
  const hasLink = Boolean(certification.url)

  return (
    <Card
      className={cn(
        "relative gap-3",
        hasLink && "transition-all hover:bg-muted/40 hover:ring-1 hover:ring-signal/50"
      )}
    >
      {/* Stretched link, same pattern as ProjectCard — only added when
          there's actually somewhere to send the click. */}
      {certification.url && (
        <a
          href={certification.url}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${certification.title} credential`}
          className="absolute inset-0"
        />
      )}
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted">
            <GraduationCap className="size-5 text-foreground" />
          </div>
          {hasLink && (
            <ArrowSquareOut className="size-3.5 shrink-0 text-muted-foreground" />
          )}
        </div>
        <CardTitle>{certification.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-0.5">
        <p className="font-heading text-xs text-muted-foreground">
          {certification.issuer}
        </p>
        {certification.date && (
          <p className="font-heading text-xs text-muted-foreground/70">
            {certification.date}
          </p>
        )}
      </CardContent>
    </Card>
  )
}

export function Certifications() {
  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {(certifications as Certification[]).map((certification) => (
        <CertificationCard
          key={certification.title}
          certification={certification}
        />
      ))}
    </div>
  )
}
