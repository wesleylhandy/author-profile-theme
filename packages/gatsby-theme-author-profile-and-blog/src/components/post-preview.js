/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Link } from 'gatsby';

const PostPreview = ({ post, ...props }) => (
  <article {...props}>
    {/* <Link to={post.path}>
      <Image fixed={post.image} alt={post.title} />
    </Link> */
    }
    <div className="preview-text">
        <h2>
            <Link 
                sx={{color: "primary", '&:hover': { color: 'secondary', cursor: 'pointer' }}} 
                to={post.path} 
                dangerouslySetInnerHTML={{__html:post.title}} 
            />
        </h2>
      <div dangerouslySetInnerHTML={{__html: post.excerpt.replace(/<div class="sharedaddy.*/i, "")}}/>
      <Link 
        to={post.path} 
        className="read-link"
        sx={{color: "primary", '&:hover': { color: 'secondary', cursor: 'pointer' }}}
    >
        Read this post &rsaquo;
      </Link>
    </div>
  </article>
);

export default PostPreview;