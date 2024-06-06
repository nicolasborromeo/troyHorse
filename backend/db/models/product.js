'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init({
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
      validate: {
        isUppercase: true,
        len: [2,2],
        isIn: [['M2', 'UN', 'ML']]
      }
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
