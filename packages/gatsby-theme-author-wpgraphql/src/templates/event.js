import React from "react"
import Layout from "@wesleylhandy/gatsby-theme-author-base/src/components/layout"
import Event from "@wesleylhandy/gatsby-theme-author-base/src/components/event"
import Seo from '@wesleylhandy/gatsby-theme-author-base/src/components/seo'

const EventTemplate = ({location, pageContext: {
    event
}}) => {
    return (
    <Layout location={location}>
      <Seo
        type="event"
        title={`${event.eventName} | Event`}
        schema={event}
      />
      <Event {...event} />
    </Layout>
  )
}
  
  export default EventTemplate