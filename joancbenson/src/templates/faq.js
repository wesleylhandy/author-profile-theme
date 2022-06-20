import React from "react"
import Layout from "../components/layout/layout"
import Faq from "../components/faq"
import Seo from '../components/head/seo'

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