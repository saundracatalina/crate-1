'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('users', 'description', {
        type: Sequelize.TEXT
      }),
      queryInterface.addColumn('users', 'shippingAddress', {
        type: Sequelize.TEXT
      }),
      queryInterface.addColumn('users', 'image', {
        type: Sequelize.TEXT
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('users', 'description'),
      queryInterface.removeColumn('users', 'shippingAddress'),
      queryInterface.removeColumn('users', 'image'),
    ]);
  }
};
