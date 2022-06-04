const db = require("../models");

//create Main Model

const Parque = db.Parque;

//main Work
const getAllParques = async (req, res) => {
  let allParques = await Parque.findAll({});

  res.status(200).send(allParques);
};

const getParqueById = async (req, res) => {
  const { id } = req.query;

  let getParque = await Parque.findAll({
    where: {
      id: id,
    },
  });

  res.status(200).send(getParque);
};

module.exports = {
  getAllParques,
  getParqueById,
};
