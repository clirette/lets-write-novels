import React from "react"
import { Link } from "gatsby"

const Links = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/the-friendly-desk">The Desk</Link>
      <Link to="/writing-prompts">Prompts</Link>
      <Link to="/about">About</Link>
      <Link to="/storybuilding-kit">Storybuilding Kit</Link>
    </div>
  )
}

export default Links
