'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('service_status', {
      id: {
        type: Sequelize.DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },

      name: {
        type: Sequelize.DataTypes.STRING(200),
        allowNull: false
      }

    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('service_status')
  }
}
