export interface ParsedMarkdown {
  data: Record<string, string>
  content: string
}

// Minimal YAML-frontmatter parser: only handles the flat `key: value` shape
// blog posts need (title/date/description as plain strings) — no lists,
// nesting, or multi-line values. That's the whole of what a personal
// blog's frontmatter needs, and staying this small means no dependency
// (gray-matter and friends drag in a full YAML parser) and nothing to
// polyfill for the browser.
export function parseFrontmatter(raw: string): ParsedMarkdown {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw)
  if (!match) {
    return { data: {}, content: raw }
  }

  const [, frontmatter, content] = match
  const data: Record<string, string> = {}

  for (const line of frontmatter.split("\n")) {
    const separatorIndex = line.indexOf(":")
    if (separatorIndex === -1) continue

    const key = line.slice(0, separatorIndex).trim()
    let value = line.slice(separatorIndex + 1).trim()

    // Strip one layer of matching quotes, if the value was quoted.
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }

    data[key] = value
  }

  return { data, content: content.trim() }
}
