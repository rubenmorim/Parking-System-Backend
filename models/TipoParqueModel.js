module.exports = (sequelize, DataTypes) => {
  const tipoParque = sequelize.define(
    "tipoParque",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      tipoParque: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { freezeTableName: true, timestamps: false }
  );

  return tipoParque;
};
