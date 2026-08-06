import { Navigate, useParams } from "react-router-dom"
import ReactMarkdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import remarkGfm from "remark-gfm"

import { getPostContent, getPostMeta } from "@/lib/blogs"

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const meta = slug ? getPostMeta(slug) : undefined
  const content = slug ? getPostContent(slug) : undefined

  if (!meta || !content) {
    return <Navigate to="/blog" replace />
  }

  return (
    <article className="space-y-6">
      <header className="space-y-1">
        <h1 className="font-heading text-2xl font-medium">{meta.title}</h1>
        <p className="text-xs text-muted-foreground">{meta.date}</p>
      </header>
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
        >
          {content}
        </ReactMarkdown>
      </div>
    </article>
  )
}
