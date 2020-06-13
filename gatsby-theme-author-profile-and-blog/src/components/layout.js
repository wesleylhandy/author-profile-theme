import React from "react"
import { Container } from "theme-ui"
import Header from './header'
import Footer from './footer'

const Layout = ({ children }) => {

  return (
    <>
      <Header />
      <Container>{children}</Container>
      <Footer />
    </>
  )
}
export default Layout