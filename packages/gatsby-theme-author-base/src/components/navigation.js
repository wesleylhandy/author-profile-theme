import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

const Navigation = () => {
    const data = useStaticQuery(graphql`
    {
      allSitePage(filter: {path: {regex: "/^\\/(?!(404)|(.*404.*))([0-9a-z-_])*\\/*$/i"}}) {
        nodes {
          path
        }
      }
    }
    `)
    // const { allSitePage: { nodes } } = data;
    console.log(data)
    return ( <nav></nav> )
}

export default Navigation;