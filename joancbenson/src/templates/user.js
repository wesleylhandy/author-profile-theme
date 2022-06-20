/** @jsx jsx */
import { jsx } from 'theme-ui'
import Layout from "../components/layout/layout"
import Seo from '../components/head/seo'
import PostPreview from '../components/post/post-preview';
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