/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Seo from '../components/seo'

const FaqPage = ({ location, data }) => {
  const {
    wpgraphql: {
      frequentlyAskedQuestions: {
        faq: { faqs },
      },
    },
  } = data
  return (
    <Layout location={location}>
      <Seo type="faq" title="Frequently Asked Questions" />
      <section>
        <h1>Frequently Asked Questions</h1>
        {faqs.map((faq, idx) => (
          <div
            key={faq.id}
            sx={{ backgroundColor: idx % 2 === 1 ? 'light' : `ultralight`, padding: 3 }}
          >
            <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
              <h2 itemProp="name" dangerouslySetInnerHTML={{ __html: faq.question }} />
              <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <div itemProp="text" dangerouslySetInnerHTML={{ __html: faq.answer }} />
              </div>
            </div>
          </div>
        ))}
      </section>
    </Layout>
  )
}

export default FaqPage

export const query = graphql`
  query GET_FAQS {
    wpgraphql {
      frequentlyAskedQuestions {
        faq {
          faqs {
            answer
            id
            isCanonical
            question
            slug
          }
        }
      }
    }
  }
`
