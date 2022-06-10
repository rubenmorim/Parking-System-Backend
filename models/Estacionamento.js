module.exports = (sequelize, DataTypes) => {
  const Estacionamento = sequelize.define(
    "Estacionamento",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
      },
      idMatricula: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "Matricula",
          key: "id",
        },
      },
      idParque: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "Parque",
          key: "id",
        },
      },
      idUtilizador: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "Utilizador",
          key: "id",
        },
      },
      entrada: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      saida: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isPago: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    { freezeTableName: true, timestamps: false }
  );

  return Estacionamento;
};
