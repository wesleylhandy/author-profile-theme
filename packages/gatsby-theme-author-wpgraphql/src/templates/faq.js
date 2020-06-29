import React from "react"
import Layout from "gatsby-theme-author-base/src/components/layout"
import Faq from "gatsby-theme-author-base/src/components/faq"

const FaqTemplate = ({location, pageContext: {
    faq
}}) => {
    return (
    <Layout location={location}>
      <Faq {...faq} />
    </Layout>
  )
}
  
  export default FaqTemplate