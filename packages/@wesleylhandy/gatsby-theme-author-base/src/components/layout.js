import React from "react"
import { Container } from "theme-ui"
import { Global } from "@emotion/core"
import Header from './header'
import Footer from './footer'

const Layout = ({ children, location }) => {

  return (
    <>
      <Global styles={theme => ({
        ".embed-youtube": {
          paddingBottom: `56.25%`,
          width: `100%`,
          maxWidth: 682,
          position: `relative`,
          height: 0,
          margin: `30px auto`,
        },
        ".youtube-player": {
          position: `absolute`,
          width: `100%`,
          height: `100%`,
          top: 0,
          left: 0,
          border: `none`,
        },
        "[class*='wp-image']": {
          margin: `30px auto`,
        }
      })} />
      <Header location={location} />
      <Container>{children}</Container>
      <Footer />
    </>
  )
}
export default Layout