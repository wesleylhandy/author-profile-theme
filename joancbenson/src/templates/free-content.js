/** @jsx jsx */
import Layout from '@wesleylhandy/gatsby-theme-author-base/src/components/layout'
import Seo from '@wesleylhandy/gatsby-theme-author-base/src/components/seo'
import { jsx } from 'theme-ui'
import { useStaticQuery, graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'
import { Markdown } from '../components/markdown'
import { BlobDownload } from '../components/blob-download'

// allContentfulFreeContent(filter: {isCurrentlyFeatured: {eq: true}, title: {ne: "Example Free Content"}}) {

const FreeContentPage = ({ location }) => {
    const data = useStaticQuery(graphql`
    {
      allContentfulFreeContent {
        content: nodes {
          id
          isCurrentlyFeatured
          title
          description {
            description
          }
          downloadableContent {
            id
            title
            description
            file {
              contentType
              fileName
              url
            }
          }
          previewImage {
            description
            title
            id
            fluid(maxWidth: 1200) {
                aspectRatio
                base64
                sizes
                src
                srcSet
                srcSetWebp
                srcWebp
                tracedSVG
            }
          }
          textContent {
            textContent
            id
          }
        }
      }
    }
  `);
  const content = data.allContentfulFreeContent.content || [];

  return (
    <Layout location={location} hideSidebar={true}>
      <Seo type="website" title="Download Free Content Page" description={"Joan C. Benson is a free-lance writer & blogger, published in multiple magazines, on devotional websites, by children's ministry publishers, and now with her first novel - His Gift."}/>
      <article sx={{ backgroundColor: "affiliations", px: 3 }} style={{ height: '100%'}}>
          <h1>Free Content from Joan C. Benson</h1>
          <p>Please check here regularly for new downloads and other free resources created and curated by Joan C. Benson herself.</p>
          <hr />
          { content.length > 0
            ? content.map(node => (
                <div id={node.id}>
                    <h3>{node.title}</h3>
                    <Markdown markdown={node.description.description} />
                    {node.previewImage && (
                        <Img 
                            fluid={node.previewImage.fluid} alt={node.previewImage.description}
                            sx={{
                                display: 'block',
                                width: '100%',
                            }} />
                    )}
                    { node.downloadableContent && node.downloadableContent.length > 0 && (
                        <React.Fragment>
                        <h4>Downloads</h4>
                        <ul>
                        {node.downloadableContent.map(download => (
                            <li key={download.id}>
                                <BlobDownload download={download} />
                            </li>
                        ))}
                        </ul>
                        </React.Fragment>
                    )}
                    { node.textContent && (
                        <Markdown markdown={node.textContent.textContent } />
                    )}
                </div>
            ))
            : (
              <p>I'm sorry, this is currently no free content available at this time, but there will be soon!</p>
          )}
          <hr />
          <p>Be sure to <Link to="/subscribe">subscribe to my newsletter</Link> to be informed when new content will be ready for download.</p>
      </article>
    </Layout>
  )
}

export default FreeContentPage;
