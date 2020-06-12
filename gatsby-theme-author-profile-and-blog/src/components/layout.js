/** @jsx jsx */
import React from "react"
import { Heading, Container, jsx } from "theme-ui"
import { useStaticQuery } from "gatsby"
import Img from "gatsby-image"
const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query {
      meta: site {
          siteMetadata {
              title
          }
      }
      headerBkg: file(name: {eq: "header-bg"}) {
        childImageSharp {
          fluid(maxWidth: 1920) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  const img = data.headerBkg.childImageSharp.fluid;
  const title = data.meta.siteMetadata.title;
  return (
    <div>
      <Img fluid={img} alt="Be yourself, everyone else is already taken - Oscar Wilde." style={{maxWidth: 1920, margin: `0 auto`}}/>
      <Heading>{title}</Heading>
      <Container>{children}</Container>
    </div>
  )
}
export default Layout