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
      defaultValue: 'defaultAvatar.jpeg'
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
      allowNull: false
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
      allowNull: false
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
    tableName: 'professionals',
    timestamps: true,
    paranoid: true
  })

  Professional.associate = models => {
    Professional.belongsTo(models.Area, {
      foreignKey: 'areaId',
      as: 'area'
    })
    Professional.belongsToMany(models.Client, {
      foreignKey: 'professionalId',
      otherKey: 'clientId',
      through: models.Service,
      as: 'professionalHasClient'
    })
    Professional.hasMany(models.Service, {
      foreignKey: 'professionalId',
      as: 'servicesByProfessional'
    })
    Professional.hasMany(models.EvaluationHasProfessional, {
      foreignKey: 'professionalId',
      as: 'evaluation'
    })
  }

  return Professional
}
