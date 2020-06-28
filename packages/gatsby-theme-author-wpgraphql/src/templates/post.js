import React from "react"
import { graphql } from "gatsby"
import Layout from "gatsby-theme-author-base/src/components/layout"
import Post from "gatsby-theme-author-base/src/components/post"

export const query = graphql`
fragment PostFragment on WPGraphQL_Post {
  id
  title
  content
  excerpt
  uri
  slug
  link
  date
  modified
  author {
    name
    slug
    avatar {
      url
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

const PostTemplate = ({data: { wpgraphql: { post }}}) => (
  <Layout>
    <Post {...post} />
  </Layout>
)

export default PostTemplate
