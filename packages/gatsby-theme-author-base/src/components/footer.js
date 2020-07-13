/** @jsx jsx */
import React from 'react'
import { jsx, Flex, Box, Link as ExternalLink } from 'theme-ui'
import { useStaticQuery, graphql, Link } from 'gatsby'
import {
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaGoodreadsG,
  FaLinkedinIn,
  FaPhone,
  FaYoutube,
  FaAt,
  FaAmazon,
  FaWordpressSimple,
} from 'react-icons/fa'

const Footer = () => {
  const data = useStaticQuery(graphql`
    query {
      meta: site {
        siteMetadata {
          title
          organization {
            name
            url
          }
          designer {
            name
            url
          }
          socialLinks {
            twitter
            linkedin
            facebook
            instagram
            youtube
            email {
              link
              text
            }
            phone {
              link
              text
            }
            goodreads
            pinterest
            amazon
            wordpress
          }
        }
      }
      allSitePage(
        filter: {
          path: {
            regex: "/^/(?!(404)|(.*404.*)|(offline-plugin-app-shell-fallback))([0-9a-z-_])*/*$/i"
          }
        }
        sort: { fields: context___sortOrder }
      ) {
        links: nodes {
          path
          context {
            navLink
          }
        }
      }
    }
  `)
  const {
    meta: {
      siteMetadata: {
        title,
        organization: { name, url },
        designer,
        socialLinks: {
          twitter,
          linkedin,
          facebook,
          instagram,
          youtube,
          email,
          phone,
          goodreads,
          pinterest,
          amazon,
          wordpress,
        },
      },
    },
    allSitePage: { links },
  } = data
  return (
    <footer
      id="colophon"
      sx={{
        p: 3,
        backgroundColor: `secondary`,
        borderTop: `10px solid`,
        borderTopColor: `primary`,
        position: `relative`,
      }}
    >
      <Flex
        sx={{
          flexDirection: [`column`, `row`],
          justifyContent: [`center`, `space-around`],
          alignItems: `flex-start`,
          flexWrap: `wrap`,
          my: 3,
          maxWidth: `max`,
          margin: `0 auto`,
        }}
      >
        <Flex
          sx={{
            flexDirection: `column`,
            maxWidth: `175px`,
            my: 3,
            mx: [`auto`, 0],
            alignItems: [`center`, `flex-start`],
          }}
        >
          <h4 sx={{ textDecoration: `underline`, fontWeight: `bold`, fontSize: 4 }}>Contact</h4>
          {email && (
            <ExternalLink
              sx={{ my: 1 }}
              variant="footer"
              href={email.link}
              aria-label={`Link to ${email.text}`}
            >
              <FaAt sx={{ mr: 2 }} />
              By Email
            </ExternalLink>
          )}
          {phone && (
            <ExternalLink
              sx={{ my: 1 }}
              variant="footer"
              href={phone.link}
              aria-label={`Link to ${phone.text}`}
            >
              <FaPhone sx={{ mr: 2 }} />
              By Phone
            </ExternalLink>
          )}
        </Flex>
        <Flex
          sx={{
            flexDirection: `column`,
            maxWidth: `175px`,
            my: 3,
            mx: [`auto`, 0],
            alignItems: [`center`, `flex-start`],
          }}
        >
          <h4 sx={{ textDecoration: `underline`, fontWeight: `bold`, fontSize: 4 }}>Content</h4>
          <Link
            key={`Home-Link-Footer`}
            to="/"
            sx={{
              color: 'text',
              fontWeight: `bold`,
              textDecoration: `none`,
              fontSize: 4,
              my: 1,
              transition: `color 250ms ease-in-out, background-color 250ms ease-in-out`,
              '&:hover': {
                color: 'tertiary',
                cursor: 'pointer',
              },
            }}
            aria-label={`Link to Home Page`}
          >
            Home
          </Link>
          {links.map(
            ({ path, context: { navLink } }, idx) =>
              navLink && (
                <>
                  <Link
                    key={`footer-${path}-${idx}`}
                    sx={{
                      color: 'text',
                      fontWeight: `bold`,
                      display: `flex`,
                      justifyContent: `flex-start`,
                      alignItems: `center`,
                      transition: `color 250ms ease-in-out, background-color 250ms ease-in-out`,
                      textDecoration: `none`,
                      fontSize: 4,
                      cursor: `pointer`,
                      my: 1,
                      '&:hover': {
                        color: 'tertiary',
                        cursor: 'pointer',
                      },
                    }}
                    to={path}
                    aria-label={`Link to ${navLink}`}
                  >
                    {navLink}
                  </Link>
                </>
              )
          )}
        </Flex>
        <Flex
          sx={{
            flexDirection: `column`,
            maxWidth: `175px`,
            my: 3,
            mx: [`auto`, 0],
            alignItems: [`center`, `flex-start`],
          }}
        >
          <h4 sx={{ textDecoration: `underline`, fontWeight: `bold`, fontSize: 4 }}>
            Follow me on Social
          </h4>
          {twitter && (
            <ExternalLink
              sx={{ my: 1 }}
              variant="footer"
              href={twitter}
              aria-label={`Link to ${twitter}`}
            >
              <FaTwitter sx={{ mr: 2 }} />
              Twitter
            </ExternalLink>
          )}
          {facebook && (
            <ExternalLink
              sx={{ my: 1 }}
              variant="footer"
              href={facebook}
              aria-label={`Link to ${facebook}`}
            >
              <FaFacebookF sx={{ mr: 2 }} />
              Facebook
            </ExternalLink>
          )}
          {linkedin && (
            <ExternalLink
              sx={{ my: 1 }}
              variant="footer"
              href={linkedin}
              aria-label={`Link to ${linkedin}`}
            >
              <FaLinkedinIn sx={{ mr: 2 }} />
              LinkedIn
            </ExternalLink>
          )}
          {instagram && (
            <ExternalLink
              sx={{ my: 1 }}
              variant="footer"
              href={instagram}
              aria-label={`Link to ${instagram}`}
            >
              <FaInstagram sx={{ mr: 2 }} />
              Instagram
            </ExternalLink>
          )}
          {youtube && (
            <ExternalLink
              sx={{ my: 1 }}
              variant="footer"
              href={youtube}
              aria-label={`Link to ${youtube}`}
            >
              <FaYoutube sx={{ mr: 2 }} />
              YouTube
            </ExternalLink>
          )}
          {pinterest && (
            <ExternalLink
              sx={{ my: 1 }}
              variant="footer"
              href={pinterest}
              aria-label={`Link to ${pinterest}`}
            >
              <FaPinterestP sx={{ mr: 2 }} />
              Pinterest
            </ExternalLink>
          )}
          {goodreads && (
            <ExternalLink
              sx={{ my: 1 }}
              variant="footer"
              href={goodreads}
              aria-label={`Link to ${goodreads}`}
            >
              <FaGoodreadsG sx={{ mr: 2 }} />
              Goodreads
            </ExternalLink>
          )}
          {wordpress && (
            <ExternalLink
              sx={{ my: 1 }}
              variant="footer"
              href={wordpress}
              aria-label={`Link to ${wordpress}`}
            >
              <FaWordpressSimple sx={{ mr: 2 }} />
              Wordpress
            </ExternalLink>
          )}

          {amazon && (
            <ExternalLink
              sx={{ my: 1 }}
              variant="footer"
              href={amazon}
              aria-label={`Link to ${amazon}`}
            >
              <FaAmazon sx={{ mr: 2 }} />
              Amazon
            </ExternalLink>
          )}
        </Flex>
      </Flex>
      <Flex
        sx={{
          flexDirection: [`column`, `row`],
          justifyContent: `center`,
          alignItems: `center`,
          my: 3,
          color: '',
          textAlign: `center`,
        }}
      >
        &copy; {new Date().getFullYear()}{' '}
        <ExternalLink
          variant="footer"
          href={url}
          aria-label="Link to Home Page"
          sx={{ mx: [0, 2] }}
        >
          {name}
        </ExternalLink>
        Design by{' '}
        <ExternalLink
          variant="footer"
          href={designer.url}
          aria-label={`Link to Creativ, LLC`}
          sx={{ ml: [0, 2] }}
        >
          {designer.name}
        </ExternalLink>
      </Flex>
    </footer>
  )
}

export default Footer
