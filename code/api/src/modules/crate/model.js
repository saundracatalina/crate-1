'use strict'
// Model attributes and types are defined here.  Uses sequelize.define which gives us access to default model methods for querying.
// These default methods seem to work similarly to rails, but no helpers or model methods are defined here.
module.exports = function(sequelize, DataTypes) {
  let Crate = sequelize.define('crates', {
    name: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT
    }
  })

  Crate.associate = function(models) {
    Crate.hasMany(models.Subscription)
  }

  return Crate
}
