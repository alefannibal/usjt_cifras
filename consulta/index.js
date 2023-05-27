const express = require("express");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const cors = require('cors');

const mongoURI = "mongodb+srv://gustavocord:a99868@cluster0.h3bgjey.mongodb.net/db-musi-code-musica";

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conexão com o MongoDB estabelecida."))
  .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));

const app = express();
app.use(express.json());
app.use(cors()); // Habilitar CORS

const UsuarioSchema = new mongoose.Schema({
  fullName: String,
  password: String,
  email: String
});

const Usuario = mongoose.model("Usuario", UsuarioSchema);

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
    console.log('UserId:', userId);
    const musicas = await Musica.find({ userId }).populate('userId', 'fullName');
    console.log('Músicas:', musicas);
    res.status(200).json(musicas);
  } catch (err) {
    console.error('Erro ao consultar músicas:', err);
    res.status(500).json({ error: 'Erro ao consultar músicas' });
  }
});

app.listen(6001, () => console.log("Servidor iniciado na porta 6001."));