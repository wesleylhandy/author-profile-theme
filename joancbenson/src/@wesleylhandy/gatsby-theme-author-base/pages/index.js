/** @jsx jsx */
import Layout from '@wesleylhandy/gatsby-theme-author-base/src/components/layout'
import Seo from '@wesleylhandy/gatsby-theme-author-base/src/components/seo'
import { Box, jsx } from 'theme-ui'
import Img from 'gatsby-image'
import { useStaticQuery, graphql } from 'gatsby'

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
        <Box sx={{ position: `relative`, pb: 148 }} id="welcome">
          <h1>Welcome To My Website</h1>
          <p>
            I hope you find many useful and interesting features on my website which may give you
            hope for your daily faith walk. My prayer is that the Lord will satisfy your soul in the
            dry times, and you will flourish like a spring of water, as Isaiah says in Chapter
            58:11. I pray you will find spiritual refreshment within these pages, on my Blog, in my
            book, and through my personal experiences. We can journey together and be stronger for
            doing so. Please contact me, ask questions, comment, invite me to speak, and listen to
            my podcast as it begins in 2021. I want to join you as we seek God&rsquo;s peace and
            wisdom for living in this season. May we each grow as we do so together.
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
