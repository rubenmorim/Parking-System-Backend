const db = require("../models");

//create Main Model

const Parque = db.Parque;
//services

const getParqueByIdService = async (idParque) => {
  try {
    let getParque = await Parque.findAll({
      where: {
        id: idParque,
      },
    });
    return getParque;
  } catch (e) {
    console.log(e);
    throw new Error("Ocorreu um erro");
  }
};

//main Work
const getAllParques = async (req, res) => {
  let allParques = await Parque.findAll({});

  res.status(200).send(allParques);
};

const getParqueById = async (req, res) => {
  const { id } = req.query;

  let getParque = await getParqueByIdService(id);

  res.status(200).send(getParque);
};

module.exports = {
  getAllParques,
  getParqueByIdService,
  getParqueById,
};
