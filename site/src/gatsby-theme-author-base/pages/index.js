/** @jsx jsx */
import Layout from 'gatsby-theme-author-base/src/components/layout'
import BookListWidget from 'gatsby-theme-author-wpgraphql/src/components/book-list-widget'
import PostListWidget from 'gatsby-theme-author-wpgraphql/src/components/post-list-widget'
import EventListWidget from 'gatsby-theme-author-wpgraphql/src/components/event-list-widgets'
import { Flex, Box, jsx } from 'theme-ui'
import Img from 'gatsby-image'
import { useStaticQuery, graphql, Link } from 'gatsby'

const IndexPage = ({ location }) => {
  const data = useStaticQuery(graphql`
    query {
      headshot: file(name: { eq: "headshot" }, extension: { eq: "png" }) {
        childImageSharp {
          fixed(width: 150) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)
  const headshot = data.headshot.childImageSharp.fixed
  return (
    <Layout location={location}>
      <Flex
        sx={{
          flexDirection: [`column`, `row`]
        }}
      >
        <Flex
          sx={{
            flex: `1 1 auto`,
            position: `relative`,
            border: `5px solid`,
            borderColor: `primary`,
            my: 3,
            mr: [0, 3],
            p: 3,
            alignItems: `center`,
            justifyContent: `center`
            
          }}
        >
          <article>
            <Box sx={{position: `relative`, pb: 148 }} id="welcome">
              <h2>Welcome To My Website</h2>
              <p>
                I hope you find many useful and interesting features on my website which may give you
                hope for your daily faith walk. My prayer is that the Lord will satisfy your soul in the
                dry times, and you will flourish like a spring of water, as Isaiah says in Chapter
                58:11. I pray you will find spiritual refreshment within these pages, on my Blog, in my
                book, and through my personal experiences. We can journey together and be stronger for
                doing so. Please contact me, ask questions, comment, invite me to speak, and listen to
                my podcast as it begins in 2021. I want to join you as we seek God&rsquo;s peace and
                wisdom for living in this season. May we each grow as we do so together.
              </p>
              <Img
                fixed={headshot}
                alt="Joan C. Benson"
                sx={{
                  position: 'absolute !important',
                  bottom: 0,
                  right: 0,
                  zIndex: 1,
                }}
              />
            </Box>
            <hr sx={{mb: 4, height: 4, backgroundColor: `primary`, border: 0}} />
            <h2 id="about">About Joan C. Benson</h2>
            <p>Joan C. Benson is a free-lance writer published in multiple magazines including LifeWay&rsquo;s &ldquo;ParentLife,&rdquo;  Regent University&rsquo;s &ldquo;The Christian Leader,&rdquo; Royal Rangers &ldquo;High Adventure,&rdquo; and multiple others. Several of her devotional writings have been published on CBN.com. Joan also has many years of experience writing children&rsquo;s ministry publications for LifeWay Publishing for use in both Sunday School and home settings. She is a blogger, and is recently publishing her first historical fiction novel, His Gift through Elk Lake Publishing.</p>
            <h3>Fiction Author Applying Biblical Principles</h3>
            <p>Combining her passion for people and her faith in God, she has a desire to write stories for young adults and adults alike. While teaching young adult fiction in the schools, she saw a dearth of literature containing Scriptural truths. She desires to create stories that are not only interesting and entertaining, but which contain Biblical principles lacking in today&rsquo;s culture. Joan instills the hope of Christ for the suffering, the disappointed, and the hopeless. She points those who have had their dreams dashed to the One who offers wisdom beyond the world&rsquo;s.</p>
            <h3>Debut Historical Fiction</h3>
            <p>Watch for Joan&rsquo;s novel called <Link to={`/books/his-gift`}><i>His Gift</i></Link>, a historical story based on her mother&rsquo;s life growing up at the onset of The Great Depression. The story&rsquo;s setting is in a sweet little suburb of a then-thriving motor-city, Detroit, Michigan. The main character, Molly, is a gifted musician who worked hard to perfect her skill, and ultimately wins a student audition to perform with the Detroit Symphony. The timing is October, 1929, before the stock market crash. What will happen to Molly&rsquo;s dreams as the world scrambles and turns upside down before her eyes. Where is God in her story? You will enjoy seeing how Molly navigates through very unsettling times and how even through doubts and fears, she finds victory.</p>
            <h3>Educator</h3>
            <p>Joan lives in Chesapeake, VA, with her husband and their two Bichon Frisé dogs. She is the mother of four married adult children, and a very proud grandmother of eight amazing grandchildren. Joan is a former Christian and public school educator, having taught grades from primary through middle school. She served as a reading specialist, teacher trainer, and has been writing for educational publishing companies for over twenty-five years.</p>
            <h3>Speaker</h3>
            <p>Joan is a part of a small group of women from Chesapeake, VA, called &ldquo;Women Victorious—Ordinary Women, Extraordinary God.&rdquo; The women formed the group to encourage, empower, and inspire women to find victory and hope through Jesus Christ during trials. They pray to help women through their testimonies and worship experiences while addressing relevant issues facing today&rsquo;s women from a biblical perspective. See Facebook under their title name. Joan also speaks independently, and has spoken at women&rsquo;s ministry events, retreats, and youth groups.</p>
          </article>
          
        </Flex>
        <aside
          sx={{
            flex: `1 0 320px`,
          }}
        >
          <BookListWidget heading="My Books" />
          <EventListWidget heading="Upcoming Events" />
          <PostListWidget heading="Recent Posts" limit={4} />
        </aside>
      </Flex>
    </Layout>
  )
}

export default IndexPage
