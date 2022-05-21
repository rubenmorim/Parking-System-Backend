module.exports = (sequelize, DataTypes) => {
  const Matricula = sequelize.define(
    "Matricula",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      matricula: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      idUtilizador: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Utilizador",
          key: "id",
        },
      },
      isSelected: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    { freezeTableName: true, timestamps: false }
  );

  return Matricula;
};
