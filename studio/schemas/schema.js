// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// documents
import book from './documents/book'
import person from './documents/person'
import event from './documents/event'

// objects
import address from './objects/address'
import authorReference from './objects/authorReference'
import mainImage from './objects/mainImage'
import portableText from './objects/portableText'
import publisher from './objects/publisher'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    /* Your types here! */
    book,
    person,
    event,
    address,
    authorReference,
    mainImage,
    portableText,
    publisher
    
  ])
})
