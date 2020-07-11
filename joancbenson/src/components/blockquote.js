/** @jsx jsx */
import {jsx} from "theme-ui"

const Blockquote = ({quote, author}) => (
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
        color: `black`,
        '@media screen and (max-width: 640px)': {
          position: `relative`,
          bottom: `unset`,
          left: `unset`,
        },
      }}
    >
      &ldquo;Therefore encourage one another build each other up&hellip;&rdquo;
      <footer>
        <cite>1 Thessalonians 5:11</cite>
      </footer>
    </blockquote>
  </div>
</div>
)

export default Blockquote