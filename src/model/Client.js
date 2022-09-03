module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define('Client', {
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

    numberAddress: {
      type: DataTypes.STRING(10),
      allowNull: false,
      field: 'number_address'
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
    tableName: 'clients',
    timestamps: true
  })

  Client.associate = models => {
    Client.belongsToMany(models.Professional, {
      foreignKey: 'clientId',
      otherKey: 'professionalId',
      through: models.Service,
      as: 'serviceByClient'
    })
    Client.hasMany(models.Service, {
      foreignKey: 'clientId',
      as: 'servicesByClient'
    })
  }

  return Client
}
