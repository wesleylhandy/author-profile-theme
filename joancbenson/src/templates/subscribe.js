/** @jsx jsx */
import { jsx } from 'theme-ui'
import Layout from '../components/layout/layout'
import Seo from '../components/head/seo'
import MailchimpWidget from "../components/widgets/mailchimp-widget"

const SubscribePage = ({ location }) => {
  return (
    <Layout location={location} hideSidebar={true}>
      <Seo type="website" title="Subscribe" description={"Joan C. Benson regularly posts to her blog and will be promoting her writings and events via her newsletter. Subscribe here."}/>
      <section sx={{flex: "1 1 auto"}} id="subscribe">
        <h1 sx={{textAlign: "center"}}>Subscribe To My Newsletter</h1>
        <MailchimpWidget heading={""} showBorders={false} />
      </section>
    </Layout>
  )
}

export default SubscribePage
