const tipoPagamentoController = require("../controllers/TipoPagamentoController.js");

const router = require("express").Router();

router.get(
  "/allTipoPagamentoByUtilizador/:id",
  tipoPagamentoController.getAllTipoByUtilizadorPagamento
);

router.post("/createTipoPagamento", tipoPagamentoController.createTipo);

module.exports = router;
