export type ProjectStatus = "completed" | "in-progress" | "ongoing"

export interface Project {
  title: string
  description: string
  githubUrl: string
  status: ProjectStatus
  tags?: string[]
  image?: string
  demoUrl?: string
  /** Contribution bullets shown on the Projects page. Falls back to `description` when omitted. */
  highlights?: string[]
}

export interface BlogMeta {
  slug: string
  title: string
  date: string
  description: string
}

export interface SiteConfig {
  name: string
  role: string
  bio: string
  tagline: string
  /** Split so the address never appears as one literal "x@y.z" string in
   *  source/the built bundle — see MailLink. */
  emailUser: string
  emailDomain: string
  github: string
  linkedin: string
  resumeUrl: string
  skills: string[]
}

export interface SkillSubgroup {
  label: string
  skills: string[]
}

export interface SkillGroup {
  /** Slug used to key the card's icon — see ICONS in Skills.tsx. */
  category: string
  title: string
  description?: string
  /** True for the depth areas (ML/DL, Backend) that get top billing. */
  specialized?: boolean
  /** Either a flat list, or `subgroups` for a card split into labeled sections — never both. */
  skills?: string[]
  subgroups?: SkillSubgroup[]
}

export interface Certification {
  title: string
  issuer: string
  /** e.g. "2024". Omit if not worth surfacing. */
  date?: string
  /** Link to the credential/verification page, if there is one. */
  url?: string
}

export interface Experience {
  company: string
  role: string
  /** e.g. "Jun 2025 – Aug 2025". Include "Present" to mark it as current. */
  period?: string
  /** e.g. "San Francisco, CA" or "Remote". */
  location?: string
  bullets: string[]
}
