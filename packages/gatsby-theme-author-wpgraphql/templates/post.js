import React from "react"
import { graphql } from "gatsby"
import Layout from "gatsby-theme-author-base/src/components/layout"
import Post from "gatsby-theme-author-base/src/components/post"

// export const query = graphql`
//   query($postID: String!) {
//   }
// `

const PostTemplate = ({data = {}}) => (
  <Layout>
    <Post {...data} />
  </Layout>
)

export default PostTemplate
