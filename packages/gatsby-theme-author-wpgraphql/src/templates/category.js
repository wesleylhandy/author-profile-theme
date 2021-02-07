/** @jsx jsx */
import { jsx } from 'theme-ui'
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
      <section>
        <h1>Posts By Category: {name}</h1>
        {nodes.map((post, idx) => (
            <div key={post.id} sx={{ backgroundColor: idx % 2 === 1 ? 'light' : `ultralight`, padding: 3 }}>
                <PostPreview post={post} blogBase={blogBase}/>
            </div>
        ))}
      </section>
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