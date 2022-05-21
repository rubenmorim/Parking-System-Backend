module.exports = (sequelize, DataTypes) => {
  const Wallet = sequelize.define(
    "Wallet",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      idUtilizador: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Utilizador",
          key: "id",
        },
      },
      idTipoPagamento: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          //references...
          model: "tipoPagamento",
          key: "id",
        },
      },
      dados: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { freezeTableName: true, timestamps: false }
  );

  return Wallet;
};
