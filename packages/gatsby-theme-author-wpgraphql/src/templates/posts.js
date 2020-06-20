import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Layout from "gatsby-theme-author-base/src/components/layout"
import PostList from "gatsby-theme-author-base/src/components/post-list"

const PostsTemplate = () => {
  // const { allWordpressPost } = useStaticQuery(graphql`
  //   query {
  //     }
  // `)
  // const posts = allWordpressPost.nodes
  return (
      <Layout>
        <PostList posts={[]} />
      </Layout>
  )

}
export default PostsTemplate