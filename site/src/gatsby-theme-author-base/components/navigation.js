/** @jsx jsx */
import { useStaticQuery, graphql, Link } from 'gatsby'
import { jsx } from 'theme-ui'
import { FaHome } from "react-icons/fa"

const Navigation = ({location}) => {
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
            display: `flex`,
            justifyContent: `space-around`,
            borderBottom: `5px solid`,
            borderBottomColor: `primary`
          }}>
            <Link sx={{
                color: "primary", 
                fontWeight: `bold`,
                flex: `1 1 100%`,
                textAlign: `center`,
                backgroundColor: location && location.pathname === "/" ? `gray.3` : `transparent`,
                display: `flex`,
                justifyContent: `center`,
                alignItems: `center`,
                '&:hover': { 
                    color: 'primary', 
                    cursor: 'pointer',
                    backgroundColor: `secondary`
                },
              }}
              to="/"
            ><FaHome/></Link>
            {nodes.map(({path, context: { navLink }}, idx) => 
                navLink && <Link
                    key={`${path}-${idx}`}
                    sx={{
                        color: "primary", 
                        fontWeight: `bold`,
                        flex: `1 1 100%`,
                        textAlign: `center`,
                        backgroundColor: location && location.pathname === path ? `gray.3` : `transparent`,
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
        </nav> 
    )
}

export default Navigation;