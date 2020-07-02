/** @jsx jsx */
import { Link, graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import { jsx } from 'theme-ui'


const BookListWidget = ({heading}) => {
    const data = useStaticQuery(graphql`
    {
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
                              base64
                              src
                              srcSet
                          }
                      }
                  }
              }
            }
          }
        }
      }
    }`)
    const { wpgraphql: { booksAndPublications: { bookList: { books } } } } = data
    return (
        <article className="booklist-widget" sx={{ padding: 10, border: `5px solid`, borderColor: `primary`, maxWidth: 280, margin: `30px auto`}}>
          <h2>{heading}</h2>
          <ul>
            {books.map(book => (
                <li key={book.id}>
                  <h3>
                      <b>
                          <Link 
                              sx={{color: "primary", '&:hover': { color: 'secondary', cursor: 'pointer' }}} 
                              to={`/books/${book.slug}`}
                              dangerouslySetInnerHTML={{__html:book.bookTitle}} 
                          >
                              {book.coverImage && <Img fluid={book.coverImage.imageFile.childImageSharp.fluid} />}
                          </Link>
                      </b>
                  </h3>
                </li>
            ))}
          </ul> 
        </article>
    )
}

export default BookListWidget

