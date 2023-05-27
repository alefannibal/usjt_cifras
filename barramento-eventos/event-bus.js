const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const events = [];

app.post('/events', (req, res) => {
  const event = req.body;

  events.push(event);

  // Enviar o evento para o serviço de música
  axios.post('http://localhost:4000/events', event);
  // Enviar o evento para o serviço de consulta
  axios.post('http://localhost:6001/events', event);

  res.status(200).send({ message: 'Evento recebido e enviado para processamento.' });
});

app.get('/events', (req, res) => {
  res.send(events);
});

app.listen(8000, () => {
  console.log('Barramento de eventos iniciado na porta 8000.');
});