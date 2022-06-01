const { generateID } = require("./utils.js");
const { createMatriculaService } = require("./MatriculaController.js");

const db = require("../models");
//create Main Model

const Utilizador = db.Utilizador;

//main Work
const createUtilizador = async (req, res) => {
  const {
    email,
    password,
    firstName,
    lastName,
    birthday,
    nomeCarro,
    matricula,
  } = req.body;

  try {
    let createdUser = await Utilizador.create({
      id: generateID(),
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      birthday: birthday,
    });

    if (nomeCarro && matricula) {
      await createMatriculaService(createdUser.id, nomeCarro, matricula, true);
    }

    res.status(200).send("Registado com sucesso!");
  } catch (error) {
    console.log(error);
    res.status(400).send("Ocorreu algum erro");
  }
};

const getUtilizador = async (req, res) => {
  const { email, password } = req.body;

  try {
    loggedUser = await Utilizador.findAll({
      where: {
        email: email,
        password: password,
      },
    });

    if (loggedUser.length === 0) {
      await res.status(200).json({
        responseStatus: false,
        response: "Email ou Password Incorretos!",
      });
    } else {
      delete loggedUser[0].dataValues.password;
      await res
        .status(200)
        .json({ responseStatus: true, response: loggedUser[0].dataValues });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Ocorreu algum erro");
  }
};

module.exports = {
  createUtilizador,
  getUtilizador,
};
