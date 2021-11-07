/** @jsx jsx */
import { jsx, Box, Link } from 'theme-ui'

const NewsMentionsList = ({ mentions, heading = "In The News", limit = 4, type = "widget" }) => (
  <article>
    <h2>{heading}</h2>
    <ul sx={{listStyleType: "none", paddingInlineStart: 0}} >
      {
        mentions.length > 0 ? mentions.slice(0, limit).map(({description, link, title}, idx) => {
          const liStyle = type !== `widget` ? { backgroundColor: idx % 2 === 1 ? 'light' : `ultralight`, p: 3 } : {}
          const linkStyle = type === `widget` ? {color: "primary", '&:hover': { color: 'secondary', cursor: 'pointer' }} : {}
          return (
            <li key={`news-mention-${idx}`} sx={liStyle}>
              <h3>
                <b>
                  <Link 
                    sx={linkStyle} 
                    href={link}
                    aria-label={`Link to ${title}`}
                  >{title}</Link>
                </b>
              </h3>
              {
                type !== `widget` && description &&  (
                  <Box my={3}>
                    <p>{description}</p>
                  </Box>
                )
              }
            </li>
          )
        }) : (
          <p>Come back soon to see where Joan C. Benson is making news.</p>
        )
      }
    </ul>
  </article>
)
export default NewsMentionsList