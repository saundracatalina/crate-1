// Imports
import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql'
import CrateType from '../crate/types'
import { ProductType } from '../product/types'

// Product type
const CrateProductType = new GraphQLObjectType({
  name: 'crateProduct',
  description: 'Crate Product Type',

  fields: () => ({
    id: { type: GraphQLInt },
    crate: { type: CrateType },
    product: { type: ProductType },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString }
  })
})

export { CrateProductType }
