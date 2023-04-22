const express = require ('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const cifrasPorMusicaId = {};

app.put('/musica/:id/cifra', (req, res) => {

});

app.get('/lembretes/:id/cifra', (req, res) => {

});

app.listen(5000, (() => {
console.log('musica. Porta 5000');
}));