/** @jsx jsx */
import { jsx, Button, Flex, Box } from 'theme-ui'
import { graphql, Link, navigate } from 'gatsby'
import Layout from 'gatsby-theme-author-base/src/components/layout'
import Seo from 'gatsby-theme-author-base/src/components/seo'
import { convertToTimeZone } from 'gatsby-theme-author-base/src/utils/time-helpers'
import EventDate from 'gatsby-theme-author-base/src/components/event-date'

const EventsPage = ({ location, data }) => {
  const {
    meta: {
      siteMetadata: {
        socialLinks: {
          phone,
          email,
        }
      }
    },
    themeConfig: { eventsBase },
    wpgraphql: {
      eventsAndSpeakingEngagements: {
        events: { events },
      },
    },
  } = data
  return (
    <Layout location={location}>
      <Seo type="website" title="Events Page" />
      <Box>
        <h2>Joan Can Speak At Your Next Event</h2>
        <p>
          Joan C. Benson speaks regularly as to women's groups, women's ministry events, single's
          events, parenting workshops, luncheons, retreats, and youth groups. She will also be
          co-hosting a podcast beginning in January 2021 (details to come). If you would like to
          request Joan to speak at your next event, please contact her at{' '}
          <a href={email.link}>{email.text}</a> or by phone{' '}
          <a href={phone.link}>{phone.text}</a>.
        </p>
      </Box>
      <Flex sx={{ flexDirection: [`column`, `row`]}}>
        <article
          sx={{
            flex: `1 1 50%`,
            position: `relative`,
            border: `5px solid`,
            borderColor: `primary`,
            my: 3,
            p: 3,
            order: 1,
          }}
        >
          <h2>Topics</h2>
          <ul>
            <li>
              <h3>Joy in the Journey</h3>
              <p>
                Though life may toss some surprising, or not so surprising, trials our way, they are
                a part of our journey in life. When we lean in to the Lord, He will give us rest and
                the grace to make it through. How we navigate through those times is the key to
                successful living.
              </p>
            </li>
            <li>
              <h3>Tears and Laughter</h3>
              <p>
                Being a woman often takes us to places with many hills and valleys, ups and downs.
                How do we deal with them successfully? We can be strong. We can be victorious. We
                also need a healthy release for our emotions through laughter and a reality that
                it&rsquo;s okay to cry at times.
              </p>
            </li>
            <li>
              <h3>Relationships/Friendships</h3>
              <p>
                We are made by Creator God for relationship. What does this look like and how is it
                different for us as women? How can we develop meaningful relationships with other
                women, and become stronger through our sisterhood?
              </p>
            </li>
            <li>
              <h3>Ordinary Women&mdash;Extraordinary God</h3>
              <p>
                This theme encourages women going through tough times to see that the outcomes
                aren't dependent on them. 2 Corinthians 4:7: &ldquo;My grace is sufficient for you,
                for My strength is made perfect in weakness. Therefore most gladly I will rather
                boast in my infirmities, that the power of Christ may rest upon me.&rdquo;
              </p>
            </li>
            <li>
              <h3>Single Again and Christian</h3>
              <p>
                Beginning new relationships after a divorce can be a sticky wicket. Our culture
                sometimes has invaded some Christians&rsquo; minds, sometimes even using scripture
                to support positions contrary to scripture. How do we walk through this maze to find
                a suitable partner for life?
              </p>
            </li>
            <li>
              <h3>Unplanned Pregnancies and Christianity</h3>
              <p>
                The way God has made a woman&rsquo;s heart to nurture and value life should
                influence decision-making. What seems so simple is very complex, indeed, especially
                for a person who desires a relationship with the Lord God, Creator.
              </p>
            </li>
            <li>
              <h3>Mental Illness in Ones You Love</h3>
              <p>
                When someone near you is struggling, how do you recognize the signs that they need
                help? Where do you turn for both yourself and the other in need?
              </p>
            </li>
            <li>
              <h3>Christian Grandparenting</h3>
              <p>
                No greater joy, yet how does God desire grandparents to feed His little lambs? With
                this blessing comes spiritual responsibility to pass on your legacy of faith.
              </p>
            </li>
            <li>
              <h3>Growing Old and Finding Purpose</h3>
              <p>
                Does our vision for living change as we age? How do we find the place God wants us
                to be, and find our purpose anew? The Bible shows us how to dwell in His presence
                even when our physical activity wanes.
              </p>
            </li>
            <li>
              <h3>Adoption</h3>
              <p>
                We are adopted into the Heavenly Kingdom as spiritual children, chosen and adopted
                as His. Physical adoption should be similar as a child becomes a part of a
                family&rsquo;s personal history, blessed by their love and privileges.
              </p>
            </li>
          </ul>
        </article>
        <Box sx={{flex: `1 0 50%`, order: 0}}>
          <aside
            sx={{
              border: `5px solid`,
              borderColor: `primary`,
              mx: `auto`,
              my: 3,
              p: 3,
              mr: [0, 3]
            }}
          >
            <h2>Recent Events</h2>
            {events
              .sort((a, b) => a.startDatetime - b.startDatetime)
              .map((event, idx) => {
                const timezone = '-05:00'
                const start = convertToTimeZone({ datetime: event.startDatetime, timezone })
                const end = convertToTimeZone({ datetime: event.endDatetime, timezone })
                const toEvent = `${eventsBase}/${event.slug}`
                return (
                  <div
                    key={event.id}
                    sx={{ backgroundColor: idx % 2 === 1 ? 'light' : `transparent`, padding: 15 }}
                  >
                    <h3>
                      <Link to={toEvent} dangerouslySetInnerHTML={{ __html: event.eventName }} />
                    </h3>
                    <p>
                      <EventDate startDate={start} endDate={end} />
                    </p>
                    <Box my={3}>
                      <Button onClick={() => navigate(toEvent)} variant="buttons.tertiary">
                        Learn More
                      </Button>
                    </Box>
                  </div>
                )
              })}
          </aside>
        </Box>
      </Flex>
    </Layout>
  )
}

export default EventsPage

export const query = graphql`
  query {
    meta: site {
      siteMetadata {
        socialLinks {
          email {
            link
            text
          }
          phone {
            link
            text
          }
        }
      }
    }
    themeConfig {
      eventsBase
    }
    wpgraphql {
      eventsAndSpeakingEngagements {
        events {
          events {
            endDatetime
            eventDescription
            eventAdmission {
              admissionPrice
              onSaleDate
              ticketAvailability
              ticketPurchaseUrl
            }
            eventLocation {
              url
              venue
              address {
                city
                postalCode
                state
                streetAddress
              }
            }
            eventType
            eventName
            id
            slug
            startDatetime
            featuredImage {
              databaseId
              modified
              sourceUrl
              imageFile {
                childImageSharp {
                  fluid(maxWidth: 640) {
                    base64
                    src
                    srcSet
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
