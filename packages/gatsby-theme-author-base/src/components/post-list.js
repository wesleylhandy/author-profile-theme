/** @jsx jsx */
import { Link } from "gatsby"
import { jsx } from 'theme-ui'
import ConvertedDate from './converted-date'
const PostList = ({ heading = `Recent Posts`, posts, titleOnly = false, blogBase }) => (
  <article>
    <h2>{heading}</h2>
    <ul sx={{listStyleType: "none", paddingInlineStart: 0}} >
      {posts.map(post => (
        <li key={post.id}>
          <h3>
              <b>
                <Link 
                    sx={{color: "primary", '&:hover': { color: 'secondary', cursor: 'pointer' }}} 
                    to={`${blogBase}/${post.slug}`} 
                    dangerouslySetInnerHTML={{__html:post.title}} 
                    aria-label={`Link to ${post.title}`}
                />
              </b>
          </h3>
          { !titleOnly && (
              <>
                <div dangerouslySetInnerHTML={{__html: post.excerpt.replace(/<div class="sharedaddy.*/i, "")}}/>
                <p>
                  Originally Published by {post.author.name}
                  {` on `}
                  <ConvertedDate rawDate={post.published}/>
                  {`.`}
                </p>
              </>
            )
          }
        </li>
      ))}
    </ul>
  </article>
)
export default PostList