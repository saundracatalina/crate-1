// Imports
import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } from 'graphql'
import { UserType } from '../user/types'
import { CrateProductType } from '../crateProduct/types'


// Product type
const DeliveryType = new GraphQLObjectType({
  name: 'deliveryType',
  description: 'Delivery Type',

  fields: () => ({
    id: { type: GraphQLInt },
    crateProduct: { type: CrateProductType },
    user: { type: UserType },
    status: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString }
  })
})

export { DeliveryType }
