export default {
    name: 'event',
    title: 'Speaking Engagment',
    type: 'document',
    fields: [
        {
            name: 'eventName',
            title: "Event Name",
            type: 'string'
        },
        {
            title: 'Speech Title or Topic',
            name: 'eventTitle',
            type: 'string',
        },
        {
            title: 'Location',
            name: 'location',
            type: 'address'
        },
        {
            name: 'description',
            type: 'portableText',
            title: 'Event Description'
        },
        {
            name: 'startTime',
            title: "Start Time",
            type: 'datetime'
        },
        {
            name: 'url',
            title: "Event Url",
            type: 'url'
        },
        {
            title: 'Promotional Image',
            name: 'image',
            type: 'mainImage'
        },
    ]
}