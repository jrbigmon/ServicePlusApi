'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    const areas = [
      {
        id: 1,
        name: 'Electrician'
      },
      {
        id: 2,
        name: 'Plumber'
      },
      {
        id: 3,
        name: 'Painter'
      }
    ]
    await queryInterface.bulkInsert('areas', areas, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('areas', null, {})
  }
}
