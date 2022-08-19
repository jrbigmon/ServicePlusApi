'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const areas = [
      {
        name: 'Electrician'
      },
      {
        name: 'Plumber'
      },
      {
        name: 'Painter'
      }
    ]
    await queryInterface.bulkInsert('areas', areas, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('areas', null, {});
  }
};
