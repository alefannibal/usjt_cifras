const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const mongoose = require('mongoose');
const Cifra = require('./cifraModel'); // Importe o modelo de cifras

const mongoURI = 'mongodb://localhost:27017/db-musi-code';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conexão com o MongoDB estabelecida.'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

const app = express();
app.use(bodyParser.json());

const { v4: uuidv4 } = require('uuid');

app.post('/eventos', (req, res) => {
  console.log(req.body);
  res.status(200).send({ msg: 'ok' });
});

app.put('/musica/:id/cifra', async (req, res) => {
  const idCifra = uuidv4();
  const { texto } = req.body;

  try {
    const novaCifra = new Cifra({
      _id: idCifra,
      texto,
      musicaId: req.params.id
    });

    await novaCifra.save();

    await axios.post('http://localhost:10000/eventos', {
      tipo: 'CifrasCriadas',
      dados: {
        id: idCifra,
        texto,
        musicaId: req.params.id
      }
    });

    res.status(201).send(novaCifra);
  } catch (error) {
    console.error('Erro ao salvar a cifra:', error);
    res.status(500).send({ msg: 'Erro ao salvar a cifra.' });
  }
});

app.get('/musica/:id/cifra', async (req, res) => {
  try {
    const cifras = await Cifra.find({ musicaId: req.params.id });
    res.send(cifras);
  } catch (error) {
    console.error('Erro ao buscar as cifras:', error);
    res.status(500).send({ msg: 'Erro ao buscar as cifras.' });
  }
});

app.listen(5000, () => {
  console.log('Cifras. Porta 5000');
});