/** @jsx jsx */
import Layout from '../components/layout/layout'
import Seo from '../components/head/seo'
import { jsx, Link as ExternalLink } from 'theme-ui'
import { graphql, Link, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'

const AboutPage = ({ location }) => {
  const data = useStaticQuery(graphql`
    query {
      headshot: file(name: { eq: "headshot-media" }, extension: { eq: "jpg" }) {
        childImageSharp {
          fluid(maxWidth: 640) {
            ...GatsbyImageSharpFluid_withWebp_tracedSVG
          }
        }
      }
      powerCert: file(name: { eq: "power-speaker-cert" }, extension: { eq: "png" }) {
        childImageSharp {
          fluid(maxWidth: 640) {
            ...GatsbyImageSharpFluid_withWebp_tracedSVG
          }
        }
      }
    }
  `)
  const headshot = data.headshot.childImageSharp.fluid
  const powerCert = data.powerCert.childImageSharp.fuild
  return (
    <Layout location={location}>
      <Seo type="website" title="About Page" description={"Joan C. Benson is a free-lance writer & blogger, published in multiple magazines, on devotional websites, by children's ministry publishers, and now with her first novel - His Gift."}/>
      <article sx={{ backgroundColor: "affiliations", px: 3 }}>
        <h1 id="about">About Joan C. Benson</h1>
        <Img
          fluid={headshot}
          alt="Joan C. Benson, Media-Kit Headshot"
        />
        <p>
          Joan C. Benson is a free-lance writer published in multiple magazines including
          LifeWay&rsquo;s &ldquo;ParentLife,&rdquo; Regent University&rsquo;s &ldquo;The Christian
          Leader,&rdquo; Royal Rangers &ldquo;High Adventure,&rdquo; Focus on the Family
          online, and others. Some of her devotionals are published on{' '}
          <ExternalLink href="https://www1.cbn.com/profiles/benson-joan">CBN.com</ExternalLink>.
          Benson also has many years of experience writing children&rsquo;s ministry publications for LifeWay Publishing.
          She maintains an ongoing blog, which can be found on the website. Her first historical fiction novel,{' '}
          <Link to={`/books/his-gift`}>
            <i>His Gift</i>
          </Link>
          {' '}was published through{' '}
          <ExternalLink href="https://www.elklakepublishinginc.com/joan-benson/">Elk Lake Publishing, Inc.</ExternalLink>, in 2020.
        </p>
        <p>
          Benson has co-authored a series of four children&rsquo;s picture books which are under contract. 
          Another current project is a contemporary fiction novel, expected to be finished in 2022.
        </p>
        <p>
          Be in the know by subscribing to the <Link to={`/subscribe`}><i>newsletter</i></Link>.
        </p>
        <h2>Fiction Author Applying Biblical Principles</h2>
        <p>
          Combining her passion for people and her faith in God, she has a desire to write stories
          for young adults and adults alike. While teaching young adult fiction in the schools, she
          saw a dearth of literature containing Scriptural truths. She desires to create stories
          that are not only interesting and entertaining, but which contain Biblical principles
          lacking in today&rsquo;s culture. Joan instills the hope of Christ for the suffering, the
          disappointed, and the hopeless. She points those who have had their dreams dashed to the
          One who offers wisdom beyond the world&rsquo;s.
        </p>
        <h2>Debut Historical Fiction</h2>
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
        <h2>Educator</h2>
        <p>
          Joan lives in Chesapeake, VA, with her husband and their two Bichon Frisé dogs. She is the
          mother of four married adult children, and a very proud grandmother of eight amazing
          grandchildren. Joan is a former Christian and public school educator, having taught grades
          from primary through middle school. She served as a reading specialist, teacher trainer,
          and has been writing for educational publishing companies for over twenty-five years.
        </p>
        <h2>Speaker</h2>
        <p>
          Joan is a part of a small group of women from Chesapeake, VA, called{' '}
          <ExternalLink href="https://www.facebook.com/groups/womenvictorious" sx={{ wordBreak: 'unset !important' }}>
            &ldquo;Women Victorious&mdash;Ordinary Women, Extraordinary God.&rdquo;
          </ExternalLink>{' '}
          The women formed the group to encourage, empower, and inspire women to find victory and
          hope through Jesus Christ during trials. They pray to help women through their testimonies
          and worship experiences while addressing relevant issues facing today&rsquo;s women from a
          biblical perspective. Joan also speaks independently, and has spoken at women&rsquo;s
          ministry events, retreats, and youth groups.
        </p>
        <ExternalLink
          href="https://awsa.com/?p=6886"
          aria-label="Link to The P.O.W.E.R Speaker Certification"
          sx={{
            maxHeight: 60,
            my: 3,
          }}
        >
          <Img
            fluid={powerCert}
            alt="Joan C. Benson is an AWSA P.O.W.E.R Certified Speaker"
          />
        </ExternalLink>
      </article>
    </Layout>
  )
}

export default AboutPage
