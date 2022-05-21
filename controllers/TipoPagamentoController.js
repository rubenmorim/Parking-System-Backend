const db = require("../models");

//create Main Model

const TipoPagamento = db.TipoPagamento;

//main Work
const getAllTipoPagamento = async (req, res) => {
  let tipoPagamentos = await TipoPagamento.findAll({});

  res.status(200).send(tipoPagamentos);
};

module.exports = {
  getAllTipoPagamento,
};
