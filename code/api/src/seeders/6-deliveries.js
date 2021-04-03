
module.exports = {
  up: async (queryInterface) => {
    const crateProducts = await queryInterface.sequelize.query(
      `SELECT id from "crateProducts";`
    );
    const users = await queryInterface.sequelize.query(
      `SELECT id from USERS;`
    );

    return await queryInterface.bulkInsert('deliveries', [
      {userId: users[0][0].id, crateProductId: crateProducts[0][0].id, status: 1, createdAt: new Date(), updatedAt: new Date()},
      {userId: users[0][0].id, crateProductId: crateProducts[0][1].id, status: 2, createdAt: new Date(), updatedAt: new Date()},
      {userId: users[0][0].id, crateProductId: crateProducts[0][2].id, status: 0, createdAt: new Date(), updatedAt: new Date()},
      {userId: users[0][0].id, crateProductId: crateProducts[0][3].id, status: 3, createdAt: new Date(), updatedAt: new Date()}
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('deliveries', null, {});
  }
};
