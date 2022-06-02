import React from "react"
import Layout from "../components/layout"
import Event from "../components/event"
import Seo from '../components/seo'

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