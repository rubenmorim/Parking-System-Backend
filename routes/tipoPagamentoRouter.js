const tipoPagamentoController = require("../controllers/TipoPagamentoController.js");

const router = require("express").Router();

router.get("/allTipoPagamento", tipoPagamentoController.getAllTipoPagamento);

module.exports = router;
