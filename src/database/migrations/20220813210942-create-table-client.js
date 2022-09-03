'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('clients', {
      id: {
        type: Sequelize.DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },

      avatar: {
        type: Sequelize.DataTypes.STRING(200),
        allowNull: true
      },

      name: {
        type: Sequelize.DataTypes.STRING(200),
        allowNull: false
      },

      last_name: {
        type: Sequelize.DataTypes.STRING(200),
        allowNull: false
      },

      cpf: {
        type: Sequelize.DataTypes.STRING(25),
        allowNull: false,
        unique: true
      },

      birthday: {
        type: Sequelize.DataTypes.STRING(200),
        allowNull: false
      },

      postal_code: {
        type: Sequelize.DataTypes.STRING(200),
        allowNull: false
      },

      number_address: {
        type: Sequelize.DataTypes.STRING(10),
        allowNull: false
      },

      telephone: {
        type: Sequelize.DataTypes.STRING(200),
        allowNull: false
      },

      email: {
        type: Sequelize.DataTypes.STRING(200),
        allowNull: false,
        unique: true
      },

      password: {
        type: Sequelize.DataTypes.STRING(400),
        allowNull: false
      },

      created_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true
      },

      updated_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true
      },

      deleted_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true
      }

    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('clients')
  }
}
