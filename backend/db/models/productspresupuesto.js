'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductsPresupuesto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProductsPresupuesto.init({
    productId: DataTypes.INTEGER,
    presupuestoId: DataTypes.INTEGER,
    codigo: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    cantidad: DataTypes.INTEGER,
    precioUnit: DataTypes.FLOAT,
    descuento: DataTypes.INTEGER,
    precioTotal: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'ProductsPresupuesto',
  });
  return ProductsPresupuesto;
};