'use strict';

let options = {}
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

const {Presupuesto} = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Presupuesto.bulkCreate([
      {
        codigo: 1001,
        vendedor: 'IGNACIO GHIGLIONE',
        telVendedor: '515544332',
        fecha: new Date('2024-06-20'),
        fechaVenc: new Date('2024-07-20'),
        cliente: 'DANIELA',
        condicion: 'CONSUMIDOR FINAL',
        comentarios: "LOS VALORES SON IVA INCLUIDO PRESUPUESTO SUJETO A VISITA TECNICA",
        iva: true,
        total: 3192.37,
        moneda: 'USD'
      },{
        codigo: 1002,
        vendedor: 'IGNACIO GHIGLIONE',
        telVendedor: '515544332',
        fecha: new Date('2024-06-21'),
        fechaVenc: new Date('2024-07-21'),
        cliente: 'MARTIN',
        condicion: 'MONOTRIBUTISTA',
        comentarios: 'PRESUPUESTO VÁLIDO POR 30 DÍAS',
        iva: true,
        total: 13252.5,
        moneda: 'USD'
      },
      {
        codigo: 1003,
        vendedor: 'MARTIN BOCCAZZI',
        telVendedor: '515544332',
        fecha: new Date('2024-06-22'),
        fechaVenc: new Date('2024-07-22'),
        cliente: 'SOFIA',
        condicion: 'RESPONSABLE INSCRIPTO',
        comentarios: 'INCLUYE SERVICIO DE INSTALACIÓN',
        iva: true,
        total: 15009.37,
        moneda: 'ARG'
      },
      {
        codigo: 1004,
        vendedor: 'CRISTIAN',
        telVendedor: '515544332',
        fecha: new Date('2024-06-23'),
        fechaVenc: new Date('2024-07-23'),
        cliente: 'LUIS',
        condicion: 'EXENTO',
        comentarios: 'PAGO EN EFECTIVO TIENE 10% DE DESCUENTO',
        iva: false,
        total: 4048.75,
        moneda: 'USD'
      }
    ], { validate: true })
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Presupuestos'
    const {Op} = require('sequelize')
    await queryInterface.bulkDelete(options, {
      // codigo: {
      //   [Op.in] : [1001, 1002, 1003, 1004]
      // }
    }, {});

  }
};
