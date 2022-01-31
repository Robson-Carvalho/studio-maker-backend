require("dotenv").config();
const express = require("express");
const cors = require("cors");
const port = 3030;

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  return res.send({ message: "Seja bem-vindo à API Studio Maker" }).status(200);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}/`);
});
