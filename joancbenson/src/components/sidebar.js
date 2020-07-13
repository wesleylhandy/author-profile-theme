/** @jsx jsx */
import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import BookListWidget from '@wesleylhandy/gatsby-theme-author-wpgraphql/src/components/book-list-widget'
import PostListWidget from '@wesleylhandy/gatsby-theme-author-wpgraphql/src/components/post-list-widget'
import EventListWidget from '@wesleylhandy/gatsby-theme-author-wpgraphql/src/components/event-list-widgets'
import { jsx, Flex } from 'theme-ui'

const Sidebar = ({ hideBooksWidget, hideEventsWidget, hidePostsWidget }) => {
  const fictionFinder = useRef(null)
  return (
    <aside
      sx={{
        flex: `1 0 320px`,
      }}
    >
      <BookListWidget heading="My Books" hide={hideBooksWidget} />
      <EventListWidget heading="Upcoming Events" limit={4} hide={hideEventsWidget} />
      <PostListWidget heading="Recent Posts" limit={4} hide={hidePostsWidget} />
      <Flex sx={{ justifyContent: `center`, alignItems: `center` }} ref={fictionFinder}>
        {' '}
        <a
          href="http://www.fictionfinder.com"
          target="_blank"
          sx={{ margin: `0 auto` }}
          rel="noopener noreferrer"
        >
          {' '}
          <img
            sx={{ border: 0 }}
            src="https://www.fictionfinder.com/images/fiction_finder_blog_button.png"
            alt="ACFW Fiction Finder"
            loading="lazy"
          />{' '}
        </a>{' '}
      </Flex>
    </aside>
  )
}

Sidebar.propTypes = {
  hideBooksWidget: PropTypes.bool,
  hideEventsWidget: PropTypes.bool,
  hidePostsWidget: PropTypes.bool,
}

export default Sidebar
