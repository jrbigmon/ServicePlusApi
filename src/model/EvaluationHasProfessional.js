module.exports = (sequelize, DataTypes) => {
    const EvaluationHasProfessional = sequelize.define('EvaluationHasProfessional', {
        id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },

      professionalId: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        foreignKey: true,
        field: 'professional_id'
      },

      clientId: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        foreignKey: true,
        field: 'client_id'
      },

      assessment: {
        type: DataTypes.INTEGER(10),
        allowNull: true
      },
    }, 
    {
      tableName: 'evaluations_has_professionals',
      timestamps: true,
      paranoid: true
    })

    EvaluationHasProfessional.associate = (models) => {
      EvaluationHasProfessional.belongsTo(models.Professional, {
        foreignKey: 'professionalId',
        as: 'professional'
      })
    }

    module.exports = EvaluationHasProfessional
}