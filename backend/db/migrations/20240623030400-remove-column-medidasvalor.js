'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
options.tableName = 'Products';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn(options, 'medidasValor');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn(options, 'medidasValor', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  }
};
