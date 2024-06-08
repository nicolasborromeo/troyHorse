'use strict';
const {ProductsPresupuestos} =require('../models')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await ProductsPresupuestos.bulkCreate([
     { productId: 1,
      presupuestoId: 1,
      codigo: "01581",
      descripcion: "PF ING INTENSIVE CUMARU",
      precioUnit: 30,
      cantidad: 100,
      precioTotal: 3000}
    ], {validate: true})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
