//This does some db setup stuff that we probably won't ever have to touch.

// Imports
import { GraphQLSchema } from 'graphql'

// App Imports
import query from './queries'
import mutation from './mutations'

// Schema
const schema = new GraphQLSchema({
  query,
  mutation
})

export default schema
