/** @jsx jsx */
import { Fragment } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { Link as ExternalLink, jsx } from 'theme-ui'
import Img from 'gatsby-image'
import ConvertedDate from './converted-date'

const Post = ({ title, author, content, published, link, modified, slug, featuredImage }) => {
  const data = useStaticQuery(graphql`
    {
      themeConfig {
        blogBase
      }
    }
  `)
  const { themeConfig: { blogBase } } = data
  return (
    <article sx={{maxWidth: `100%`}}>
      <h1 dangerouslySetInnerHTML={{__html: title}} />
      <h2><Link to={`${blogBase}${author.link}`}>{author.name}</Link></h2>
      { featuredImage && (
        <Img fluid={featuredImage.node.imageFile.childImageSharp.fluid} alt={featuredImage.node.altText}/>
      )}
      <div dangerouslySetInnerHTML={{__html: content.replace(/<div class="sharedaddy.*/i, "")}} />
      <p>
          Originally Published at <ExternalLink href={link} aria-label={`Link to ${link}`}>{link}</ExternalLink>
          {` on `}
          <ConvertedDate rawDate={published}/>
          {`. `}
          { 
              modified !== published && (
                <Fragment>
                  <br/>
                  <small sx={{ color: `gray.6`}}><i>Last Modified on <ConvertedDate rawDate={modified}/></i></small>
                </Fragment>
              )
          }
      </p>
    </article>
  )
}

export default Post