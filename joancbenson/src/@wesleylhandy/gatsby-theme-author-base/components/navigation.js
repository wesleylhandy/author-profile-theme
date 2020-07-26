/** @jsx jsx */
import { useState } from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { jsx } from 'theme-ui'
import { FaHome, FaTimes, FaBars } from 'react-icons/fa'
import Media from 'react-media'

const NavLinks = ({ location, links, small, setColorMode }) => {
  return (
    <>
      <Link
        sx={{
          color: 'primary',
          fontWeight: `bold`,
          flex: `1 1 ${small ? `44px` : `auto`}`,
          backgroundColor: location && location.pathname === '/' ? `light` : `transparent`,
          display: `flex`,
          justifyContent: `center`,
          textDecoration: `none`,
          alignItems: `center`,
          width: small ? `100%` : `initial`,
          height: 44,
          transition: `color 250ms ease-in-out, background-color 250ms ease-in-out`,
          '&:hover': {
            color: 'white',
            cursor: 'pointer',
            backgroundColor: `tertiary`,
          },
        }}
        to="/"
        aria-label="Link to Home Page"
      >
        <FaHome />
      </Link>
      {links.map(
        ({ path, context: { navLink } }, idx) =>
          navLink && (
            <Link
              key={`${path}-${idx}`}
              sx={{
                color: 'primary',
                fontWeight: `bold`,
                flex: `1 1 ${small ? `44px` : `auto`}`,
                display: `flex`,
                justifyContent: `center`,
                alignItems: `center`,
                backgroundColor: location && location.pathname === path ? `light` : `transparent`,
                width: small ? `100%` : `initial`,
                height: 44,
                transition: `color 250ms ease-in-out, background-color 250ms ease-in-out`,
                textDecoration: `none`,
                '&:hover': {
                  color: 'white',
                  cursor: 'pointer',
                  backgroundColor: `tertiary`,
                },
              }}
              to={path}
              aria-label={`Link to ${navLink}`}
            >
              {navLink}
            </Link>
          )
      )}
    </>
  )
}

const Navigation = ({ location, setColorMode }) => {
  const [checked, setCheck] = useState(false)
  const data = useStaticQuery(graphql`
    {
      allSitePage(
        filter: { path: { regex: "/^/(?!(404)|(.*404.*)|(offline-plugin-app-shell-fallback))([0-9a-z-_])*/*$/i" } }
        sort: { fields: context___sortOrder }
      ) {
        nodes {
          path
          context {
            navLink
          }
        }
      }
    }
  `)
  const {
    allSitePage: { nodes },
  } = data
  return (
    <nav
      sx={{
        position: `relative`,
        maxWidth: `full`,
        margin: `0 auto`,
        borderBottom: `5px solid`,
        borderBottomColor: `primary`,
      }}
    >
      <div sx={{ maxWidth: `max`, margin: `0 auto` }}>
        <Media query="(max-width: 649px)">
          {(matches) =>
            matches ? (
              <>
                <input
                  sx={{
                    position: `absolute !important`,
                    left: `-9999px !important`,
                    '&:checked ~ div': {
                      display: `flex`,
                      flexDirection: `column`,
                      justifyContent: `center`,
                      alignItems: `center`,
                    },
                    '&:checked + label': {},
                  }}
                  id="dropcheck"
                  name="dropcheck"
                  type="checkbox"
                  aria-label={checked ? 'Click to Hide Menu' : 'Click to Show Menu'}
                  onClick={() => setCheck(!checked)}
                />
                <label
                  htmlFor="dropcheck"
                  sx={{
                    backgroundColor: `transparent`,
                    border: `none`,
                    height: 44,
                    padding: `10px`,
                    flex: `1 1 auto`,
                    textAlign: `center`,
                    position: `relative`,
                    display: `flex`,
                    justifyContent: `flex-start`,
                    alignItems: `center`,
                    cursor: `pointer`,
                    color: `primary`,
                    transition: `color 250ms ease-in-out, background-color 250ms ease-in-out,
                            border-color 250ms ease-in-out`,
                    '&:hover': {
                      color: 'white',
                      cursor: 'pointer',
                      backgroundColor: `tertiary`,
                    },
                  }}
                  aria-label={checked ? 'Click to Hide Menu' : 'Click to Show Menu'}
                >
                  {checked ? <FaTimes title="Click to Close" /> : <FaBars title="Click to Open" />}
                </label>
                <div sx={{ display: `none` }}>
                  <NavLinks location={location} links={nodes} small={true} setColorMode={setColorMode} />
                </div>
              </>
            ) : (
              <div
                sx={{
                  display: `flex`,
                  flexDirection: `row`,
                  justifyContent: `space-around`,
                  alignItems: `center`,
                }}
              >
                <NavLinks location={location} links={nodes} small={false} setColorMode={setColorMode}/>
              </div>
            )
          }
        </Media>
      </div>
    </nav>
  )
}

export default Navigation
