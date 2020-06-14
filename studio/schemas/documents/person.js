export default {
    name: 'person',
    title: 'Person',
    type: 'document',
    fields: [
        {
            name: 'slug',
            type: 'slug',
            title: 'Slug',
            description: 'Some frontends will require a slug to be set to be able to show the person',
            options: {
              source: 'name',
              maxLength: 96
            }
        },
        {
            name: 'title',
            title: "Title",
            type: 'string'
        },
        {
            name: 'firstName',
            title: "First Name",
            type: 'string'
        },
        {
            name: 'middleName',
            title: "Middle Name",
            type: 'string'
        },
        {
            name: 'lastName',
            title: "Last Name",
            type: 'string'
        },
        {
            name: 'suffix',
            title: "Suffix",
            type: 'string'
        },
        {
            name: 'email',
            title: "Email",
            type: 'email'
        },
        {
            name: 'url',
            title: "URL",
            type: 'url'
        },
        {
            name: 'twitter',
            type: 'string',
            title: 'Twitter Username (e.g. @wesleylhandy)'
        },
        {
            name: 'facebook',
            type: 'url',
            title: 'Facebook Url (e.g. https://www.facebook.com/handywl)'
        },
        {
            name: 'bio',
            type: 'portableText',
            title: 'Biography'
        },
        {
            title: 'Profile Image',
            name: 'image',
            type: 'mainImage'
        },
    ],
    preview: {
        select: {
          title: 'name',
          subtitle: 'slug.current',
          media: 'image'
        }
      }
}