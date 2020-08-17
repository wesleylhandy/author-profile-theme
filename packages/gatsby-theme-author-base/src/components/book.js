/** @jsx jsx */
import { Fragment } from "react"
import Img from "gatsby-image"
import { Link, Flex, Box, jsx } from 'theme-ui'
import { convertToTimeZone, getDate } from "../utils/time-helpers"

const Author = ({email, name, profileImage, shortBio, url, idx}) => (
    <Box sx={{ backgroundColor: idx % 2 === 1 ? 'light' : `transparent`, my: 3, p: 3 }}>
        {
            name && <h3 className="author-name">{name}</h3>
        }
        <Flex sx={{ flexDirection: [`column`, `row`], }}>
        {
            profileImage && <Img fixed={profileImage.imageFile.childImageSharp.fixed} sx={{ flex: `1 0 auto`, mr: [0, 3], mb: [3, 0] }}/>
        }
        {
            shortBio && <div className="author-bio" dangerouslySetInnerHTML={{__html: shortBio}} />
        }
        </Flex>
        <Flex sx={{ flexDirection: [`column`, `row`], justifyContent: `center`, alignItems: `center`}}>
        {
            email && <Link sx={{mr: [0, 3], mb: [3, 0]}} href={`mailto:${email}`}>{email}</Link>
        }
        {
            url && <Link href={url}>{url}</Link>
        }
        </Flex>
    </Box>
)


const Endorsement= ({ endorsementText, rating, reviewUrl, reviewerName, reviewerOrganization, idx }) => (
    <Box sx={{ backgroundColor: idx % 2 === 1 ? 'light' : `transparent`, my: 3, p: 3 }}>
        <h3>{reviewerName}</h3>
        { 
            reviewerOrganization && <h4><i>{
                reviewUrl ? <Link href={reviewUrl}>{reviewerOrganization}</Link> : reviewerOrganization
                }</i></h4>
        }
        <div className="endorsement-text" dangerouslySetInnerHTML={{__html: endorsementText}} />
    </Box>
)

const Book = ({ bookTitle, authors = [], coverImage, dateAvailableForPurchase, endorsements = [], synopsis, previewSnippet, publisher }) => {
    const releaseDate = convertToTimeZone({ datetime: dateAvailableForPurchase, timezone: "-05:00"})
    const title = bookTitle.replace(/<[^>]+>/gm, '').replace(/([\r\n]+ +)+/gm, '')
    return (
        <div>
            <h1>{title}</h1>

            {
                previewSnippet && (
                    <Box sx={{ mx: `auto`, my: 3}} dangerouslySetInnerHTML={{ __html: previewSnippet }}/>
                )
            }
            {
                coverImage && !previewSnippet && (
                    <Box sx={{ maxWidth: 300, my: 3}}>
                        <Img fluid={coverImage.imageFile.childImageSharp.fluid} alt={coverImage.altText || title}/>
                    </Box>
                )
            }
            {
                releaseDate && !previewSnippet && (
                    <div className="availability">Available for purchase: { getDate(new Date(releaseDate)) }</div>
                )
            }
            {
                !releaseDate && !previewSnippet && (
                    <div className="availability">Release Date: COMING SOON!</div>
                )
            }
            {
                synopsis && (
                    <Box sx={{ flex: `1 1 100%`, mx: `auto`, my: 3}}>
                        <h2>Synopsis</h2>
                        <div className="book-excerpt" dangerouslySetInnerHTML={{__html: synopsis }} />
                    </Box>
                )
            }
            <Box sx={{ flex: `1 1 100%`, mx: `auto`, my: 3}}>
            {
                publisher && (
                    <Fragment>
                        <h2>Publisher</h2>
                        <div className="publisher">{publisher}</div>
                    </Fragment>
                )
            }
            {
                authors.length > 0 && (
                    <Fragment>
                        <h2>Author{authors.length > 1 && `s`}</h2>
                    {
                        authors.map(({ author }, idx) => <Author key={`author-${author.name.replace(/[ .']/g, "-")}-${idx}`} idx={idx} {...author} />)
                    }
                    </Fragment>
                )
            }
            </Box>
            {   endorsements.length > 0 && (
                <Box sx={{ flex: `1 1 100%`, mx: `auto`, my: 3 }}>
                    <h2>Endorsements</h2>
                    {
                        endorsements.map(({ endorsement}, idx) => <Endorsement key={`endorsement-${idx}`} idx={idx} {...endorsement}/>)
                    }
                </Box>
            )}
        </div>
    )
}

export default Book