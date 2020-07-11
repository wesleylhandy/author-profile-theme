import React from "react"
import Layout from "gatsby-theme-author-base/src/components/layout"
import Faq from "gatsby-theme-author-base/src/components/faq"
import Seo from 'gatsby-theme-author-base/src/components/seo'

const FaqTemplate = ({location, pageContext: {
    faq
}}) => {
    return (
    <Layout location={location}>
      <Seo 
        type="website" 
        title={`${faq.question} | FAQS`}
      />
      <Faq {...faq} />
    </Layout>
  )
}
  
  export default FaqTemplate