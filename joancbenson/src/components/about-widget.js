/** @jsx jsx */
import PropTypes from "prop-types"
import { jsx } from 'theme-ui'
import { Link } from "gatsby"

const AboutWidget = ({heading = "About Joan C. Benson", hide = false}) => !hide ? (
    <article
      className="booklist-widget"
      sx={{ 
        padding: 3, 
        border: `5px solid`, 
        borderColor: `primary`, 
        mx: `auto`, 
        my: 3,
        backgroundColor: 'affiliations',
      }}
    >
      <h2>{heading}</h2>
      <p>Joan C. Benson is a free-lance writer published in multiple magazines including
          LifeWay&rsquo;s &ldquo;ParentLife,&rdquo; Regent University&rsquo;s &ldquo;The Christian
          Leader,&rdquo; Royal Rangers &ldquo;High Adventure,&rdquo; and multiple others&hellip; <Link to="/about">Read more &rsaquo;</Link></p>
    </article>
) : null

AboutWidget.propTypes = {
    heading: PropTypes.string,
    hide: PropTypes.bool
  }

export default AboutWidget