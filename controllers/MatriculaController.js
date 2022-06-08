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

const getMatriculaByIdService = async (idUtilizador) => {
  let matriculasUser;

  try {
    matriculasUser = await Matricula.findAll({
      where: {
        idUtilizador: idUtilizador,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error("falha get Matriculas");
  }

  return matriculasUser;
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
  const { idUtilizador } = req.params;

  try {
    let matriculasUser = await getMatriculaByIdService(idUtilizador);

    res.status(200).send(matriculasUser);
  } catch (e) {
    res.status(400).send("Ocorreu Algum Erro");
  }
};

const apagarMatricula = async (req, res) => {
  const { idMatricula } = req.params;

  try {
    await Matricula.destroy({
      where: {
        id: idMatricula,
      },
    });

    res.status(200).send("Apagado com sucesso");
  } catch (e) {
    res.status(400).send("Ocorreu Algum Erro");
  }
};

//Mudar Matricula - Not Implemented
const mudarMatriculaUtilizador = async (req, res) => {
  const { idUtilizador, idMatricula } = req.query;

  try {
    let currentMatricula = await Matricula.findOne({
      where: {
        idUtilizador: idUtilizador,
        isSelected: true,
      },
    });

    await currentMatricula.update({ isSelected: false });

    let newSelectedMatricula = await Matricula.findOne({
      where: {
        id: idMatricula,
      },
    });

    await newSelectedMatricula.update({ isSelected: true });

    let allMatriculas = await Matricula.findAll();

    res.status(200).send(allMatriculas);
  } catch (e) {
    console.log(e);
    res.status(400).send("Ocorreu Algum Erro");
  }
};

module.exports = {
  apagarMatricula,
  createMatriculaService,
  createMatricula,
  getMatriculaUtilizador,
  getMatriculaByIdService,
  mudarMatriculaUtilizador,
};
