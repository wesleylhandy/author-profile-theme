/** @jsx jsx */
import { Link } from "gatsby"
import { jsx } from 'theme-ui'
import ConvertedDate from './convertedDate'
const PostList = ({ heading = `Recent Posts`, posts, titleOnly = false, blogBase }) => (
  <article>
    <h2>{heading}</h2>
    <ul>
      {posts.map(post => (
        <li key={post.id}>
          <h3>
              <b>
                <Link 
                    sx={{color: "primary", '&:hover': { color: 'secondary', cursor: 'pointer' }}} 
                    to={`${blogBase}/${post.slug}`} 
                    dangerouslySetInnerHTML={{__html:post.title}} 
                />
              </b>
          </h3>
          { !titleOnly && (
              <>
                <div dangerouslySetInnerHTML={{__html: post.excerpt.replace(/<div class="sharedaddy.*/i, "")}}/>
                <p>
                  Originally Published by {post.author.name}
                  {` on `}
                  <ConvertedDate rawDate={post.date}/>
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