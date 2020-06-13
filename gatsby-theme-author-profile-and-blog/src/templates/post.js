import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Post from "../components/post"

export const query = graphql`
  query($postID: String!) {
    wordpressPost(id: { eq: $postID }) {
        author {
            name
            avatar_urls {
              wordpress_96
            }
        }
        categories {
            name
        }
        content
        date
        id
        link
        modified
        title
        tags {
            name
        }
        slug
    }
  }
`

const PostTemplate = ({data: { wordpressPost: post}}) => (
  <Layout>
    <Post {...post} />
  </Layout>
)

export default PostTemplate