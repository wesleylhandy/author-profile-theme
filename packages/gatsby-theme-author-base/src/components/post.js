import React from "react"
import { Link } from 'theme-ui'
import ConvertedDate from './convertedDate'

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
            <span>Last Modified on <ConvertedDate rawDate={modified}/></span>
            )
        }
    </p>
  </div>
)

export default Post