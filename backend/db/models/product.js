'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {

    static associate(models) {
      Product.belongsToMany(models.Presupuesto,
        { through: 'ProductsPresupuestos',
          foreignKey: 'productId',
          otherKey: 'presupuestoId'
       });
    }
  }
  Product.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    codigo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    medidasValor: {
      type: DataTypes.STRING,
      allowNull: false
    },
    medidasType: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   isUppercase: true,
      //   len: [2,3],
      //   isIn: [['M2', 'UN', 'ML', 'LTS', 'KG']]
      // }
    },
    costo: {
      type: DataTypes.FLOAT
    },
    precio: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    cambio: {
      type: DataTypes.FLOAT
    },
    company: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Product',
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    }
  });
  return Product;
};
