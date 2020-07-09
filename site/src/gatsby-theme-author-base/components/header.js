/** @jsx jsx */
import { Heading, jsx } from 'theme-ui'
import { useStaticQuery, graphql } from 'gatsby'
import Navigation from './navigation'
import Blockquote from "gatsby-theme-author-base/src/components/blockquote"

const Header = ({ location, setColorMode }) => {
  const data = useStaticQuery(graphql`
    query {
      meta: site {
        siteMetadata {
          title
        }
      }
    }
  `)
  const title = data.meta.siteMetadata.title
  return (
    <header id="masthead" sx={{ position: `relative` }}>
        <Heading><div sx={{ maxWidth: 'max', margin: '0 auto'}}>{title}</div></Heading>
        <Blockquote quote="&ldquo;Therefore encourage one another build each other up&hellip;&rdquo;" citation="1 Thessalonians 5:11" />
        <Navigation location={location} setColorMode={setColorMode} />
    </header>
  )
}
export default Header
