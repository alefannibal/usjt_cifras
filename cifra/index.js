const express = require ('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const cifrasPorMusicaId = {};
const {v4: uuidv4} = require('uuid');

app.put('/musica/:id/cifra', (req, res) => {
    const idCifra = uuidv4();
    const { texto } = req.body
    const cifrasDaMusica =
    cifrasPorMusicaId[req.params.id] || [];
    cifrasDaMusica.push({ id: idCifra, texto });
    cifrasPorMusicaId[req.params.id] =
    cifrasDaMusica;
    res.status(201).send(cifrasDaMusica);
});

app.get('/musica/:id/cifra', (req, res) => {

});

app.listen(5000, (() => {
console.log('musica. Porta 5000');
}));