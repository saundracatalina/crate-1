// Imports
import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql'

// Product type
const DeliveryType = new GraphQLObjectType({
  name: 'deliveryType',
  description: 'Delivery Type',

  fields: () => ({
    id: { type: GraphQLInt },
    crateProductId: { type: CrateProductType },
    userId: { type: UserType },
    status: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString }
  })
})

export { DeliveryType }
