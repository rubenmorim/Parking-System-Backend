const db = require("../models");
const { generateID } = require("./utils.js");

//create Main Model

const Estacionamento = db.Estacionamento;

//--------------------------- services ---------------

//-------------------------- Endpoints Controllers -----------------------

const iniciarParquimetro = async (req, res) => {
  const { idUtilizador, idParque, Tempo } = req.body;

  try {
    parqueIniciado = await Estacionamento.create({});

    res.status(200).send(parqueIniciado);
  } catch (e) {
    res.status(400).send("Ocorreu Algum Erro");
  }
};

const RenovarParquimetro = (module.exports = { iniciarParquimetro });
