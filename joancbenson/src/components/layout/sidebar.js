/** @jsx jsx */
import { useRef } from 'react'
import PropTypes from 'prop-types'
import BookListWidget from '../widgets/book-list-widget'
import PostListWidget from '../widgets/post-list-widget'
import EventListWidget from '../widgets/event-list-widget'
import AboutWidget from "../widgets/about-widget"
import { jsx, Flex } from 'theme-ui'
import MediaKitWidget from '../widgets/media-kit-widget'

const Sidebar = ({ hideBooksWidget, hideEventsWidget, hidePostsWidget, hideAboutWidget, hideMediaKitWidget }) => {
  const fictionFinder = useRef(null)
  return (
    <aside
      sx={{
        flex: `1 0 320px`,
      }}
    >
      <AboutWidget heading="About Me" hide={hideAboutWidget} />
      <MediaKitWidget heading="Media Kits" hide={hideMediaKitWidget} />
      <BookListWidget heading="My Books" hide={hideBooksWidget} />
      <EventListWidget heading="Upcoming Events" limit={4} hide={hideEventsWidget} />
      <PostListWidget heading="Recent Posts" limit={4} hide={hidePostsWidget} />
      <Flex sx={{ justifyContent: `center`, alignItems: `center`, backgroundColor: "affiliations", p: 3, border: `5px solid`, borderColor: `primary` }} ref={fictionFinder}>
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
  hideMediaKitWidget: PropTypes.bool,
}

export default Sidebar
