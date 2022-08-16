module.exports = (sequelize, DataTypes) => {
  const Professional = sequelize.define('Professional', {
    id: {
      type: DataTypes.INTEGER(10),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },

    avatar: {
      type: DataTypes.STRING(200),
      allowNull: true,
      defaultValue: '/front-end/public/img/professionalAvatar/defaultAvatar.jpeg'
    },

    name: {
      type: DataTypes.STRING(200),
      allowNull: false
    },

    lastName: {
      type: DataTypes.STRING(200),
      allowNull: false,
      field: 'last_name'
    },

    cpf: {
      type: DataTypes.STRING(25),
      allowNull: false,
      unique: true
    },

    birthday: {
      type: DataTypes.STRING(200),
      allowNull: false
    },

    postalCode: {
      type: DataTypes.STRING(200),
      allowNull: false,
      field: 'postal_code'
    },

    telephone: {
      type: DataTypes.STRING(200),
      allowNull: false
    },

    email: {
      type: DataTypes.STRING(200),
      allowNull: false,
      unique: true
    },

    password: {
      type: DataTypes.STRING(400),
      allowNull: false
    },

    aboutYou: {
      type: DataTypes.STRING(200),
      allowNull: true,
      field: 'about_you'
    },

    areaId: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      foreignKey: true,
      field: 'area_id'
    }
  },
  {
    tableName: 'professionals',
    timestamps: false
  })

  Professional.associate = (models => {
    Professional.belongsTo(models.Area, {
      foreignKey: 'areaId',
      as: 'area'
    })
  })
  return Professional
}
