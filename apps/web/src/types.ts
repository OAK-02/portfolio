export interface Project {
  title: string
  description: string
  githubUrl: string
  completed: boolean
  tags?: string[]
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
  email: string
  github: string
  linkedin: string
  resumeUrl: string
  skills: string[]
}

export interface Skill {
  name: string
  level: number // 0-100, rough self-rated proficiency
}

export interface SkillGroup {
  category: string
  skills: Skill[]
}
