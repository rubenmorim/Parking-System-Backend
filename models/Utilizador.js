module.exports = (sequelize, DataTypes) => {
  const Utilizador = sequelize.define(
    "Utilizador",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      birthday: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { freezeTableName: true, timestamps: false }
  );

  return Utilizador;
};
