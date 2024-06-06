'use strict';


const { User } = require('../models');
const bcrypt = require('bcryptjs')

let options = {}
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await User.bulkCreate([{
    firstName: 'admin',
    lastName: null,
    username: 'admin',
    email: 'thfloooringandmore@gmail.com',
    hashedPassword: bcrypt.hashSync('thflooring'),
    admin: true
   }], {validate: true})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users'
  await queryInterface.bulkDelete(options, {
    username: 'admin'
  }, {});

  }
};
