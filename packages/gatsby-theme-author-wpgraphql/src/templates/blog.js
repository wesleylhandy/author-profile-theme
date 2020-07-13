/** @jsx jsx */
import { jsx, Button, Grid } from 'theme-ui'
import { Component } from 'react'
import { graphql, navigate } from 'gatsby'
import Layout from '@wesleylhandy/gatsby-theme-author-base/src/components/layout'
import Seo from '@wesleylhandy/gatsby-theme-author-base/src/components/seo'
import PostPreview from '@wesleylhandy/gatsby-theme-author-base/src/components/post-preview'

class BlogPage extends Component {
  renderPreviousLink = () => {
    const {
      data,
      pageContext: { pageNumber },
    } = this.props

    let previousLink = null

    if (!pageNumber) {
      return null
    } else if (1 === pageNumber) {
      previousLink = `${data.themeConfig.blogBase}`
    } else if (1 < pageNumber) {
      previousLink = `${data.themeConfig.blogBase}/page/${pageNumber - 1}`
    }

    return (
      <Button
        onClick={() => navigate(previousLink)}
        variant="tertiary"
        sx={{
          gridColumnStart: 1,
          gridColumnEnd: 2,
        }}
        aria-label={`Link to Previous Posts`}
      >
        Previous Posts
      </Button>
    )
  }

  renderNextLink = () => {
    const {
      data,
      pageContext: { hasNextPage, pageNumber },
    } = this.props

    if (hasNextPage) {
      return (
        <Button
          onClick={() => navigate(`${data.themeConfig.blogBase}/page/${pageNumber + 1}`)}
          variant="tertiary"
          sx={{
            gridColumnStart: 2,
            gridColumnEnd: 3,
          }}
          aria-label={`Link to Next Posts`}
        >
          Next Posts
        </Button>
      )
    } else {
      return null
    }
  }

  render() {
    const {
      data,
      location,
      pageContext: { pageNumber },
    } = this.props
    return (
      <Layout pageNumber={pageNumber} location={location}>
        <Seo
          type="website"
          title={`Blog Page ${pageNumber + 1}`}
          meta={[{ name: 'robots', content: 'noindex' }]}
        />
        <section>
          <h2>Recent Posts</h2>
          {data &&
            data.wpgraphql &&
            data.wpgraphql.posts.nodes.map((post, idx) => (
              <div
                key={post.id}
                sx={{ backgroundColor: idx % 2 === 1 ? 'light' : `transparent`, padding: 3 }}
              >
                <PostPreview post={post} blogBase={data.themeConfig.blogBase} />
              </div>
            ))}
          <Grid my={3} gap={2} columns={[2, '1fr 1fr']}>
            {this.renderPreviousLink()}

            {this.renderNextLink()}
          </Grid>
        </section>
      </Layout>
    )
  }
}

export default BlogPage

export const query = graphql`
  query GET_POSTS($ids: [ID]) {
    themeConfig {
      blogBase
    }
    wpgraphql {
      posts(where: { in: $ids }) {
        nodes {
          ...PostFragment
        }
      }
    }
  }
`
