/** @jsx jsx */
import {jsx} from "theme-ui"

const Blockquote = ({quote, citation}) => (
    <div
    className="quote-container-outer"
    sx={{
      maxWidth: `full`,
      margin: `0 auto`,
      backgroundColor: `secondary`,
    }}
  >
    <div
      className="quote-container-inner"
      sx={{
        maxWidth: `max`,
        margin: `0 auto`,
      }}
    >
    <blockquote
      sx={{
        display: `block`,
        padding: 2,
        color: `text`,
        fontFamily: `body`,
        fontWeight: 500,
        letterSpacing: `2px`,
        marginBlockEnd: 0, 
        marginBlockStart: 0, 
        marginInlineEnd: 0, 
        marginInlineStart: 0,
        '@media screen and (max-width: 640px)': {
          position: `relative`,
          bottom: `unset`,
          left: `unset`,
        },
      }}
    >
      {quote}
      <footer>
        <cite sx={{ fontFamily: `body`, fontSize: 1 }}>{citation}</cite>
      </footer>
    </blockquote>
  </div>
</div>
)

export default Blockquote