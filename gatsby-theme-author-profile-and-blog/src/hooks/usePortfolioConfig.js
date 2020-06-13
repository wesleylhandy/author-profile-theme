import { useStaticQuery, graphql } from "gatsby"

const usePortfolioConfig = () => {
  const data = useStaticQuery(graphql`
    query {
      portfolioConfig(id: { eq: "@wesleylhandy/gatsby-theme-author-portfolio-and-blog-config" }) {
        source
      }
    }
  `)

  return data.portfolioConfig
}

export default usePortfolioConfig