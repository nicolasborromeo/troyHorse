'use strict';

let options = {};
if(process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
};


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Presupuestos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      vendedor: {
        type: Sequelize.STRING
      },
      telVendedor: {
        type: Sequelize.INTEGER
      },
      fecha: {
        type: Sequelize.DATE
      },
      fechaVenc: {
        type: Sequelize.DATE
      },
      cliente: {
        type: Sequelize.STRING,
        // references: {
        //   model:'Clientes',
        //   key: 'id'
        // }
      },
      condicion: {
        type: Sequelize.STRING
      },
      descuento: {
        type: Sequelize.INTEGER
      },
      iva: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      comentarios: {
        type: Sequelize.STRING
      },
      total: {
        type: Sequelize.FLOAT
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
    }, options);
  },
  async down(queryInterface, Sequelize) {
    options.tableName = 'Presupuestos'
    await queryInterface.dropTable(options);
  }
};
