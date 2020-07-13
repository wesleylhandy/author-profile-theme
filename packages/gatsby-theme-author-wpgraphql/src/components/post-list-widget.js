/** @jsx jsx */
import { graphql, useStaticQuery } from "gatsby"
import PropTypes from "prop-types"
import { jsx } from 'theme-ui'
import PostList from "@wesleylhandy/gatsby-theme-author-base/src/components/post-list"

const PostListWidget = ({heading = "Recent Posts", hide = false}) => {
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
    return !hide ? (
      <div sx={{ padding: 3, border: `5px solid`, borderColor: `primary`, mx: `auto`, my: 3}}>
        <PostList heading={heading} posts={posts} titleOnly={true} blogBase={blogBase} />
      </div>
    ) : null
}

PostListWidget.propTypes = {
  heading: PropTypes.string,
  hide: PropTypes.bool
}

export default PostListWidget