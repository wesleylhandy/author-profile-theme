import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Layout from "../components/layout/layout"
import PostList from "../components/post/post-list"

const PostsTemplate = ({location}) => {
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
  const blogBase = data.themeConfig.blogBase
  return (
      <Layout location={location}>
        <PostList posts={posts} blogBase={blogBase}/>
      </Layout>
  )

}
export default PostsTemplate