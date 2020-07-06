import React from "react"
import Img from "gatsby-image"
import { Link } from 'theme-ui'

const Author = ({email, name, profileImage, shortBio, url}) => (
    <div className="author-block">
        {
            name && <h4 className="author-name">{name}</h4>
        }
        {
            profileImage && <Img fixed={profileImage.imageFile.childImageSharp.fixed} />
        }
        {
            shortBio && <div className="author-bio" dangerouslySetInnerHTML={{__html: shortBio}}></div>
        }
        {
            email && <Link href={`mailto:${email}`}>{email}</Link>
        }
        {
            url && <Link href={url}>{url}</Link>
        }
    </div>
)


const Endorsement= ({ endorsementText, rating, reviewUrl, reviewerName, reviewerOrganization }) => (
    <div className="endorsement-block">
        <h4>{reviewerName}</h4>
        { 
            reviewerOrganization && <h5><i>{
                reviewUrl ? <Link href={reviewUrl}>{reviewerOrganization}</Link> : reviewerOrganization
                }</i></h5>
        }
        <div className="endorsement-text" dangerouslySetInnerHTML={{__html: endorsementText}} />
    </div>
)

const Book = ({ bookTitle, authors = [], coverImage, dateAvailableForPurchase, endorsements = [], excerpt, publisher }) => {
    return (
        <div>
            <h2 dangerouslySetInnerHTML={{__html: bookTitle}} />
            {
                dateAvailableForPurchase ? (
                    <div className="availability">Available for purchase: {new Date(dateAvailableForPurchase).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                    })}</div>
                ) : (
                    <div className="availability">Release Date: COMING SOON!</div>
                )
            }
            {
                coverImage && <Img fluid={coverImage.imageFile.childImageSharp.fluid} />
            }
            {
                excerpt && (
                    <>
                        <h3>Excerpt</h3>
                        <div className="book-excerpt" dangerouslySetInnerHTML={{__html: excerpt }} />
                    </>
                )
            }
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
                        <h3>Author</h3>
                    {
                        authors.map(({ author }, idx) => <Author key={`author-${author.name.replace(/[ .']/g, "-")}-${idx}`} {...author} />)
                    }
                    </>
                )
            }
            {   endorsements.length > 0 && (
                <>
                    <h3>Endorsements</h3>
                    {
                        endorsements.map(({ endorsement}, idx) => <Endorsement key={`endorsement-${idx}`} {...endorsement} />)
                    }
                </>
            )}
        </div>
    )
}

export default Book