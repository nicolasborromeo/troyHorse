'use strict';

let options = {}
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

const {Product} = require('../models')

const products = [
  {
    codigo: '01581',
    descripcion: 'PF ING INTENSIVE CUMARU 11,5 X 131 X 305 - 2134 MM',
    medidasType: 'M2',
    costo: null,
    precio: 30.0,
    company: 'Indusparquet'
  },
  {
    codigo: '01687',
    descripcion: 'PF ING INOVARE COPAIBA DARK BROWN FR - CM 9,5 X 127 X 290 - 1220 MM',
    medidasType: 'M2',
    costo: null,
    precio: 26.0,
    company: 'Indusparquet'
  },
  {
    codigo: '01361',
    descripcion: 'PF ING INOVARE CURITIBA CLASSIC SMOOTH 9,5 X 127 X 1220 MM',
    medidasType: 'M2',
    costo: null,
    precio: 38.0,
    company: 'Indusparquet'
  },
  {
    codigo: '01893',
    descripcion: 'PF ING CLICK TAUARI BANDERA 9,5 X 160 X 1220 MM',
    medidasType: 'M2',
    costo: null,
    precio: 28.0,
    company: 'Indusparquet'
  },
  {
    codigo: '01870',
    descripcion: 'PF ING CLICK CURITIBA HOPE 9,5 X 160 X 305 - 1220 MM',
    medidasType: 'M2',
    costo: null,
    precio: 30.0,
    company: 'Indusparquet'
  },
  {
    codigo: '01879',
    descripcion: 'PF ING INOVARE CLICK FOREST HILL 9,5 X 160 X 305 - 1220 MM',
    medidasType: 'M2',
    costo: null,
    precio: 20.306,
    company: 'Indusparquet'
  },
  {
    codigo: '01524',
    descripcion: 'PF ING RUSTIK CURITIBA COTTAGE 12,5 X 131 X 305 - 2134 MM',
    medidasType: 'M2',
    costo: null,
    precio: 69.0,
    company: 'Indusparquet'
  },
  {
    codigo: '01939',
    descripcion: 'PF ING RUSTIK CURITIBA NATURAL 16 X 195 X 305 - 2134 MM',
    medidasType: 'M2',
    costo: null,
    precio: 36.75,
    company: 'Indusparquet'
  },
  {
    codigo: '02088',
    descripcion: 'PF ING RUSTIK CUMARU DEMOLICION 13 X 148 X 305 - 2134 MM',
    medidasType: 'M2',
    costo: null,
    precio: 110.0,
    company: 'Indusparquet'
  },
  {
    codigo: '01933',
    descripcion: 'PF ING NATIVE CITRI NATURAL 12,5 X 120 X 305 - 2134 MM',
    medidasType: 'M2',
    costo: null,
    precio: 59.0,
    company: 'Indusparquet'
  },
  {
    codigo: '01993',
    descripcion: 'PF ING NATIVE GUAYUVIRA 9,5 X 82,6 X 305 - 1220 MM',
    medidasType: 'M2',
    costo: null,
    precio: 49.0,
    company: 'Indusparquet'
  },
  {
    codigo: '01995',
    descripcion: 'PF ING ELEGANCE GUAYUVIRA (BRILLO 10 MM) 12,5 X 131 X 305 - 1220MM',
    medidasType: 'M2',
    costo: null,
    precio: 65.0,
    company: 'Indusparquet'
  },
  {
    codigo: '02030',
    descripcion: 'PF ING ROBLE NATURAL ALPINO 12 X 101,6 X 225 - 1200 MM',
    medidasType: 'M2',
    costo: null,
    precio: 50.0,
    company: 'Indusparquet'
  },
  {
    codigo: '03017',
    descripcion: 'PEGAMENTO HENKEL TITEBOND 18 KG',
    medidasType: 'UN',
    costo: null,
    precio: 50.0,
    company: 'Indusparquet'
  },
  {
    codigo: '03019',
    descripcion: 'PEGAMENTO CIPEP RENOVATOR 12 KG',
    medidasType: 'UN',
    costo: null,
    precio: 45.0,
    company: 'Indusparquet'
  },
  {
    codigo: '03025',
    descripcion: 'IMPERMEABILIZANTE CIPEP 10 L',
    medidasType: 'UN',
    costo: null,
    precio: 30.0,
    company: 'Indusparquet'
  },
  {
    codigo: '03042',
    descripcion: 'SELLADOR CIPEP POLIURETANO 5 L',
    medidasType: 'UN',
    costo: null,
    precio: 55.0,
    company: 'Indusparquet'
  },
  {
    codigo: '03050',
    descripcion: 'ACABADO CIPEP MATE 4 L',
    medidasType: 'UN',
    costo: null,
    precio: 65.0,
    company: 'Indusparquet'
  },
  {
    codigo: '03058',
    descripcion: 'MASILLA ELASTICA CIPEP 2 KG',
    medidasType: 'UN',
    costo: null,
    precio: 25.0,
    company: 'Indusparquet'
  },
  {
    codigo: '03062',
    descripcion: 'LACA CIPEP ALTO BRILLO 4 L',
    medidasType: 'UN',
    costo: null,
    precio: 75.0,
    company: 'Indusparquet'
  },
  {
    codigo: '03068',
    descripcion: 'LACA CIPEP SATINADO 4 L',
    medidasType: 'UN',
    costo: null,
    precio: 70.0,
    company: 'Indusparquet'
  },
  {
    codigo: '03074',
    descripcion: 'SOLVENTE CIPEP LIMPIADOR 5 L',
    medidasType: 'UN',
    costo: null,
    precio: 20.0,
    company: 'Indusparquet'
  },
  {
    codigo: '03081',
    descripcion: 'FONDO CIPEP TRANSPARENTE 5 L',
    medidasType: 'UN',
    costo: null,
    precio: 60.0,
    company: 'Indusparquet'
  },
  {
    codigo: '03089',
    descripcion: 'LIMPIADOR CIPEP MULTIUSO 500 ML',
    medidasType: 'UN',
    costo: null,
    precio: 15.0,
    company: 'Indusparquet'
  },
  {
    codigo: '03095',
    descripcion: 'RESINA CIPEP ADHESIVA 1 KG',
    medidasType: 'UN',
    costo: null,
    precio: 35.0,
    company: 'Indusparquet'
  },
    {
      codigo: 'SPC-012-ESMERALD',
      descripcion: 'PISO SPC ESMERALD 5,5 mm ( 5+1,5 mm ) MANTA INCORPORADA -CH.. ALTA GAMA.',
      medidasType: 'M2',
      costo: 27.64,
      precio: 32.52,
      company: 'The Flooring Company'
    },
    {
      codigo: 'SPC-013-RUBY',
      descripcion: 'PISO SPC RUBY 6 mm ( 5+1 mm ) MANTA INCORPORADA -CH.. ALTA GAMA.',
      medidasType: 'M2',
      costo: 29.00,
      precio: 34.00,
      company: 'The Flooring Company'
    },
    {
      codigo: 'SPC-014-SAPPHIRE',
      descripcion: 'PISO SPC SAPPHIRE 5 mm ( 4+1 mm ) MANTA INCORPORADA -CH.. ALTA GAMA.',
      medidasType: 'M2',
      costo: 25.50,
      precio: 30.00,
      company: 'The Flooring Company'
    },
    {
      codigo: 'SPC-015-AMBER',
      descripcion: 'PISO SPC AMBER 5,5 mm ( 5+1,5 mm ) MANTA INCORPORADA -CH.. ALTA GAMA.',
      medidasType: 'M2',
      costo: 28.00,
      precio: 33.00,
      company: 'The Flooring Company'
    },
    {
      codigo: 'SPC-016-ONYX',
      descripcion: 'PISO SPC ONYX 6 mm ( 5+1 mm ) MANTA INCORPORADA -CH.. ALTA GAMA.',
      medidasType: 'M2',
      costo: 30.00,
      precio: 35.00,
      company: 'The Flooring Company'
    },
    {
      codigo: 'SPC-017-TOPAZ',
      descripcion: 'PISO SPC TOPAZ 5 mm ( 4+1 mm ) MANTA INCORPORADA -CH.. ALTA GAMA.',
      medidasType: 'M2',
      costo: 26.50,
      precio: 31.00,
      company: 'The Flooring Company'
    },
    {
      codigo: 'SPC-018-EMERALD',
      descripcion: 'PISO SPC EMERALD 5,5 mm ( 5+1,5 mm ) MANTA INCORPORADA -CH.. ALTA GAMA.',
      medidasType: 'M2',
      costo: 27.75,
      precio: 32.75,
      company: 'The Flooring Company'
    },
    {
      codigo: 'SPC-019-JADE',
      descripcion: 'PISO SPC JADE 6 mm ( 5+1 mm ) MANTA INCORPORADA -CH.. ALTA GAMA.',
      medidasType: 'M2',
      costo: 29.50,
      precio: 34.50,
      company: 'The Flooring Company'
    },
    {
      codigo: 'SPC-020-AMETHYST',
      descripcion: 'PISO SPC AMETHYST 5 mm ( 4+1 mm ) MANTA INCORPORADA -CH.. ALTA GAMA.',
      medidasType: 'M2',
      costo: 26.00,
      precio: 30.50,
      company: 'The Flooring Company'
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
