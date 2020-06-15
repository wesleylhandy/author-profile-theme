/** @jsx jsx */
import React from "react"
import { Heading, jsx } from "theme-ui"
import { useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import Navigation from './navigation'

const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      meta: site {
          siteMetadata {
              title
          }
      }
      headerBkg: file(name: {eq: "header-bg"}) {
        childImageSharp {
          fluid(maxWidth: 980) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      headshot: file(name: {eq: "headshot"}, extension: { eq: "png"}) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  const headerBkg = data.headerBkg.childImageSharp.fluid;
  const headshot = data.headshot.childImageSharp.fluid;
  const title = data.meta.siteMetadata.title;
  return (
    <header id="masthead" sx={{position: `relative`}}>
      <div 
        className="header-img-container-outer" 
        sx={{
          position: `relative`, 
          maxWidth: `max`, 
          margin: `0 auto`
        }}
      >
        <div 
          className="header-img-container-inner" 
          sx={{
            position: `relative`, 
            maxWidth: `max`, 
            margin: `0 auto`
          }}
        >
          <Img 
            fluid={headerBkg} 
            alt="A beautiful view of waves crashing on the beach with my pen and paper before me." 
            sx={{maxWidth: `max`, margin: `0 auto`}}
          />
          <Img 
            fluid={headshot} 
            alt="Joan C. Benson" 
            sx={{
              position: 'absolute !important', 
              bottom: 0, 
              right: 0, 
              width: `30%`, 
              zIndex: 1
            }} 
          />
        </div>
        <blockquote 
          sx={{
            position: `absolute`, 
            bottom: 0,
            left: 0,
            width: `100%`, 
            backgroundColor: `secondary`, 
            padding: 4,
            color: `black`, 
            '@media screen and (max-width: 640px)': {
              position: `relative`,
              bottom: `unset`,
              left: `unset`
            }
          }}
        >
          &ldquo;Therefore encourage one another build each other up&hellip;&rdquo;
          <footer><cite>1 Thessalonians 5:11</cite></footer>
        </blockquote>
      </div>
      <Heading>{title}</Heading>
      <Navigation />
    </header>
  )
}
export default Header