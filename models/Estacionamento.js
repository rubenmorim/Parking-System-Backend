module.exports = (sequelize, DataTypes) => {
  const Estacionamento = sequelize.define(
    "Estacionamento",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      idMatricula: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Matricula",
          key: "id",
        },
      },
      idParque: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Parque",
          key: "id",
        },
      },
      idUtilizador: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Utilizador",
          key: "id",
        },
      },
      entrada: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      saida: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
