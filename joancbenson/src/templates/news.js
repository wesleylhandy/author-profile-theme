/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql, useStaticQuery } from "gatsby"
import Layout from "../components/layout"
import Seo from '../components/seo'
import NewsMentionsList from "../components/news-mentions"

const NewsPage = ({location}) => {
    const data = useStaticQuery(graphql`
      query {
        meta: site {
          siteMetadata {
            socialLinks {
              phone {
                link
                text
              }
              email {
                link
                text
              }
            }
          }
        }
        themeConfig {
          newsBase
        }
        wpgraphql {
          news: inTheNews {
            InTheNews {
              newsMentions {
                description
                link
                title
              }
            }
          }
        }
      }
    `)
      const {
        themeConfig: {
          newsBase
        },
          wpgraphql: {
            news: {
              InTheNews: {
                newsMentions
              },
            },
          },
        } = data
      return (
          <Layout location={location}>
            <Seo 
              type="website" 
              title="In The News Page"
              description="Links to articles, blogs, and other places Joan C. Benson and her books are mentioned on the web."
            />
            <section>
              <NewsMentionsList heading="In The News" mentions={newsMentions} limit={Infinity} newsBase={newsBase} type={"full-list"} />
            </section>
          </Layout>
      )
  }
  
  export default NewsPage