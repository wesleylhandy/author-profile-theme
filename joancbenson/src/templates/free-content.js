/** @jsx jsx */
import Layout from '../components/layout'
import Seo from '../components/seo'
import { jsx } from 'theme-ui'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { FreeContentBody } from '../components/free-content-body'

const FreeContentPage = ({ location }) => {
    const data = useStaticQuery(graphql`
    {
      allContentfulFreeContent(filter: {isCurrentlyFeatured: {eq: true}, title: {ne: "Example Free Content"}}) {
        content: nodes {
          id
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
          <FreeContentBody
            content={content}
            emptyMessage={<span>I&rsquo;m sorry, this is currently no free content available at this time, but there will be soon!</span>}
          />
          <hr />
          <p>Be sure to <Link to="/subscribe">subscribe to my newsletter</Link> to be informed when new content will be ready for download.</p>
      </article>
    </Layout>
  )
}

export default FreeContentPage;
