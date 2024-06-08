'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cliente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Cliente.init({
    empresa: DataTypes.STRING,
    telefono: DataTypes.INTEGER,
    direccion: DataTypes.STRING,
    provincia: DataTypes.STRING,
    localidad: DataTypes.STRING,
    CP: DataTypes.INTEGER,
    CUIT: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cliente',
  });
  return Cliente;
};
