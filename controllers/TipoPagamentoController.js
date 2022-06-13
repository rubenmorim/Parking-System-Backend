const db = require("../models");
const { generateID } = require("./utils.js");

//create Main Model

const TipoPagamento = db.TipoPagamento;

//main Work
const getAllTipoByUtilizadorPagamento = async (req, res) => {
  const { id } = req.params;
  try {
    let tipoPagamentos = await TipoPagamento.findAll({
      where: {
        idUtilizador: id,
      },
    });

    res.status(200).send(tipoPagamentos);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Ocorreu algum erro" });
  }
};

const createTipo = async (req, res) => {
  const { idUtilizador, pagamento } = req.body;
  try {
    await TipoPagamento.create({
      id: generateID(),
      idUtilizador: idUtilizador,
      tipoPagamento: pagamento,
    });
    res.status(200).json({ message: "Criado com sucesso" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Ocorreu algum erro" });
  }
};

module.exports = {
  getAllTipoByUtilizadorPagamento,
  createTipo,
};
