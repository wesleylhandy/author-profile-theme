import React from "react"
import Layout from "../components/layout"
import Book from "../components/book"
import Seo from '../components/seo'

const BookTemplate = ({location, pageContext: { book: { seo = {}, ...book }}}) => {
    const title = seo.seoTitle
    const description = seo.seoDescription
    const image = seo.socialSharingImage ? seo.socialSharingImage.imageFile.childImageSharp.fixed : null
    return (
    <Layout location={location}>
      <Seo 
        type="book" 
        title={`${title} | Books`}
        description={description}
        image={image}
        schema={book}
      />
      <Book {...book} />
    </Layout>
  )
}
  
export default BookTemplate