module.exports = (sequelize, DataTypes) => {
  const Area = sequelize.define('Area', {
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
    tableName: 'areas',
    timestamps: true
  })

  Area.associate = models => {
    Area.hasMany(models.Professional, {
      foreignKey: 'areaId',
      as: 'professionals'
    })
  }
  return Area
}
