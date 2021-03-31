// Imports
import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql'

// Product type
const CrateProductType = new GraphQLObjectType({
  name: 'crateProduct',
  description: 'Crate Product Type',

  fields: () => ({
    id: { type: GraphQLInt },
    crateId: { type: CrateType },
    productId: { type: ProductType },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString }
  })
})

export { CrateProductType }
