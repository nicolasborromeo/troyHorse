'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Presupuesto extends Model {

    static async getCodigo() {
      try {
        const latestPresupuesto = await this.findOne({
          limit: 1,
          attributes: ['id', 'codigo'],
          order: [['id', 'DESC']]
        });
        return latestPresupuesto ? latestPresupuesto.codigo : null;
      } catch (error) {
        // Handle errors here
        console.error('Error fetching latest Presupuesto:', error);
        throw error;
      }};

    static associate(models) {
      Presupuesto.belongsTo(models.Cliente, {foreignKey: 'clientId'})
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
    codigo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    vendedor: {
      type: DataTypes.STRING
    },
    telVendedor: {
      type: DataTypes.STRING,
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
    },
    clientId: {
      type: DataTypes.INTEGER,
        references: {
        model: 'Clientes',
        key: 'id'
      }
    },
    condicion: {
      type: DataTypes.STRING
    },
    iva: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    comentarios: {
      type: DataTypes.STRING,
    },
    total: {
      type: DataTypes.FLOAT
    },
    moneda: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'USD'
    }
  }, {
    sequelize,
    modelName: 'Presupuesto',
  });
  return Presupuesto;
};
