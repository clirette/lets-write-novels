import React, { Fragment } from "react"
import Links from "./Links"
import styled from "styled-components"
import "../styles/base.css"

const Background = styled.div`
  height: 100vh;
  width: 100vw;
  background-image: url(${props => props.backgroundImage});
  position: relative;
  &:after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-image: url(${props => props.overlay});
    z-index: -1;
    opacity: 0.5;
  }
`

const Layout = ({ children, backgroundImage, overlay }) => (
  <Fragment>
    <Links />
    <Background backgroundImage={backgroundImage} overlay={overlay}>
      {children}
    </Background>
  </Fragment>
)

export default Layout
