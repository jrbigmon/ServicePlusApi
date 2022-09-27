'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    const serviceStatus = [
      {
        id: 1,
        name: 'Budget'
      },
      {
        id: 2,
        name: 'Budgeted'
      },
      {
        id: 3,
        name: 'Accepted'
      },
      {
        id: 4,
        name: 'Finished'
      },
      {
        id: 5,
        name: 'Canceled'
      }
    ]
    await queryInterface.bulkInsert('service_status', serviceStatus, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('service_status', null, {})
  }
}
