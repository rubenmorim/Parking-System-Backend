module.exports = (sequelize, DataTypes) => {
  const Matricula = sequelize.define(
    "Matricula",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
      },
      nomeCarro: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      matricula: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      idUtilizador: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "Utilizador",
          key: "id",
        },
      },
      isSelected: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        default: false,
      },
    },
    { freezeTableName: true, timestamps: false }
  );

  return Matricula;
};
