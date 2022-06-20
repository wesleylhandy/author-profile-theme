/** @jsx jsx */
import Layout from '../components/layout/layout'
import Seo from '../components/head/seo'
import { Box, jsx, Link as ExternalLink } from 'theme-ui'
import Img from 'gatsby-image'
import { useStaticQuery, graphql, Link } from 'gatsby'

const IndexPage = ({ location }) => {
  const data = useStaticQuery(graphql`
    query {
      meta: site {
        siteMetadata {
          socialLinks {
            phone {
              link
              text
            }
            email {
              link
              text
            }
          }
        }
      }
      headshot: file(name: { eq: "headshot" }, extension: { eq: "png" }) {
        childImageSharp {
          fixed(width: 150) {
            ...GatsbyImageSharpFixed_withWebp_tracedSVG
          }
        }
      }
    }
  `)
  const headshot = data.headshot.childImageSharp.fixed
  const {
    meta: {
      siteMetadata: {
        socialLinks: { phone, email },
      },
    },
  } = data
  return (
    <Layout location={location}>
      <Seo type="website" title="Home Page" />
      <article sx={{ backgroundColor: "affiliations" }}>
        <Box sx={{ position: `relative`, pb: 200 }} id="welcome">
          <h1>Welcome</h1>
          <p>
            Thank you for stopping by. My goal is for this to be a place of spiritual refreshing where you find encouragement for your walk with Christ.
            I invite you to check out my:
            <ul>
              <li><Link to="/books">Books</Link></li>
              <li><Link to="/blog">Blogposts</Link></li>
              <li><Link to="/subscribe">Join me by signing up for my monthly newsletter</Link></li>
              <li><Link to="/events">Sign up for a speaker</Link></li>
              <li><Link to="/downloads">Download free resources</Link></li>
              <li><ExternalLink href="https://youtube.com/shorts/v1QcahOuA3g?feature=share">Watch the video trailer for <i>His Gift</i></ExternalLink></li>
            </ul>
            Feel free to contact me and I promise to answer your emails directly. I do hope you&rsquo;ll check
            out my book with more-to-come, which are currently under a publishing contract.
          </p>
          <Img
            fixed={headshot}
            alt="Joan C. Benson"
            sx={{
              position: 'absolute !important',
              bottom: 0,
              right: 0,
              zIndex: 1,
            }}
          />
        </Box>
        <hr
          sx={{
            mb: 4,
            height: 4,
            backgroundColor: `primary`,
            border: 0,
            marginBlockStart: 0,
            marginBlockEnd: 0,
          }}
        />
        <p sx={{textAlign: "center"}}>
          If you would like to request Joan to speak at your next event, please contact her at{' '}
          <a sx={{ whiteSpace: "nowrap"}} href={email.link}>{email.text}</a> or by phone <a sx={{ whiteSpace: "nowrap"}} href={phone.link}>{phone.text}</a>.
        </p>
      </article>
    </Layout>
  )
}

export default IndexPage
