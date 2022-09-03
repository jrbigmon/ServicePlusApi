
module.exports = (sequelize, DataTypes) => {
  const ServiceStatus = sequelize.define('ServiceStatus', {
    id: {
      type: DataTypes.INTEGER(10),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },

    name: {
      type: DataTypes.STRING(200),
      allowNull: false
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
      field: 'updated_at'
    }
  },
  {
    tableName: 'service_status',
    timestamps: true,
    paranoid: true
  })

  ServiceStatus.associate = models => {
    ServiceStatus.hasMany(models.Service, {
      foreignKey: 'serviceStatusId',
      as: 'services'
    })
  }
  return ServiceStatus
}
