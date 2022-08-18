'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const areas = [
      {
        name: 'Eletricista'
      },
      {
        name: 'Encanador'
      },
      {
        name: 'Pintor'
      }
    ]
    await queryInterface.bulkInsert('areas', areas, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('areas', null, {});
  }
};
