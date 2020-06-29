import React from "react"
import Layout from "gatsby-theme-author-base/src/components/layout"
import Event from "gatsby-theme-author-base/src/components/event"

const EventTemplate = ({location, pageContext: {
    event
}}) => {
    return (
    <Layout location={location}>
      <Event {...event} />
    </Layout>
  )
}
  
  export default EventTemplate