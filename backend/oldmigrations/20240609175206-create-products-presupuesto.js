'use strict';


let options = {};
if(process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
};


const { sequelize } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ProductsPresupuestos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Products',
          key: 'id'
        }
      },
      presupuestoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Presupuestos',
          key: 'id'
        }
      },
      codigo: {
        type: Sequelize.STRING,
        allowNull:true
      },
      descripcion: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cantidad: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      precioUnit: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      descuento: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      precioTotal: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    },options);
  },
  async down(queryInterface, Sequelize) {
    options.tableName = 'ProductsPresupuestos'
    await queryInterface.dropTable(options);
  }
};
