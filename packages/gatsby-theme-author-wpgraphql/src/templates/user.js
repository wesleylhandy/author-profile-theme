import React from "react"
import Layout from "gatsby-theme-author-base/src/components/layout"
import Seo from 'gatsby-theme-author-base/src/components/seo'
import PostPreview from 'gatsby-theme-author-base/src/components/post-preview';
import { graphql } from "gatsby"

const User = props => {
  const {
    location,
    data: {
     themeConfig: { blogBase },
      wpgraphql: { user: { name, posts: { nodes } } },
    },
  } = props
  return (
    <Layout location={location}>
      <Seo 
        type="website" 
        title={`${name} | Posts By User Page`}
      />
        <h2>Posts by {name}</h2>
        {nodes.map(post => (
            <div key={post.id}>
                <PostPreview post={post} blogBase={blogBase}/>
            </div>
        ))}
    </Layout>
  )
}

export default User

export const pageQuery = graphql`
  query user($id: ID!) {
    themeConfig {
      blogBase
    }
    wpgraphql {
      user(id: $id) {
        name
        avatar {
          url
        }
        posts {
          nodes {
            ...PostFragment
          }
        }
      }
    }
  }
`