module.exports = (sequelize, DataTypes) => {
  const tipoPagamento = sequelize.define(
    "tipoPagamento",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
      },
      tipoPagamento: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      idUtilizador: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "Utilizador",
          key: "id",
        },
      },
    },
    { freezeTableName: true, timestamps: false }
  );

  return tipoPagamento;
};
