'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('services', {
      id: {
        type: Sequelize.DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },

      client_id: {
        type: Sequelize.DataTypes.INTEGER(10),
        references: {
          model: { tableName: 'clients' },
          key: 'id'
        },
        allowNull: false
      },

      professional_id: {
        type: Sequelize.DataTypes.INTEGER(10),
        references: {
          model: { tableName: 'professionals' },
          key: 'id'
        },
        allowNull: false
      },

      service_date: {
        type: Sequelize.DataTypes.DATEONLY,
        allowNull: false
      },

      service_price: {
        type: Sequelize.DataTypes.FLOAT,
        allowNull: false
      },

      service_description: {
        type: Sequelize.DataTypes.STRING(400),
        allowNull: false
      },

      service_status_id: {
        type: Sequelize.DataTypes.INTEGER(10),
        references: {
          model: { tableName: 'service_status' },
          key: 'id'
        },
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
    await queryInterface.dropTable('services')
  }
}
