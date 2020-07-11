/** @jsx jsx */
import React from "react"
import Img from "gatsby-image"
import { Link, Flex, Box, jsx } from 'theme-ui'
import { convertToTimeZone, getDate } from "../utils/time-helpers"

const Author = ({email, name, profileImage, shortBio, url, idx}) => (
    <Box sx={{ backgroundColor: idx % 2 === 1 ? 'light' : `transparent`, my: 3, p: 3 }}>
        {
            name && <h4 className="author-name">{name}</h4>
        }
        <Flex>
        {
            profileImage && <Img fixed={profileImage.imageFile.childImageSharp.fixed} sx={{ flex: `1 0 auto`, mr: 3 }}/>
        }
        {
            shortBio && <div className="author-bio" dangerouslySetInnerHTML={{__html: shortBio}}></div>
        }
        </Flex>
        {
            email && <Link href={`mailto:${email}`}>{email}</Link>
        }
        {
            url && <Link href={url}>{url}</Link>
        }
    </Box>
)


const Endorsement= ({ endorsementText, rating, reviewUrl, reviewerName, reviewerOrganization, idx }) => (
    <Box sx={{ backgroundColor: idx % 2 === 1 ? 'light' : `transparent`, my: 3, p: 3 }}>
        <h4>{reviewerName}</h4>
        { 
            reviewerOrganization && <h5><i>{
                reviewUrl ? <Link href={reviewUrl}>{reviewerOrganization}</Link> : reviewerOrganization
                }</i></h5>
        }
        <div className="endorsement-text" dangerouslySetInnerHTML={{__html: endorsementText}} />
    </Box>
)

const Book = ({ bookTitle, authors = [], coverImage, dateAvailableForPurchase, endorsements = [], excerpt, publisher }) => {
    const releaseDate = convertToTimeZone({ datetime: dateAvailableForPurchase, timezone: "-05:00"})
    return (
        <div>
            <h2 dangerouslySetInnerHTML={{__html: bookTitle}} />
            {
                releaseDate ? (
                    <div className="availability">Available for purchase: { getDate(new Date(releaseDate)) }</div>
                ) : (
                    <div className="availability">Release Date: COMING SOON!</div>
                )
            }
            {
                coverImage && <Img fluid={coverImage.imageFile.childImageSharp.fluid} />
            }
            {
                excerpt && (
                    <Box sx={{border: `5px solid`, borderColor: `primary`, flex: `1 1 100%`, mx: `auto`, my: 3, p:3}}>
                        <h3>Synopsis</h3>
                        <div className="book-excerpt" dangerouslySetInnerHTML={{__html: excerpt }} />
                    </Box>
                )
            }
            <Box sx={{border: `5px solid`, borderColor: `primary`, flex: `1 1 100%`, mx: `auto`, my: 3, p:3}}>
            {
                publisher && (
                    <>
                        <h3>Publisher</h3>
                        <div className="publisher">{publisher}</div>
                    </>
                )
            }
            {
                authors.length > 0 && (
                    <>
                        <h3>Author{authors.length > 1 && `s`}</h3>
                    {
                        authors.map(({ author }, idx) => <Author key={`author-${author.name.replace(/[ .']/g, "-")}-${idx}`} idx={idx} {...author} />)
                    }
                    </>
                )
            }
            </Box>
            {   endorsements.length > 0 && (
                <Box sx={{border: `5px solid`, borderColor: `primary`, flex: `1 1 100%`, mx: `auto`, my: 3, p:3}}>
                    <h3>Endorsements</h3>
                    {
                        endorsements.map(({ endorsement}, idx) => <Endorsement key={`endorsement-${idx}`} idx={idx} {...endorsement}/>)
                    }
                </Box>
            )}
        </div>
    )
}

export default Book