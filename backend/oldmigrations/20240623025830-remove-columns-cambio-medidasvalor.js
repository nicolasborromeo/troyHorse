'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
options.tableName = 'Products';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn(options, 'cambio');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn(options, 'cambio', {
      type: Sequelize.FLOAT,
      allowNull: true,
    });
  }
};
