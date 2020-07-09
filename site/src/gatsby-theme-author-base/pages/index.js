/** @jsx jsx */
import Layout from 'gatsby-theme-author-base/src/components/layout'
import BookListWidget from 'gatsby-theme-author-wpgraphql/src/components/book-list-widget'
import PostListWidget from 'gatsby-theme-author-wpgraphql/src/components/post-list-widget'
import EventListWidget from 'gatsby-theme-author-wpgraphql/src/components/event-list-widgets'
import { Flex, Box, jsx } from 'theme-ui'
import Img from 'gatsby-image'
import { useStaticQuery, graphql } from 'gatsby'

const IndexPage = ({ location }) => {
  const data = useStaticQuery(graphql`
    query {
      headshot: file(name: { eq: "headshot" }, extension: { eq: "png" }) {
        childImageSharp {
          fixed(width: 150) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)
  const headshot = data.headshot.childImageSharp.fixed
  return (
    <Layout location={location}>
      <Flex>
        <Box
          sx={{
            flex: `1 1 auto`,
            position: `relative`,
            border: `5px solid`,
            borderColor: `primary`,
            my: 3,
            mr: 3,
          }}
        >
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
        <Box>
          <BookListWidget heading="My Books" />
          <EventListWidget heading="Upcoming Events" />
          <PostListWidget heading="Recent Posts" limit={4} />
        </Box>
      </Flex>
    </Layout>
  )
}

export default IndexPage
