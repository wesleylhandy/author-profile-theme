/** @jsx jsx */
import React from 'react'
import { Container, useThemeUI, useColorMode, Flex, jsx } from 'theme-ui'
import styled from 'styled-components'
import BackgroundImage from 'gatsby-background-image'
import { useStaticQuery, graphql } from 'gatsby'
import { Global } from '@emotion/core'
import Header from './header'
import Footer from 'gatsby-theme-author-base/src/components/footer'

const StyledBackground = styled(BackgroundImage)`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  flex: 1 1 auto;
  padding: 30px 0;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  &::before,
  &::after {
    background-attachment: fixed;
    filter: invert(
      ${({ isDarken }) => {
        return isDarken ? '80%' : '0%'
      }}
    );
  }
`

const Layout = ({ children, location }) => {
  const data = useStaticQuery(graphql`
    query {
      bkg: file(name: { eq: "header-bg" }) {
        childImageSharp {
          fluid(maxWidth: 1920) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      headshot: file(name: { eq: "headshot" }, extension: { eq: "png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  const bkg = data.bkg.childImageSharp.fluid
  const { theme } = useThemeUI()
  const [colorMode, setColorMode] = useColorMode()
  return (
    <Flex sx={{
        flexDirection: `column`,
        minHeight: '100vh',
    }}>
      <Global
        styles={(theme) => ({
          '.embed-youtube': {
            paddingBottom: `56.25%`,
            width: `100%`,
            maxWidth: 682,
            position: `relative`,
            height: 0,
            margin: `30px auto`,
          },
          '.youtube-player': {
            position: `absolute`,
            width: `100%`,
            height: `100%`,
            top: 0,
            left: 0,
            border: `none`,
          },
          "[class*='wp-image']": {
            margin: `30px auto`,
          },
        })}
      />
      <Header location={location} setColorMode={setColorMode} />
      <StyledBackground
        key={colorMode}
        fluid={bkg}
        backgroundColor={theme.colors.primary}
        isDarken={colorMode === `dark`}
      >
        <Container>{children}</Container>
      </StyledBackground>
      <Footer />
    </Flex>
  )
}
export default Layout
