'use strict';

let options = {}
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

const { ProductsPresupuesto } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await ProductsPresupuesto.bulkCreate([
      //EDGECASE
      {
        productId: null,
        presupuestoId: 1,
        codigo: null,
        descripcion: "TEST PF ING INTENSIVE CUMARU",
        cantidad: 100,
        precioUnit: 30,
        descuento: null,
        precioTotal: 1234.5
      },
      {
        productId: 15,
        presupuestoId: 2,
        codigo: "03019",
        descripcion: "TEST PEGAMENTO CIPEP RENOVATOR",
        cantidad: 150,
        precioUnit: 45,
        descuento: 5,
        precioTotal: 1234.5
      },
      {
        productId: 3,
        presupuestoId: 2,
        codigo: "01361",
        descripcion: "TEST PF ING INOVARE CURITIBA CLASSIC SMOOTH",
        cantidad: 200,
        precioUnit: 38,
        descuento: 10,
        precioTotal: 1234.5
      },
      {
        productId: 8,
        presupuestoId: 3,
        codigo: "01939",
        descripcion: "TEST PF ING RUSTIK CURITIBA NATURAL",
        cantidad: 250,
        precioUnit: 36.75,
        descuento: 15,
        precioTotal: 1234.5
      },
      {
        productId: 5,
        presupuestoId: 3,
        codigo: "01870",
        descripcion: "TEST PF ING CLICK CURITIBA HOPE",
        cantidad: 300,
        precioUnit: 30,
        descuento: 20,
        precioTotal: 1234.5
      },
      {
        productId: 11,
        presupuestoId: 4,
        codigo: "01993",
        descripcion: "TEST PF ING NATIVE GUAYUVIRA",
        cantidad: 100,
        precioUnit: 49,
        descuento: null,
        precioTotal: 1234.5
      },
      {
        productId: 20,
        presupuestoId: 4,
        codigo: "03062",
        descripcion: "TEST LACA CIPEP ALTO BRILLO",
        cantidad: 3,
        precioUnit: 75,
        descuento: null,
        precioTotal: 1234.5
      }

    ], options, { validate: true })
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'ProductsPresupuestos'
    const { Op } = require('sequelize')
    await queryInterface.bulkDelete(options, {
      createdAt: {
        [Op.lt]: new Date('2024-06-23') 
      }
    }, {});
  }
};
