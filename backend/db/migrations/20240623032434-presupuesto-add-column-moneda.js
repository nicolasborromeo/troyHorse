'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
options.tableName = 'Presupuestos';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(options, 'moneda', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'USD'
    });

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(options, 'moneda');
  }
};
