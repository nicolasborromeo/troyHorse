'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
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
      codigo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
      },
      vendedor: {
        type: Sequelize.STRING
      },
      telVendedor: {
        type: Sequelize.STRING
      },
      fecha: {
        type: Sequelize.DATE
      },
      fechaVenc: {
        type: Sequelize.DATE
      },
      cliente: {
        type: Sequelize.STRING,
      },
      clientId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Clientes',
          key: 'id'
        }
      },
      condicion: {
        type: Sequelize.STRING
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
      moneda: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'USD'
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
