import React from "react"
import Layout from "gatsby-theme-author-base/src/components/layout"
import Book from "gatsby-theme-author-base/src/components/book"

const BookTemplate = ({location, pageContext: {
    book
}}) => {
    return (
    <Layout>
      <Book {...book} />
    </Layout>
  )
}
  
  export default BookTemplate