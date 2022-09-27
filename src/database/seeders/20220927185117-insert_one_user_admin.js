'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('admin', [{
      id: 1,
      email: 'admin@example.com',
      password: '1@3@4#2#4'
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('admin', null, {});
  }
};
