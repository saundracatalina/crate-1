// Define additional columns that will be added with migrations
// to the Users table to this file and their DataTypes in the
// same syntax that the original columns are already listed.

// Near the bottom of file add another User.associate to detail
// the new association that a User.hasMany deliveries

// All of this will help query the database and give access to the FE
// to display this data 

'use strict'

// User
module.exports = function(sequelize, DataTypes) {
  let User = sequelize.define('users', {
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.TEXT
    },
    password: {
      type: DataTypes.TEXT
    },
    role: {
      type: DataTypes.TEXT
    }
  })

  User.associate = function(models) {
    User.hasMany(models.Subscription)
  }

  return User
}
