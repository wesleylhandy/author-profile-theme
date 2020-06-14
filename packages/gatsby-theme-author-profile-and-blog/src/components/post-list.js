/** @jsx jsx */
import React from 'react'
import { Link } from "gatsby"
import { jsx } from 'theme-ui'
import ConvertedDate from './convertedDate'
const PostList = ({ posts }) => (
  <>
    <h2>Recent Posts</h2>
    <ul>
      {posts.map(post => (
        <li key={post.id}>
          <h3>
              <b>
                <Link 
                    sx={{color: "primary", '&:hover': { color: 'secondary', cursor: 'pointer' }}} 
                    to={post.slug} 
                    dangerouslySetInnerHTML={{__html:post.title}} 
                />
              </b>
          </h3>
          <div dangerouslySetInnerHTML={{__html: post.excerpt.replace(/<div class="sharedaddy.*/i, "")}}/>
          <p>
            Originally Published by {post.author.name}
            {` on `}
            <ConvertedDate rawDate={post.date}/>
            {`.`}
          </p>
        </li>
      ))}
    </ul>
  </>
)
export default PostList