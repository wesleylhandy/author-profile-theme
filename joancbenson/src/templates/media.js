/** @jsx jsx */
import Layout from '../components/layout/layout'
import Seo from '../components/head/seo'
import { Box, jsx, Link as ExternalLink } from 'theme-ui'
import { useStaticQuery, graphql } from 'gatsby'

const MediaPage = ({ location }) => {
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
    }
  `)
  const {
    meta: {
      siteMetadata: {
        socialLinks: { phone, email },
      },
    },
  } = data
  return (
    <Layout location={location}>
      <Seo type="website" title="Media Page" />
      <article sx={{ backgroundColor: "affiliations" }}>
        <Box sx={{ position: `relative`, pb: 200 }} id="media">
          <h1>Media Kits</h1>
          <ul>
              <li><ExternalLink href="https://drive.google.com/drive/folders/1p5AuMywMRp6nXR4g7AetnTLX4EsquliL?usp=sharing">READ LOCAL CHALLENGE - Fall 2022 - MEDIA KIT</ExternalLink></li>
            </ul>
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

export default MediaPage
