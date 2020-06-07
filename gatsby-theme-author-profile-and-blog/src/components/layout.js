import React from "react"
import { Heading, Container } from "theme-ui"
import { useStaticQuery } from "gatsby"
import Img from "gatsby-image"
const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query {
      headerBkg: file(name: {eq: "header-bg"}) {
        childImageSharp {
          fluid(maxWidth: 1140) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  const img = data.headerBkg.childImageSharp.fluid;
  return (
    <div>
      <Img fluid={img} alt="A beautiful view of waves crashing on the beach with my pen and paper before me." style={{maxWidth: 1140, margin: `0 auto`}}/>
      <Heading>Joan C. Benson, Author and Speaker</Heading>
      <Container>{children}</Container>
    </div>
  )
}
export default Layout