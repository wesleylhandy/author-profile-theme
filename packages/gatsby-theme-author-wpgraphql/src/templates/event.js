import React from "react"
import Layout from "gatsby-theme-author-base/src/components/layout"
import Event from "gatsby-theme-author-base/src/components/event"
import Seo from 'gatsby-theme-author-base/src/components/seo'

const EventTemplate = ({location, pageContext: {
    event
}}) => {
    console.log(event)
    return (
    <Layout location={location}>
      <Seo
        type="event"
        schema={event}
      />
      <Event {...event} />
    </Layout>
  )
}
  
  export default EventTemplate