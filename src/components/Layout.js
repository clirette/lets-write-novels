import React, { Fragment } from "react"
import Links from "./Links"
import styled from "styled-components"
import "../styles/base.css"
import "bootstrap/dist/css/bootstrap.min.css"

const Background = styled.div`
  height: 100vh;
  width: 100vw;
  background-image: url(${props => props.backgroundImage});
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
`

const Layout = ({
  children,
  backgroundImage,
  overlay,
  overlayOpacity,
  darkOverlay,
}) => (
  <Fragment>
    <Links />
    <Background
      backgroundImage={backgroundImage}
      overlay={overlay}
      overlayOpacity={overlayOpacity}
      darkOverlay={darkOverlay}
    >
      {children}
    </Background>
  </Fragment>
)

export default Layout
