module.exports = (sequelize, DataTypes) => {
  const Service = sequelize.define('Service', {
    id: {
      type: DataTypes.INTEGER(10),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },

    clientId: {
      type: DataTypes.INTEGER(10),
      foreignKey: true,
      allowNull: false,
      field: 'client_id'
    },

    professionalId: {
      type: DataTypes.INTEGER(10),
      foreignKey: true,
      allowNull: false,
      field: 'professional_id'
    },

    serviceDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'service_date'
    },

    servicePrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.01,
      field: 'service_price'
    },

    serviceDescription: {
      type: DataTypes.STRING(400),
      allowNull: false,
      field: 'service_description'
    },

    serviceStatusId: {
      type: DataTypes.INTEGER(10),
      foreignKey: true,
      allowNull: false,
      defaultValue: 1,
      field: 'service_status_id'
    },

    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'created_at'
    },

    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'updated_at'
    },

    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'deleted_at'
    }
  },
  {
    tableName: 'services',
    timestamps: true,
    paranoid: true
  })

  Service.associate = models => {
    Service.belongsTo(models.ServiceStatus, {
      foreignKey: 'serviceStatusId',
      as: 'serviceStatus'
    })
    Service.belongsTo(models.Professional, {
      foreignKey: 'professionalId',
      as: 'professional'
    })
    Service.belongsTo(models.Client, {
      foreignKey: 'clientId',
      as: 'client'
    })
  }

  return Service
}
