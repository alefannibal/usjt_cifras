// const express = require('express');
// const bodyParser = require('body-parser');
// const axios = require('axios');

// const app = express();
// app.use(bodyParser.json());

// app.post('/eventos', async (req, res) => {
//   const evento = req.body;

//   await axios.post('http://localhost:4000/eventos', evento);
//   await axios.post('http://localhost:5000/eventos', evento);
//   await axios.post('http://localhost:6000/eventos', evento);

//   res.status(200).send({ msg: 'ok' });
// });

// app.listen(10000, () => {
//   console.log('Barramento de eventos. Porta 10000.');
// });