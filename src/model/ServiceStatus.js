
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
    }

  },
  {
    tableName: 'service_status',
    timestamps: true
  })

  ServiceStatus.associate = models => {
    ServiceStatus.hasMany(models.Service, {
      foreignKey: 'serviceStatusId',
      as: 'services'
    })
  }
  return ServiceStatus
}
