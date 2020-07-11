/** @jsx jsx */
import { jsx, Flex, Link as ExternalLink } from 'theme-ui'
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
        filter: { path: { regex: "/^/(?!(404)|(.*404.*)|(offline-plugin-app-shell-fallback))([0-9a-z-_])*/*$/i" } }
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
          justifyContent: `center`,
          alignItems: `center`,
          my: 3,
          mx: `auto`,
          textAlign: `center`,
        }}
      >
        <Link
          to="/"
          sx={{
            color: 'tertiary',
            fontWeight: `bold`,
            transition: `color 250ms ease-in-out, background-color 250ms ease-in-out`,
            '&:hover': {
              color: 'primary',
              cursor: 'pointer',
            },
          }}
        >
          {title}
        </Link>
      </Flex>
      <Flex
        sx={{
          justifyContent: `space-around`,
          alignItems: `center`,
          my: 3,
          mx: `auto`,
          maxWidth: 320,
        }}
      >
        {links.map(
          ({ path, context: { navLink } }, idx) =>
            navLink && (
              <Link
                key={`footer-${path}-${idx}`}
                sx={{
                  color: 'tertiary',
                  fontWeight: `bold`,
                  display: `flex`,
                  justifyContent: `center`,
                  alignItems: `center`,
                  transition: `color 250ms ease-in-out, background-color 250ms ease-in-out`,
                  '&:hover': {
                    color: 'primary',
                    cursor: 'pointer',
                  },
                }}
                to={path}
              >
                {navLink}
              </Link>
            )
        )}
      </Flex>
      <Flex
        sx={{
          justifyContent: `space-around`,
          alignItems: `center`,
          flexWrap: `wrap`,
          mx: `auto`,
          my: 3,
          maxWidth: 320,
        }}
      >
        {twitter && (
          <ExternalLink variant="footer" href={twitter}>
            <FaTwitter />
          </ExternalLink>
        )}
        {facebook && (
          <ExternalLink variant="footer" href={facebook}>
            <FaFacebookF />
          </ExternalLink>
        )}
        {linkedin && (
          <ExternalLink variant="footer" href={linkedin}>
            <FaLinkedinIn />
          </ExternalLink>
        )}
        {instagram && (
          <ExternalLink variant="footer" href={instagram}>
            <FaInstagram />
          </ExternalLink>
        )}
        {youtube && (
          <ExternalLink variant="footer" href={youtube}>
            <FaYoutube />
          </ExternalLink>
        )}
        {pinterest && (
          <ExternalLink variant="footer" href={pinterest}>
            <FaPinterestP />
          </ExternalLink>
        )}
        {goodreads && (
          <ExternalLink variant="footer" href={goodreads}>
            <FaGoodreadsG />
          </ExternalLink>
        )}
        {wordpress && (
          <ExternalLink variant="footer" href={wordpress}>
            <FaWordpressSimple />
          </ExternalLink>
        )}
        {email && (
          <ExternalLink variant="footer" href={email.link}>
            <FaAt />
          </ExternalLink>
        )}
        {phone && (
          <ExternalLink variant="footer" href={phone.link}>
            <FaPhone />
          </ExternalLink>
        )}
        {amazon && (
          <ExternalLink variant="footer" href={amazon}>
            <FaAmazon />
          </ExternalLink>
        )}
      </Flex>

      <Flex sx={{ flexDirection: `row`, justifyContent: `center`, alignItems: `center`, my: 3 }}>
        <span>
          &copy; {new Date().getFullYear()}{' '}
          <ExternalLink variant="footer" href={url}>
            {name}
          </ExternalLink>
          , Design by{' '}
          <ExternalLink variant="footer" href={designer.url}>
            {designer.name}
          </ExternalLink>
        </span>
      </Flex>
    </footer>
  )
}

export default Footer
