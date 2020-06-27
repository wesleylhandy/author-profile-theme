import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Layout from "gatsby-theme-author-base/src/components/layout"
import PostList from "gatsby-theme-author-base/src/components/post-list"

const PostsTemplate = () => {
  const data = useStaticQuery(graphql`
    {
      themeConfig {
        blogBase
      }
      wpgraphql {
        posts {
          nodes {
            ...PostFragment
          }
        }
      }
    }
  `)
  const posts = data.wpgraphql.posts.nodes || []
  return (
      <Layout>
        <PostList posts={posts} />
      </Layout>
  )

}
export default PostsTemplate