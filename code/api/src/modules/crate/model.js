// Define deliveryDate column that will be added with a migration
// to the crate table to this file and the DataTypes within the sequelize

// Near the bottom of file add another User.associate to detail
// the new association that a Crate.hasMany crateProducts

// All of this will help query the database and give access to the FE
// to display this data

'use strict'

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
