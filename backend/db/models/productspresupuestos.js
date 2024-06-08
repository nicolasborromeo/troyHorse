'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductsPresupuestos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProductsPresupuestos.init({
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Products',
        key: 'id'
      }
      },
    presupuestoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Presupuestos',
        key: 'id'
      }
      },
    codigo: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    precioUnit: DataTypes.FLOAT,
    cantidad: DataTypes.INTEGER,
    precioTotal: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'ProductsPresupuestos',
  });
  return ProductsPresupuestos;
};
