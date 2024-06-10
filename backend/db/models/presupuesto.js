'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Presupuesto extends Model {

    static associate(models) {
      // Presupuesto.belongsTo(models.Cliente, {foreignKey: 'clienteId'})
      Presupuesto.belongsToMany(models.Product,
        { through: 'ProductsPresupuestos',
          foreignKey:'presupuestoId',
          otherKey: 'productId'
       });
    }
  }
  Presupuesto.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    vendedor: {
      type: DataTypes.STRING
    },
    telVendedor: {
      type: DataTypes.INTEGER
    },
    fecha: {
      type: DataTypes.DATE
    },
    fechaVenc: {
      type: DataTypes.DATE,
      validate: {
        isAfterFecha(value) {
          if(value < this.fecha) {
            throw new Error('El vencimiento debe ser despues de la fecha de hoy')
          }
        }
      }
    },
    cliente: {
      type: DataTypes.STRING,
      // references: {
      //   model: 'Clientes',
      //   key: 'id'
      // }
    },
    condicion: {
      type: DataTypes.STRING
    },
    // descuento: {
    //   type: DataTypes.INTEGER
    // },
    iva: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    comentarios: {
      type: DataTypes.STRING,
    },
    total: {
      type: DataTypes.FLOAT
    }
  }, {
    sequelize,
    modelName: 'Presupuesto',
  });
  return Presupuesto;
};
