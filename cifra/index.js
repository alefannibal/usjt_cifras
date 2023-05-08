const express = require ('express');
const bodyParser = require('body-parser');
const axios = require ('axios');
const app = express();
app.use(bodyParser.json());

const cifrasPorMusicaId = {};
const {v4: uuidv4} = require('uuid');

app.post("/eventos", (req, res) => {
    console.log(req.body);
    res.status(200).send({ msg: "ok" });
});

app.put('/musica/:id/cifra', async (req, res) => {
    const idCifra = uuidv4();
    const { texto } = req.body
    const cifrasDaMusica =
    cifrasPorMusicaId[req.params.id] || [];
    cifrasDaMusica.push({ id: idCifra, texto });
    cifrasPorMusicaId[req.params.id] =
    cifrasDaMusica;
    await axios.post('http://localhost:10000/eventos', {
    tipo: "CifrasCriadas",
    dados: {
    id: idCifra, texto, MusicaId: req.params.id
        }  
    })
    res.status(201).send(cifrasDaMusica);
});

app.get('/musica/:id/cifra', (req, res) => {
    res.send(cifrasPorMusicaId[req.params.id] || []);
});

app.listen(5000, (() => {
console.log('musica. Porta 5000');
}));