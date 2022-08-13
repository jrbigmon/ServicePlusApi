'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('professionals', { 
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
      
      birthday: {
        type: Sequelize.DataTypes.STRING(200),
        allowNull: false
      },

      postal_code: {
        type: Sequelize.DataTypes.STRING(200),
        allowNull: false
      },

      telephone: {
        type: Sequelize.DataTypes.STRING(200),
        allowNull: false
      },

      email: {
        type: Sequelize.DataTypes.STRING(200),
        allowNull: false
      },

      password: {
        type: Sequelize.DataTypes.STRING(400),
        allowNull: false
      },

      about_you: { 
        type: Sequelize.DataTypes.STRING(500),
        allowNull: true
      },

      area_id: {
        type: Sequelize.DataTypes.INTEGER(10),
        references: {
          model: { tableName: 'areas'},
          key: 'id'
        },
        allowNull: false
      }
        
    });
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('professionals');
  }
};
