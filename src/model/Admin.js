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
    tableName: 'admin',
    timestamps: true
  })

  return Admin
}
