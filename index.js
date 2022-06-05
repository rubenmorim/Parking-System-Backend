require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var cron = require("node-cron");
const {
  updateEstacionamentoTrigger,
} = require("./controllers/EstacionamentoController");

//middleWares
app.use(bodyParser.json());

//service trigger
// cron.schedule("1 * * * *", async () => {
//   console.log("running a task every one minutes");
// });

cron.schedule("*/1 * * * *", async () => {
  console.log("running every minute 1");
  await updateEstacionamentoTrigger();
});
//routers;

const routerTipoPagamentos = require("./routes/tipoPagamentoRouter.js");
const routerParques = require("./routes/parquesRouter.js");
const routerUtilizador = require("./routes/UtilizadorRoutes.js");
const routerMatricula = require("./routes/matriculasRouter.js");
const routerEstacionamento = require("./routes/estacionamentoRouter.js");

app.use("/api/tipoPagamento", routerTipoPagamentos);
app.use("/api/parques", routerParques);
app.use("/api/utilizador", routerUtilizador);
app.use("/api/matricula", routerMatricula);
app.use("/api/estacionamento", routerEstacionamento);

//initializer

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
