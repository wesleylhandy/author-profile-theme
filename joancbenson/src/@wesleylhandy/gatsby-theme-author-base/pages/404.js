/** @jsx jsx */
import { jsx, Button } from 'theme-ui'
import { navigate } from "gatsby"
import Layout from '@wesleylhandy/gatsby-theme-author-base/src/components/layout'
import Seo from '@wesleylhandy/gatsby-theme-author-base/src/components/seo'

const FourOhFour = ({location}) => (
    <Layout heading="404 Not Found" location={location} hideSidebar={true}>
        <Seo type="website" title="404 Page | Not Found" />
        <article>
            <h1>Not Found</h1>
            <p>I'm sorry, the page you were looking for does not exist...</p>
            <Button aria-label="Back to Home Page" onClick={() => navigate("/")}>Back to Home Page</Button>
        </article>
    </Layout>
)

export default FourOhFour