const GET_DATA = `
query GET_DATA($first:Int $after:String){
  wpgraphql {
    posts(
      where: {status: PUBLISH}
      first: $first 
      after: $after
    ) {
      pageInfo {
        endCursor
        hasNextPage
      }
      nodes {
        id
        uri
        slug
        postId
        title
      }
    }
    categories(first: $first, after: $after) {
      pageInfo {
        endCursor
        hasNextPage
      }
      nodes {
        id
        categoryId
        slug
      }
    }
    users(where: {nicenameNotIn: "isatengir"}, first: $first) {
      pageInfo {
        endCursor
        hasNextPage
      }
      nodes {
        id
        userId
        slug
      }
    }
  }
}
`;

const GET_BOOKS = `
query GET_BOOKS {
    wpgraphql {
    booksAndPublications {
        books {
        books {
            id
            authors {
            author {
                email
                familyName
                givenName
                name
                shortBio
                url
                profileImage {
                databaseId
                modified
                sourceUrl
                imageFile {
                    childImageSharp {
                    fixed(width: 100) {
                        base64
                        aspectRatio
                        width
                        height
                        src
                        srcSet
                    }
                    }
                }
                altText
                }
            }
            }
            bookTitle
            dateAvailableForPurchase
            excerpt
            synopsis
            previewSnippet
            isCanonical
            publisher
            pricepoints {
            edition
            format
            isbn
            price
            url
            }
            endorsements {
            endorsement {
                endorsementText
                rating
                reviewUrl
                reviewerName
                reviewerOrganization
            }
            }
            coverImage {
            altText
            databaseId
            modified
            sourceUrl
            imageFile {
                childImageSharp {
                fluid(maxWidth: 320) {
                    base64
                    aspectRatio
                    src
                    srcSet
                    sizes
                    originalImg
                }
                }
            }
            }
            seo {
            seoTitle
            seoDescription
            socialSharingImage {
                altText
                databaseId
                modified
                sourceUrl
                imageFile {
                childImageSharp {
                    fixed(width: 1200) {
                    base64
                    aspectRatio
                    width
                    height
                    src
                    srcSet
                    }
                }
                }
            }
            }
            slug
        }
        }
    }
    }
}`;

const GET_EVENTS = `
query GET_EVENTS {
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
            isCanonical
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
                    aspectRatio
                    src
                    srcSet
                    sizes
                    originalImg
                }
                }
            }
            }
        }
        }
    }
    }
}`

const GET_FAQS = `
query GET_FAQS {
    wpgraphql {
    frequentlyAskedQuestions {
        faq {
        faqs {
            answer
            id
            isCanonical
            question
            slug
        }
        }
    }
    }
}`;

module.exports = {
    GET_DATA,
    GET_BOOKS,
    GET_EVENTS,
    GET_FAQS
}