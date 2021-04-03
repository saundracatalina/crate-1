module.exports = {
  up: async (queryInterface) => {
    const users = await queryInterface.sequelize.query(
      `SELECT id from USERS;`
    );

    const crates = await queryInterface.sequelize.query(
      `SELECT id from CRATES;`
    );

    return await queryInterface.bulkInsert('subscriptions', [
      {userId: users[0][0].id, crateId: crates[0][0].id, createdAt: new Date(), updatedAt: new Date()},
      {userId: users[0][1].id, crateId: crates[0][0].id, createdAt: new Date(), updatedAt: new Date()},
      {userId: users[0][1].id, crateId: crates[0][1].id, createdAt: new Date(), updatedAt: new Date()}
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('subscriptions', null, {});
  }
};
