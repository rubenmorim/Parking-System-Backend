const db = require("../models");
const { generateID } = require("./utils.js");

//create Main Model

const Matricula = db.Matricula;

//--------------------------- services ---------------
const createMatriculaService = async (
  idUtilizador,
  nomeCarro,
  matricula,
  status
) => {
  try {
    let MatriculaCriada = await Matricula.create({
      id: generateID(),
      nomeCarro: nomeCarro,
      matricula: matricula,
      isSelected: status,
      idUtilizador: idUtilizador,
    });

    return MatriculaCriada;
  } catch (error) {
    console.log(error);
    throw new Error("Falha ao adicionar Matricula");
  }
};

//-------------------------- Endpoints Controllers -----------------------

const createMatricula = async (req, res) => {
  const { idUtilizador, nomeCarro, matricula } = req.body;
  try {
    let matriculaCriada = await createMatriculaService(
      idUtilizador,
      nomeCarro,
      matricula,
      false
    );
    res.status(200).send(matriculaCriada);
  } catch (e) {
    res.status(400).send("Ocorreu Algum Erro");
  }
};

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

//Mudar Matricula - Not Implemented
const mudarMatriculaUtilizador = async (req, res) => {
  const { idUtilizador, idMatricula } = req.query;

  //update à matricula que quer mudar
  // pegar na matricula que está isSelected e colocar a falso

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

module.exports = {
  createMatriculaService,
  createMatricula,
  getMatriculaUtilizador,
};
