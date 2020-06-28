/** @jsx jsx */
import { useStaticQuery, graphql, Link } from 'gatsby'
import { jsx } from 'theme-ui'


const Navigation = ({location}) => {
    const data = useStaticQuery(graphql`
    {
      allSitePage(filter: {path: {regex: "/^\\/(?!(404)|(.*404.*))([0-9a-z-_])*\\/*$/i"}}) {
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
            {nodes.map(({path, context: { navLink }}, idx) => 
                navLink && <Link
                    key={`${path}-${idx}`}
                    sx={{
                        color: "primary", 
                        fontWeight: `bold`,
                        flex: `1 1 100%`,
                        textAlign: `center`,
                        backgroundColor: location && location.pathname === path ? `secondary` : `transparent`,
                        '&:hover': { 
                            color: 'secondary', 
                            cursor: 'pointer',
                            backgroundColor: `light`
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