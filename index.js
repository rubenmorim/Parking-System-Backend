require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

//middleWares
app.use(bodyParser.json());

//routers;

const routerTipoPagamentos = require("./routes/tipoPagamentoRouter.js");
const routerParques = require("./routes/parquesRouter.js");

app.use("/api/tipoPagamento", routerTipoPagamentos);
app.use("/api/parques", routerParques);

//initializer

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
