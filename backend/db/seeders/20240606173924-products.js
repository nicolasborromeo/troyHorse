'use strict';

let options = {}
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

const {Product} = require('../models')

const {flooringProducts} = require( '../../seeders/flooringcompanyProducts')
const {indusparquetProducts} = require( '../../seeders/indusparquetProducts')

const products = [...flooringProducts, ...indusparquetProducts]
// console.log(products)

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
