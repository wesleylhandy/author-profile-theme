import React from "react"
import { graphql, Link } from "gatsby"
import Layout from 'gatsby-theme-author-base/src/components/layout';
import Faq from "gatsby-theme-author-base/src/components/faq"

const FaqPage = ({location, data}) => {
    const {
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
            {faqs.map((faq, idx) => <Faq key={`faq-${idx}`} {...faq} />)}
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