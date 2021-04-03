module.exports = {
  up: async (queryInterface) => {
    const products = await queryInterface.sequelize.query(
      `SELECT id from PRODUCTS;`
    );

    const crates = await queryInterface.sequelize.query(
      `SELECT id from CRATES;`
    );

    return await queryInterface.bulkInsert('crateProducts', [
      {productId: products[0][0].id, crateId: crates[0][0].id, createdAt: new Date(), updatedAt: new Date()},
      {productId: products[0][1].id, crateId: crates[0][0].id, createdAt: new Date(), updatedAt: new Date()},
      {productId: products[0][2].id, crateId: crates[0][1].id, createdAt: new Date(), updatedAt: new Date()},
      {productId: products[0][3].id, crateId: crates[0][1].id, createdAt: new Date(), updatedAt: new Date()},
      {productId: products[0][4].id, crateId: crates[0][1].id, createdAt: new Date(), updatedAt: new Date()}
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('crateProducts', null, {});
  }
};
