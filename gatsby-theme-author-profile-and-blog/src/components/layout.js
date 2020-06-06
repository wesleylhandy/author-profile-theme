import React from "react"
import { Heading, Container } from "theme-ui"
const Layout = ({ heading, children }) => (
  <div>
    <Heading>{heading}</Heading>
    <Container>{children}</Container>
  </div>
)
export default Layout