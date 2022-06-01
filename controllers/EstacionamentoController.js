const db = require("../models");
const { generateID } = require("./utils.js");

//create Main Model

const Estacionamento = db.Estacionamento;

//--------------------------- services ---------------

//-------------------------- Endpoints Controllers -----------------------

const getMatriculaUtilizador = async (req, res) => {
  const { idUtilizador } = req.body;

  try {
    matriculasUser = await Matricula.findAll({
      where: {
        idUtilizador: idUtilizador,
      },
    });

    res.status(200).send(matriculasUser);
  } catch (e) {
    res.status(400).send("Ocorreu Algum Erro");
  }
};

module.exports = {};
