'use strict';

let options = {}
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

const {Product} = require('../models')

const products = [
  {
    codigo: '01581',
    descripcion: 'PF ING INTENSIVE CUMARU',
    medidasValor: '11,5 X 131 X 305 - 2134 MM ',
    medidasType: 'M2',
    costo: null,
    precio: 30.0,
    cambio: 980.0,
    company: 'Indusparquet'
  },
  {
    codigo: '01687',
    descripcion: 'PF ING INOVARE COPAIBA DARK BROWN FR - CM ',
    medidasValor: '9,5 X 127 X 290 - 1220 MM ',
    medidasType: 'M2',
    costo: null,
    precio: 26.0,
    cambio: 980.0,
    company: 'Indusparquet'
  },
  {
    codigo: '01361',
    descripcion: 'PF ING INOVARE CURITIBA CLASSIC SMOOTH',
    medidasValor: '9,5 X 127 X 1220 MM',
    medidasType: 'M2',
    costo: null,
    precio: 38.0,
    cambio: 980.0,
    company: 'Indusparquet'
  },
  {
    codigo: '01893',
    descripcion: 'PF ING CLICK TAUARI BANDERA',
    medidasValor: '9,5 X 160 X 1220 MM',
    medidasType: 'M2',
    costo: null,
    precio: 28.0,
    cambio: 980.0,
    company: 'Indusparquet'
  },
  {
    codigo: '01870',
    descripcion: 'PF ING CLICK CURITIBA HOPE',
    medidasValor: '9,5 X 160 X 305 - 1220 MM',
    medidasType: 'M2',
    costo: null,
    precio: 30.0,
    cambio: 980.0,
    company: 'Indusparquet'
  },
  {
    codigo: '01879',
    descripcion: 'PF ING INOVARE CLICK FOREST HILL',
    medidasValor: '9,5 X 160 X 305 - 1220 MM',
    medidasType: 'M2',
    costo: null,
    precio: 20.306,
    cambio: 980.0,
    company: 'Indusparquet'
  },
  {
    codigo: '01524',
    descripcion: 'PF ING RUSTIK CURITIBA COTTAGE',
    medidasValor: '12,5 X 131 X 305 - 2134 MM',
    medidasType: 'M2',
    costo: null,
    precio: 69.0,
    cambio: 980.0,
    company: 'Indusparquet'
  },
  {
    codigo: '01939',
    descripcion: 'PF ING RUSTIK CURITIBA NATURAL ',
    medidasValor: '16 X 195 X 305 - 2134 MM',
    medidasType: 'M2',
    costo: null,
    precio: 36.75,
    cambio: 205.0,
    company: 'Indusparquet'
  },
  {
    codigo: '02088',
    descripcion: 'PF ING RUSTIK CUMARU DEMOLICION',
    medidasValor: '13 X 148 X 305 - 2134 MM',
    medidasType: 'M2',
    costo: null,
    precio: 110.0,
    cambio: 980.0,
    company: 'Indusparquet'
  },
  {
    codigo: '01933',
    descripcion: 'PF ING NATIVE CITRI NATURAL',
    medidasValor: '12,5 X 120 X 305 - 2134 MM',
    medidasType: 'M2',
    costo: null,
    precio: 59.0,
    cambio: 980.0,
    company: 'Indusparquet'
  },
  {
    codigo: '01993',
    descripcion: 'PF ING NATIVE GUAYUVIRA',
    medidasValor: '9,5 X 82,6 X 305 - 1220 MM',
    medidasType: 'M2',
    costo: null,
    precio: 49.0,
    cambio: 980.0,
    company: 'Indusparquet'
  },
  {
    codigo: '01995',
    descripcion: 'PF ING ELEGANCE GUAYUVIRA (BRILLO 10 MM)',
    medidasValor: '12,5 X 131 X 305 - 1220MM',
    medidasType: 'M2',
    costo: null,
    precio: 65.0,
    cambio: 980.0,
    company: 'Indusparquet'
  },
  {
    codigo: '02030',
    descripcion: 'PF ING ROBLE NATURAL ALPINO',
    medidasValor: '12 X 101,6 X 225 - 1200 MM',
    medidasType: 'M2',
    costo: null,
    precio: 50.0,
    cambio: 980.0,
    company: 'Indusparquet'
  },
  {
    codigo: '03017',
    descripcion: 'PEGAMENTO HENKEL TITEBOND',
    medidasValor: '18 KG',
    medidasType: 'UN',
    costo: null,
    precio: 50.0,
    cambio: 980.0,
    company: 'Indusparquet'
  },
  {
    codigo: '03019',
    descripcion: 'PEGAMENTO CIPEP RENOVATOR',
    medidasValor: '12 KG',
    medidasType: 'UN',
    costo: null,
    precio: 45.0,
    cambio: 980.0,
    company: 'Indusparquet'
  },
  {
    codigo: '03025',
    descripcion: 'IMPERMEABILIZANTE CIPEP',
    medidasValor: '10 L',
    medidasType: 'UN',
    costo: null,
    precio: 30.0,
    cambio: 980.0,
    company: 'Indusparquet'
  },
  {
    codigo: '03042',
    descripcion: 'SELLADOR CIPEP POLIURETANO',
    medidasValor: '5 L',
    medidasType: 'UN',
    costo: null,
    precio: 55.0,
    cambio: 980.0,
    company: 'Indusparquet'
  },
  {
    codigo: '03050',
    descripcion: 'ACABADO CIPEP MATE',
    medidasValor: '4 L',
    medidasType: 'UN',
    costo: null,
    precio: 65.0,
    cambio: 980.0,
    company: 'Indusparquet'
  },
  {
    codigo: '03058',
    descripcion: 'MASILLA ELASTICA CIPEP',
    medidasValor: '2 KG',
    medidasType: 'UN',
    costo: null,
    precio: 25.0,
    cambio: 980.0,
    company: 'Indusparquet'
  },
  {
    codigo: '03062',
    descripcion: 'LACA CIPEP ALTO BRILLO',
    medidasValor: '4 L',
    medidasType: 'UN',
    costo: null,
    precio: 75.0,
    cambio: 980.0,
    company: 'Indusparquet'
  },
  {
    codigo: '03068',
    descripcion: 'LACA CIPEP SATINADO',
    medidasValor: '4 L',
    medidasType: 'UN',
    costo: null,
    precio: 70.0,
    cambio: 980.0,
    company: 'Indusparquet'
  },
  {
    codigo: '03074',
    descripcion: 'SOLVENTE CIPEP LIMPIADOR',
    medidasValor: '5 L',
    medidasType: 'UN',
    costo: null,
    precio: 20.0,
    cambio: 980.0,
    company: 'Indusparquet'
  },
  {
    codigo: '03081',
    descripcion: 'FONDO CIPEP TRANSPARENTE',
    medidasValor: '5 L',
    medidasType: 'UN',
    costo: null,
    precio: 60.0,
    cambio: 980.0,
    company: 'Indusparquet'
  },
  {
    codigo: '03089',
    descripcion: 'LIMPIADOR CIPEP MULTIUSO',
    medidasValor: '500 ML',
    medidasType: 'UN',
    costo: null,
    precio: 15.0,
    cambio: 980.0,
    company: 'Indusparquet'
  },
  {
    codigo: '03095',
    descripcion: 'RESINA CIPEP ADHESIVA',
    medidasValor: '1 KG',
    medidasType: 'UN',
    costo: null,
    precio: 35.0,
    cambio: 980.0,
    company: 'Indusparquet'
  }
];


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Product.bulkCreate(products, {validate: true})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Products'
    const {Op} = require('sequelize')
    await queryInterface.bulkDelete(options, {}, {})
  }
};
