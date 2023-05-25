const express = require("express");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const mongoURI = "mongodb://localhost:27017/db-musi-code-musica";
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conexão com o MongoDB estabelecida."))
  .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));

module.exports = mongoose;

const app = express();
app.use(express.json());

const Usuario = require('../gerenciar-usuarios/usuarioModel');

const MusicaSchema = new mongoose.Schema({
  titulo: String,
  letra: String,
  autor: String,
  fullName: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario'
  }
});

const Musica = mongoose.model("Musica", MusicaSchema);

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token de autenticação não fornecido' });
  }

  jwt.verify(token, 'seu_segredo_do_token', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Falha na autenticação do token' });
    }
    console.log('Token:', token);
    req.user = user;
    next();
  });
}

app.get("/musica", async (req, res) => {
  try {
    const { titulo } = req.query;
    const musicas = await Musica.find({ titulo }).exec();
    res.status(200).json(musicas);
  } catch (err) {
    console.error("Erro ao consultar músicas:", err);
    res.status(500).json({ error: "Erro ao consultar músicas" });
  }
});

app.get('/minhas-musicas', authenticateToken, async (req, res) => {
  const userId = req.user && req.user.id;

  if (!userId) {
    return res.status(400).json({ message: 'O campo userId é obrigatório.' });
  }

  try {
    const musicas = await Musica.find({ fullName: req.user.fullName }).populate('userId', 'fullName');
    res.status(200).json(musicas);
  } catch (err) {
    console.error('Erro ao consultar músicas:', err);
    res.status(500).json({ error: 'Erro ao consultar músicas' });
  }
});
app.listen(6000, () => console.log("Servidor iniciado na porta 6000."));
