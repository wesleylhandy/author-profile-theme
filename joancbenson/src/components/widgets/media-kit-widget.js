/** @jsx jsx */
import PropTypes from "prop-types"
import { jsx, Link } from 'theme-ui'

const MediaKitWidget = ({heading = "Media Kit", hide = false}) => !hide ? (
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
      <p><Link href="https://drive.google.com/drive/folders/1p5AuMywMRp6nXR4g7AetnTLX4EsquliL?usp=sharing">READ LOCAL CHALLENGE - Fall 2022 - MEDIA KIT</Link></p>
    </article>
) : null

MediaKitWidget.propTypes = {
    heading: PropTypes.string,
    hide: PropTypes.bool
  }

export default MediaKitWidget