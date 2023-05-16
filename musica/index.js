const cors = require('cors');
const mongoose = require('mongoose');
const express = require("express")
const bodyParser = require("body-parser")
const axios = require("axios")
const Musica = require('./musicaModel'); // Importar o modelo de música

const mongoURI = 'mongodb://localhost:27017/db-musi-code';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conexão com o MongoDB estabelecida.'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));



const app = express()
app.use(bodyParser.json())
app.use(cors());

const musica = {};
let contador = 0;

app.post("/eventos", (req, res) => {
    console.log(req.body);
    res.status(200).send({ msg: "ok" });
});

app.get('/musica', async (req, res) => {
  try {
    const musicas = await Musica.find();
    res.status(200).send(musicas);
  } catch (error) {
    console.error('Erro ao buscar músicas:', error);
    res.status(500).send({ msg: 'Erro ao buscar músicas.' });
  }
});

app.post('/musica', async (req, res) => {
  const { titulo, letra, autor } = req.body;

  try {
    const novaMusica = new Musica({
      titulo,
      letra,
      autor
    });

    const musicaSalva = await novaMusica.save();

    res.status(201).send(musicaSalva);
  } catch (error) {
    console.error('Erro ao salvar a música:', error);
    res.status(500).send({ msg: 'Erro ao salvar a música.' });
  }
});

app.listen(4000,() =>{
    console.log("Musica. porta 4000")
})