const dbConfig = require("../config/dbConfig.js");

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected in MySQL Database...");
  })
  .catch((error) => {
    console.log(`Error: ${error}`);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//all models...
db.TipoPagamento = require("./TipoPagamentoModel.js")(sequelize, DataTypes);
db.TipoParque = require("./TipoParqueModel.js")(sequelize, DataTypes);
db.Utilizador = require("./Utilizador.js")(sequelize, DataTypes);
db.Wallet = require("./Wallet.js")(sequelize, DataTypes);
db.Matricula = require("./Matricula.js")(sequelize, DataTypes);
db.Parque = require("./Parque.js")(sequelize, DataTypes);
db.Estacionamento = require("./Estacionamento.js")(sequelize, DataTypes);

db.sequelize.sync({ force: false }).then(() => {
  console.log("Re-sync done!");
});

module.exports = db;
