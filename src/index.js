require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const port = process.env.PORT || 3000;

const app = express();

app.use(cors());

// Config JSON response
app.use(express.json());

// Models
const User = require("../models/User");

// Open Router - Public Route
app.get("/", (req, res) => {
  return res.json({ message: "Seja bem-vindo à API Studio Maker" }).status(200);
});

// Register User
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

  // check if user exists
  const userExists = await User.findOne({ email: email });

  if (userExists) {
    return res.status(422).json({ message: "E-mail existente! Por favor, tente outro e-mail." });
  }

  // create user
  const user = new User({
    name,
    responsibleName,
    email,
    school,
    series,
  });

  try {
    await user.save();
    res.status(201).json({ message: "Usuário registrado com sucesso" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Erro no servidor, tente novamente mais tarde!" });
  }
});

// Credencials
const DB = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};

mongoose.connect(`mongodb+srv://${DB.user}:${DB.password}@cluster0.zi99f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`).then(() => {
    app.listen(port);
  }).catch((err) => console.log(err));
