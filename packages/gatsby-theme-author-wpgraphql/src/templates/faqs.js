/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql, Link } from "gatsby"
import Layout from 'gatsby-theme-author-base/src/components/layout';
import Seo from 'gatsby-theme-author-base/src/components/seo'

const FaqPage = ({location, data}) => {
  const {
    themeConfig: {
      faqBase
    },
    wpgraphql: {
      frequentlyAskedQuestions: {
        faq: {
          faqs
        },
      },
    },
  } = data
  return (
    <Layout location={location}>
      <Seo 
        type="website" 
        title="Frequently Asked Questions"
      />
      <h2>Frequently Asked Questions</h2>
      {faqs.map((faq, idx) => (
        <div key={faq.id} sx={{ backgroundColor: idx % 2 === 1 ? 'gray.3' : `transparent`, padding: 15}}>
          <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
            <h3>
              <Link 
                sx={{color: "primary", '&:hover': { color: 'secondary', cursor: 'pointer' }}} 
                to={`${faqBase}/${faq.slug}`} 
                dangerouslySetInnerHTML={{__html:faq.question}} 
              />
            </h3>
            <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <div itemProp="text" dangerouslySetInnerHTML={{__html: faq.answer}} />
            </div>
          </div>
        </div>
      ))}
    </Layout>
  )
}

export default FaqPage

export const query = graphql`
  query GET_FAQS {
    themeConfig {
      faqBase
    }
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