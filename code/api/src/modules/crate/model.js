'use strict'

module.exports = function(sequelize, DataTypes) {
  let Crate = sequelize.define('crates', {
    name: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT
    },
    deliveryDate: {
      type: DataTypes.TEXT
    }
  })

  Crate.associate = function(models) {
    Crate.hasMany(models.Subscription)
    Crate.hasMany(models.CrateProduct)
  }

  return Crate
}
