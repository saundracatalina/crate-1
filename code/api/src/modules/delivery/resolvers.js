// App Imports
import params from '../../config/params'
import models from '../../setup/models'

// CrateProduct types
export async function getTypes() {
  return Object.values(params.delivery.types)
}
