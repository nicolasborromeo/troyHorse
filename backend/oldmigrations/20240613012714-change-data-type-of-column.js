'use strict';

let options = {};
if(process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
};
options.tableName = 'Presupuestos'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn(options, 'telVendedor', {
      type: Sequelize.STRING,
    });
  },


  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn(options, 'telVendedor', {
      type: Sequelize.INTEGER,
    });
  },
}
