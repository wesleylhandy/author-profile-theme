/** @jsx jsx */
import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from "gatsby-image"
import { jsx } from "theme-ui"
import Layout from 'gatsby-theme-author-base/src/components/layout'
import Book from 'gatsby-theme-author-base/src/components/book'
import Seo from 'gatsby-theme-author-base/src/components/seo'

const BooksPage = ({ location, data }) => {
  const {
    themeConfig: {
      booksBase,
    },
    wpgraphql: {
      booksAndPublications: {
        bookList: { books },
      },
    },
  } = data
  return (
    <Layout location={location}>
      <Seo 
        type="website" 
        title="Books Page"
      />
      <article>
        <h2>My Books</h2>
        <ul>
        {books.map((book, idx) => (
          <li key={book.id}>
            <h3>
              <b>
                <Link 
                  sx={{color: "primary", '&:hover': { color: 'secondary', cursor: 'pointer' }}} 
                  to={`${booksBase}/${book.slug}`} 
                  dangerouslySetInnerHTML={{__html:book.bookTitle}} 
                />
              </b>
            </h3>
            {
              book.coverImage && <Img fluid={book.coverImage.imageFile.childImageSharp.fluid} />
            }
            <div className="book-excerpt" dangerouslySetInnerHTML={{__html: book.excerpt }} />
          </li>
        ))}
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
            slug
          }
        }
      }
    }
  }
`
