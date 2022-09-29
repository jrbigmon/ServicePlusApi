'use strict';
const bcrypt = require('bcryptjs');
module.exports = {
  async up (queryInterface, Sequelize) {
    const password = process.env.FIRST_ADM_PASS
    await queryInterface.bulkInsert('admin', [{
      id: 1,
      email: 'admin@example.com',
      password: bcrypt.hashSync(password, 10)
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('admin', null, {});
  }
};
