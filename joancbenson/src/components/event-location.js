import React from "react"
import { Link } from 'theme-ui'
import { navigationUrl } from "../utils/location-helpers"

const EventLocation = ({ type, venue, address, url }) => {
    if (type === 'online') {
        return <Link href={url}>{url}</Link>
    }

    return (
        <Link href={navigationUrl(venue, address)}>
            <address>
                {venue}<br />
                {address.streetAddress}<br />
                {`${address.city}, ${address.state} ${address.postalCode}`}
            </address>
        </Link>
    )

}

export default EventLocation