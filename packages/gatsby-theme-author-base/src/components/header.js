/** @jsx jsx */
import { Heading, jsx } from "theme-ui"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import Navigation from "./navigation"

const Header = ({location}) => {
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
                        ...GatsbyImageSharpFluid_withWebp_tracedSVG
                    }
                }
            }
        }
    `)
    const img = data.headerBkg.childImageSharp.fluid;
    const title = data.meta.siteMetadata.title;

    return (
        <header id="masthead">
            <Heading>{title}</Heading>
            <Navigation />
            { location.pathname === "/" && <Img fluid={img} alt="Be yourself, everyone else is already taken - Oscar Wilde." sx={{maxWidth: 1920, margin: `0 auto`}}/> }
        </header>   
    )
}

export default Header