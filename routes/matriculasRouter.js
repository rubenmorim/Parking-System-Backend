const MatriculaController = require("../controllers/MatriculaController.js");

const router = require("express").Router();

router.post("/createMatricula", MatriculaController.createMatricula);

router.post(
  "/getMatriculaUtilizador",
  MatriculaController.getMatriculaUtilizador
);

router.get(
  "/updateMatriculaSelected",
  MatriculaController.mudarMatriculaUtilizador
);

module.exports = router;
