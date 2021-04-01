// App Imports
import params from '../../config/params'
import models from '../../setup/models'

export async function getByUser(parentValue, {}, { auth }) {
  if (auth.user && auth.user.id > 0) {
    return await models.Delivery.findAll({
      where: {
        userId: auth.user.id
      },
      include: [
        {model: models.User, as: 'user'},
        {model: models.CrateProduct, as: 'crateProduct'}
      ]
    })
  } else {
    throw new Error('Please login to view your deliveries.')
  }
}

// Delivery types
export async function getTypes() {
  return Object.values(params.delivery.types)
}
