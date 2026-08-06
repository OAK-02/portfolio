import { Link } from "react-router-dom"

import { getAllPosts } from "@/lib/blogs"

export default function Blog() {
  const posts = getAllPosts()

  return (
    <section className="space-y-6">
      <h1 className="font-heading text-2xl font-medium">Blog</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              to={`/blog/${post.slug}`}
              className="font-heading text-sm font-medium"
            >
              {post.title}
            </Link>
            <p className="text-xs text-muted-foreground">{post.date}</p>
            <p className="text-muted-foreground">{post.description}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
