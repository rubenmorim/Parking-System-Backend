const utilizadorController = require("../controllers/UtilizadorController.js");

const router = require("express").Router();

router.post("/registar", utilizadorController.createUtilizador);
router.post("/login", utilizadorController.getUtilizador);

module.exports = router;
