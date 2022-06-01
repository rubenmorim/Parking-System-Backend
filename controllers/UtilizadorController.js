const { generateID } = require("./utils.js");

const db = require("../models");
//create Main Model

const Utilizador = db.Utilizador;
const Matricula = db.Matricula;

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
      await Matricula.create({
        id: generateID(),
        nomeCarro: nomeCarro,
        matricula: matricula,
        isSelected: true,
        idUtilizador: createdUser.id,
      });
    }

    res.status(200).send("Registado com sucesso!");
  } catch (error) {
    console.log(error);
    res.status(400).send("Ocorreu algum erro");
  }
};

const getUtilizador = async (req, res) => {
  const { email, password, firstName, lastName, birthday } = req.body;

  try {
    await Utilizador.create({
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      birthday: birthday,
    });

    await res.status(200).send("Registado com sucesso!");
  } catch (error) {
    console.log(error);
    res.status(400).send("Ocorreu algum erro");
  }
};

module.exports = {
  createUtilizador,
  getUtilizador,
};
