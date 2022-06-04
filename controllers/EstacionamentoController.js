const db = require("../models");
const { generateID } = require("./utils.js");

//create Main Model

const Estacionamento = db.Estacionamento;

//--------------------------- services ---------------

//-------------------------- Endpoints Controllers -----------------------

const iniciarParquimetro = async (req, res) => {
  const { idUtilizador, idParque, TempoParque } = req.body;

  try {
    parqueIniciado = await Estacionamento.create({});

    res.status(200).send(parqueIniciado);
  } catch (e) {
    res.status(400).send("Ocorreu Algum Erro");
  }
};

const getHistorico = async (req, res) => {
  const { id } = req.query;

  try {
    historicoParques = await Estacionamento.findAll({
      where: {
        idUtilizador: id,
      },
    });

    res.status(200).send(historicoParques);
  } catch (e) {
    res.status(400).send("Ocorreu Algum Erro");
  }
};

module.exports = { iniciarParquimetro, getHistorico };
