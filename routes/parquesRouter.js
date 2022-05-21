const ParqueController = require("../controllers/ParqueController.js");

const router = require("express").Router();

router.get("/allParques", ParqueController.getAllParques);

module.exports = router;
