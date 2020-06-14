export default {
    title: 'Author reference',
    name: 'authorReference',
    type: 'object',
    fields: [ {
        name: 'author',
        // A reference is a way to point to another document
        type: 'reference',
        // This reference is only allowed to point to a document of the type person,
        // we could list more types, but let's keep this simple:
        to: [{type: 'person'}]
    }],
    preview: {
        select: {
          title: 'author.name',
          media: 'author.image.asset'
        }
    }
}