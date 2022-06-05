const EstacionamentoController = require("../controllers/EstacionamentoController.js");

const router = require("express").Router();

router.post("/iniciarParquimetro", EstacionamentoController.iniciarParquimetro);

router.get("/getHistorico/:id", EstacionamentoController.getHistorico);

router.get(
  "/getEstacionamentoAtual",
  EstacionamentoController.getEstacionamentoAtual
);

router.get("/renovarParquimetro", EstacionamentoController.renovarParquimetro);

router.get(
  "/concluirParquimetro",
  EstacionamentoController.concluirParquimetro
);

module.exports = router;
