const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const mongoose = require('mongoose');
const app = express();
app.use(bodyParser.json());

mongoose
  .connect('mongodb://localhost:27017/db-musi-code-cifra', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Conexão com o MongoDB de cifra estabelecida.'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB de cifra:', err));

const Cifra = require('./cifraModel');
const Musica = require('../musica/musicaModel');

app.post('/eventos', (req, res) => {
  console.log(req.body);
  res.status(200).send({ msg: 'ok' });
});

app.put('/musica/:id/cifra', async (req, res) => {
  const { texto } = req.body;
  const { id } = req.params; // Extrair o valor do ID da música

  try {
    const cifra = new Cifra({
      texto,
      MusicaId: id, // Atribuir o valor do ID da música ao campo MusicaId
    });

    await cifra.save();

    const musica = await Musica.findById(id);
    if (musica) {
      musica.cifra = texto;
      await musica.save();
      res.status(201).send({ cifra });
    } else {
      throw new Error('Música não encontrada.');
    }
  } catch (error) {
    console.error('Erro ao salvar a cifra:', error);
    res.status(500).send({ msg: 'Erro ao salvar a cifra.' });
  }
});

app.get('/musica/:id/cifra', async (req, res) => {
  try {
    const cifras = await Cifra.find({ MusicaId: req.params.id });
    res.send(cifras);
  } catch (error) {
    console.error('Erro ao buscar as cifras:', error);
    res.status(500).send({ msg: 'Erro ao buscar as cifras.' });
  }
});

app.listen(5000, () => {
  console.log('Servidor de cifras iniciado na porta 5000.');
});