'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('clientes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      empresa: {
        type: Sequelize.STRING
      },
      telefono: {
        type: Sequelize.INTEGER
      },
      direccion: {
        type: Sequelize.STRING
      },
      provincia: {
        type: Sequelize.STRING
      },
      localidad: {
        type: Sequelize.STRING
      },
      CP: {
        type: Sequelize.INTEGER
      },
      CUIT: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('clientes');
  }
};