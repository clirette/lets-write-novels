import React, { Fragment } from "react"
import Links from "./Links"

const Layout = ({ children }) => {
  return (
    <Fragment>
      <Links />
      {children}
    </Fragment>
  )
}

export default Layout
