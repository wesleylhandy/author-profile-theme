export const navigationUrl = (venue = '', address = {
    city: '',
    postalCode: '',
    state: '',
    streetAddress: ''
}) => new URL(`https://www.google.com/maps/dir/?${new URLSearchParams({
    api: 1,
    destination: [venue, address.streetAddress, address.city, address.state, address.postalCode].join(',+'),
    dir_action: 'navigate'
})}`);