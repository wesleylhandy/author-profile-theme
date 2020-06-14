export default {
    name: 'book',
    title: 'Book',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: "Title",
            type: 'string'
        },
        {
            name: 'authors',
            title: "Author(s)",
            type: 'array',
            of: [{ type: 'authorReference' }]
        },
        {
            title: 'Cover',
            name: 'cover',
            type: 'mainImage'
        },
        {
            name: 'excerpt',
            type: 'portableText',
            title: 'Excerpt'
        },
        {
            name: 'amazonUrl',
            title: "Amazon Url",
            type: 'url'
        },
        {
            name: 'isbn',
            title: "ISBN",
            type: 'string'
        },
        {
            name: 'publisher',
            title: "Published By",
            type: 'publisher'
        }
    ]
}