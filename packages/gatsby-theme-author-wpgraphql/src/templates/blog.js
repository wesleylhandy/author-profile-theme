import React, { Component } from "react"
import { graphql, navigate } from "gatsby"
import Layout from 'gatsby-theme-author-base/src/components/layout';
import PostPreview from 'gatsby-theme-author-base/src/components/post-preview';

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
      previousLink = `${data.themeConfig.blogBase}/`
    } else if (1 < pageNumber) {
      previousLink = `${data.themeConfig.blogBase}/page/${pageNumber - 1}`
    }

    return (
      <button onClick={() => navigate(previousLink)}>
        Previous Posts
      </button>
    )
  }

  renderNextLink = () => {
    const {
      data,
      pageContext: { hasNextPage, pageNumber },
    } = this.props

    if (hasNextPage) {
      return (
        <button
          onClick={() => navigate(`${data.themeConfig.blogBase}/page/${pageNumber + 1}`)}
        >
          Next Posts
        </button>
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
    const BlogPageNumber = pageNumber ? ` Page ${pageNumber}` : ``
    return (
      <Layout pageNumber={pageNumber} location={{ location }}>
            {data &&
              data.wpgraphql &&
              data.wpgraphql.posts.nodes.map(post => (
                <div key={post.id}>
                  <PostPreview post={post} blogBase={data.themeConfig.blogBase}/>
                </div>
              ))}
          
              {this.renderPreviousLink()}
           
              {this.renderNextLink()}
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
          id
          title
          uri
          slug
          date
          content: excerpt
          author {
            name
            slug
            avatar(size: 100) {
              url
            }
          }
        }
      }
    }
  }
`