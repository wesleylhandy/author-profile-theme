/** @jsx jsx */
import { jsx } from 'theme-ui'
import Layout from '@wesleylhandy/gatsby-theme-author-base/src/components/layout'
import Seo from '@wesleylhandy/gatsby-theme-author-base/src/components/seo'
import MailchimpWidget from "../components/mailchimp-widget"

const SubscribePage = ({ location }) => {
  return (
    <Layout location={location} hideSidebar={true}>
      <Seo type="website" title="Subscribe Page" description={"Joan C. Benson regularly posts to her blog and will be promoting her writings and events via her newsletter. Subscribe here."}/>
      <section sx={{flex: "1 1 auto", display: "flex", flexDirection: ["column", "column", "row"]}}>
        <h1>Subscribe To My Newsletter</h1>
        <MailchimpWidget heading={""} />
      </section>
    </Layout>
  )
}

export default SubscribePage
