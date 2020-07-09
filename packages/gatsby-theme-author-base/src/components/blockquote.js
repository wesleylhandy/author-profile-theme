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
        width: `100%`,
        padding: 2,
        color: `text`,
        fontFamily: `body`,
        letterSpacing: `2px`,
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