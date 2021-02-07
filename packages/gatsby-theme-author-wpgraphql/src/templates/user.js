/** @jsx jsx */
import { jsx } from 'theme-ui'
import Layout from "@wesleylhandy/gatsby-theme-author-base/src/components/layout"
import Seo from '@wesleylhandy/gatsby-theme-author-base/src/components/seo'
import PostPreview from '@wesleylhandy/gatsby-theme-author-base/src/components/post-preview';
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
      <section>
        <h1>Posts by {name}</h1>
        {nodes.map((post, idx) => (
            <div key={post.id} sx={{ backgroundColor: idx % 2 === 1 ? 'light' : `ultralight`, padding: 3 }}>
                <PostPreview post={post} blogBase={blogBase}/>
            </div>
        ))}
      </section>
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