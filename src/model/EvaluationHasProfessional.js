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

    return EvaluationHasProfessional
}