const express = require("express");
const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost:27017/db-musi-code'; 
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conexão com o MongoDB estabelecida.'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

module.exports = mongoose;
const app = express();
app.use(express.json());

const baseConsulta = {};

const funcoes = {
    MusicaPublicada: (musica) => {
        baseConsulta[musica.contador] = musica;
    },
    CifrasCriadas: (cifra) => {
        const cifras = baseConsulta[cifra.MusicaId]["cifras"] || [];
        cifras.push(cifra);
        baseConsulta[cifra.MusicaId]["cifras"] = cifras;
    }
};

app.get("/musica", (req, res) => {
    res.status(200).send(baseConsulta);
});

app.post("/eventos", (req, res) => {
    funcoes[req.body.tipo](req.body.dados);
    res.status(200).send(baseConsulta);
});

app.listen(6000, () => console.log("Consultas. Porta 6000"));