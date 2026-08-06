import blogsMeta from "@/data/blogs.json"
import type { BlogMeta } from "@/types"

// Raw markdown source for every post, keyed by file path. Vite inlines these
// at build time so the whole blog ships as static content.
const postFiles = import.meta.glob("../content/blogs/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>

function slugFromPath(path: string): string {
  return path.split("/").pop()!.replace(/\.md$/, "")
}

const postsBySlug = new Map(
  Object.entries(postFiles).map(([path, content]) => [
    slugFromPath(path),
    content,
  ])
)

export function getAllPosts(): BlogMeta[] {
  return [...(blogsMeta as BlogMeta[])].sort((a, b) =>
    b.date.localeCompare(a.date)
  )
}

export function getPostMeta(slug: string): BlogMeta | undefined {
  return (blogsMeta as BlogMeta[]).find((post) => post.slug === slug)
}

export function getPostContent(slug: string): string | undefined {
  return postsBySlug.get(slug)
}
