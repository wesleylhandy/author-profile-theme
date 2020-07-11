import PropTypes from 'prop-types'

const schemaProptypes = PropTypes.oneOfType([
  PropTypes.shape({
    authors: PropTypes.arrayOf(
      PropTypes.shape({
        author: PropTypes.shape({
          email: PropTypes.string,
          givenName: PropTypes.string,
          familyName: PropTypes.string,
          name: PropTypes.string,
          url: PropTypes.string,
        }),
      })
    ),
    bookTitle: PropTypes.string,
    dateAvailableForPurchase: PropTypes.string,
    publisher: PropTypes.string,
    pricepoints: PropTypes.arrayOf(
      PropTypes.shape({
        edition: PropTypes.string,
        format: PropTypes.string,
        isbn: PropTypes.string,
        price: PropTypes.number,
        url: PropTypes.string,
      })
    ),
    slug: PropTypes.string,
  }),
  PropTypes.shape({
    endDateTime: PropTypes.string,
    eventAdmission: PropTypes.arrayOf(
      PropTypes.shape({
        admissionPrice: PropTypes.number,
        onSaleDate: PropTypes.string,
        ticketAvailability: PropTypes.string,
        ticketPurchaseUrl: PropTypes.string,
      })
    ),
    eventDescription: PropTypes.string,
    eventLocation: PropTypes.shape({
      venue: PropTypes.string,
      url: PropTypes.string,
      address: PropTypes.shape({
        streetAddress: PropTypes.string,
        city: PropTypes.string,
        state: PropTypes.string,
        postalCode: PropTypes.string,
      }),
    }),
    eventName: PropTypes.string,
    eventType: PropTypes.string,
    id: PropTypes.string,
    slug: PropTypes.string,
    startDatetime: PropTypes.string,
  }),
  PropTypes.shape({
    published: PropTypes.string,
    modified: PropTypes.string,
    id: PropTypes.string,
    link: PropTypes.string,
    slug: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.shape({
      name: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      email: PropTypes.string,
      slug: PropTypes.string,
    }),
    categories: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
        })
      ),
    }),
    tags: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
        })
      ),
    }),
  }),
])

export default schemaProptypes
