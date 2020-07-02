import React from "react"
import Layout from "gatsby-theme-author-base/src/components/layout"
import BookListWidget from "gatsby-theme-author-wpgraphql/src/components/book-list-widget"
import PostListWidget from "gatsby-theme-author-wpgraphql/src/components/post-list-widget"
import EventListWidget from "gatsby-theme-author-wpgraphql/src/components/event-list-widgets"

const IndexPage = ({location}) => (
    <Layout location={location}>
        <BookListWidget heading="My Books"/>
        <EventListWidget heading="Upcoming Events" />
        <PostListWidget heading="Recent Posts" limit={4} />
    </Layout>
)

export default IndexPage