/** @jsx jsx */
import { Link, graphql, useStaticQuery } from "gatsby"
import { jsx } from 'theme-ui'
import PostList from "gatsby-theme-author-base/src/components/post-list"

const PostListWidget = ({heading}) => {
    const data = useStaticQuery(graphql`
    {
        themeConfig {
            blogBase
        }
        wpgraphql {
          postList: posts(first: 4) {
            posts: nodes {
              ...PostFragment
            }
          }
        }
    }`)
    const { themeConfig: { blogBase }, wpgraphql: { postList: { posts } } } = data
    return (
      <div sx={{ padding: 10, border: `5px solid`, borderColor: `primary`, maxWidth: 280, mx: `auto`, my: 3}}>
        <PostList heading={heading} posts={posts} titleOnly={true} blogBase={blogBase} />
      </div>
    )
}

export default PostListWidget