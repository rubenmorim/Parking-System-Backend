module.exports = (sequelize, DataTypes) => {
  const Parque = sequelize.define(
    "Parque",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      idTipoParque: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "tipoParque",
          key: "id",
        },
      },
      nomeParque: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      precoHora: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      totalVagas: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      totalOcupados: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      latitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      longitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      morada: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { freezeTableName: true, timestamps: false }
  );

  return Parque;
};
