import { parseFrontmatter } from "@/lib/frontmatter"
import type { BlogMeta } from "@/types"

// Raw markdown source for every post, keyed by file path. Vite inlines these
// at build time so the whole blog ships as static content. Each file is the
// single source of truth for that post — frontmatter carries the metadata,
// the rest of the file is the body — so writing a post is just adding one
// .md file here, no separate JSON entry to keep in sync.
const postFiles = import.meta.glob("../content/blogs/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>

function slugFromPath(path: string): string {
  return path.split("/").pop()!.replace(/\.md$/, "")
}

interface Post {
  meta: BlogMeta
  content: string
}

const REQUIRED_FIELDS = ["title", "date", "description"] as const

const posts = new Map<string, Post>(
  Object.entries(postFiles).flatMap(([path, raw]) => {
    const slug = slugFromPath(path)
    const { data, content } = parseFrontmatter(raw)

    const missing = REQUIRED_FIELDS.filter((field) => !data[field])
    if (missing.length > 0) {
      // Skip and warn rather than crash the whole blog over one bad file —
      // this runs at module load, so throwing here would take the entire
      // site down for every visitor, not just fail one post.
      console.error(
        `Skipping blog post "${path}": missing frontmatter field(s) ${missing.join(", ")}.`
      )
      return []
    }

    const meta: BlogMeta = {
      slug,
      title: data.title,
      date: data.date,
      description: data.description,
    }

    return [[slug, { meta, content }] as const]
  })
)

export function getAllPosts(): BlogMeta[] {
  return [...posts.values()]
    .map((post) => post.meta)
    .sort((a, b) => b.date.localeCompare(a.date))
}

export function getPostMeta(slug: string): BlogMeta | undefined {
  return posts.get(slug)?.meta
}

export function getPostContent(slug: string): string | undefined {
  return posts.get(slug)?.content
}
