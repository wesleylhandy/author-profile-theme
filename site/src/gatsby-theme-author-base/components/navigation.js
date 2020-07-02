/** @jsx jsx */
import React, { useState } from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { jsx } from 'theme-ui'
import { FaHome, FaTimes, FaBars  } from "react-icons/fa"
import Media from "react-media";

const NavLinks = ({location, links, small}) => {
  return (
    <>
    <Link sx={{
        color: "primary", 
        fontWeight: `bold`,
        flex: `1 1 ${small ? `44px` : `100%`}`,
        backgroundColor: location && location.pathname === "/" ? `gray.3` : `transparent`,
        display: `flex`,
        justifyContent: `center`,
        alignItems: `center`,
        width: small ? `100%` : `initial`,
        height: 44,
        '&:hover': { 
            color: 'primary', 
            cursor: 'pointer',
            backgroundColor: `secondary`
        },
      }}
      to="/"
    ><FaHome/></Link>
    {links.map(({path, context: { navLink }}, idx) => 
      navLink && <Link
        key={`${path}-${idx}`}
        sx={{
            color: "primary", 
            fontWeight: `bold`,
            flex: `1 1 ${small ? `44px` : `100%`}`,
            display: `flex`,
            justifyContent: `center`,
            alignItems: `center`,
            backgroundColor: location && location.pathname === path ? `gray.3` : `transparent`,
            width: small ? `100%` : `initial`,
            height: 44,
            '&:hover': { 
                color: 'primary', 
                cursor: 'pointer',
                backgroundColor: `secondary`
            }
        }}
        to={path}
      >
        {navLink}
      </Link>
    )}
    </>
  )
}

const Navigation = ({location}) => {
  const [checked, setCheck] = useState(false);
    const data = useStaticQuery(graphql`
    {
      allSitePage(filter: {path: {regex: "/^\\/(?!(404)|(.*404.*))([0-9a-z-_])*\\/*$/i"}}, sort: {fields: context___sortOrder}) {
        nodes {
          path
          context {
            navLink
          }
        }
      }
    }
    `)
    const { allSitePage: { nodes } } = data;
    return ( 
        <nav sx={{
          position: `relative`, 
          maxWidth: `max`, 
          margin: `0 auto`,
          borderBottom: `5px solid`,
          borderBottomColor: `primary`,
        }}>
          <Media query="(max-width: 649px)">
							{matches =>
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
                        '&:checked + label': {
                        },
                      }}
                      id="dropcheck"
                      name="dropcheck"
                      type="checkbox"
                      aria-label={
                        checked ? "Click to Hide Menu" : "Click to Show Menu"
                      }
                      onClick={() => setCheck(!checked)} />
                      <label 
                        htmlFor="dropcheck" 
                        sx={{
                          backgroundColor: `transparent`,
                          border: `none`,
                          height: 44,
                          padding: `10px`,
                          flex: `1 1 100%`,
                          textAlign: `center`,
                          width: `100%`,
                          position: `relative`,
                          display: `flex`,
                          justifyContent: `flex-end`,
                          alignItems: `center`,
                          cursor: `pointer`,
                          color: `primary`,
                          transition: `color 250ms ease-in-out, background-color 250ms ease-in-out,
                            border-color 250ms ease-in-out`,
                          '&:hover': {
                            color: 'primary', 
                            cursor: 'pointer',
                            backgroundColor: `secondary`,
                          },
                        }}
                        aria-label={
                          checked ? "Click to Hide Menu" : "Click to Show Menu"
                        }
                      >
                        {checked ? <FaTimes title="Click to Close"/> : <FaBars title="Click to Open"/>}
                      </label>
                      <div sx={{ display: `none`}}>
                        <NavLinks location={location} links={nodes} small={true} />
                      </div>
                  </>
                ) : (
                  <div sx={{
                    display: `flex`,
                    flexDirection: `row`,
                    justifyContent: `space-around`,
                    alignItems: `center`,
                  }}>
                    <NavLinks location={location} links={nodes} small={false} />
                  </div>
                )
              }
            </Media>
        </nav> 
    )
}

export default Navigation;