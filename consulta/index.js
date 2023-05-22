const express = require("express");
const mongoose = require("mongoose");

const mongoURI = "mongodb://127.0.0.1:27017/db-musi-code-musica";
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conexão com o MongoDB estabelecida."))
  .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));

module.exports = mongoose;

const app = express();
app.use(express.json());

const MusicaSchema = new mongoose.Schema({
  titulo: String,
  letra: String,
  autor: String,
});

const Musica = mongoose.model("Musica", MusicaSchema);

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

app.listen(6000, () => console.log("Servidor iniciado na porta 6000."));
