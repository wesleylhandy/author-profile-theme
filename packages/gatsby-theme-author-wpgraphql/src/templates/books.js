import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from 'gatsby-theme-author-base/src/components/layout'
import Book from 'gatsby-theme-author-base/src/components/book'

const BooksPage = ({ location, data }) => {
  const {
    wpgraphql: {
      booksAndPublications: {
        bookList: { books },
      },
    },
  } = data
  return (
    <Layout location={location}>
      {books.map((book, idx) => (
        <Book key={`book-${idx}`} {...book} />
      ))}
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
            slug
          }
        }
      }
    }
  }
`
