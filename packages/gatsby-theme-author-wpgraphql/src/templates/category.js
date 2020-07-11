import React from "react"
import Layout from "@wesleylhandy/gatsby-theme-author-base/src/components/layout"
import PostPreview from '@wesleylhandy/gatsby-theme-author-base/src/components/post-preview';
import Seo from '@wesleylhandy/gatsby-theme-author-base/src/components/seo'
import { graphql } from "gatsby"

const CategoryTemplate = props => {
  const {
    location,
    data: {
      themeConfig: { blogBase },
      wpgraphql: { category: { name, posts: { nodes } } },
    },
  } = props
  return (
    <Layout location={location}>
      <Seo 
        type="website" 
        title={`${name} | Category Page`}
      />
      <h2>Category: {name}</h2>
      {nodes.map(post => (
          <div key={post.id}>
              <PostPreview post={post} blogBase={blogBase}/>
          </div>
      ))}
    </Layout>
  )
}

export default CategoryTemplate

export const pageQuery = graphql`
  query GET_CATEGORY($id: ID!) {
    themeConfig {
      blogBase
    }
    wpgraphql {
      category(id: $id) {
        id
        name
        slug
        posts(first: 100) {
          nodes {
            ...PostFragment
          }
        }
      }
    }
  }
`