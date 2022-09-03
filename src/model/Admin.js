module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define('Admin', {
    id: {
      type: DataTypes.INTEGER(10),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },

    email: {
      type: DataTypes.STRING(200),
      allowNull: false
    },

    password: {
      type: DataTypes.STRING(500),
      allowNull: false
    }

  },
  {
    tableName: 'admin',
    timestamps: true
  })

  return Admin
}
