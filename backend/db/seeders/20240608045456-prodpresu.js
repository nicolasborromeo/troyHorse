'use strict';

let options = {}
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

const {ProductsPresupuesto} = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await ProductsPresupuesto.bulkCreate([
     {id:1,
      productId: 1,
      presupuestoId: 1,
      codigo: "01581",
      descripcion: "PF ING INTENSIVE CUMARU",
      precioUnit: 30,
      cantidad: 100,
      descuento: null,
      precioTotal: 3000}
    ], {validate: true})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ProductsPresupuestos'
  await queryInterface.bulkDelete(options, {id:1}, {});

  }
};
