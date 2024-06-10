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
        id: 1,
        vendedor: 'IGNACIO GHIGLIONE',
        telVendedor: '515544332',
        fecha: new Date('2024-06-20'),
        fechaVenc: new Date('2024-07-20'),
        cliente: 'DANIELA',
        condicion: 'CONSUMIDOR FINAL',
        comentarios: "LOS VALORES SON IVA INCLUIDO PRESUPUESTO SUJETO A VISITA TECNICA",
        iva: true,
        total: 3192.37
      }
    ], { validate: true })
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Presupuestos'
    await queryInterface.bulkDelete(options, {id: 1}, {});

  }
};
