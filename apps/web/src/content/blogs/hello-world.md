---
title: Hello, world
date: 2026-08-06
description: Kicking off this blog and explaining how it's built.
---

# Hello, world

This is the first post on this blog. It's rendered from a local Markdown file at build time — no CMS, no database, just files checked into the repo.

## Why a static blog?

The rest of this site is a static bundle deployed to Cloudflare Pages, so the blog follows the same philosophy: write a Markdown file with a frontmatter block up top, drop it in `src/content/blogs/`, and ship it — no separate metadata file to update.

```ts
const philosophy = "keep it simple"
```

More posts will show up here as I write about what I'm building and learning.
