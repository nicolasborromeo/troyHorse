'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
options.tableName = 'Users';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(options, 'tel', {
      type: Sequelize.STRING,
    });

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(options, 'tel');
  }
};
