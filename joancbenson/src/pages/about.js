/** @jsx jsx */
import Layout from '@wesleylhandy/gatsby-theme-author-base/src/components/layout'
import Seo from '@wesleylhandy/gatsby-theme-author-base/src/components/seo'
import { Flex, Box, jsx, Link as ExternalLink } from 'theme-ui'
import { Link } from 'gatsby'

const AboutPage = ({ location }) => {
  return (
    <Layout location={location}>
      <Seo type="website" title="About Page" />
      <article>
        <h2 id="about">About Joan C. Benson</h2>
        <p>
          Joan C. Benson is a free-lance writer published in multiple magazines including
          LifeWay&rsquo;s &ldquo;ParentLife,&rdquo; Regent University&rsquo;s &ldquo;The Christian
          Leader,&rdquo; Royal Rangers &ldquo;High Adventure,&rdquo; and multiple others. Several of
          her devotional writings have been published on{' '}
          <ExternalLink href="https://www1.cbn.com/profiles/benson-joan">CBN.com</ExternalLink>.
          Joan also has many years of experience writing children&rsquo;s ministry publications for
          LifeWay Publishing for use in both Sunday School and home settings. She is a blogger, and
          is recently publishing her first historical fiction novel,{' '}
          <Link to={`/books/his-gift`}>
            <i>His Gift</i>
          </Link>{' '}
          through Elk Lake Publishing.
        </p>
        <h3>Fiction Author Applying Biblical Principles</h3>
        <p>
          Combining her passion for people and her faith in God, she has a desire to write stories
          for young adults and adults alike. While teaching young adult fiction in the schools, she
          saw a dearth of literature containing Scriptural truths. She desires to create stories
          that are not only interesting and entertaining, but which contain Biblical principles
          lacking in today&rsquo;s culture. Joan instills the hope of Christ for the suffering, the
          disappointed, and the hopeless. She points those who have had their dreams dashed to the
          One who offers wisdom beyond the world&rsquo;s.
        </p>
        <h3>Debut Historical Fiction</h3>
        <p>
          Watch for Joan&rsquo;s novel called{' '}
          <Link to={`/books/his-gift`}>
            <i>His Gift</i>
          </Link>
          , a historical story based on her mother&rsquo;s life growing up at the onset of The Great
          Depression. The story&rsquo;s setting is in a sweet little suburb of a then-thriving
          motor-city, Detroit, Michigan. The main character, Molly, is a gifted musician who worked
          hard to perfect her skill, and ultimately wins a student audition to perform with the
          Detroit Symphony. The timing is October, 1929, before the stock market crash. What will
          happen to Molly&rsquo;s dreams as the world scrambles and turns upside down before her
          eyes. Where is God in her story? You will enjoy seeing how Molly navigates through very
          unsettling times and how even through doubts and fears, she finds victory.
        </p>
        <h3>Educator</h3>
        <p>
          Joan lives in Chesapeake, VA, with her husband and their two Bichon Frisé dogs. She is the
          mother of four married adult children, and a very proud grandmother of eight amazing
          grandchildren. Joan is a former Christian and public school educator, having taught grades
          from primary through middle school. She served as a reading specialist, teacher trainer,
          and has been writing for educational publishing companies for over twenty-five years.
        </p>
        <h3>Speaker</h3>
        <p>
          Joan is a part of a small group of women from Chesapeake, VA, called{' '}
          <ExternalLink href="https://www.facebook.com/groups/womenvictorious">
            &ldquo;Women Victorious—Ordinary Women, Extraordinary God.&rdquo;
          </ExternalLink>{' '}
          The women formed the group to encourage, empower, and inspire women to find victory and
          hope through Jesus Christ during trials. They pray to help women through their testimonies
          and worship experiences while addressing relevant issues facing today&rsquo;s women from a
          biblical perspective. Joan also speaks independently, and has spoken at women&rsquo;s
          ministry events, retreats, and youth groups.
        </p>
      </article>
    </Layout>
  )
}

export default AboutPage