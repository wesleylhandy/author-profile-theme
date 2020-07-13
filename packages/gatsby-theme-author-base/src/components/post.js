/** @jsx jsx */
import React from "react"
import { Link, jsx } from 'theme-ui'
import Img from 'gatsby-image'
import ConvertedDate from './converted-date'

const Post = ({ title, author, content, published, link, modified, slug, featuredImage }) => {
  return (
    <div>
      <h2 dangerouslySetInnerHTML={{__html: `${title} by ${author.name}`}} />
      { featuredImage && (
        <Img fluid={featuredImage.imageFile.childImageSharp.fluid} alt={featuredImage.altText}/>
      )}
      <div dangerouslySetInnerHTML={{__html: content.replace(/<div class="sharedaddy.*/i, "")}}>
      </div>
      <p>
          Originally Published at <Link href={link} aria-label={`Link to ${link}`}>{link}</Link>
          {` on `}
          <ConvertedDate rawDate={published}/>
          {`. `}
          { 
              modified !== published && (
                <>
                  <br/>
                  <small sx={{ color: `gray.6`}}><i>Last Modified on <ConvertedDate rawDate={modified}/></i></small>
                </>
              )
          }
      </p>
    </div>
  )
}

export default Post