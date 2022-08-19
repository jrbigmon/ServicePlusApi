'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const serviceStatus = [
      {
        name: 'Budget'
      },
      {
        name: 'Budgeted'
      },
      {
        name: 'Accepted'
      },
      {
        name: 'Finished'
      },
      {
        name: 'Canceled'
      },
    ]
    await queryInterface.bulkInsert('service_status', serviceStatus, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('service_status', null, {});
  }
};
