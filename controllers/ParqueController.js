const db = require("../models");

//create Main Model

const Parque = db.Parque;

//main Work
const getAllParques = async (req, res) => {
  let allParques = await Parque.findAll({});

  res.status(200).send(allParques);
};

module.exports = {
  getAllTipoPagamento,
};
