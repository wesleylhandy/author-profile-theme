/** @jsx jsx */
import { graphql, Link, navigate } from 'gatsby'
import Img from 'gatsby-image'
import { jsx, Box, Button } from 'theme-ui'
import Layout from '@wesleylhandy/gatsby-theme-author-base/src/components/layout'
import Seo from '@wesleylhandy/gatsby-theme-author-base/src/components/seo'

const BooksPage = ({ location, data }) => {
  const {
    themeConfig: { booksBase },
    wpgraphql: {
      booksAndPublications: {
        bookList: { books },
      },
    },
  } = data
  return (
    <Layout location={location}>
      <Seo type="website" title="Books Page" meta={[{ name: 'robots', content: 'noindex' }]} />
      <article>
        <h1>My Books</h1>
        <ul sx={{ listStyleType: 'none', paddingInlineStart: 0 }}>
          {books.map((book, idx) => {
            const title = book.bookTitle.replace(/<[^>]+>/gm, '').replace(/([\r\n]+ +)+/gm, '')
            const toBook = `${booksBase}/${book.slug}`
            return (
              <li key={book.id}>
                <h2>
                  <Link to={toBook} aria-label={`Link to ${title}`}>
                    {title}
                  </Link>
                </h2>
                {book.coverImage && <Img fluid={book.coverImage.imageFile.childImageSharp.fluid} />}
                <div className="book-excerpt" dangerouslySetInnerHTML={{ __html: book.excerpt }} />
                <Box my={3}>
                  <Button
                    onClick={() => navigate(toBook)}
                    variant="buttons.tertiary"
                    sx={{ display: `block`, mx: `auto`, maxWidth: 300, width: `100%` }}
                    aria-label={`Link to ${title}`}
                  >
                    Learn More
                  </Button>
                </Box>
                {idx !== books.length - 1 && <hr mx={3} />}
              </li>
            )
          })}
        </ul>
      </article>
    </Layout>
  )
}

export default BooksPage

export const query = graphql`
  query GET_BOOKS {
    themeConfig {
      booksBase
    }
    wpgraphql {
      booksAndPublications {
        bookList: books {
          books {
            bookTitle
            coverImage {
              databaseId
              modified
              sourceUrl
              imageFile {
                childImageSharp {
                  fluid(maxWidth: 320) {
                    src
                    srcSet
                    base64
                  }
                }
              }
            }
            dateAvailableForPurchase
            excerpt
            id
            slug
          }
        }
      }
    }
  }
`
