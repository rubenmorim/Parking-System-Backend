const db = require("../models");
const { generateID } = require("./utils.js");
const { getMatriculaByIdService } = require("./MatriculaController");
const { getParqueByIdService } = require("./ParqueController");
var moment = require("moment");
const res = require("express/lib/response");

//create Main Model

const Estacionamento = db.Estacionamento;

//--------------------------- services ---------------

const gerirLugares = async (action, idParque) => {
  try {
    let parqueAtual = await getParqueByIdService(idParque);

    let NewtotalLugares;

    if (action === "add") {
      NewtotalLugares = parqueAtual[0].dataValues.totalLugares + 1;
    } else {
      NewtotalLugares = parqueAtual[0].dataValues.totalLugares - 1;
    }

    await parqueAtual[0].update({ totalLugares: NewtotalLugares });

    return true;
  } catch (e) {
    return false;
  }
};

const getEstacionamentoByIdUtilizadorService = async (idUtilizador) => {
  try {
    let estacionamentoAtual = await Estacionamento.findAll({
      where: {
        idUtilizador: idUtilizador,
        isPago: false,
      },
    });
    let currentEstacionamento = null;
    estacionamentoAtual.forEach((item) => {
      let currentDate = moment().format("YYYY-MM-DD HH:mm:ss");
      let startDateItem = moment(item.dataValues.entrada).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      if (currentDate > startDateItem) {
        currentEstacionamento = item;
      }
    });

    return currentEstacionamento;
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
      if (item.dataValues.saida !== null) {
        let itemSaida = moment(item.dataValues.saida).format(
          "YYYY-MM-DD HH:mm:ss"
        );

        if (actualTime > itemSaida && item.dataValues.isPago === false) {
          await item.update({ isPago: true });
          await gerirLugares("add", item.dataValues.idParque);
        }
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
  let finalDate = null;

  if (tempoParque !== null) {
    finalDate = moment().add(tempoParque, "m").format("YYYY-MM-DD HH:mm:ss");
  }

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

    await gerirLugares("remove", idParque);

    res.status(200).send(parqueIniciado);
  } catch (e) {
    console.log(e);
    res.status(400).send("Ocorreu Algum Erro");
  }
};

const getHistorico = async (req, res) => {
  const { id } = req.params;

  try {
    let historicoParques = await Estacionamento.findAll({
      where: {
        idUtilizador: id,
        isPago: true,
      },
    });

    let finalParques = await Promise.all(
      historicoParques.map(async (item) => {
        let parqueItem = await getParqueByIdService(item.dataValues.idParque);
        item.dataValues["nomeParque"] = parqueItem[0].dataValues.nomeParque;

        return item.dataValues;
      })
    );

    res.status(200).send(finalParques);
  } catch (e) {
    console.log(e);
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

    let actualTime = moment().format("YYYY-MM-DD HH:mm:ss");

    await gerirLugares("add", parquimetroAtual.dataValues.idParque);
    if (parquimetroAtual.dataValues.saida !== null) {
      await parquimetroAtual.update({ isPago: true });
    } else {
      await parquimetroAtual.update({ isPago: true, saida: actualTime });
    }

    res.status(200).send(parquimetroAtual);
  } catch (e) {
    console.log(e);
    res.status(400).send("Ocorreu Algum Erro");
  }
};

//ver timestamps
const createReserva = async (req, res) => {
  const { idUtilizador, dataentrada, tempoParque, idParque } = req.body;

  let currentDate = moment(dataentrada).format("YYYY-MM-DD HH:mm:ss");
  let finalDate = moment(dataentrada)
    .add(tempoParque, "m")
    .format("YYYY-MM-DD HH:mm:ss");

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

    await gerirLugares("remove", idParque);

    res.status(200).send(parqueIniciado);
  } catch (e) {
    console.log(e);
    res.status(400).send("Ocorreu Algum Erro");
  }
};

const getReservasByUser = async (req, res) => {
  const { idUtilizador } = req.params;

  try {
    let response = await Estacionamento.findAll({
      where: { idUtilizador: idUtilizador },
    });
    let reservas = [];
    response.forEach((item) => {
      let currentDate = moment().format("YYYY-MM-DD HH:mm:ss");
      let startDateItem = moment(item.dataValues.entrada).format(
        "YYYY-MM-DD HH:mm:ss"
      );

      if (currentDate < startDateItem) {
        reservas.push(item);
      }
    });

    res.status(200).send(reservas);
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
  createReserva,
  getReservasByUser,
};
