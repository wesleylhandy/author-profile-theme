/** @jsx jsx */
import React from "react"
import { Link } from 'theme-ui'
import { jsx } from 'theme-ui'
import ConvertedDate from './converted-date'

const Post = ({ title, author, content, date, link, modified, slug }) => (
  <div>
    <h2 dangerouslySetInnerHTML={{__html: `${title} by ${author.name}`}} />
    <div dangerouslySetInnerHTML={{__html: content.replace(/<div class="sharedaddy.*/i, "")}}>
    </div>
    <p>
        Originally Published at <Link href={link}>{link}</Link>
        {` on `}
        <ConvertedDate rawDate={date}/>
        {`. `}
        { 
            modified !== date && (
              <>
                <br/>
                <small sx={{ color: `gray.6`}}><i>Last Modified on <ConvertedDate rawDate={modified}/></i></small>
              </>
            )
        }
    </p>
  </div>
)

export default Post