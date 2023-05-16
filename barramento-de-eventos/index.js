const express = require('express');
const bodyParser = require('body-parser');
//para enviar eventos para os demais microsserviços
const axios = require('axios');
const mongoose = require('mongoose');
const cors = require('cors');

const mongoURI = 'mongodb://localhost:27017/db-musi-code'; 
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conexão com o MongoDB estabelecida.'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/eventos', async (req, res) => {
    const evento = req.body;
  
    try {
      // Enviar evento para o microsserviço de músicas
      await axios.post('http://localhost:4000/eventos', evento);
      console.log('Evento enviado para o microsserviço de músicas.');
  
      // Enviar evento para o microsserviço de cifras
      await axios.post('http://localhost:5000/eventos', evento);
      console.log('Evento enviado para o microsserviço de cifras.');
  
      // ... Resto do código para encaminhar eventos para outros microserviços
  
      res.status(200).send({ msg: 'ok' });
    } catch (error) {
      console.error('Erro ao enviar eventos:', error);
      res.status(500).send({ msg: 'Erro ao enviar eventos.' });
    }
  });
  
  app.listen(10000, () => {
    console.log('Barramento de eventos. Porta 10000.');
  });