const db = require("../models");
const { generateID } = require("./utils.js");
const { getMatriculaByIdService } = require("./MatriculaController");
const { getParqueByIdService } = require("./ParqueController");
var moment = require("moment");

//create Main Model

const Estacionamento = db.Estacionamento;

//--------------------------- services ---------------

const getEstacionamentoByIdUtilizadorService = async (idUtilizador) => {
  try {
    let estacionamentoAtual = await Estacionamento.findOne({
      where: {
        idUtilizador: idUtilizador,
        isPago: false,
      },
    });

    return estacionamentoAtual;
  } catch (e) {
    console.log(e);
    throw new Error("Ocorreu algum erro");
  }
};

const updateEstacionamentoTrigger = async () => {
  try {
    let allEstacionamentos = await Estacionamento.findAll({});
    let actualTime = moment().format("YYYY-MM-DD HH:mm:ss");

    allEstacionamentos.forEach(async (item) => {
      let itemSaida = moment(item.dataValues.saida).format(
        "YYYY-MM-DD HH:mm:ss"
      );

      if (actualTime > itemSaida) {
        await item.update({ isPago: true });
      }
    });
  } catch (e) {
    console.log(e);
  }
};

//-------------------------- Endpoints Controllers -----------------------

const getEstacionamentoAtual = async (req, res) => {
  const { idUtilizador } = req.query;

  try {
    let parqueAtual = "eheh";
    let estacionamentoAtual = await getEstacionamentoByIdUtilizadorService(
      idUtilizador
    );

    if (estacionamentoAtual === null) {
      res.status(200).send("Sem estacionamento a decorrer");
      return;
    } else {
      parqueAtual = await getParqueByIdService(
        estacionamentoAtual.dataValues.idParque
      );
    }

    res
      .status(200)
      .json({ estacionamentoAtual: estacionamentoAtual, parque: parqueAtual });
  } catch (e) {
    console.log(e);
    res.status(400).send("Ocorreu Algum Erro");
  }
};

const iniciarParquimetro = async (req, res) => {
  const { idUtilizador, idParque, tempoParque } = req.body;

  let finalDate = moment().add(tempoParque, "m").format("YYYY-MM-DD HH:mm:ss");

  let currentDate = moment().format("YYYY-MM-DD HH:mm:ss");
  try {
    let matriculaUser = await getMatriculaByIdService(idUtilizador);
    let idMatricula = matriculaUser[0].dataValues.id;

    parqueIniciado = await Estacionamento.create({
      id: generateID(),
      idMatricula: idMatricula,
      idParque: idParque,
      idUtilizador: idUtilizador,
      entrada: currentDate,
      saida: finalDate,
      isPago: false,
    });

    res.status(200).send(parqueIniciado);
  } catch (e) {
    console.log(e);
    res.status(400).send("Ocorreu Algum Erro");
  }
};

const getHistorico = async (req, res) => {
  const { id } = req.query;

  try {
    let historicoParques = await Estacionamento.findAll();

    res.status(200).send(historicoParques);
  } catch (e) {
    res.status(400).send("Ocorreu Algum Erro");
  }
};

const renovarParquimetro = async (req, res) => {
  const { idUtilizador, tempoAdicional } = req.query;

  if (!tempoAdicional) {
    res.status(200).send("Necessário enviar tempo Adiconal");
    return;
  }
  try {
    let parquimetroAtual = await getEstacionamentoByIdUtilizadorService(
      idUtilizador
    );

    let novaTempo = moment(parquimetroAtual.dataValues.saida)
      .add(tempoAdicional, "m")
      .format("YYYY-MM-DD HH:mm:ss");

    await parquimetroAtual.update({ saida: novaTempo });

    res.status(200).send(parquimetroAtual);
  } catch (e) {
    console.log(e);
    res.status(400).send("Ocorreu Algum Erro");
  }
};

const concluirParquimetro = async (req, res) => {
  const { idUtilizador } = req.query;

  try {
    let parquimetroAtual = await getEstacionamentoByIdUtilizadorService(
      idUtilizador
    );

    await parquimetroAtual.update({ isPago: true });
    res.status(200).send(parquimetroAtual);
  } catch (e) {
    console.log(e);
    res.status(400).send("Ocorreu Algum Erro");
  }
};

module.exports = {
  iniciarParquimetro,
  getHistorico,
  getEstacionamentoAtual,
  renovarParquimetro,
  concluirParquimetro,
  updateEstacionamentoTrigger,
};
