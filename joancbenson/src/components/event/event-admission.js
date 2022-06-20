import React from "react"
import { Link } from 'theme-ui'
import { isFutureStartDate } from "../../utils/time-helpers";
import { convertToCurrency } from "../../utils/currency";
import { convertToTimeZone, getDate } from "../../utils/time-helpers";
import { APP_TIMEZONE } from "../../constants/timezone";

const EventAdmission = ({ admissionPrice, onSaleDate, ticketAvailability, ticketPurchaseUrl, startDate }) => {
    if (!isFutureStartDate(startDate)) {
        return null;
    }
    if (ticketAvailability === 'SoldOut') {
        return <p>Sold Out</p>
    }
    const saleDate = onSaleDate !== null ? convertToTimeZone(onSaleDate, APP_TIMEZONE) : undefined;
    return (
        <>
            <p>Cost: {convertToCurrency(admissionPrice)}</p>
            {isFutureStartDate(saleDate) && (
                <p>Purchase Tickets After: (
                        <time dateTime={saleDate.toISOString()}>
                            {getDate(saleDate)}
                        </time>
                    )   
                </p>
            )}
            {ticketPurchaseUrl && <p>Purchase Tickets Online: <Link href={ticketPurchaseUrl}>{ticketPurchaseUrl}</Link></p>}
        </>
    )
}

export default EventAdmission