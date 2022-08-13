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
      allowNull: true
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
      allowNull: false
    },

    password: {
      type: DataTypes.STRING(400),
      allowNull: false
    }
  },
  {
    tableName: 'clients',
    timestamps: false
  })

  return Client
}
