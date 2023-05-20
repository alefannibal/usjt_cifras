const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
app.use(bodyParser.json());

mongoose
  .connect('mongodb://localhost:27017/db-musi-code-musica', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Conexão com o MongoDB estabelecida.'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

const Musica = require('./musicaModel');

app.get('/musica', async (req, res) => {
  try {
    const musicas = await Musica.find();
    res.send(musicas);
  } catch (error) {
    console.error('Erro ao buscar as músicas:', error);
    res.status(500).send({ msg: 'Erro ao buscar as músicas.' });
  }
});

app.put('/musica', async (req, res) => {
  const { titulo, letra, autor } = req.body;

  try {
    const novaMusica = new Musica({
      titulo,
      letra,
      autor,
    });
    await novaMusica.save();

    res.status(201).send(novaMusica);
  } catch (error) {
    console.error('Erro ao salvar a música:', error);
    res.status(500).send({ msg: 'Erro ao salvar a música.' });
  }
});

app.listen(4000, () => {
  console.log('Servidor de músicas iniciado na porta 4000.');
});