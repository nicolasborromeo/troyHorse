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
     {
      id:1,
      productId: 1,
      presupuestoId: 1,
      codigo: "01581",
      descripcion: "PF ING INTENSIVE CUMARU",
      precioUnit: 30,
      cantidad: 100,
      descuento: null,
      precioTotal: 3000
    },
    {
      id: 2,
      productId: 15,
      presupuestoId: 2,
      codigo: "03019",
      descripcion: "PEGAMENTO CIPEP RENOVATOR",
      precioUnit: 45,
      cantidad: 150,
      descuento: 5,
      precioTotal: 6412.5
    },
    {
      id: 3,
      productId: 3,
      presupuestoId: 2,
      codigo: "01361",
      descripcion: "PF ING INOVARE CURITIBA CLASSIC SMOOTH",
      precioUnit: 38,
      cantidad: 200,
      descuento: 10,
      precioTotal: 6840
    },
    {
      id: 4,
      productId: 8,
      presupuestoId: 3,
      codigo: "01939",
      descripcion: "PF ING RUSTIK CURITIBA NATURAL",
      precioUnit: 36.75,
      cantidad: 250,
      descuento: 15,
      precioTotal: 7809.37
    },
    {
      id: 5,
      productId: 5,
      presupuestoId: 3,
      codigo: "01870",
      descripcion: "PF ING CLICK CURITIBA HOPE",
      precioUnit: 30,
      cantidad: 300,
      descuento: 20,
      precioTotal: 7200
    },
    {
      id: 6,
      productId: 11,
      presupuestoId: 4,
      codigo: "01993",
      descripcion: "PF ING NATIVE GUAYUVIRA",
      precioUnit: 49,
      cantidad: 100,
      descuento: null,
      precioTotal: 4900
    },
    {
      id: 7,
      productId: 20,
      presupuestoId: 4,
      codigo: "03062",
      descripcion: "LACA CIPEP ALTO BRILLO",
      precioUnit: 75,
      cantidad: 3,
      descuento: null,
      precioTotal: 225
    }

    ], {validate: true})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ProductsPresupuestos'
    const {Op} = require('sequelize')
  await queryInterface.bulkDelete(options, {
    id: {
      [Op.in] : [1, 2, 3, 4, 5, 6, 7]
    }
  }, {});

  }
};
