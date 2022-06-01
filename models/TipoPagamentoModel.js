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
    },
    { freezeTableName: true, timestamps: false }
  );

  return tipoPagamento;
};
