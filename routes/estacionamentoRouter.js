const EstacionamentoController = require("../controllers/EstacionamentoController.js");

const router = require("express").Router();

router.post("/iniciarParquimetro", EstacionamentoController.iniciarParquimetro);

router.get("/getHistorico", EstacionamentoController.getHistorico);

router.get(
  "/getEstacionamentoAtual",
  EstacionamentoController.getEstacionamentoAtual
);

router.get("/renovarParquimetro", EstacionamentoController.renovarParquimetro);

router.get(
  "/concluirParquimetro",
  EstacionamentoController.concluirParquimetro
);

// router.post("/concluirParque", EstacionamentoController.getMatriculaUtilizador);

module.exports = router;
