'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('admin', {
      id: {
        type: Sequelize.DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },

      email: {
        type: Sequelize.DataTypes.STRING(200),
        allowNull: false
      },

      password: {
        type: Sequelize.DataTypes.STRING(500),
        allowNull: false
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('admin')
  }
}
