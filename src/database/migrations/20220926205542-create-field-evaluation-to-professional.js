'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('evaluations_has_professionals', { 
      id: {
        type: Sequelize.DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
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

      client_id: {
        type: Sequelize.DataTypes.INTEGER(10),
        references: {
          model: { tableName: 'clients'},
          key: 'id'
        },
        allowNull: true
      },

      assessment: {
        type: Sequelize.DataTypes.INTEGER(10),
        allowNull: true
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

    });
    
  },

  async down (queryInterface, Sequelize) {  
    await queryInterface.dropTable('evaluations_has_professionals');
  }
};
