/** @jsx jsx */
import { jsx, Flex, Link } from 'theme-ui'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

const AffiliationsBlock = () => {
  const data = useStaticQuery(graphql`
    query {
      acfw: file(name: { eq: "acfw-logo" }, extension: { eq: "png" }) {
        childImageSharp {
          fixed(height: 60) {
            ...GatsbyImageSharpFixed_withWebp_tracedSVG
          }
        }
      }
      can: file(name: { eq: "can-logo" }, extension: { eq: "png" }) {
        childImageSharp {
          fixed(height: 60) {
            ...GatsbyImageSharpFixed_withWebp_tracedSVG
          }
        }
      }
      scbwi: file(name: { eq: "scbwi-logo" }, extension: { eq: "png" }) {
        childImageSharp {
          fixed(height: 60) {
            ...GatsbyImageSharpFixed_withWebp_tracedSVG
          }
        }
      }
      awsa: file(name: { eq: "awsa-logo" }, extension: { eq: "jpg" }) {
        childImageSharp {
          fixed(height: 60) {
            ...GatsbyImageSharpFixed_withWebp_tracedSVG
          }
        }
      }
      powerCert: file(name: { eq: "awsa-power" }, extension: { eq: "png" }) {
        childImageSharp {
          fixed(height: 85) {
            ...GatsbyImageSharpFixed_withWebp_tracedSVG
          }
        }
      }
    }
  `)
  const { acfw, scbwi, awsa, can, powerCert } = data
  return (
    <section sx={{ backgroundColor: "transparent", }}>
      <Flex
        sx={{
          position: `relative`,
          border: `5px solid`,
          borderColor: `primary`,
          my: 3,
          alignItems: `center`,
          justifyContent: `space-around`,
          flexWrap: `wrap`,
          backgroundColor: 'affiliations'
        }}
      >
        <Link
          href="https://christianauthorsnetwork.com/"
          aria-label="Link to Christian Authors Network"
          sx={{
            maxHeight: 60,
            my: 3,
            mx: 2,
            flex: `0 0 auto`,
            order: 0,
          }}
        >
          <Img
            fixed={can.childImageSharp.fixed}
            alt="Christian Authors Network"
            sx={{
              maxHeight: 60,
            }}
          />
        </Link>
        <Link
          href="https://www.acfw.com/"
          aria-label="Link to American Christian Fiction Writers"
          sx={{
            maxHeight: 60,
            my: 3,
            mx: 2,
            flex: `0 0 auto`,
            order: 2,
          }}
        >
          <Img
            fixed={acfw.childImageSharp.fixed}
            alt="American Christian Fiction Writers"
            sx={{
              maxHeight: 60,
            }}
          />
        </Link>

        <Link
          href="https://www.scbwi.org/members-public/joan-benson"
          aria-label="Link to Society of Children's Books Writers and Illustrators"
          sx={{
            display: `flex`,
            flexDirection: `row`,
            maxHeight: 60,
            my: 3,
            mx: 2,
            flex: `0 0 auto`,
            order: 1,
            justifyContent: `center`,
            alignItems: `center`,
            textDecoration: `none`,
          }}
        >
          <Img
            fixed={scbwi.childImageSharp.fixed}
            alt="Society of Children's Books Writers and Illustrators"
            sx={{
              maxHeight: 60,
              mr: 2,
            }}
          />

          <p
            sx={{
              fontFamily: `Rubik,sans-serif`,
              color: `#1a1a1a`,
              fontSize: `16px !important`,
              marginBottom: `0 !important`,
              marginBlockStart: 0,
              marginBlockEnd: 0,
              lineHeight: 1,
            }}
          >
            Society of
            <br />
            Children&rsquo;s Book Writers
            <br />
            and Illustrators
          </p>
        </Link>
        <Link
          href="https://awsa.com/?p=6886"
          aria-label="Link to AWSA P.O.W.E.R. Certification"
          sx={{
            maxHeight: 85,
            my: 3,
            mx: 2,
            flex: `0 0 auto`,
            order: 0,
          }}
        >
          <Img
            fixed={powerCert.childImageSharp.fixed}
            alt="AWSA P.O.W.E.R. Certification"
            sx={{
              maxHeight: 85,
            }}
          />
        </Link>
        <Link
          href="https://awsa.com/"
          aria-label="Link to Advanced Writers and Speakers Association"
          sx={{
            maxHeight: 60,
            my: 3,
            mx: 2,
            flex: `0 0 auto`,
            order: 0,
          }}
        >
          <Img
            fixed={awsa.childImageSharp.fixed}
            alt="Advanced Writers and Speakers Association"
            sx={{
              maxHeight: 60,
            }}
          />
        </Link>
      </Flex>
    </section>
  )
}

export default AffiliationsBlock
