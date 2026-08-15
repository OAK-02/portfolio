import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <section className="space-y-4">
      <h1 className="font-heading text-2xl font-medium">404</h1>
      <p className="text-muted-foreground">
        This page doesn't exist.{" "}
        <Link to="/" className="text-signal underline underline-offset-2">
          Go home
        </Link>
        .
      </p>
    </section>
  )
}
