const EstacionamentoController = require("../controllers/EstacionamentoController.js");

const router = require("express").Router();

router.post("/createReserva", EstacionamentoController.createReserva);

router.post("/iniciarParquimetro", EstacionamentoController.iniciarParquimetro);

router.get("/getHistorico/:id", EstacionamentoController.getHistorico);

router.get(
  "/getReservasByUser/:idUtilizador",
  EstacionamentoController.getReservasByUser
);

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
