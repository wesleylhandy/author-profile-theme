/** @jsx jsx */
import { jsx, Button, Grid } from 'theme-ui'
import { graphql, navigate } from "gatsby"
import Layout from "../components/layout/layout"
import Post from "../components/post/post"
import Seo from '../components/head/seo'

export const query = graphql`
fragment PostFragment on WPGraphQL_Post {
  id
  title
  content
  excerpt
  featuredImage {
    node {
      altText
      databaseId
      modified
      sourceUrl
      imageFile {
        childImageSharp {
          fluid(maxWidth: 1200) {
            ...GatsbyImageSharpFluid_withWebp_tracedSVG
          }
        }
      }
    }
  }
  uri
  slug
  link
  published: date
  modified
  author {
    node {
      name
      email
      firstName
      lastName
      link: uri
      avatar {
        url
      }
    }
  }
  tags {
    nodes {
      name
      link
    }
  }
  categories {
    nodes {
      name
      link
    }
  }
}
query GET_POST($id: ID!) {
  wpgraphql {
    post(id: $id) {
      ...PostFragment
    }
  }
}
`

const PostTemplate = ({location, data: { wpgraphql: { post }}}) => {
  const title = post.title
  const description = post.content && post.content.replace(/<div class="sharedaddy.*/i, "").replace(/<[^>]*>/g, "").slice(0, 156) + "..."
  const image = post.featuredImage && post.featuredImage.node ? post.featuredImage.node.imageFile.childImageSharp.fluid : null
  return (
    <Layout location={location}>
      <Seo 
        type="article" 
        title={`${title} | Blog`}
        description={description}
        image={image}
        schema={post}
        canonical={post.link}
      />
      <section sx={{ width: "100%" }}>
        <Post {...post} />
        <Grid my={3} gap={2} columns={[2, '1fr 1fr']}>
          <Button
            onClick={() => navigate(`/blog`)}
            variant="tertiary"
            sx={{
              gridColumnStart: 1,
              gridColumnEnd: 2,
            }}
            aria-label={`Link to Blog Page`}
          >
            Back to Blog
          </Button>
        </Grid>
      </section>
    </Layout>
  )
}

export default PostTemplate
