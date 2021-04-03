'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('crates', 'deliveryDate', {
        type: Sequelize.TEXT
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('crates', 'deliveryDate')
  }
};
