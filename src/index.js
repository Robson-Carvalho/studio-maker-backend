require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const User = require("../models/User");

const port = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


app.get("/", (req, res) => {
  return res.json({ message: "Seja bem-vindo à API do Studio Maker" }).status(200);
});

app.post("/register", async (req, res) => {
  const { name, responsibleName, email, school, series } = req.body;

  if (!name) {
    return res.status(422).json({ message: "O nome é obrigatório" });
  }
  if (!responsibleName) {
    return res
      .status(422)
      .json({ message: "O nome do responsável é obrigatório" });
  }
  if (!email) {
    return res.status(422).json({ message: "O e-mail é obrigatório" });
  }
  if (!school) {
    return res.status(422).json({ message: "O nome da escola é obrigatório" });
  }
  if (!series) {
    return res.status(422).json({ message: "A série é obrigatório" });
  }

  const userExists = await User.findOne({ email: email });

  if (userExists) {
    return res
      .status(422)
      .json({ message: "E-mail existente! Por favor, tente outro e-mail." });
  }

  const user = new User({
    name,
    responsibleName,
    email,
    school,
    series,
  });

  try {
    await user.save();
    res.status(201).json({ message: "Inscrição realizada com sucesso!" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Erro no servidor, tente novamente mais tarde!" });
  }
});

mongoose
.connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(port, () => {
      console.log(
        `Banco de Dados conectado - Servidor rodando em http://localhost:${port}/`
      );
    });
  })
  .catch((err) => console.log(err));
