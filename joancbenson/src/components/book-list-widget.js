/** @jsx jsx */
import { Link, graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import { jsx } from 'theme-ui'
import PropTypes from "prop-types"

const BookListWidget = ({ heading = "My Books", hide = false }) => {
  const data = useStaticQuery(graphql`
    {
      themeConfig {
        booksBase
      }
      wpgraphql {
        booksAndPublications {
          bookList: books {
            books {
              id
              bookTitle
              slug
              coverImage {
                databaseId
                sourceUrl
                modified
                imageFile {
                  childImageSharp {
                    fluid(maxWidth: 320) {
                      ...GatsbyImageSharpFluid_withWebp_tracedSVG
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `)
  const {
    themeConfig: { booksBase },
    wpgraphql: {
      booksAndPublications: {
        bookList: { books },
      },
    },
  } = data
  return !hide ? (
    <article
      className="booklist-widget"
      sx={{ padding: 3, border: `5px solid`, borderColor: `primary`, mx: `auto`, my: 3, backgroundColor: "affiliations" }}
    >
      <h2>{heading}</h2>
      <ul sx={{ listStyleType: 'none', paddingInlineStart: 0 }}>
        {books.map((book) => {
          const toBook = `${booksBase}/${book.slug}`
          return (
            <li key={book.id}>
              <h3>
                <b>
                  <Link
                    to={toBook}
                    dangerouslySetInnerHTML={{ __html: book.bookTitle }}
                    aria-label={`Link to ${toBook}`}
                  />
                  <Link
                    to={toBook}
                    aria-label={`Link to ${toBook}`}
                  >
                    {book.coverImage && (
                      <Img fluid={book.coverImage.imageFile.childImageSharp.fluid} alt={book.coverImage.altText}/>
                    )}
                  </Link>
                </b>
              </h3>
            </li>
          )
        })}
      </ul>
    </article>
  ) : null
}

BookListWidget.propTypes = {
  heading: PropTypes.string,
  hide: PropTypes.bool
}

export default BookListWidget
