/** @jsx jsx */
import { Container, useThemeUI, useColorMode, Flex, Button, jsx } from 'theme-ui'
import styled from 'styled-components'
import BackgroundImage from 'gatsby-background-image'
import { useStaticQuery, graphql } from 'gatsby'
import { Global } from '@emotion/core'
import Header from './header'
import Sidebar from '../../../components/sidebar'
import AffiliationsBlock from '../../../components/affiliations'
import Footer from '@wesleylhandy/gatsby-theme-author-base/src/components/footer'
import { FaSun, FaMoon } from 'react-icons/fa'
import AboutWidget from '../../../components/about-widget'

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

const Layout = ({ children, location, hideSidebar }) => {
  const data = useStaticQuery(graphql`
    query {
      themeConfig {
        blogBase
        eventsBase
        booksBase
      }
      bkg: file(name: { eq: "header-bg" }) {
        childImageSharp {
          fluid(maxWidth: 1920) {
            ...GatsbyImageSharpFluid_withWebp_tracedSVG
          }
        }
      }
    }
  `)
  const bkg = data.bkg.childImageSharp.fluid
  const {
    themeConfig: { blogBase, eventsBase, booksBase },
  } = data
  const { theme } = useThemeUI()
  const [colorMode, setColorMode] = useColorMode()
  const isHomePage = location.pathname === `/`
  const hideBooksWidget = location.pathname.includes(booksBase),
    hideEventsWidget = location.pathname.includes(eventsBase),
    hidePostsWidget = location.pathname.includes(blogBase),
    hideAboutWidget = location.pathname.includes(`/about`) || isHomePage
    
  return (
    <Flex
      sx={{
        position: `relative`,
        flexDirection: `column`,
        minHeight: '100vh',
      }}
    >
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
            maxWidth: `100%`,
          },
          ".wp-block-image": {
            maxWidth: `100%`,
            width: `inherit`,
          }
        })}
      />
      <Header location={location} setColorMode={setColorMode} />
      <StyledBackground
        key={colorMode}
        fluid={bkg}
        backgroundColor={theme.colors.primary}
        isDarken={colorMode === `dark`}
      >
        <Container>
          <Flex
            sx={{
              flexDirection: [`column`, `row`],
            }}
          >
            <Flex
              sx={{
                flex: `1 1 auto`,
                position: `relative`,
                mr: [0, 3],
                mt: 3,
                flexDirection: `column`,
                alignItems: `center`,
                justifyContent: `flex-start`,
              }}
            >
              <Flex sx={{ border: `5px solid`, borderColor: `primary`, p: 3, maxWidth: `100%`, width: `100%` }}>
                {children}
              </Flex>
              {isHomePage && <AboutWidget heading="About Me" hide={false} />}
            </Flex>
            {!hideSidebar && (
              <Sidebar
                hideBooksWidget={hideBooksWidget}
                hideEventsWidget={hideEventsWidget}
                hidePostsWidget={hidePostsWidget}
                hideAboutWidget={hideAboutWidget}
              />
            )}
          </Flex>
          <AffiliationsBlock />
        </Container>
      </StyledBackground>
      <Footer />
      <Button
        sx={{
          display: `flex`,
          flexDirection: `row`,
          justifyContent: `center`,
          alignItems: `center`,
          borderRadius: 0,
          cursor: `pointer`,
        }}
        variant={colorMode === `dark` ? `tertiary` : `primary`}
        onClick={() => setColorMode(colorMode === `dark` ? `default` : `dark`)}
        aria-label={
          colorMode === `dark` ? `Click for Light Color Theme` : `Click for Dark Color Theme`
        }
      >
        {colorMode === `dark` ? <FaSun sx={{ mr: 2 }} /> : <FaMoon sx={{ mr: 2 }} />}
        {colorMode === `dark` ? ` Change to Light Color Theme ` : ` Change to Dark Color Theme `}
      </Button>
    </Flex>
  )
}
export default Layout
