import React from "react"
import Layout from "gatsby-theme-author-base/src/components/layout"
import Book from "gatsby-theme-author-base/src/components/book"
import Seo from 'gatsby-theme-author-base/src/components/seo'

const BookTemplate = ({location, pageContext: { book: { seo = {}, endorsements, excerpt, ...book }}}) => {
    const title = seo.seoTitle
    const description = seo.seoDescription
    const image = seo.socialSharingImage ? seo.socialSharingImage.imageFile.childImageSharp.fixed : null
    console.log(book)
    console.log(endorsements)
    return (
    <Layout location={location}>
      <Seo 
        type="book" 
        title={`${title} | Books`}
        description={description}
        image={image}
        schema={book}
      />
      <Book endorsements={endorsements} excerpt={excerpt} {...book} />
    </Layout>
  )
}
  
  export default BookTemplate