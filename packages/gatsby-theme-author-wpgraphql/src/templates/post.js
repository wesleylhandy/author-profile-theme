import React from "react"
import { graphql } from "gatsby"
import Layout from "@wesleylhandy/gatsby-theme-author-base/src/components/layout"
import Post from "@wesleylhandy/gatsby-theme-author-base/src/components/post"
import Seo from '@wesleylhandy/gatsby-theme-author-base/src/components/seo'

export const query = graphql`
fragment PostFragment on WPGraphQL_Post {
  id
  title
  content
  excerpt
  featuredImage {
    altText
    databaseId
    modified
    sourceUrl
    imageFile {
      childImageSharp {
        fluid(maxWidth: 1200) {
          ...GatsbyImageSharpFluid_withWebp_tracedSVG
        }
      }
    }
  }
  uri
  slug
  link
  published: date
  modified
  author {
    name
    email
    firstName
    lastName
    slug
    avatar {
      url
    }
  }
  tags {
    nodes {
      name
      link
    }
  }
  categories {
    nodes {
      name
      link
    }
  }
}
query GET_POST($id: ID!) {
  wpgraphql {
    post(id: $id) {
      ...PostFragment
    }
  }
}
`

const PostTemplate = ({location, data: { wpgraphql: { post }}}) => {
  const title = post.title
  const description = post.excerpt && post.excerpt.slice(0, 159)
  const image = post.featuredImage ? post.featuredImage.imageFile.childImageSharp.fluid : null
  return (
    <Layout location={location}>
      <Seo 
        type="article" 
        title={`${title} | Blog`}
        description={description}
        image={image}
        schema={post}
        canonical={post.link}
      />
      <Post {...post} />
    </Layout>
  )
}

export default PostTemplate
