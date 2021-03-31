'use strict'

module.exports = function(sequelize, DataTypes) {
  let Delivery = sequelize.define('delivery', {
    userId: {
      type: DataTypes.INTEGER
    },
    status: {
      type: DataTypes.TEXT
    },
    crateProductId: {
      type: DataTypes.INTEGER
    }
  })

  Delivery.associate = function(models) {
    Delivery.belongsTo(models.CrateProduct)
    Delivery.belongsTo(models.User)
  }

  return Delivery
}
